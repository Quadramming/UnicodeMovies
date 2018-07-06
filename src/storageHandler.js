import Storage from './Storage.js';

const storage = new Storage();

export default {
	
	getHints() {
		return storage.getNumber('Hints', 0);
	},
	
	getLastEntrance() {
		return storage.getNumber('LastEntrance', Date.now());
	}
	
}