import React, { Fragment } from 'react';
import Draggable from 'react-draggable';

const Menu = ({ title, menu = [], onOpen }) => {
  return (
    <Draggable handle=".floating-menu > h1">
      <div>
        <nav className="floating-menu">
          <h1>{title}</h1>
          <ul>
            {menu.map(menu => {
              return (
                <li key={menu.id}>
                  <button
                    className={menu.id && 'next'}
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
      </div>
    </Draggable>
  );
};

export default Menu;
