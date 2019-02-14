let currentLink = null;

export const markAll = ({ active }) => {
  console.log('marking all', active.id);
  currentLink = active.id;
};

export const markSelection = ({ active }) => {
  console.log('marking selection', active.ref);
  active.ref.current.onMark();
};

export const linkToMarked = () => {};

export const followLink = () => {};

export const unlink = () => {};
