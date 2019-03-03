import { localToFilename } from '../utils';

export const save = async ({ active }) => {
  const current = active.ref.current;
  await current.save();
};

export const saveAll = async ({ windows }) => {
  windows
    .filter(({ type }) => type === 'url')
    .forEach(active => save({ active }));
};

export const saveOffline = async ({ active }) => {
  const current = active.ref.current;
  const ref = current.getRef().current;
  const html = ref.innerHTML;
  const blob = new Blob([html], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = localToFilename(active.id);
  a.click();
  window.URL.revokeObjectURL(url);
};
