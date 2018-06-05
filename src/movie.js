import c from './console.js';

export default class movie {
	
	constructor([chars, year, titles]) {
		this.chars = chars;
		this.titles = [];
		for ( const title of titles ) {
			this.titles.push( this._normalize(title) );
		}
		this.year = year;
	}
	
	check(text) {
		const normalized = this._normalize(text);
		for ( const title of this.titles ) {
			if ( title === normalized ) {
				return true;
			}
		}
		return false;
	}
	
	getChars() {
		return this.chars;
	}
	
	getCentury() {
		return this.getYear().replace(/..$/, 'XX');
	}
	
	getDecade() {
		return this.getYear().replace(/.$/, 'X');
	}
	
	getYear() {
		return String(this.year);
	}
	
	_normalize(text) {
		text = text.toLowerCase();
		text = text.replace(/[^0-9a-zа-яё]/g, '');
		return text;
	}
	
}
