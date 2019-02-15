import React, { createRef } from 'react';
import Window from './Window';

const BrowserNav = ({ onAction, onClose, ...props }) => {
  const inputRef = createRef();
  const handleClick = () => {
    onAction(inputRef.current.value);
    onClose(props.id);
  };
  return (
    <Window {...props} title="Navigation" onClose={onClose}>
      <div id="browser-nav">
        <div className="content">
          <div className="first-block">
            <ul className="buttons-bar limited">
              <li><button>&lt; Back</button></li>
              <li><button>Back up</button></li>
              <li><button>Next &gt;</button></li>
            </ul>
          </div>
          <div className="second-block">
            <ul className="buttons-bar limited">
              <li><button>Home</button></li>
              <li><button>Help</button></li>
            </ul>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default BrowserNav;
