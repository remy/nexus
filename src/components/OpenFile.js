import React from 'react';
import Window from './Window';
import FilePicker from './FilePicker';

const SaveFile = ({ close, add, id, ...props }) => {
  const selectAndLoad = async selected => {
    add({
      id: 'file://WWW/' + selected,
      type: 'url',
    });
    close(id);
  };

  return (
    <Window {...props} id={id} title="" dialogue>
      <FilePicker
        title="Open"
        onCancel={() => close(id)}
        onSubmit={selectAndLoad}
      />
    </Window>
  );
};

export default SaveFile;
