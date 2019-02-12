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
    const json = await res.json();
    if (res.status === 200) {
      setTitle(json.title);
      setBody(json.body);
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
      <div className="WebView" style={style}>
        <div className={classnames(['title controls', { active }])}>
          <button>
            <img src="/assets/img/full-window-button.png" />
          </button>
          <h2>{title}</h2>
          <button onClick={onClose}>
            <img src="/assets/img/expand-window-button.png" />
          </button>
        </div>
        <div
          className="content"
          contentEditable={true}
          dangerouslySetInnerHTML={{ __html: body }}
          spellCheck={false}
          onClick={e => e.preventDefault()}
          onDoubleClick={e => {
            e.preventDefault();
            if (e.target.nodeName === 'A') {
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
    </Draggable>
  );
};

export default WebView;
