let currentLink = 'https://example.com/';

export const markAll = ({ active }) => {
  console.log('marking all', active.id);
  currentLink = active.id;
};

export const markSelection = ({ active }) => {
  console.log('marking selection', active.ref);
  currentLink = active.ref.current.onMark().url;
  console.log('currentLink: ' + currentLink.url);
};

export const linkToMarked = ({ active }) => {
  if (currentLink) active.ref.current.linkToMarked(currentLink);
};

export const followLink = () => {};

export const unlink = () => {};
