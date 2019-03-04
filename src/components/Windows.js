import React from 'react';

const Windows = ({ windows, add, actionHandler, setActive, active }) =>
  windows.map(({ Component, id, ...props }, index) => {
    return (
      <Component
        {...props}
        {...{ id, index, add, actionHandler }}
        active={active.id == id}
        onAction={url => add({ type: 'url', id: url })}
        key={`panel:${id}`}
        close={close('panel')}
        onFocus={() => setActive({ type: 'panel', id })}
        onClose={close('panel')}
      />
    );
  });

export default Windows;
