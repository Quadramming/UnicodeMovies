export default class {
	
	constructor(scene, x, y) {
		this._textLimit = 5;
		this._scene = scene;
		this._text = '';
		this._obj = null;
		this._x = x;
		this._y = y;
		this._onChange = null;
	}
	
	create() {
		this._text = '';
		this._obj = this._scene.add.text(this._x, this._y, '', {
			fontFamily: 'Arial',
			fontSize: 50,
			color: '#000000'
		}).setOrigin(0.5)
	}
	
	setOnchange(fn) {
		this._onChange = fn;
	}
	
	add(v) {
		if ( this._text.length >= this._textLimit ) {
			return;
		}
		this._text += v;
		this._updateText();
	}
	
	backspace() {
		if ( this._text.length > 0 ) {
			this._text = this._text.slice(0, -1);
		}
		this._updateText();
	}
	
	_updateText() {
		this._obj.setText(this._text);
		if ( this._onChange ) {
			this._onChange(this._text);
		}
	}
	
}
