import React from 'react';
import Window from './Window';
import { save, load } from '../filesystem';
import FilePicker from './FilePicker';

const NewFile = ({ close, add, id, resolve, ...props }) => {
  const onSubmit = async (selected = '') => {
    if (selected.trim()) {
      const template = await load('blank.html');
      if (!selected.includes('.')) {
        selected = selected + '.html';
      }
      save(selected, template);
      add({
        id: 'file://WWW/' + selected,
        type: 'url',
      });
    }
    if (resolve) {
      resolve('file://WWW/' + selected);
    }
    close(id);
  };

  return (
    <Window {...props} id={id} title="" dialogue>
      <FilePicker
        title="Save"
        defaultValue=""
        onCancel={() => onSubmit('')}
        onSubmit={onSubmit}
      />
    </Window>
  );
};

export default NewFile;
