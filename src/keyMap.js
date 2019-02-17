import * as allMenus from './menus';

const keyMap = {};

function isUpper(letter) {
  return /[A-Z]/.test(letter);
}

function addKeyMap(menu) {
  Object.entries(menu).map(([, { menu, accelerator, alias, id: menuId }]) => {
    if (accelerator) {
      if (isUpper(accelerator)) {
        keyMap[menuId] = `ctrl+alt+shift+${accelerator.toLowerCase()}`;
      } else {
        if (alias) {
          accelerator = `shift+${alias}`;
        }
        keyMap[menuId] = `ctrl+alt+${accelerator}`;
      }
    }

    if (menu) {
      addKeyMap(menu);
    }
  });
}

addKeyMap(allMenus);

console.log(keyMap);

export default keyMap;
