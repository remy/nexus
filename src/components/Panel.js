import React from 'react';
import Draggable from 'react-draggable';
import classnames from 'classnames';

const Window = ({
  index,
  title,
  active = true,
  onClose,
  onFocus,
  children,
}) => {
  const style = {
    left: 16 * (index + 1) + 'px',
    top: 16 * (index + 1) + 'px',
    position: 'absolute',
    zIndex: active ? 100 : 1,
  };
  return (
    <Draggable handle=".title-bar">
      <div className="panel" style={style}>
        <div
          className={classnames(['title-bar', { active }])}
          onMouseDown={() => onFocus()}
        >
          <button className="icon-buttons">
            <img src="/img/full-window-button.png" alt="Full Window" />
          </button>
          <h2>{title}</h2>
          <button className="icon-buttons" onClick={onClose}>
            <img src="/img/close-window-button.png" alt="Close Window" />
          </button>
        </div>
        <div className="content">{children}</div>
      </div>
    </Draggable>
  );
};

export default Window;
