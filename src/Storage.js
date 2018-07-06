export default class {
	
	constructor() {
		this._storage = window.localStorage;
	}
	
	remove(key) {
		this._storage.removeItem(key);
	}
	
	set(key, value) {
		if ( value === undefined ) {
			return;
		}
		if ( value === null ) {
			this.remove(key);
			return;
		}
		this._storage.setItem(key, value);
	}
	
	get(key) {
		return this._storage.getItem(key);
	}
	
	getNumber(key, def = 0) {
		let result = this.get(key);
		if ( result === null ) {
			result = def;
			this.set(key, result)
		}
		return Number(result);
	}
	
};
