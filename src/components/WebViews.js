import React from 'react';
import WebView from './WebView';

const WebViews = ({ windows, add, close, setActive, activeWindow, active }) =>
  windows.map(({ id, ref, referrer, zIndex }, i) => {
    return (
      <WebView
        referrer={referrer}
        zIndex={zIndex}
        ref={ref}
        onFocus={() => {
          if (active.id !== id) setActive({ type: 'url', id, ref });
        }}
        onClose={close}
        onNavigate={id => add({ type: 'url', id, referrer: ref })}
        active={id === active.id}
        url={id}
        key={`url:${id}`}
        id={id}
        index={i}
      />
    );
  });

export default WebViews;
