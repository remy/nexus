export const top = {
  id: 'top',
  title: 'WorldWideWeb',
  menu: [
    { title: 'Info', id: 'info' },
    { title: 'Navigate', id: 'navigate' },
    { title: 'Document', id: 'document' },
    { title: 'Edit', id: 'edit' },
    { title: 'Find', id: 'find' },
    { title: 'Links', id: 'links' },
    { title: 'Style', id: 'style' },
    { title: 'Print', accelerator: 'P', id: 'print' },
    { title: 'Page Layout', id: 'page-layout' },
    { title: 'Windows', id: 'windows' },
    { title: 'Services', id: 'services' },
    { title: 'Hide', id: 'hide' },
    { title: 'Quit', accelerator: 'q', id: 'quit' },
  ],
};

export const document = {
  title: 'Document',
  menu: [
    { title: 'Open file…', accelerator: 'o', id: 'open-file' },
    {
      title: 'Open given document address',
      accelerator: 'O',
      id: 'open-url',
    },
    { title: 'New file…', accelerator: 'n', id: 'new-file' },
    { title: 'Save', accelerator: 's', id: 'save' },
    {
      title: 'Save all edited windows',
      accelerator: 'S',
      id: 'save-all-edited-windows',
    },
    { title: 'Save a copy in', id: 'save-a-copy-in' },
    { title: 'Inspect…', accelerator: '3', id: 'inspect' },
    { title: '(Diagnostics)', id: 'diagnostics' },
    { title: 'Miniaturize', id: 'miniaturize' },
    {
      title: 'Open master template document',
      id: 'open-master-template-document',
    },
    {
      title: 'Close all other windows',
      accelerator: 'W',
      id: 'close-all-other-windows',
    },
    { title: 'Close', accelerator: 'W', id: 'close' },
  ],
};

export const navigate = {
  title: 'Navigate',
  menu: [
    { title: 'Back', accelerator: '^', id: 'back' },
    { title: 'Next', accelerator: '>', id: 'next' },
    { title: 'Previous', accelerator: '<', id: 'previous' },
    { title: 'Home', accelerator: 'H', id: 'home' },
    { title: 'Inspect…', accelerator: '3', id: 'inspect' },
    { title: 'Panel', id: 'navigate-panel' },
  ],
};

export const links = {
  id: 'links',
  title: 'Links',
  menu: [
    { title: 'Mark All', accelerator: 'A', id: 'mark-all' },
    { title: 'Mark Selection', accelerator: 'M', id: 'mark-selection' },
    { title: 'Link to Marked', accelerator: 'L', id: 'link-to-marked' },
    { title: 'Link to file…', id: 'link-to-file' },
    { title: 'Link to New', accelerator: 'N', id: 'link-to-new' },
    { title: 'Follow Link', id: 'follow-link' },
    { title: 'Unlink', accelerator: 'Z', id: 'unlink' },
    { title: 'Help', id: 'help' },
  ],
};

export const style = {
  id: 'style',
  title: 'Style',
  menu: [
    { title: 'Copy style', accelerator: '1', id: 'copy-style' },
    { title: 'Apply style', accelerator: '2', id: 'apply-style' },
    { title: 'Glossary', accelerator: 'G', id: 'glossary' },
    { title: 'List', accelerator: '7', id: 'list' },
    { title: 'Example', accelerator: 'X', id: 'example' },
    { title: 'Address', accelerator: '9', id: 'address' },
    { title: 'Normal', accelerator: '0', id: 'normal' },
    { title: 'Heading 1', accelerator: '!', id: 'heading-1' },
    { title: 'Heading 2', accelerator: '@', id: 'heading-2' },
    { title: 'Heading 3', accelerator: '#', id: 'heading-3' },
    { title: 'Heading 4', accelerator: '$', id: 'heading-4' },
    { title: 'Panel…', id: 'style-panel' },
  ],
};
