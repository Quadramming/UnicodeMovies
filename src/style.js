function merge(...objs) {
	const result = Object.assign({}, ...objs)
	delete result.styles;
	return result;
}

export default new class {
	
	constructor() {
		this._map = new Map();
	}
	
	set(name, obj) {
		this._map.set(name, obj);
	}
	
	use(...styles) {
		let result = {
			_usedStyles: []
		};
		for ( const style of styles ) {
			if ( Array.isArray(style) ) {
				result = this.use(result, ...style);
			} else if ( typeof style === 'string' ) {
				if ( style.includes(' ') ) {
					result = this.use(result, style.split(' '));
				} else {
					if ( ! result._usedStyles.includes(style) ) {
						result._usedStyles.push(style);
						result = this.use(result, this._map.get(style));
					}
				}
			} else if ( typeof style === 'object' ) {
				if ( style.styles ) {
					result = this.use(result, style.styles);
				}
				result = merge(result, style);
			}
		}
		return result;
	}
	
}
