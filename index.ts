// Import stylesheets
import './style.css';
import * as _ from 'lodash';
import clone from 'just-clone';

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

// 2023-05-09 deep clone of array of nested objects lodash and structurecloned and just-clone lib
// lodash
const obj = {
  name: {
    title: 'Ms',
    first: 'Hannah',
    last: 'Ennis',
  },
  location: {
    city: 'Flatrock',
    state: 'British Columbia',
    country: 'Canada',
    postcode: 'P1X 7D3',
    coordinates: {
      latitude: '-62.3907',
      longitude: '37.8088',
    },
    timezone: {
      offset: '+5:30',
      description: 'Bombay, Calcutta, Madras, New Delhi',
    },
  },
};
const obj2 = {
  name: {
    title: 'Mr',
    first: 'bob',
    last: 'ski',
  },
  location: {
    city: 'Flatrock 2',
    state: 'British Columbia 2',
    country: 'Canada 2',
    postcode: 'P1X 7D3 2',
    coordinates: {
      latitude: '-62.3907',
      longitude: '37.8088',
    },
    timezone: {
      offset: '+5:30',
      description: 'Bombay, Calcutta, Madras, New Delhi 2',
    },
  },
};
let arr = [];
arr.push(obj);
arr.push(obj2);
const cloneVar = _.cloneDeep(obj);
let cloneArr = _.cloneDeep(arr);
console.log(obj.name === cloneVar.name); // false
console.log(cloneVar === obj); // false

cloneArr[0]['newprop1'] = 'potato';
cloneArr[1].location.city = 'flat 2000';
arr[1].location.city = 'not flat 2000';
console.log('orig', arr);
console.log('cloned', cloneArr);

// just-clone

const arr2 = [1, 2, 3];
const subObj = { aa: 1 };
const obj3 = { a: 3, b: 5, c: arr, d: subObj };
const objClone = clone(obj3);
arr.push(4);
objClone.d['bb'] = 2;
console.log('orig', obj3);
console.log('cloned', objClone);

// structedClone

// A multidimensional object
let movies = {
  studio: 'Pixar',
  films: ['Soul', 'Onward', 'Up', 'WALL-E'],
  directors: ['Brad Bird', 'Pete Docter', 'Andrew Stanton'],
  details: {
    founded: '1986',
    founders: ['Edwin Catmull', 'Alvy Ray Smith'],
  },
};
// A multidimensional array
let wizards = [
  {
    name: 'Radagast',
    color: 'brown',
  },
  {
    name: 'Gandalf',
    color: 'gray',
    movies: movies,
  },
];
// Create a copy of the wizards array
let wizardsCopy = structuredClone(wizards);

// Update a nested property
wizards[0]['druid'] = true;
wizards[1].movies.studio = 'homeplay';
wizardsCopy[0].name = 'bobby';
// The copy is not updated
console.log('original', wizards);
console.log('cloned', wizardsCopy);
