import React from 'react';
import Window from './Window';
import { save, load } from '../filesystem';
import FilePicker from './FilePicker';

const NewFile = ({ close, add, id, ...props }) => {
  const onSubmit = async (selected = '') => {
    if (selected.trim()) {
      const template = await load('blank.html');
      save(selected, template);
      add({
        id: 'file://WWW/' + selected,
        type: 'url',
      });
    }
    close(id);
  };

  return (
    <Window {...props} id={id} title="" dialogue>
      <FilePicker
        title="Save"
        onCancel={() => onSubmit('')}
        onSubmit={onSubmit}
      />
    </Window>
  );
};

export default NewFile;
