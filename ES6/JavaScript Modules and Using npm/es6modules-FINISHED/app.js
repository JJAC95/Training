import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';
// import { apiKey as key, url, sayHi, old, dog } from './src/config';
import User, { createURL, gravatar } from './src/user';
import { apiKey as key, url, sayHi, old, dog } from './src/config';

console.log(key, url, sayHi('Jack'), old, dog);
const Jack = new User('Wes Bos', 'wesbos@gmail.com', 'wesbos.com');
const profile = createURL(Jack.name);
const image = gravatar(Jack.email);

