import React from 'react';

const Panels = ({ windows, add, close, setActive, active, actionHandler }) =>
  windows.map(({ Component, id, ...props }, index) => {
    return (
      <Component
        {...{
          id,
          index,
          add,
          actionHandler,
          close,
        }}
        {...props}
        active={active.id == id}
        onAction={url => add({ type: 'url', id: url })}
        onFocus={() => {
          if (active.id !== id) setActive({ type: 'panel', id });
        }}
        onClose={close}
      />
    );
  });

export default Panels;
