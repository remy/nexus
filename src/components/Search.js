import React, { createRef } from 'react';
import Window from './Window';

const BrowserNav = ({ onAction, isindex, close, ...props }) => {
  const inputRef = createRef();
  const onClick = e => {
    e.preventDefault();
    const keywords = encodeURIComponent(inputRef.current.value);
    const url = isindex.replace(/{\s*searchTerms\s*}/i, keywords);
    onAction(url);
    close(props.id);
  };
  return (
    <Window
      {...props}
      close={close}
      title="Index Search"
      x={window.innerWidth - 550}
      dialogue
    >
      <form id="open-url" className="search" onSubmit={onClick}>
        <div className="first-block">
          <p>
            <label htmlFor="search-ref">words:</label>
            <input type="text" ref={inputRef} id="search-ref" name="search" />
          </p>
        </div>
        <div className="second-block">
          <button className="enter-button">Search</button>
        </div>
      </form>
    </Window>
  );
};

export default BrowserNav;
