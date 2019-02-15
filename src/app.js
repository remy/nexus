import React, { useState, useEffect, useReducer, createRef } from 'react';
import { HotKeys } from 'react-hotkeys';
import WebView from './components/WebView';
import Menu from './components/Menu';
import * as allMenus from './menus';
import OpenURL from './components/OpenUrl.js';
import { HOST } from './env';
import InfoAbout from './components/InfoAbout.js';
import BrowserNav from './components/BrowserNav.js';
import StyleEditor from './components/StyleEditor.js';
import SaveFile from './components/SaveFile.js';

import keyMap from './keyMap';
import * as panels from './panels';
import * as actions from './actions';
import { PATH } from './env';
import { camelCase, titleCase } from './utils';

const keyMap = {};

function isUpper(letter) {
  return /[A-Z]/.test(letter);
}

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
<<<<<<< HEAD
    { type: 'url', id: `${HOST}/default.html` },
    { type: 'panel', id: 'info', props: {Component: InfoAbout}},
    { type: 'panel', id: 'browser-nav', props: {Component: BrowserNav}},
    { type: 'panel', id: 'style-editor', props: {Component: StyleEditor}},
    { type: 'panel', id: 'save-file', props: {Component: SaveFile}}
=======
    { type: 'url', id: `${PATH}/default.html`, props: { ref: createRef() } },
    // { type: 'url', id: `${PATH}/blank.html`, props: { ref: createRef() } },
>>>>>>> 5e8d41d834c8e01d84477f30c1dd431132cb5e0d
  ]);

  const close = type => id => dispatch({ type: 'remove', data: { type, id } });

  const add = ({ id, type, ...props }) => {
    if (type === 'url') {
      // check if we have the URL open already and insert set focus
      const match = id.replace(/#.*$/, '');
      const found = windows.find(_ => _.type === 'url' && _.id === match);
      if (found) {
        return setActive(found);
      }
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

    const { action, props = {} } = info;
    const idTitleCase = titleCase(id);
    const idCamelCase = camelCase(id);

    switch (action) {
      case 'panel':
        console.log(panels[idTitleCase]);
        if (panels[idTitleCase]) {
          add({
            type: 'panel',
            id,
            Component: panels[idTitleCase],
          });
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
              _onFocus={() => setActive({ type: 'menu', id })}
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
          return (
            <Component
              key={`panel:${id}`}
              id={id}
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
