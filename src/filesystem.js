import { keys, get, set } from 'idb-keyval';

export async function list() {
  return keys();
}

export async function load(filename) {
  return get(filename);
}

export async function save(filename, content) {
  return set(filename, content);
}

// by default put the blank template in as blank.html
load('blank.html').then(file => {
  if (!file) {
    save(
      'blank.html',
      `<title>(No title)</title>
    <h1>Heading</h1>
    Text<p>
    __________________________________________________________________
    <address>Author</address>
    `
    );
  }
});
