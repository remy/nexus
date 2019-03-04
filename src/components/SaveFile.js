import React from 'react';
import Window from './Window';
import { save } from '../filesystem';
import FilePicker from './FilePicker';

const SaveFile = ({ close, id, body, ref, ...props }) => {
  const saveAndLoad = async selected => {
    const filename = selected.includes('.') ? selected : selected + '.html';
    save(filename, body);
    if (ref) {
      ref.current.setFilename('file://WWW/' + filename);
    }
    close(id);
  };

  return (
    <Window {...props} id={id} title="" dialogue>
      <FilePicker
        title="Save"
        onCancel={() => close(id)}
        onSubmit={saveAndLoad}
      />
    </Window>
  );
};

export default SaveFile;
