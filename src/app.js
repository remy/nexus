import React, { useState, useEffect, useReducer, createRef } from 'react';
import { HotKeys } from 'react-hotkeys';
import Loadable from 'react-loadable';
import WebView from './components/WebView';
import Menu from './components/Menu';
import * as allMenus from './menus';
import keyMap from './keyMap';
import OpenURL from './components/OpenUrl.js';
import { HOST } from './env';

function camelCase(s = '') {
  return s.replace(/\b./g, m => {
    if (m === '-') return '';
    return m.toUpperCase();
  });
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
  ]);

  const close = type => id => dispatch({ type: 'remove', data: { type, id } });

  const add = ({ id, type, ...props }) =>
    dispatch({ type: 'add', data: { type, id, props } });

  useEffect(() => {
    setActive(windows[windows.length - 1]);
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

    switch (action) {
      case 'panel':
        console.log('./components/' + camelCase(id));

        add({
          type: 'panel',
          id,
          Component: Loadable({
            loader: () =>
              import('./components/' + camelCase(id)).then(() => {
                console.log('IMPORTED!');
              }),
            render(loaded, props) {
              console.log('loaded');

              let Component = loaded.namedExport;
              return <Component {...props} />;
            },
            loading() {
              return <div>Loading...</div>;
            },
          }),
        });
        break;
      case 'url':
        add({ type: 'url', id: props.url });
        break;
      case 'close':
        if (props.all) {
          windows
            .filter(_ => _.type === 'url')
            .filter(_ => _.id !== active.id)
            .map(({ id }) => close('url')(id));
          break;
        }
        console.log('close active', active);

        close('url')(active.id);
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

  console.log(windows);

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      {windows
        .filter(({ type }) => type === 'menu')
        .map(({ id }, i) => {
          const menu = allMenus[id];
          return (
            <Menu
              index={i}
              _onFocus={() => setActive({ type: 'menu', id, ref })}
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
          console.log('adding panel', id);
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
