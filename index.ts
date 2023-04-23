// Import stylesheets
import './style.css';
import * as _ from 'lodash';
// https://pythontutor.com/visualize.html#mode=display
// Write TypeScript code!
// const appDiv: HTMLElement = document.getElementById('app');
// appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

var myobj = {
  a: 'hello',
  b: 'world',
  c: {
    d: 1,
    e: 2,
    f: 4,
    g: {
      h: true,
      i: false,
      j: {
        k: {
          p: true,
        },
        l: false,
      },
      m: true,
      o: true,
    },
    x: true,
  },
  j: '!',
  q: {
    r: true,
    s: true,
  },
};

function flatKey(obj: Object) {
  let stack: { parentKey: string; obj: Object; path: string }[] = [];
  let iterWatcher: any[] = [];
  stack.push({ parentKey: null, obj: obj, path: null });
  let parentKeyStr = '';
  let path = '';
  let concat = false;
  while (stack.length) {
    let innerObj = stack[0].obj;
    let currStack = stack[0];
    for (let key in innerObj) {
      if (_.isObject(innerObj[key])) {
        if (currStack.path) {
          parentKeyStr = currStack.path + '.' + key;
        } else {
          parentKeyStr = key;
        }
        stack.push({ parentKey: key, obj: innerObj[key], path: parentKeyStr }); // c.g
      } else {
        if (currStack.path) {
          path = currStack.path + '.' + key;
        } else {
          path = key;
        }
        iterWatcher.push(path);
        console.log('path', path, iterWatcher);
      }
    }
    stack.shift();
  }
}

flatKey(myobj);

// function traverse(obj) {
//   var stack = [];
//   let parentKey = '';
//   let path = '';
//   stack.push(obj);
//   while (stack.length) {
//     let innerObj = stack[0];
//     for (var key in innerObj) {
//       // console.log(typeof innerObj[key] === 'object', _.isObject(innerObj[key]));
//       if (_.isObject(innerObj[key])) {
//         parentKey = key;
//         stack.push(innerObj[key]);
//       } else {
//         if (parentKey !== '') {
//           path = parentKey + '.' + key;
//         } else {
//           path = key;
//         }
//         console.log('path', path);
//       }
//     }
//     stack.shift();
//   }
// }
// traverse(myobj);
