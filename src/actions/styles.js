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
