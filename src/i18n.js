global.language = 'RU';

import dictionaryRu from './RU-language.js';

let dictionary = null;
if ( language === 'EN' ) {
	// Nothing
} else if ( language === 'RU' ) {
	dictionary = dictionaryRu;
} else {
	throw new Error('Wrong language');
}

export default (strs, ...substs) => {
	let text = strs[0];
	for ( const [i] of substs.entries() ) {
		text += '%v' + strs[i+1];
	}
	if ( dictionary !== null ) {
		text = dictionary.get(text) || text;
	}
	for ( const v of substs ) {
		text = text.replace('%v', v);
	}
	return text;
}
