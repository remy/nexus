import React from 'react';
import Window from './Window';
import { NewDocHelp } from '../panels';

export default ({ add, ...props }) => {
  return (
    <Window {...props} title="Makings links" dialogue>
      <div className="help-dialogue">
        <p>
          If you want to link one peice of text to another, whether they are in
          the same hypertext document or not, you follow the same procedure.
        </p>

        <p>
          First, mark the thing which the link will lead to. You can mark a
          whole document with "Mark All", or you can mark just a selection with
          "Mark Selection".
        </p>

        <p>
          Once you have marked something, you can select another area and use
          "Link to marked". You can link many things to the same marked area
          without having to mark it again. It stays marked until you mark
          something else.
        </p>

        <p>
          From then on, whenever you double click on the linked text, you will
          jump across the link.
        </p>

        <p>
          &nbsp;&nbsp;See also:{' '}
          <button
            onClick={() => {
              add({
                type: 'panel',
                id: 'new-doc-help',
                Component: NewDocHelp,
              });
            }}
          >
            Making a new document
          </button>
        </p>
      </div>
    </Window>
  );
};
