import dictionary from './RU-language.js';

export default (strs, ...substs) => {
	let text = strs[0];
	for ( const [i] of substs.entries() ) {
		text += '%v' + strs[i+1];
	}
	if ( typeof(dictionary) !== 'undefined' ) {
		text = dictionary.get(text) || text;
	}
	for ( const v of substs ) {
		text = text.replace('%v', v);
	}
	return text;
}
