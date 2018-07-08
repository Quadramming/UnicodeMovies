import hash from './hash.js';

export default class {
	
	constructor([chars, year, titles]) {
		let id = chars;
		this.chars = chars;
		this.titles = [];
		for ( const title of titles ) {
			this.titles.push(title);
			id += title;
		}
		this.year = year;
		this.id = hash(id);
	}
	
	getId() {
		return this.id;
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
