import React, { useState, useEffect, useReducer, createRef } from 'react';
import { HotKeys } from 'react-hotkeys';
import Menus from './components/Menus';
import WebViews from './components/WebViews';
import Panels from './components/Panels';
import * as allMenus from './menus';
import keyMap from './keyMap';
import * as panels from './panels';
import * as actions from './actions';
import { PATH } from './env';
import { camelCase, titleCase } from './utils';

const layerOrder = new Map([['menu', 10000], ['url', 1], ['panel', 1000]]);

function nextLayerOrder(type) {
  const value = layerOrder.get(type);
  return layerOrder.set(type, value + 1).get(type);
}

function reducer(state, action) {
  const { data, type } = action;

  switch (type) {
    case 'remove':
      return state.filter(_ => {
        if (_.id === data.id && _.type === data.type) {
          return false;
        }
        return true;
      });
    case 'add':
      return [...state, { ...data, zIndex: nextLayerOrder(data.type) }];
    default:
      throw new Error('unknown action');
  }
}

const App = () => {
  const [windows, dispatch] = useReducer(reducer, [
    { type: 'menu', id: 'top', zIndex: nextLayerOrder('menu') },
    {
      type: 'url',
      id: `${PATH}/default.html`,
      zIndex: nextLayerOrder('url'),
      ref: createRef(),
    },
  ]);
  const [active, setActiveElement] = useState(windows[1]);
  const [activeWindow, setActiveWindow] = useState(windows[1]);

  const setActive = active => {
    setActiveElement(active);
    windows.forEach(window => {
      if (active.type === window.type && active.id === window.id) {
        window.zIndex = nextLayerOrder(active.type);
      }
    });
    if (active.type === 'url' && active.id !== activeWindow.id) {
      setActiveWindow(active);
      window.history.replaceState(null, '', '#' + active.id);
    }
  };

  const close = type => id => dispatch({ type: 'remove', data: { type, id } });

  const add = ({ id, type, ...props }) => {
    // check if we have the URL open already and insert set focus
    const match = type === 'url' ? id.replace(/#.*$/, '') : id;

    const found = windows.find(
      _ =>
        _.type === type &&
        _.id.replace(/#.*$/, '').toLowerCase() === match.toLowerCase()
    );
    if (found) {
      if (id.includes('#')) {
        const hash = id.replace(/^.*?#(.*$)/, '$1');
        found.ref.current.scrollTo(hash);
      }
      return setActive(found);
    }

    if (type === 'url') {
      const ref = createRef();
      props.ref = ref;
    }
    dispatch({ type: 'add', data: { type, id, ...props } });
  };

  useEffect(() => {
    const active = windows[windows.length - 1];
    setActive(active);
  }, [windows]);

  const actionHandler = id => {
    const info = Object.keys(allMenus).reduce((acc, curr) => {
      const find = allMenus[curr].menu.find(_ => _.id === id);
      if (find) {
        return find;
      }
      return acc;
    }, null);

    if (!info) {
      // play sound
      console.log('ne');
      return;
    }

    const { action, props = {} } = info;
    const idTitleCase = titleCase(id);
    const idCamelCase = camelCase(id);

    switch (action) {
      case 'panel':
        if (panels[idTitleCase]) {
          add({
            type: 'panel',
            id,
            Component: panels[idTitleCase],
          });
        } else {
          console.error(`unknown panel (${idTitleCase})`);
        }
        break;
      case 'method':
        if (actions[idCamelCase]) {
          actions[idCamelCase]({ active: activeWindow, add });
        }
        break;
      case 'url':
        add({ type: 'url', id: props.url });
        break;
      case 'close':
        if (props.all) {
          windows
            .filter(_ => _.type === 'url')
            .filter(_ => _.id !== activeWindow.id)
            .map(({ id }) => close('url')(id));
          break;
        }

        close('url')(activeWindow.id);
        break;
    }
  };

  const handlers = Object.keys(keyMap).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: () => actionHandler(curr),
    }),
    {}
  );

  const getProps = elementType => ({
    windows: windows.filter(({ type }) => type === elementType),
    add,
    close: close(elementType),
    setActive,
    active,
    activeWindow,
    actionHandler,
  });

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <Menus {...getProps('menu')} />
      <WebViews {...getProps('url')} />
      <Panels {...getProps('panel')} />
    </HotKeys>
  );
};

export default App;
