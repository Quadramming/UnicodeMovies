import Storage from './Storage.js';

const storage = new Storage();

export default {
	
	getHints() {
		return storage.getNumber('Hints', 0);
	},
	
	addHints(n) {
		storage.set('Hints', this.getHints() + n);
	},
	
	getLastEntrance() {
		return storage.getNumber('LastEntrance', Date.now());
	},
	
	setLastEntrance() {
		storage.set('LastEntrance', Date.now());
	}
	
}