import React, { createRef } from 'react';
import Window from './Window';

const InfoAbout = ({ ...props }) => {
  return (
    <Window {...props} title="Info">
      <div id="browser-info">
        <header>
          <p>
            <img src="/img/wwwicon.png" alt="" />
          </p>
          <div className="hgroup">
            <h3>HyperMedia Browser/Editor</h3>
            <p className="baseline">
              An excercise in global information availability
            </p>
          </div>
          <p className="release">
            Version 1.0
            <br />
            Alpha only
          </p>
          <address>by Tim Berners-Lee</address>
        </header>
        <hr />
        <div className="first-block">
          <p className="copyright">
            Copyright 1990, 91
            <span>Distribution restricted: ask for terms.</span>
            <span>TEST VERSION ONLY</span>
          </p>
          <dl>
            <div>
              <dt>HyperText:</dt>
              <dd>Text which is not constrained to be linear.</dd>
            </div>
            <div>
              <dt>HyperMedia:</dt>
              <dd>
                Information which is not constrained linear... or to be text.
              </dd>
            </div>
          </dl>
        </div>
        <div className="second-block">
          <div className="webview">
            <div className="r2l-content">
              <div className="l2r-content">
                <p>
                  This is the first version of the NextStep WorldWideWeb
                  application like the libWWW Library. Bug reports to
                  www-bug@info.cern.ch.
                  <br />
                  Check the list of know bugs in the web too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default InfoAbout;
