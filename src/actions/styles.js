import { styles } from '../components/StyleEditor';
let currentStyle = {};

export function applyStyle({ active }) {
  if (currentStyle.name) {
    active.ref.current.applyStyle(currentStyle);
  }
}
export function copyStyle({ style = {} }) {
  currentStyle = style;
}

export function setStyle({ options, active }) {
  active.ref.current.applyStyle(styles.find(s => s.name === options));
}
