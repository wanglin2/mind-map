const map = {
  Backspace: 8,
  Tab: 9,
  Enter: 13,

  Shift: 16,
  Control: 17,
  Alt: 18,
  CapsLock: 20,

  Esc: 27,

  Spacebar: 32,

  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,

  Insert: 45,

  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,

  Del: 46,

  NumLock: 144,

  Cmd: 91,
  CmdFF: 224,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,

  '`': 192,
  '=': 187,
  '-': 189,

  '/': 191,
  '.': 190
}

// 数字
for (let i = 0; i <= 9; i++) {
  map[i] = i + 48
}

// 字母
'abcdefghijklmnopqrstuvwxyz'.split('').forEach((n, index) => {
  map[n] = index + 65
})

export const keyMap = map

export const isKey = (e, key) => {
  let code = typeof e === 'object' ? e.keyCode : e
  return map[key] === code
}
