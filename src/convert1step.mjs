import fs from 'fs';

let data = fs.readFileSync('./src/original_movies.js');
data = data.toString().replace(/hash\.js/g, 'hash.mjs');
data = data.toString().replace(/\\u/g, '\\\\u');
fs.writeFileSync('./src/movies_converter_tmp.mjs', data);
fs.writeFileSync('./src/hash.mjs', fs.readFileSync('./src/hash.js'));
