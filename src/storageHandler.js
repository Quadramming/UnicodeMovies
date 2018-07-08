import Storage from './Storage.js';

const storage = new Storage();

export default {
	
	getHints() {
		return storage.getNumber('Hints', 0);
	},
	
	addHints(n) {
		storage.set('Hints', this.getHints() + n);
	},

	subHint() {
		storage.set('Hints', this.getHints() - 1);
	},

	getMovieHints(movie) {
		const id = movie.getId();
		return storage.getNumber(`Movie_hints_${id}`, 0);
	},

	addMovieHints(movie) {
		const id = movie.getId();
		storage.set(`Movie_hints_${id}`, this.getMovieHints(movie) + 1);
	},
	
	getLastEntrance() {
		return storage.getNumber('LastEntrance', Date.now());
	},
	
	setLastEntrance() {
		storage.set('LastEntrance', Date.now());
	}
	
}
