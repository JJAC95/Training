import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';
// import { apiKey as key, url, sayHi, old, dog } from './src/config';

import { apiKey as key, url, sayHi, old, dog } from './src/config';

import User, { createURL, gravatar } from './src/user';

const newUser = new User('Jack', 'jjacrs@gmail.com', 'jack.com');
console.log(newUser);

const profile = createURL(newUser.name);
console.log(profile)

const image = gravatar(newUser.email);
console.log(image);