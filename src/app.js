import React, { useState, useEffect, Fragment } from 'react';
import Entry from './components/Entry';
import WebView from './components/WebView';
import Menu from './components/Menu';
import * as allMenus from './menus';

const App = () => {
  const [renderUrl, setRenderUrl] = useState(
    'http://info.cern.ch/hypertext/WWW/TheProject.html'
  );

  const [webViews, setWebViews] = useState([]);
  const [menus, setMenus] = useState(['top']);
  const [active, setActive] = useState(null);

  useEffect(() => {
    setWebViews([...webViews, renderUrl]);
  }, [renderUrl]);

  useEffect(() => {
    setActive(webViews.length - 1);
  }, [webViews]);

  return (
    <Fragment>
      {menus.map(id => {
        const menu = allMenus[id];
        console.log(menu, id);
        return (
          <Menu
            key={id}
            {...menu}
            onOpen={id => {
              setMenus([...menus, id]);
            }}
          />
        );
      })}
      <Entry
        onKeyPress={e => {
          if (e.which === 13) setRenderUrl(e.target.value);
        }}
        defaultValue={renderUrl}
      />
      {webViews.map((url, i) => (
        <WebView
          onFocus={() => {
            setActive(i);
          }}
          onClose={() => {
            const excluding = webViews.filter((_, index) => i !== index);
            setWebViews(excluding);
          }}
          onNavigate={url => {
            setWebViews([...webViews, url]);
          }}
          active={i === active}
          url={url}
          key={url}
          index={i}
          x={i * 64 + 255}
        />
      ))}
    </Fragment>
  );
};

export default App;
