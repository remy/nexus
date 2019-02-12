import React, { useState, useEffect, Fragment } from 'react';
import Entry from './components/Entry';
import WebView from './components/WebView';

const App = () => {
  const [renderUrl, setRenderUrl] = useState(
    'http://info.cern.ch/hypertext/WWW/TheProject.html'
  );

  const [webViews, setWebViews] = useState([]);

  useEffect(() => {
    console.log('adding ', renderUrl);
    setWebViews([...webViews, renderUrl]);
  }, [renderUrl]);

  console.log(webViews.length);
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
          onClose={() => {
            const excluding = webViews.filter((_, index) => i !== index);
            setWebViews(excluding);
          }}
          onNavigate={url => {
            setWebViews([...webViews, url]);
          }}
          url={url}
          key={url}
          index={i}
        />
      ))}
    </Fragment>
  );
};

export default App;
