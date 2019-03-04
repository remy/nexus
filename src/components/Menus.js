import React, { useState } from 'react';
import Menu from './Menu';
import * as allMenus from '../menus';

const Menus = ({ windows, add, close, setActive, active, actionHandler }) => {
  const [attached, setAttached] = useState(windows.map(_ => _.id));
  return windows.map(({ id, zIndex }, i) => {
    const menu = allMenus[id];
    return (
      <Menu
        attached={attached}
        zIndex={zIndex}
        index={i}
        key={`menu:${id}`}
        active={id === active.id}
        onFocus={() => {
          if (active.id !== id) setActive({ type: 'menu', id });
        }}
        onDrag={() => {
          if (id !== 'top') setAttached(attached.filter(_ => _ !== id));
        }}
        {...menu}
        onClose={id => {
          close(id);
          setAttached(attached.filter(_ => _ !== id));
        }}
        onOpen={id => {
          if (allMenus[id]) {
            /*
            logic via JFG
            > Also a cosmetic issue: when a detachable menu is already open,
            > clicking another one opens it further to the right; it should replace
            > the previous one instead. Or if the first one has been detached, then
            > the new one should open normally.
            */
            attached.filter(id => id !== 'top').map(close);
            add({ type: 'menu', id });
            setAttached(['top', id]);
          } else {
            actionHandler(id);
          }
        }}
      />
    );
  });
};

export default Menus;
