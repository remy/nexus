import React, { useEffect, useReducer, createRef } from 'react';
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

const layerOrder = new Map([['menu', 10000], ['default', 1]]);

const initialState = [
  { type: 'menu', id: 'top', zIndex: nextLayerOrder('menu') },
  {
    type: 'url',
    id: `${PATH}/default.html`,
    zIndex: nextLayerOrder('url'),
    ref: createRef(),
  },
];

if (window.location.hash.includes('http')) {
  initialState[initialState.length - 1].id = window.location.hash.substring(1);
}

function nextLayerOrder(type) {
  type = type === 'menu' ? 'menu' : 'default';
  const value = layerOrder.get(type);
  return layerOrder.set(type, value + 1).get(type);
}

function reducer(state, action) {
  const { data, type } = action;

  switch (type) {
    case 'remove':
      return {
        ...state,
        windows: state.windows.filter(_ => {
          if (_.id === data.id && _.type === data.type) {
            return false;
          }
          return true;
        }),
      };
    case 'add':
      return {
        ...state,
        windows: [
          ...state.windows,
          {
            ...data,
            zIndex: nextLayerOrder(data.type),
          },
        ],
      };
    case 'setActive': {
      return { ...state, active: data };
    }
    case 'setActiveWindow': {
      return { ...state, activeWindow: data };
    }
    default:
      throw new Error('unknown action');
  }
}

const App = () => {
  // note: I think, these three hooks are causing me 3 renders per change
  // which is partly my fault as a change to the window state always has a
  // change to the active element
  const [state, dispatch] = useReducer(reducer, {
    windows: initialState,
    active: initialState[1],
    activeWindow: initialState[1],
  });

  const { windows, active, activeWindow } = state;

  const setActiveElement = data => {
    dispatch({ type: 'setActive', data });
  };

  const setActiveWindow = data => {
    dispatch({ type: 'setActiveWindow', data });
  };

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
    let idCamelCase = camelCase(id);

    if (idCamelCase.includes(':')) {
      idCamelCase = idCamelCase.replace(/:.*$/, '');
    }

    let res = null;

    switch (action) {
      case 'panel':
        if (panels[idTitleCase]) {
          res = add({
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
          res = actions[idCamelCase]({
            active: activeWindow,
            add,
            close,
            windows,
            options: info.options,
          });
        }
        break;
      case 'url':
        res = add({ type: 'url', id: props.url });
        break;
      case 'close':
        if (props.all) {
          windows
            .filter(_ => _.type === 'url')
            .filter(_ => _.id !== activeWindow.id)
            .map(({ id }) => close('url')(id));
          break;
        }

        res = close('url')(activeWindow.id);
        break;
    }

    return res;
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
    active, // this property is costing me additional render calls :-\
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
