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

export function getLink(element, root, prop = 'href') {
  if (element === root) {
    return false;
  }

  if (element.nodeName === 'A') {
    if (element[prop]) {
      return element;
    }
    return false;
  }

  return getLink(element.parentNode, root, prop);
}

export function isUpper(letter) {
  return /[A-Z]/.test(letter);
}

export function localToFilename(url) {
  return url
    .split('/')
    .pop()
    .replace(/[?#].*/, '');
}
