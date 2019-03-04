import React from 'react';
import Window from './Window';

export default ({ ...props }) => {
  return (
    <Window {...props} title="Using the navigation Commands" dialogue>
      <div className="help-dialogue">
        <p>
          The navigation buttons allow you to navigate through the Hypertext web
          as a tree. The "Backup" button takes you back the way you came, to the
          text which you selected to get to where you are. You can use it
          repeatedly to retrace your steps back to the first link you followed.
        </p>
        <p>
          Using the "Next" button is like using "BackUp" and then selecting the
          next refernece after the one you took. For example, if you selected
          one of a list of references, then using "Next" will take you to the
          next of those.
        </p>
        <p>
          The "Previous" button works in a similar way to "Next", but goes to
          the previous reference.
        </p>
        <p>
          The "Home" button reselects the original page which you get when you
          started the browser in the first place.
        </p>
      </div>
    </Window>
  );
};
