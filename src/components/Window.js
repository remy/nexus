import React from 'react';
import Draggable from 'react-draggable';
import classnames from 'classnames';

const CloseButton = ({ onClick, dirty }) => (
  <button className="icon-buttons" onClick={onClick}>
    {dirty ? (
      <img src="img/expand-window-button.png" alt="Save & Close Window" />
    ) : (
      <img src="img/close-window-button.png" alt="Close Window" />
    )}
  </button>
);

const Window = ({
  id,
  index,
  title,
  active,
  onClose,
  onFocus,
  menu = undefined,
  dialogue = false,
  dirty = false,
  children,
}) => {
  const x = menu ? 130 * index : index * 64 + 255;
  const y = menu ? 0 : 16 * (index + 1);

  const style = {
    left: x + 'px',
    top: y + 'px',
    position: 'absolute',
    zIndex: active ? 100 : 1,
  };

  let showClose = false;

  if (!menu && onClose) {
    showClose = true;
  }

  if (menu && id !== 'top') {
    showClose = true;
  }

  const webView = !menu && !dialogue;

  const titleActive = webView ? active : true;

  return (
    <Draggable handle=".title-bar">
      <div className={classnames(['panel', { menu }])} style={style}>
        <div
          onMouseDown={onFocus}
          className={classnames(['title-bar', { active: titleActive }])}
        >
          {!menu && !dialogue && (
            <button className="icon-buttons">
              <img src="img/full-window-button.png" alt="Full Window" />
            </button>
          )}
          <h2>{title}</h2>
          {showClose && (
            <CloseButton onClick={() => onClose(id)} dirty={dirty} />
          )}
        </div>
        <div onMouseDown={onFocus} className="content">
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;
