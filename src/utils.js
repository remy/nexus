export function camelCase(s = '') {
  return s.replace(/\b./g, (m, i) => {
    if (i === 0) return m;
    if (m === '-') return '';
    return m.toUpperCase();
  });
}

export function titleCase(s = '') {
  return s.replace(/\b./g, m => {
    if (m === '-') return '';
    return m.toUpperCase();
  });
}

export function getLink(element, root) {
  if (element === root) {
    return false;
  }

  if (element.nodeName === 'A') {
    if (element.href) {
      return element;
    }
    return false;
  }

  return getLink(element.parentNode, root);
}
