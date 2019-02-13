import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import classnames from 'classnames';

import './WebView.scss';

const HOST = process.env.HOST;
const API = process.env.API;

const WebView = ({ url, active = true, index, onNavigate, onClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const load = async url => {
    const res = await fetch(API, {
      mode: 'cors',
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    console.log(res.status);
    const json = await res.json();
    if (json.title) {
      setTitle(json.title);
      setBody(json.body);
    } else {
      // it went wrong…
    }
  };

  useEffect(() => {
    if (url) {
      load(url);
    }
  }, [url]);

  if (!url) {
    return <p>Not sure what's rendered…</p>;
  }

  const style = {
    left: 16 * (index + 1) + 'px',
    top: 16 * (index + 1) + 'px',
    position: 'absolute',
  };

  return (
    <Draggable handle=".controls h2">
      <div className="webview" style={style}>
        <div className={classnames(['controls', { active }])}>
          <button className="icon-buttons">
            <img src="/img/full-window-button.png" alt="Full Window" />
          </button>
          <h2>{title}</h2>
          <button className="icon-buttons" onClick={onClose}>
            <img src="/img/close-window-button.png" alt="Expand" />
          </button>
        </div>
        <div className="r2l-content">
          <div
            className="l2r-content content"
            contentEditable={true}
            dangerouslySetInnerHTML={{ __html: body }}
            spellCheck={false}
            onClick={e => e.preventDefault()}
            onDoubleClick={e => {
              e.preventDefault();
              if (e.target.nodeName === 'A' && e.target.href) {
                let navigateTo = e.target.href;

                console.log(url, e.target.pathname);

                // if we're a relative url, then rebase since we're hosting the html
                if (e.target.origin === HOST) {
                  navigateTo = new URL(
                    e.target.getAttribute('href'),
                    url
                  ).toString();
                }
                onNavigate(navigateTo);
              }
            }}
          />
        </div>
      </div>
    </Draggable>
  );
};

export default WebView;
