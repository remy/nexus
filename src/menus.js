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
    { title: 'Print', accelerator: 'P' },
    { title: 'Page Layout', id: '' },
    { title: 'Windows', id: 'windows' },
    { title: 'Services', id: 'services' },
    { title: 'Hide', id: 'hide' },
    { title: 'Quit', accelerator: 'q' },
  ],
};

export const document = {
  title: 'Document',
  menu: [
    { title: 'Open file…', accelerator: 'o' },
    { title: 'Open given document address', accelerator: 'O' },
    { title: 'Save', accelerator: 's' },
    { title: 'Save all edited windows', accelerator: 'S' },
    { title: 'Save a copy in', id: 'save a copy in' },
    { title: 'Inspect…', accelerator: '3' },
    { title: '(Diagnostics)', id: '(Diagnostics)' },
    { title: 'Miniaturize' },
    { title: 'Open master template document' },
    { title: 'Close all other windows', accelerator: 'W' },
    { title: 'Close', accelerator: 'W' },
  ],
};

export const navigate = {
  title: 'Navigate',
  menu: [
    { title: 'Back', accelerator: '^' },
    { title: 'Next', accelerator: '>' },
    { title: 'Previous', accelerator: '<' },
    { title: 'Home', accelerator: 'H' },
    { title: 'Inspect…', accelerator: '3' },
    { title: 'Panel' },
  ],
};

export const links = {
  id: 'links',
  title: 'Links',
  menu: [
    { title: 'Mark All', accelerator: 'A' },
    { title: 'Mark Selection', accelerator: 'M' },
    { title: 'Link to Marked', accelerator: 'L' },
    { title: 'Link to file…' },
    { title: 'Link to New', accelerator: 'N' },
    { title: 'Follow Link' },
    { title: 'Unlink', accelerator: 'Z' },
    { title: 'Help' },
  ],
};

export const style = {
  id: 'style',
  title: 'Style',
  menu: [
    { title: 'Copy style', accelerator: '1' },
    { title: 'Apply style', accelerator: '2' },
    { title: 'Glossary', accelerator: 'G' },
    { title: 'List', accelerator: '7' },
    { title: 'Example', accelerator: 'X' },
    { title: 'Address', accelerator: '9' },
    { title: 'Normal', accelerator: '0' },
    { title: 'Heading 1', accelerator: '!' },
    { title: 'Heading 2', accelerator: '@' },
    { title: 'Heading 3', accelerator: '#' },
    { title: 'Heading 4', accelerator: '$' },
    { title: 'Panel…' },
  ],
};
