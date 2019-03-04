import React from 'react';
import Window from './Window';
import FilePicker from './FilePicker';

const OpenFile = ({ close, add, id, resolve, ...props }) => {
  const onSelect = async (selected = '') => {
    if (selected.trim()) {
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
        title="Open"
        onCancel={() => onSelect('')}
        onSubmit={onSelect}
      />
    </Window>
  );
};

export default OpenFile;
