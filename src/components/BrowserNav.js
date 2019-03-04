import React from 'react';
import Window from './Window';
import { NavigateHelp } from '../panels';

const BrowserNav = ({ actionHandler, add, ...props }) => {
  return (
    <Window {...props} title="Navigation" dialogue>
      <div id="browser-nav">
        <div className="content">
          <div className="first-block">
            <ul className="buttons-bar limited">
              <li>
                <button onClick={() => actionHandler('previous')}>
                  &lt; Back
                </button>
              </li>
              <li>
                <button onClick={() => actionHandler('back')}>Back up</button>
              </li>
              <li>
                <button onClick={() => actionHandler('next')}>Next &gt;</button>
              </li>
            </ul>
          </div>
          <div className="second-block">
            <ul className="buttons-bar limited">
              <li>
                <button>Home</button>
              </li>
              <li>
                <button
                  onClick={() =>
                    add({
                      type: 'panel',
                      id: 'navigate-help',
                      Component: NavigateHelp,
                    })
                  }
                >
                  Help
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default BrowserNav;
