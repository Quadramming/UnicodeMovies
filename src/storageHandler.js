import Storage from './Storage.js';

const storage = new Storage();

export default {
	
	setAnswer(movie, text) {
		const id = movie.getId();
		storage.set(`Movie_answer_${id}`, text);
	},
	
	getAnswer(movie) {
		const id = movie.getId();
		return storage.get(`Movie_answer_${id}`);
	},
	
	getHints() {
		return storage.getNumber('Hints', 0);
	},
	
	addHints(n) {
		storage.set('Hints', Math.min( this.getHints() + n, 10) );
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
	
	setMovieHints(movie, n) {
		const id = movie.getId();
		storage.set(`Movie_hints_${id}`, n);
	},
	
	getLastEntrance() {
		return storage.getNumber('LastEntrance', Date.now());
	},
	
	setLastEntrance() {
		storage.set('LastEntrance', Date.now());
	}
	
}
