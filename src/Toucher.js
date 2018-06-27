const delta = 10;

function isInDelta(one, two) {
	return Math.abs(one - two) < delta;
}

export default class {
	
	constructor(scene) {
		this._scene = scene;
		
		this._onDown = null;
		this._onUp = null;
		this._onHold = null;
		
		this._obj = null;
		this._timer = null;
		this._delay = null;
		this._touched = false;
		this._x = null;
		this._y = null;
		this._localX = null;
		this._localY = null;
		
		scene.input.on('pointerdown', ({position: {x, y}}, objs) => {
			if ( this._obj ) {
				if ( objs.includes(this._obj) ) {
					this._localX = this._obj.input.localX;
					this._localY = this._obj.input.localY;
				} else {
					return;
				}
			}
			if ( this._onDown ) {
				this._onDown(x, y, objs, this._localX, this._localY);
			}
			this._x = x;
			this._y = y;
			this._touched = true;
			if ( this._delay && this._onHold ) {
				this._timer = scene.time.addEvent({
					delay: this._delay,
					callback: () => {
						if ( this._onHold ) {
							this._onHold(x, y, objs, this._localX, this._localY);
						}
					}
				});
			}
		});
		scene.input.on('pointermove', ({position: {x, y}}, objs) => {
			if ( this._touched && this._isOutDelta(x, y) ) {
				this._removeTouch();
			}
		});
		scene.input.on('pointerup', ({position: {x, y}}, objs) => {
			if ( this._touched ) {
				if ( this._onUp ) {
					this._onUp(x, y, objs, this._localX, this._localY);
				}
				this._removeTouch();
			}
		});
	}
	
	setOnDown(fn) {
		this._onDown = fn;
	}
	
	setOnHold(fn, delay) {
		this._onHold = fn;
		this._delay = delay;
	}
	
	setOnUp(fn) {
		this._onUp = fn;
	}
	
	assignObj(obj) {
		this._obj = obj;
	}
	
	_isOutDelta(x, y) {
		return ! isInDelta(this._x, x) || ! isInDelta(this._y, y);
	}
	
	_removeTouch() {
		this._x = null;
		this._y = null;
		this._localX = null;
		this._localY = null;
		this._touched = false;
		if ( this._timer ) {
			this._timer.remove();
		}
		this._timer = null;
	}
	
}

/*
let t = new Toucher(this._scene);
t.setOnDown((x, y, objs, localX, localY)=>{c('Down', x, '-', y);});
t.setOnHold((x, y, objs, localX, localY)=>{c('hold', x, '-', y);}, 1000);
t.setOnUp((x, y, objs, localX, localY)=>{c('up', x, '-', y);});
*/