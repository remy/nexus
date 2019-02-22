import { ClosePrompt } from '../panels';

export const closePrompt = ({ add }) => {
  add({
    type: 'panel',
    id: 'close-prompt',
    Component: PromptClose,
  });
};
