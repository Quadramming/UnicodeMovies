import fs from 'fs';
import movies from './movies_converter_tmp.mjs';

fs.writeFileSync('./src/movies_converter_tmp.mjs', JSON.stringify(movies));
let data = fs.readFileSync('./src/movies_converter_tmp.mjs');
data = data.toString().replace(/\\\\u/g, '\\u');
fs.writeFileSync('./src/movies.js', 'export default '+data);
fs.unlinkSync('./src/movies_converter_tmp.mjs');
fs.unlinkSync('./src/hash.mjs');
