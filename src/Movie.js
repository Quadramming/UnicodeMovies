import hash from './hash.js';
import storage from './storageHandler.js';
import md5 from 'md5';

export default class {
	
	constructor([chars, year, titles]) {
		const id = chars + year;
		this.chars = chars;
		this.titles = [];
		for ( const title of titles ) {
			this.titles.push(title);
		}
		this.year = year;
		this.id = md5(id);
	}
	
	isAnswered() {
		const answer = storage.getAnswer(this);
		return answer !== null;
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
