import React, { useState, Fragment } from 'react';
import cs from 'classnames';
import Window from './Window';
import * as allMenus from '../menus';

const Menu = ({ menu = [], attached, onOpen, onDrag, ...props }) => {
  const [showClose, setShowClose] = useState(false);

  const x = 130 * (attached - 1);

  return (
    <Window
      showClose={showClose}
      onDrag={() => {
        if (!showClose && props.id !== 'top') {
          setShowClose(true);
          onDrag();
        }
      }}
      active={true}
      menu={true}
      {...props}
    >
      <nav className="floating-menu">
        <ul>
          {menu.map(menu => {
            return (
              <li key={menu.id}>
                <button
                  className={cs({ next: allMenus[menu.id] })}
                  onClick={() => onOpen(menu.id)}
                >
                  {menu.title}
                  {menu.accelerator && (
                    <Fragment>
                      {' '}
                      <span
                        title={`ctrl+alt+${menu.accelerator}`}
                        aria-label="Keyboard shortcut"
                      >
                        {menu.accelerator}
                      </span>
                    </Fragment>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </Window>
  );
};

export default Menu;
