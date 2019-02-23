function execCommand({ active, method }) {
  if (active.type === 'url') {
    active.ref.current.ref.current.focus();
    setTimeout(() => document.execCommand(method, false, null), 1);
  }
}

export const selectAll = ({ active }) => {
  execCommand({ active, method: 'selectAll' });
};

export const copy = ({ active }) => {
  execCommand({ active, method: 'copy' });
};

export const cut = ({ active }) => {
  execCommand({ active, method: 'cut' });
};

export const deleteText = ({ active }) => {
  execCommand({ active, method: 'delete' });
};

export const paste = async () => {
  alert('Paste is not enabled, please use your system keys');
  // return navigator.permissions.query({
  //   name: 'clipboard-read'
  // }).then(permissionStatus => {
  //   // Will be 'granted', 'denied' or 'prompt':
  //   if (permissionStatus.state === 'denied') {
  //     alert('Pasting text is disabled, please use your system keys for pasting');
  //     return;
  //   }

  //   // Listen for changes to the permission state
  //   permissionStatus.onchange = () => {
  //     console.log(permissionStatus.state);
  //   };
  // });
};
