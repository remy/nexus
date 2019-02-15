let currentLink = '';

export const markAll = ({ active }) => {
  currentLink = active.id;
};

export const markSelection = ({ active }) => {
  const link = active.ref.current.onMark();
  if (link && link.url) {
    currentLink = link.url;
  }
};

export const linkToMarked = ({ active }) => {
  if (currentLink) active.ref.current.linkToMarked(currentLink);
};

export const followLink = () => {};

export const unlink = () => {};
