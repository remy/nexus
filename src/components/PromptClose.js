import React from 'react';
import Prompt from './Prompt';

const PromptClose = ({ text, onSubmit, close, add, id, ...props }) => {
  const buttons = ["Don't close", 'No', 'Yes'];
  const values = [null, false, true];
  const handleSubmit = index => {
    onSubmit({ value: values[index], index, text: buttons[index], id });
    close(id);
  };

  return (
    <Prompt
      {...props}
      key={`panel:${id}`}
      zIndex={10000}
      id={id}
      index={2}
      add={add}
      active={true}
      onFocus={() => {
        // if (active.id !== id) setActive({ type: 'panel', id });
      }}
      onClose={close}
      text={text || 'Save changes?'}
      title="Close"
      onSubmit={handleSubmit}
      buttons={buttons}
    />
  );
};

export default PromptClose;
