import React from 'react';
import Window from './Window';
import { LinkHelp } from '../panels';

const BrowserNav = ({ add, ...props }) => {
  return (
    <Window {...props} title="Navigation" dialogue>
      <div id="browser-nav">
        <div className="content">
          <div className="first-block">
            <ul className="buttons-bar limited">
              <li>
                <button>&lt; Back</button>
              </li>
              <li>
                <button>Back up</button>
              </li>
              <li>
                <button>Next &gt;</button>
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
                      id: 'link-help',
                      Component: LinkHelp,
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
