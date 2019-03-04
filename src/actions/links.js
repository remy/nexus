import { getLink } from '../utils';
import { OpenFile, NewFile } from '../panels';

let currentLink = '';

export const linkToNew = ({ active, add }) => {
  const promise = new Promise(resolve => {
    add({ type: 'panel', id: 'new-file', Component: NewFile, resolve });
  });

  active.ref.current.linkToFile(promise);
};

export const linkToFile = ({ active, add }) => {
  const promise = new Promise(resolve => {
    add({ type: 'panel', id: 'open-file', Component: OpenFile, resolve });
  });

  active.ref.current.linkToFile(promise);
};

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
    selection.anchorNode,
    active.ref.current.getRef().current
  );

  if (link && link.href) {
    let url = link.href;

    if (!link.getAttribute('href').startsWith('http')) {
      url = new URL(link.getAttribute('href'), active.id).toString();
    }

    add({ type: 'url', id: url, referrer: active.ref });
  }
};

export const unlink = ({ active }) => {
  if (active.ref && active.ref.current) active.ref.current.unlink();
};
