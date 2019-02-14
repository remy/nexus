import React, { Fragment } from 'react';

const InfoAbout = () => (
  <Fragment>
    <header>
      <p>
        <img src="img/wwwicon.png" alt="" />
      </p>
      <div class="hgroup">
        <h3>HyperMedia Browser/Editor</h3>
        <p class="baseline">An excercise in global information availability</p>
      </div>
      <p class="release">
        Version 1.0
        <br />
        Alpha only
      </p>
      <address>by Tim Berners-Lee</address>
    </header>
    <hr />
    <div class="first-block">
      <p class="copyright">
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
          <dd>Information which is not constrained linear... or to be text.</dd>
        </div>
      </dl>
    </div>
    <div class="second-block">
      <div class="webview">
        <div class="r2l-content">
          <div class="l2r-content">
            <p>
              This is the first version of the NextStep WorldWideWeb application
              like the libWWW Library. Bug reports to www-bug@info.cern.ch.
              <br />
              Check the list of know bugs in the web too.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

export default InfoAbout;
