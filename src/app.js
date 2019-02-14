import React, { useState, useEffect, useReducer, createRef } from 'react';
import { HotKeys } from 'react-hotkeys';
import WebView from './components/WebView';
import Menu from './components/Menu';
import * as allMenus from './menus';
import keyMap from './keyMap';
import OpenURL from './components/OpenUrl.js';
import { HOST } from './env';

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
  const [windows, dispatch] = useReducer(reducer, [
    { type: 'menu', id: 'top' },
    { type: 'url', id: `${HOST}/default.html` },
    { type: 'url', id: `https://suda.co.uk` },
  ]);

  const close = type => id => dispatch({ type: 'remove', data: { type, id } });

  const add = ({ id, type, ...props }) =>
    dispatch({ type: 'add', data: { type, id, props } });

  useEffect(() => {
    setActive(windows[windows.length - 1]);
  }, [windows]);

  const menuHandler = id => {
    console.log('handle %s', id);
  };

  const handlers = Object.keys(keyMap).reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: () => menuHandler(curr),
    }),
    {}
  );

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      {windows
        .filter(({ type }) => type === 'menu')
        .map(({ id }, i) => {
          const menu = allMenus[id];

          const ref = createRef();

          return (
            <Menu
              index={i}
              onFocus={() => setActive({ type: 'menu', id, ref })}
              key={`menu:${id}`}
              {...menu}
              onClose={close('menu')}
              onOpen={id => {
                if (allMenus[id]) {
                  add({ type: 'menu', id });
                } else {
                  if (id === 'open-url') {
                    // FIXME lazy import please
                    add({ type: 'panel', id, Component: OpenURL });
                  }
                }
              }}
            />
          );
        })}
      {windows
        .filter(({ type }) => type === 'url')
        .map(({ id }, i) => {
          const ref = createRef();
          return (
            <WebView
              onFocus={() => setActive({ type: 'url', id, ref })}
              onClose={close('url')}
              onNavigate={id => {
                add({ type: 'url', id });
              }}
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
        .map(({ props: { Component }, id }) => {
          const ref = createRef();
          return (
            <Component
              key={`panel:${id}`}
              id={id}
              onAction={url => add({ type: 'url', id: url })}
              onFocus={() => setActive({ type: 'panel', id, ref })}
              onClose={close('panel')}
            />
          );
        })}
    </HotKeys>
  );
};

export default App;
