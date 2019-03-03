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
  zIndex,
  onDrag = () => {},
  onStop = () => {},
  menu = undefined,
  dialogue = false,
  dirty = false,
  showClose = null,
  className,
  children,
  x = null,
}) => {
  if (x === null) x = index * 64 + 255;

  if (menu) {
    // menus when being opened are only in two positions
    x = index === 0 ? 0 : 130;
  }

  const y = menu ? 0 : 16 * (index + 1);

  const style = {
    position: 'absolute',
    zIndex, //: active ? activeZIndex + 100 : zIndex,
  };

  if (showClose === null) {
    showClose = false;

    if (!menu && onClose) {
      showClose = true;
    }

    if (menu && id !== 'top') {
      showClose = true;
    }
  }

  const webView = !menu && !dialogue;

  const titleActive = webView ? active : true;

  return (
    <Draggable
      bounds={webView ? null : 'parent'}
      defaultPosition={{ x, y }}
      handle=".title-bar"
      onDrag={onDrag}
      onStop={onStop}
    >
      <div className={classnames(['panel', className, { menu }])} style={style}>
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
