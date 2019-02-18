import React from 'react';

const Windows = ({ windows, add, actionHandler, setActive, active }) =>
  windows.map(({ Component, id, ...props }, index) => {
    return (
      <Component
        key={`panel:${id}`}
        id={id}
        index={index}
        add={add}
        actionHandler={actionHandler}
        close={close('panel')}
        {...props}
        active={active.id == id}
        onAction={url => add({ type: 'url', id: url })}
        onFocus={() => setActive({ type: 'panel', id })}
        onClose={close('panel')}
      />
    );
  });

export default Windows;
