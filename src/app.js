import React, { useState, useEffect, useReducer, Fragment } from 'react';
import WebView from './components/WebView';
import Menu from './components/Menu';
import * as allMenus from './menus';
import OpenURL from './components/OpenUrl.js';
const debug = require('debug')('app');

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
      throw new Error('no reducer action');
  }
}

const App = () => {
  const [active, setActive] = useState({});
  const [windows, dispatch] = useReducer(reducer, [
    { type: 'menu', id: 'document' },
    { type: 'url', id: `${process.env.HOST}/default.html` },
  ]);

  const close = type => id => {
    debug('before', windows.length);
    dispatch({ type: 'remove', data: { type, id } });
  };

  const add = ({ id, type, ...props }) => {
    dispatch({ type: 'add', data: { type, id, props } });
  };

  useEffect(() => {
    setActive(windows[windows.length - 1]);
  }, [windows]);

  return (
    <Fragment>
      {windows
        .filter(({ type }) => type === 'menu')
        .map(({ id }) => {
          const menu = allMenus[id];

          return (
            <Menu
              onFocus={() => setActive({ type: 'menu', id })}
              key={id}
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
          return (
            <WebView
              onFocus={() => setActive({ type: 'url', id })}
              onClose={close('url')}
              onNavigate={id => add({ type: 'url', id })}
              active={id === active.id}
              url={id}
              key={id}
              id={id}
              index={i}
              x={i * 64 + 255}
            />
          );
        })}
      {windows
        .filter(({ type }) => type === 'panel')
        .map(({ props: { Component }, id }) => {
          return (
            <Component
              key={id}
              id={id}
              onAction={url => {
                debug('adding', url);
                add({ type: 'url', id: url });
              }}
              onFocus={() => setActive({ type: 'panel', id })}
              title={allMenus.document.menu.find(_ => _.id === id).title}
              onClose={close('panel')}
            />
          );
        })}
    </Fragment>
  );
};

export default App;
