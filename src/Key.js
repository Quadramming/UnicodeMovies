export default class {
	
	constructor(value, x, y, w, h, shift = null) {
		this._value = value;
		this._x = x;
		this._y = y;
		this._w = w;
		this._h = h;
		this._shift = shift;
	}
	
	isHit(x, y) {
		const is_X_ok = (this._x <= x && x < this._x + this._w);
		const is_Y_ok = (this._y <= y && y < this._y + this._h);
		return is_X_ok && is_Y_ok;
	}
	
	getValue() {
		return this._value;
	}
	
	getShift() {
		return this._shift;
	}
	
}
