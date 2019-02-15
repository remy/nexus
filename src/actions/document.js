import * as filesystem from '../filesystem';
import { localToFilename } from '../utils';

export const save = async ({ active }) => {
  const current = active.ref.current;
  const ref = current.getRef().current;
  await filesystem.save(localToFilename(active.id), ref.innerHTML);
  current.setClean();
};

export const saveOffline = async ({ active }) => {
  console.log(active);
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
