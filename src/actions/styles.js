import { styles } from '../components/StyleEditor';
let currentStyle = {};

export function applyStyle({ active }) {
  console.log('applying');
  if (currentStyle.name) {
    active.ref.current.applyStyle(currentStyle);
  }
}
export function copyStyle({ active, style = {} }) {
  console.log('set style to ', style);

  currentStyle = style;
}

export function setStyle({ options, active }) {
  console.log('set style', options, styles.find(s => s.name === options));
  active.ref.current.applyStyle(styles.find(s => s.name === options));
}
