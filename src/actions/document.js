import * as filesystem from '../filesystem';
import { localToFilename } from '../utils';

export const save = async ({ active }) => {
  const current = active.ref.current;
  const ref = current.getRef().current;
  await filesystem.save(localToFilename(active.id), ref.innerHTML);
  current.setClean();
};
