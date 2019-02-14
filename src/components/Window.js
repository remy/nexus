import React from 'react';
import Draggable from 'react-draggable';
import classnames from 'classnames';

const Window = ({
  id,
  index,
  title,
  active = true,
  onClose,
  onFocus,
  menu = undefined,
  dirty = false,
  children,
  x,
  y,
}) => {
  const style = {
    left: (x || 16 * (index + 1)) + 'px',
    top: (y || 16 * (index + 1)) + 'px',
    position: 'absolute',
    zIndex: active ? 100 : 1,
  };
  return (
    <Draggable handle=".title-bar">
      <div className={classnames(['panel', { menu }])} style={style}>
        <div
          className={classnames(['title-bar', { active }])}
          onMouseDown={() => onFocus()}
        >
          {!menu && (
            <button className="icon-buttons">
              <img src="/img/full-window-button.png" alt="Full Window" />
            </button>
          )}
          <h2>{title}</h2>
          {onClose && (
            <button className="icon-buttons" onClick={() => onClose(id)}>
              {dirty ? (
                <img
                  src="/img/expand-window-button.png"
                  alt="Save & Close Window"
                />
              ) : (
                <img src="/img/close-window-button.png" alt="Close Window" />
              )}
            </button>
          )}
        </div>
        <div className="content">{children}</div>
      </div>
    </Draggable>
  );
};

export default Window;
