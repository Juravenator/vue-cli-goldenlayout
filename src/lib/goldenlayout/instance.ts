import { defaultLayout, ComponentState } from './layouts';
import { default as GoldenLayout, ItemConfigType, Container } from 'golden-layout';
import 'jquery';

import store from '../../store';

import components from '../../components';

const getLSKey = (id: string) => 'layout ' + id;

const initConfig = (id: string, layout: ItemConfigType[]) => {
  const lsKey = getLSKey(id);
  const defaultConfig = {
    content: layout,
  };
  const savedState = localStorage.getItem(lsKey);
  if (savedState) {
    try {
      const restoredConf = JSON.parse(savedState);
      return restoredConf;
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error('cannot restore saved layout', {id: lsKey, content: savedState});
      return defaultConfig;
    }
  } else {
  return defaultConfig;
  }
};

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

interface MakeLayoutConf {
  id: string;
  handle?: Element;
  layout?: ItemConfigType[];
}
export const makeLayout = ({id, layout = defaultLayout, handle = document.body}: MakeLayoutConf): GoldenLayout => {
  const config = initConfig(id, layout);

  const instance = new GoldenLayout(config, handle);

  instance.on('stateChanged', () => localStorage.setItem(getLSKey(id), JSON.stringify(instance.toConfig())));
  window.addEventListener('resize', () => instance.updateSize() );
  registerComponents(instance);
  instance.init();

  return instance;
};

export const resetLayout = (instance: GoldenLayout, layout: ItemConfigType[]) => {
  instance.root.contentItems.forEach(item => item.remove());
  layout.forEach(item => instance.root.addChild(item));
};
