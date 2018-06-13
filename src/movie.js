import hash from './hash.js';
import c from './console.js';

export default class {
	
	constructor([chars, year, titles]) {
		this.chars = chars;
		this.titles = [];
		for ( const title of titles ) {
			this.titles.push(title);
		}
		this.year = year;
	}
	
	check(text) {
		const hashed = hash(text);
		for ( const title of this.titles ) {
			if ( title === hashed ) {
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
	
}
