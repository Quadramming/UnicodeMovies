class Key {
	
	constructor(value, x, y, w, h) {
		this._value = value;
		this._x = x;
		this._y = y;
		this._w = w;
		this._h = h;
	}
	
	isHit(x, y) {
		const is_X_ok = (this._x <= x && x < this._x + this._w);
		const is_Y_ok = (this._y <= y && y < this._y + this._h);
		return is_X_ok && is_Y_ok;
	}
	
	getValue() {
		return this._value;
	}
	
}

export default class {
	
	constructor(scene) {
		this._scene = scene;
		this._keys = [];
		this._addKeys();
		this._onKey = ()=>{};
	}
	
	preload() {
		this._scene.load.image('keyboard', 'assets/keyboard.png');
	}
	
	create() {
		const sprite = this._scene.add.sprite(500, 400, 'keyboard');
		sprite.scaleX = 0.5;
		sprite.setInteractive();
		sprite.on('pointerdown', (pointer, x, y, camera) => {
			for ( const key of this._keys ) {
				if ( key.isHit(x, y) ) {
					this._onKey(key.getValue());
				}
			}
		});
	}
	
	setOnkey(fn) {
		this._onKey = fn;
	}
	
	_addKeys() {
		this._keys.push(new Key( 'O', 415, 107, 40, 40 ));
		this._keys.push(new Key( 'BACKSPACE', 620, 67, 36, 35 ));
	}
}
