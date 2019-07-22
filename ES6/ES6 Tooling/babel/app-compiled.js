function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

const _x$y$a$b = {
  x: 1,
  y: 2,
  a: 3,
  b: 4
},
      {
  x,
  y
} = _x$y$a$b,
      z = _objectWithoutProperties(_x$y$a$b, ["x", "y"]);

const age = 100;
const people = ['Wes', 'Kait'];
const fullNames = people.map(name => `${name} Bos`);
