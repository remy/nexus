import React from 'react';
import Window from './Window';
import { LinkHelp } from '../panels';

const NewDocHelp = ({ add, ...props }) => {
  return (
    <Window {...props} title="Making a new Document" dialogue>
      <div className="help-dialogue">
        <p>
          You can just create a new hypertext document with Command/n, but it's
          better to make a reference to it and link that reference to it as you
          make it, using Command/N. This ensures that you can always find the
          document again.
        </p>

        <p>
          Go to your personal notebook, for instance, and add some text
          describing the new thing you are going to create. Then select that
          text and use "Link to New" . Later on, you can add and delete links so
          that your new node is linked to other things to which it is relevant.
        </p>

        <p>
          &nbsp;&nbsp;See also:{' '}
          <button
            onClick={() =>
              add({
                type: 'panel',
                id: 'link-help',
                Component: LinkHelp,
              })
            }
          >
            Making links
          </button>
        </p>
      </div>
    </Window>
  );
};

export default NewDocHelp;
