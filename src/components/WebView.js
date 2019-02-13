import React, { useEffect, useState } from 'react';
import Panel from './Panel';

import './WebView.scss';

const HOST = process.env.HOST;
const API = process.env.API;

const WebView = ({ index, url, active, onClose, onNavigate, onFocus }) => {
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
    return (
      <Panel
        title={title}
        active={active}
        onClose={onClose}
        onFocus={onFocus}
      />
    );
  }

  return (
    <Panel
      title={title}
      index={index}
      active={active}
      onClose={onClose}
      onFocus={onFocus}
    >
      <div className="webview">
        <div className="r2l-content">
          <div
            className="l2r-content content"
            contentEditable={true}
            dangerouslySetInnerHTML={{ __html: body }}
            spellCheck={false}
            onMouseDown={() => onFocus()}
            onClick={e => e.preventDefault()}
            onDoubleClick={e => {
              e.preventDefault();
              if (e.target.nodeName === 'A' && e.target.href) {
                let navigateTo = e.target.href;

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
    </Panel>
  );
};

export default WebView;
