import React from 'react';
import Window from './Window';
import { getLink } from '../utils';

const InfoAbout = ({ add, ...props }) => {
  return (
    <Window {...props} title="Info">
      <div id="browser-info">
        <header>
          <p>
            <img src="img/wwwicon.png" alt="WorldWideWeb" />
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
            Copyright 1990, 91, CERN.&nbsp;&nbsp;&nbsp;
            <span>Distribution restricted: ask for terms.</span>
            <span>TEST VERSION ONLY</span>
          </p>
          <dl>
            <div>
              <dt>HyperText:</dt>
              <dd>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Text which is not constrained to
                be linear.
              </dd>
            </div>
            <div>
              <dt>HyperMedia:</dt>
              <dd>
                &nbsp;&nbsp;Information which is not constrained linear... or to
                be text.
              </dd>
            </div>
          </dl>
        </div>
        <div className="second-block">
          <div className="webview">
            <div className="r2l-content">
              <div className="l2r-content content compact">
                <p>
                  This is the first version of the NextStep WorldWideWeb
                  application with the libWWW library. Bug reports to
                  www-bug@info.cern.ch.
                  <br />
                  Check the list of known bugs in the web too.
                </p>
                <p>
                  This was the original prototype for the World-Wide Web. Many
                  browers for other platforms now exist. Read the web for
                  details.
                </p>
                <p>
                  You should configure the newsreader code in this application
                  to klnow where your local news (NNTP) srever is. Type in a
                  terminal window
                </p>
                <p>&nbsp;&nbsp;&nbsp;dwrite WorldWideWeb NewsHost xxxx</p>
                <p>
                  where xxxx is replaced by the intrenet name of your news
                  server.
                </p>
                <p>
                  For more help, use "Help" from the menu. If that doesn't work,
                  then your application has been incompletely installed.
                </p>
                <p>
                  If you have any comments or have bugs, please mail
                  www-bug@info.cern.ch. quoting the version number (above).
                </p>
                <br />
                <hr />
                <p>
                  Brought back to life, warts and all, by a team of 9 over a
                  week of hacking in a room at CERN during 18 Feb 2019.
                </p>
                <p>That team was, in no particular order:</p>
                <ul
                  onClick={e => {
                    e.preventDefault();
                  }}
                  onDoubleClick={e => {
                    const link = getLink(e.target);
                    if (link) {
                      e.preventDefault();
                      let navigateTo = link.href;

                      add({ id: navigateTo, type: 'url' });
                    }
                  }}
                >
                  <li>
                    <a href="http://johnfallsopp.com/">John Allsop</a>{' '}
                    (Australia)
                  </li>
                  <li>
                    <a href="https://www.kimberlyblessing.com/">
                      Kimberly Blessing
                    </a>{' '}
                    (USA)
                  </li>
                  <li>
                    <a href="http://www.markboulton.co.uk/">Mark Boulton</a>{' '}
                    (U.K.)
                  </li>
                  <li>
                    <a href="http://geek.co.ke/about/">Martin Chiteri</a>{' '}
                    (Canada / Kenya)
                  </li>
                  <li>
                    <a href="https://adactio.com">Jeremy Keith</a> (U.K. /
                    Ireland)
                  </li>
                  <li>
                    <a href="https://craigmod.com">Craig Mod</a> (Japan / USA)
                  </li>
                  <li>
                    <a href="https://gericci.me">Angela Ricci</a> (France /
                    Brazil)
                  </li>
                  <li>
                    <a href="https://remysharp.com">Remy Sharp</a> (U.K)
                  </li>
                  <li>
                    <a href="https://twitter.com/briansuda?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                      Brian Suda
                    </a>{' '}
                    (Iceland / USA)
                  </li>
                </ul>
                <p />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default InfoAbout;
