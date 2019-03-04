import React, { useState } from 'react';
import Menu from './Menu';
import * as allMenus from '../menus';

const Menus = ({ windows, add, close, setActive, active, actionHandler }) => {
  const [attached, setAttached] = useState(windows.map(_ => _.id));
  return windows.map(({ id, zIndex }, i) => {
    const menu = allMenus[id];
    return (
      <Menu
        {...menu}
        attached={attached}
        zIndex={zIndex}
        index={i}
        onClose={close}
        key={`menu:${id}`}
        active={id === active.id}
        onFocus={() => {
          if (active.id !== id) setActive({ type: 'menu', id });
        }}
        onDrag={() => {
          if (id !== 'top') setAttached(attached.filter(_ => _ !== id));
        }}
        onOpen={id => {
          if (allMenus[id]) {
            // then open (or close) the menu
            // if the menu is already open, then close it
            if (attached.includes(id)) {
              close(id);
              setAttached(['top']);
              return;
            }
            attached.filter(id => id !== 'top').map(close);
            add({ type: 'menu', id });
            setAttached(['top', id]);
          } else {
            // run the menu action
            actionHandler(id);
          }
        }}
      />
    );
  });
};

export default Menus;
