import { ItemConfigType } from 'golden-layout';
import components from '../../components';

export interface ComponentState {
  vueName: keyof typeof components;
}

export const layouts = {
  'layout A': [{
    type: 'row',
    content: [{
      title: 'Window A',
      type: 'component',
      componentName: 'vueComponent',
      componentState: { vueName: 'IAm' } as ComponentState,
    }, {
      type: 'column',
      content: [{
        title: 'Window B',
        type: 'component',
        componentName: 'vueComponent',
        componentState: { vueName: 'IAm' } as ComponentState,
      }, {
        title: 'Window C',
        type: 'component',
        componentName: 'vueComponent',
        componentState: { vueName: 'Edit' } as ComponentState,
      }],
    }],
  }] as ItemConfigType[],

  'layout B': [{
    type: 'row',
    content: [{
      title: 'Window A',
      type: 'component',
      componentName: 'vueComponent',
      componentState: { vueName: 'Edit' } as ComponentState,
    }, {
      title: 'Window B',
      type: 'component',
      componentName: 'vueComponent',
      componentState: { vueName: 'IAm' } as ComponentState,
    }, {
      title: 'Window C',
      type: 'component',
      componentName: 'vueComponent',
      componentState: { vueName: 'Edit' } as ComponentState,
    }],
  }] as ItemConfigType[],
};

export const defaultLayout = layouts['layout A'];
