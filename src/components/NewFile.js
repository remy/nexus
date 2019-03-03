import React from 'react';
import Window from './Window';
import { save, load } from '../filesystem';
import FilePicker from './FilePicker';

const NewFile = ({ close, add, id, ...props }) => {
  const saveAndLoad = async selected => {
    const template = await load('blank.html');
    save(selected, template);
    add({
      id: 'file://WWW/' + selected,
      type: 'url',
    });
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

export default NewFile;
