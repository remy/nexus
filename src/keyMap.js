import * as allMenus from './menus';

const keyMap = {};

function isUpper(letter) {
  return /[A-Z]/.test(letter);
}

function addKeyMap(menu) {
  Object.entries(menu).map(([, { menu, accelerator, id: menuId }]) => {
    if (accelerator) {
      if (isUpper(accelerator)) {
        keyMap[menuId] = `ctrl+alt+shift+${accelerator.toLowerCase()}`;
      } else {
        keyMap[menuId] = `ctrl+alt+${accelerator}`;
      }
    }

    if (menu) {
      addKeyMap(menu);
    }
  });
}

addKeyMap(allMenus);

export default keyMap;
