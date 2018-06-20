export default class {
	
	constructor() {
		this._storage = window.localStorage;
	}
	
	remove(key) {
		this._storage.removeItem(key);
	}
	
	set(key, value) {
		if ( value === undefined || value === null ) {
			return;
		}
		this._storage.setItem(key, value);
	}
	
	get(key) {
		return this._storage.getItem(key);
	}
	
};