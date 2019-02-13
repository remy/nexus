import React, { useState, useEffect, Fragment } from 'react';
import Entry from './components/Entry';
import WebView from './components/WebView';

const App = () => {
  const [renderUrl, setRenderUrl] = useState(
    'http://info.cern.ch/hypertext/WWW/TheProject.html'
  );

  const [webViews, setWebViews] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    setWebViews([...webViews, renderUrl]);
  }, [renderUrl]);

  useEffect(() => {
    setActive(webViews.length - 1);
  }, [webViews]);

  return (
    <Fragment>
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
        />
      ))}
    </Fragment>
  );
};

export default App;
