import React, { Fragment } from 'react';
import cs from 'classnames';
import Window from './Window';
import * as allMenus from '../menus';

const Menu = ({ title, menu = [], onOpen, onFocus }) => {
  return (
    <Window active={true} title={title} menu={true} onFocus={onFocus}>
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
                      <span aria-label="Keyboard shortcut">
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
