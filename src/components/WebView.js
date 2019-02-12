import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import classnames from 'classnames';

import './WebView.scss';

const HOST = process.env.HOST;
const API = process.env.API;

const WebView = ({ url, active = true, onNavigate }) => {
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

  return (
    <Draggable handle=".controls h2" defaultPosition={{ x: 0, y: 0 }}>
      <div className={classnames(['WebView', { active }])}>
        <div className="title controls">
          <button>
            <img src="/assets/img/full-window-button.png" />
          </button>
          <h2>{title}</h2>
          <button>
            <img src="/assets/img/expand-window-button.png" />
          </button>
        </div>
        <div
          className="content"
          contentEditable={true}
          dangerouslySetInnerHTML={{ __html: body }}
          spellCheck={false}
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
