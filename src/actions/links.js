import { getLink } from '../utils';

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

export const followLink = ({ active, add }) => {
  const selection = window.getSelection();
  const link = getLink(
    selection.focusNode,
    active.ref.current.getRef().current
  );

  if (link && link.href) {
    add({ type: 'url', id: link.href });
  }
};

export const unlink = ({ active }) => {
  if (active.ref && active.ref.current) active.ref.current.unlink();
};
