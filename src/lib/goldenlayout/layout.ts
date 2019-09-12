import { defaultLayout, ComponentState } from './layouts';
import { default as GoldenLayout, ItemConfigType, Container, BrowserWindow } from 'golden-layout';
import 'jquery';

import store from '../../store';

import components from '../../components';

export class Layout {
  private lsKey: string;
  private readonly goldenLayout: GoldenLayout;
  private popouts: BrowserWindow[] = [];

  private _eventsOn = true;

  constructor(public readonly id: string, layout = defaultLayout, public readonly mountpoint = document.body) {
    this.id = id;
    this.lsKey = 'layout ' + id;
    this.goldenLayout = new GoldenLayout(this.readConfig(layout), mountpoint);
    registerComponents(this.goldenLayout);

    this.goldenLayout.on('windowOpened', (popout: GoldenLayout.BrowserWindow) => {
      this.popouts.push(popout);
      popout.getGlInstance().emit('stateTransfer', store.state);
      this.writeConfig();
    });

    this.goldenLayout.on('stateChanged', () => {
      if (this._eventsOn) {
        this.writeConfig();
      }
    });

    this.goldenLayout.on('stateTransfer', (state: any) => {
      store.commit('brainTransfer', state);
    });

    window.addEventListener('resize', () => this.goldenLayout.updateSize());
    this.goldenLayout.init();
  }

  public resetLayout(layout: ItemConfigType[]) {
    this._eventsOn = false;

    this.popouts.forEach(popout => popout.getGlInstance().root.contentItems.forEach(item => item.remove()));
    this.popouts.forEach(popout => popout.close());
    this.popouts = [];
    this.goldenLayout.root.contentItems.forEach(item => item.remove());
    layout.forEach(item => this.goldenLayout.root.addChild(item));

    this._eventsOn = true;
    this.writeConfig();
  }

  private readConfig(layout = defaultLayout): GoldenLayout.Config {
    const defaultConfig = {
      content: defaultLayout,
    };
    const savedState = localStorage.getItem(this.lsKey);
    if (savedState) {
      try {
        const restoredConf = JSON.parse(savedState) as GoldenLayout.Config;
        return restoredConf;
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error('cannot restore saved layout', {id: this.id, content: savedState});
        return defaultConfig;
      }
    } else {
      return defaultConfig;
    }
  }

  private writeConfig() {
    try {
      const conf = this.goldenLayout.toConfig(); // this fails when a popout is opened
      localStorage.setItem(this.lsKey, JSON.stringify(conf));
    } catch (e) {
      // when opening a popout, we get into race conditions for which
      // we do not have the means to solve here
      // solved a bit further down (1)
      if (e.message.indexOf('layout not yet initialised') !== -1) {
        return;

      // bug in goldenlayout
      } else if (e.message.indexOf('call stack size exceeded')) {
        return;

      } else {
        console.log('error saving config', e);
      }
    }
  }
}

const registerComponents = (instance: GoldenLayout) => {
  instance.registerComponent( 'vueComponent', ( container: Container, componentState: ComponentState ) => {
    const vueComponentName = componentState.vueName;
    const rootEl = container.getElement()[0];
    const mountEl = document.createElement('div');
    rootEl.appendChild(mountEl);

    const vueEl = components[vueComponentName];
    const vueElInstance = new vueEl({store});
    vueElInstance.$mount(mountEl);
  });
};
