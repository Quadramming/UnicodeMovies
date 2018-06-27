global.style = new class {
	
	constructor() {
		this._map = new Map();
	}
	
	set(name, obj) {
		let result = {};
		if ( obj.style ) {
			result = this.use(result, obj.style);
		}
		this._map.set(name, this._merge(result, obj));
	}
	
	use(...styles) {
		let result = {};
		for ( const style of styles ) {
			if ( Array.isArray(style) ) {
				result = this.use(result, ...style);
			} else if ( typeof style === 'string' ) {
				const styleObj = this._map.get(style);
				if ( styleObj ) {
					result = this._merge(result, styleObj);
				}
			} else {
				result = this._merge(result, style);
			}
		}
		return result;
	}
	
	_merge(...objs) {
		return Object.assign({}, ...objs);
	}
	
};