import React, { useState, useEffect, useReducer, createRef } from 'react';
import { HotKeys } from 'react-hotkeys';
import WebView from './components/WebView';
import Menu from './components/Menu';
import * as allMenus from './menus';
import keyMap from './keyMap';
import * as panels from './panels';
import * as actions from './actions';
import { PATH } from './env';
import { camelCase, titleCase, isUpper } from './utils';

function addKeyMap(menu) {
  Object.entries(menu).map(([, { menu, accelerator, id: menuId }]) => {
    if (accelerator) {
      if (isUpper(accelerator)) {
        keyMap[menuId] = `ctrl+alt+shift+${accelerator.toLowerCase()}`;
      } else {
        keyMap[menuId] = `ctrl+alt+${accelerator}`;
      }
    }

    if (menu) {
      addKeyMap(menu);
    }
  });
}

addKeyMap(allMenus);

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
      return [...state, data];
    default:
      throw new Error('unknown action');
  }
}

const App = () => {
  const [active, setActive] = useState({});
  const [activeWindow, setActiveWindow] = useState({});
  const [windows, dispatch] = useReducer(reducer, [
    { type: 'menu', id: 'top' },
    { type: 'url', id: `${PATH}/default.html`, props: { ref: createRef() } },
    // { type: 'panel', id: 'open-url', props: { Component: panels.OpenUrl } },
  ]);

  const close = type => id => dispatch({ type: 'remove', data: { type, id } });

  const add = ({ id, type, ...props }) => {
    id = id.toLowerCase();
    // check if we have the URL open already and insert set focus
    const match = type === 'url' ? id.replace(/#.*$/, '') : id;
    const found = windows.find(_ => _.type === type && _.id === match);
    if (found) {
      return setActive(found);
    }

    if (type === 'url') {
      const ref = createRef();
      props.ref = ref;
    }
    dispatch({ type: 'add', data: { type, id, props } });
  };

  useEffect(() => {
    setActive(windows[windows.length - 1]);
  }, [windows]);

  useEffect(() => {
    if (active.type === 'url') {
      setActiveWindow(active);
    }
  }, [active]);

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

    console.log(info);

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

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      {windows
        .filter(({ type }) => type === 'menu')
        .map(({ id }, i) => {
          const menu = allMenus[id];
          return (
            <Menu
              index={i}
              key={`menu:${id}`}
              {...menu}
              onClose={close('menu')}
              onOpen={id => {
                if (allMenus[id]) {
                  add({ type: 'menu', id });
                } else {
                  actionHandler(id);
                }
              }}
            />
          );
        })}
      {windows
        .filter(({ type }) => type === 'url')
        .map(({ id, props: { ref } }, i) => {
          return (
            <WebView
              ref={ref}
              onFocus={() => setActive({ type: 'url', id, ref })}
              onClose={close('url')}
              onNavigate={id => add({ type: 'url', id })}
              active={id === active.id}
              url={id}
              key={`url:${id}`}
              id={id}
              index={i}
            />
          );
        })}
      {windows
        .filter(({ type }) => type === 'panel')
        .map(({ props: { Component, ...props }, id }, index) => {
          return (
            <Component
              key={`panel:${id}`}
              id={id}
              index={index}
              add={add}
              close={close('panel')}
              {...props}
              active={active.id == id}
              onAction={url => add({ type: 'url', id: url })}
              onFocus={() => setActive({ type: 'panel', id })}
              onClose={close('panel')}
            />
          );
        })}
    </HotKeys>
  );
};

export default App;
