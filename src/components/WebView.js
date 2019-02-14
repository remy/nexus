import React, { createRef, useEffect, useState } from 'react';
import Window from './Window';
import { HOST, API } from '../env';
import './WebView.scss';

const WebView = ({ url, onNavigate, onFocus, ...props }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [dirty, setDirty] = useState(false);

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

  const contentRef = createRef();

  useEffect(() => {
    if (url) {
      load(url);
    }
  }, [url]);

  useEffect(() => {
    const parent = contentRef.current;
    // insert <br> elements in root level text nodes
    if (parent)
      Array.from(parent.childNodes)
        .filter(_ => _.nodeName === '#text')
        .forEach(node => {
          const span = document.createElement('span');
          span.className = 'hash-text';
          parent.replaceChild(span, node);
          span.innerHTML = node.nodeValue.replace(/\n\n/g, '<br><br>');
        });
  }, [body]);

  if (!url) {
    return <Window title={title} {...props} />;
  }

  return (
    <Window title={title} onFocus={onFocus} dirty={dirty} {...props}>
      <div className="webview">
        <div className="r2l-content">
          <div
            onInput={() => !dirty && setDirty(true)}
            ref={contentRef}
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
                console.log(navigateTo, e.target.origin, HOST);
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
    </Window>
  );
};

export default WebView;
