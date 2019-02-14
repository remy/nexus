import React, { createRef } from 'react';
import Window from './Window';

const OpenURL = ({ onAction, onClose, ...props }) => {
  const inputRef = createRef();
  const handleClick = () => {
    onAction(inputRef.current.value);
    onClose(props.id);
    // onClose(props.id);
  };
  return (
    <Window {...props} title="Open using hypertext reference" onClose={onClose}>
      <div id="open-url">
        <div className="first-block">
          <p>
            <label htmlFor="addr-reference">Reference:</label>
            <input
              type="text"
              ref={inputRef}
              id="addr-reference"
              name="reference"
            />
          </p>
        </div>
        <div className="second-block">
          <fieldset>
            <legend>
              <span>Diagnostics only</span>
            </legend>
            <div className="content">
              <ul className="buttons-bar vertical">
                <li>
                  <button>Open showing source</button>
                </li>
              </ul>
            </div>
          </fieldset>
          <button onClick={handleClick} className="enter-button">
            <strong>Open</strong>
          </button>
        </div>
      </div>
    </Window>
  );
};

export default OpenURL;
