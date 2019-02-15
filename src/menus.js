import { PATH } from './env';

export const top = {
  id: 'top',
  title: 'WorldWideWeb',
  menu: [
    { title: 'Info', id: 'info' },
    { title: 'Navigate', id: 'navigate' },
    { title: 'Document', id: 'document' },
    { title: 'Edit', id: 'edit' },
    // Not available until later
    // { title: 'Find', id: 'find' },
    { title: 'Links', id: 'links' },
    { title: 'Style', id: 'style' },
    { title: 'Print', accelerator: 'P', id: 'print' },
    { title: 'Page Layout', id: 'page-layout' },
    { title: 'Windows', id: 'windows' },
    { title: 'Services', id: 'services' },
    { title: 'Hide', id: 'hide', accelerator: 'h' },
    { title: 'Quit', accelerator: 'q', id: 'quit' },
  ],
};

export const edit = {
  id: 'edit',
  title: 'Edit',
  menu: [
    { title: 'Cut', id: 'cut', accelerator: 'x' },
    { title: 'Copy', id: 'copy', accelerator: 'c' },
    { title: 'Paste', id: 'paste', accelerator: 'v' },
    // These features weren't functional in 0.13
    //    { title: 'Paste As', id: 'paste-as', accelerator: 'x' },
    { title: 'Delete', id: 'delete', accelerator: 'X' },
    //    { title: 'Undo', id: 'undo', accelerator: 'z' },
    //    { title: 'Find', id: 'find', accelerator: 'x' },
    { title: 'Spelling...', id: 'spelling', accelerator: 'x' },
    { title: 'Check Spelling', id: 'check-spelling', accelerator: ';' },
    { title: 'Select All', id: 'select-all', accelerator: 'a' },
  ],
};

export const info = {
  id: 'info',
  title: 'Info',
  menu: [
    { title: 'Panel…', id: 'info-panel', action: 'panel' },
    {
      title: 'Help…',
      id: 'info-help',
      action: 'url',
      props: { url: `${PATH}/help.html` },
    },
  ],
};

export const document = {
  id: 'document',
  title: 'Document',
  menu: [
    { title: 'Open file…', accelerator: 'o', id: 'open-file', action: 'panel' },
    {
      title: 'Open from full document reference',
      accelerator: 'O',
      id: 'open-url',
      action: 'panel',
    },
    {
      title: 'New file…',
      accelerator: 'n',
      id: 'new-file',
      action: 'url',
      props: { url: PATH + '/blank.html' },
    },
    { title: 'Save', accelerator: 's', id: 'save' },
    {
      title: 'Save all edited windows',
      accelerator: 'S',
      id: 'save-all-edited-windows',
    },
    { title: 'Save a copy in', id: 'save-a-copy-in' },
    { title: 'Document details…', id: 'document.details' },
    // { title: 'Inspect…', accelerator: '3', id: 'inspect' },
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
      action: 'close',
      props: { all: true },
    },
    { title: 'Close', accelerator: 'w', id: 'close', action: 'close' },
  ],
};

export const diagnostics = {
  id: 'diagnostics',
  title: '(Diagnostics)',
  menu: [
    { title: 'Panel', id: 'panel' }, //does nothing
    { title: 'Open HTML file showing SGML source', id: 'open-sgml' },
    { title: 'Open HTML file showing RTF', id: 'open-rtf' },
    {
      title: 'Dump text format to standard out',
      accelerator: '?',
      id: 'dump-stdout',
    }, //does nothing
    { title: 'Turn console trace on', accelerator: '+', id: 'console-on' }, //does nothing
    { title: 'Turn console trace off', accelerator: '-', id: 'console-off' }, //does nothing
    { title: 'Item', id: 'info-panel', action: 'panel' }, //opens info panel
  ],
};

export const navigate = {
  id: 'navigate',
  title: 'Navigate',
  menu: [
    { title: 'Back', accelerator: '^', id: 'back' },
    { title: 'Next', accelerator: '>', id: 'next' },
    { title: 'Previous', accelerator: '<', id: 'previous' },
    { title: 'Home', accelerator: 'H', id: 'home' },
    // { title: 'Inspect…', accelerator: '3', id: 'inspect' },
    { title: 'Panel', id: 'browser-nav', action: 'panel' },
  ],
};

export const links = {
  id: 'links',
  title: 'Links',
  menu: [
    { title: 'Mark all', accelerator: 'A', id: 'mark-all', action: 'method' },
    {
      title: 'Mark selection',
      accelerator: 'M',
      id: 'mark-selection',
      action: 'method',
    },
    {
      title: 'Link to marked',
      accelerator: 'L',
      id: 'link-to-marked',
      action: 'method',
    },
    { title: 'Link to file…', id: 'link-to-file' },
    { title: 'Link to New', accelerator: 'N', id: 'link-to-new' },
    {
      title: 'Follow link',
      id: 'follow-link',
      action: 'method',
    },
    { title: 'Unlink', accelerator: 'Z', id: 'unlink', action: 'method' },
    { title: 'Help', id: 'link-help', action: 'panel' },
  ],
};

export const style = {
  id: 'style',
  title: 'Style',
  menu: [
    { title: 'Copy style', accelerator: '1', id: 'copy-style' },
    { title: 'Apply style', accelerator: '2', id: 'apply-style' },
    // Not available in 0.13
    //    { title: 'Glossary', accelerator: 'G', id: 'glossary' },
    //    { title: 'List', accelerator: '7', id: 'list' },
    //    { title: 'Example', accelerator: 'X', id: 'example' },
    //    { title: 'Address', accelerator: '9', id: 'address' },
    //    { title: 'Normal', accelerator: '0', id: 'normal' },
    //    { title: 'Heading 1', accelerator: '!', id: 'heading-1' },
    //    { title: 'Heading 2', accelerator: '@', id: 'heading-2' },
    //    { title: 'Heading 3', accelerator: '#', id: 'heading-3' },
    //    { title: 'Heading 4', accelerator: '$', id: 'heading-4' },
    { title: 'Panel…', id: 'style-editor', action: 'panel' },
  ],
};
