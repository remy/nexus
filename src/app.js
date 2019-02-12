import React, { useState, useEffect, Fragment } from 'react';
import Entry from './components/Entry';
import WebView from './components/WebView';

const App = () => {
  const [renderUrl, setRenderUrl] = useState(
    'http://info.cern.ch/hypertext/WWW/TheProject.html'
  );

  return (
    <Fragment>
      <Entry
        onKeyPress={e => {
          if (e.which === 13) setRenderUrl(e.target.value);
        }}
        defaultValue={renderUrl}
      />
      <WebView onNavigate={setRenderUrl} url={renderUrl} />
      <p>This is more text</p>
    </Fragment>
  );
};

export default App;
