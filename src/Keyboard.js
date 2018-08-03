import Toucher from './Toucher.js';
import Key from './Key.js';

export default class {
	
	constructor(scene) {
		this._scene = scene;
		this._keys = [];
		this._onKey = () => {};
		this._startPress = null;
		this._shift = null;
		this._holdTimer = 700;
		this._enabled = true;
		if ( language === 'RU' ) {
			this._addKeysRu();
			this._pngName = 'keyboardRu';
		} else if ( language === 'EN' ) {
			this._addKeysEn();
			this._pngName = 'keyboardEn';
		}
	}
	
	enable() {
		this._enabled = true;
	}
	
	disable() {
		this._enabled = false;
	}
	
	preload() {
		this._scene.load.image('keyboard', `assets/${this._pngName}.png`);
	}
	
	create() {
		const config = this._scene.sys.game.config;
		const sprite = this._scene.add.sprite(0, config.height, 'keyboard');
		sprite.setOrigin(0, 1);
		sprite.setInteractive();
		
		const toucher = new Toucher(this._scene);
		toucher.assignObj(sprite);
		toucher.setOnDown( (x, y, objs, localX, localY) => {
			if ( ! this._enabled ) {
				return false;
			}
			for ( const key of this._keys ) {
				if ( key.isHit(localX, localY) ) {
					this._onKey(key.getValue());
					this._shift = key.getShift();
				}
			}
		});
		toucher.setOnHold(() => {
			if ( ! this._enabled ) {
				return false;
			}
			if ( this._shift ) {
				this._onKey('BACKSPACE');
				this._onKey(this._shift);
			}
		}, this._holdTimer);
	}
	
	setOnkey(fn) {
		this._onKey = fn;
	}
	
	_addKeysRu() {
		this._keys.push(new Key( '1', 60*0, 0, 60, 80, '!' ));
		this._keys.push(new Key( '2', 60*1, 0, 60, 80 ));
		this._keys.push(new Key( '3', 60*2, 0, 60, 80 ));
		this._keys.push(new Key( '4', 60*3, 0, 60, 80 ));
		this._keys.push(new Key( '5', 60*4, 0, 60, 80 ));
		this._keys.push(new Key( '6', 60*5, 0, 60, 80 ));
		this._keys.push(new Key( '7', 60*6, 0, 60, 80 ));
		this._keys.push(new Key( '8', 60*7, 0, 60, 80 ));
		this._keys.push(new Key( '9', 60*8, 0, 60, 80 ));
		this._keys.push(new Key( '0', 60*9, 0, 60, 80, '+' ));

		this._keys.push(new Key( 'Й', 50*0, 80, 50, 80 ));
		this._keys.push(new Key( 'Ц', 50*1, 80, 50, 80 ));
		this._keys.push(new Key( 'У', 50*2, 80, 50, 80 ));
		this._keys.push(new Key( 'К', 50*3, 80, 50, 80 ));
		this._keys.push(new Key( 'Е', 50*4, 80, 50, 80 ));
		this._keys.push(new Key( 'Н', 50*5, 80, 50, 80 ));
		this._keys.push(new Key( 'Г', 50*6, 80, 50, 80 ));
		this._keys.push(new Key( 'Ш', 50*7, 80, 50, 80 ));
		this._keys.push(new Key( 'Щ', 50*8, 80, 50, 80 ));
		this._keys.push(new Key( 'З', 50*9, 80, 50, 80 ));
		this._keys.push(new Key( 'Х', 50*10, 80, 50, 80 ));
		this._keys.push(new Key( 'Ъ', 50*11, 80, 50, 80 ));
	}

	_addKeysEn() {
		this._keys.push(new Key( '1', 60*0, 0, 60, 80, '!' ));
		this._keys.push(new Key( '2', 60*1, 0, 60, 80 ));
		this._keys.push(new Key( '3', 60*2, 0, 60, 80 ));
		this._keys.push(new Key( '4', 60*3, 0, 60, 80 ));
		this._keys.push(new Key( '5', 60*4, 0, 60, 80 ));
		this._keys.push(new Key( '6', 60*5, 0, 60, 80 ));
		this._keys.push(new Key( '7', 60*6, 0, 60, 80 ));
		this._keys.push(new Key( '8', 60*7, 0, 60, 80 ));
		this._keys.push(new Key( '9', 60*8, 0, 60, 80 ));
		this._keys.push(new Key( '0', 60*9, 0, 60, 80, '+' ));
		
		this._keys.push(new Key( 'Q', 60*0, 80, 60, 80 ));
		this._keys.push(new Key( 'W', 60*1, 80, 60, 80 ));
		this._keys.push(new Key( 'E', 60*2, 80, 60, 80 ));
		this._keys.push(new Key( 'R', 60*3, 80, 60, 80 ));
		this._keys.push(new Key( 'T', 60*4, 80, 60, 80 ));
		this._keys.push(new Key( 'Y', 60*5, 80, 60, 80 ));
		this._keys.push(new Key( 'U', 60*6, 80, 60, 80 ));
		this._keys.push(new Key( 'I', 60*7, 80, 60, 80 ));
		this._keys.push(new Key( 'O', 60*8, 80, 60, 80 ));
		this._keys.push(new Key( 'P', 60*9, 80, 60, 80 ));
		
		this._keys.push(new Key( 'A', 30+60*0, 160, 60, 80 ));
		this._keys.push(new Key( 'S', 30+60*1, 160, 60, 80 ));
		this._keys.push(new Key( 'D', 30+60*2, 160, 60, 80 ));
		this._keys.push(new Key( 'F', 30+60*3, 160, 60, 80 ));
		this._keys.push(new Key( 'G', 30+60*4, 160, 60, 80 ));
		this._keys.push(new Key( 'H', 30+60*5, 160, 60, 80 ));
		this._keys.push(new Key( 'J', 30+60*6, 160, 60, 80 ));
		this._keys.push(new Key( 'K', 30+60*7, 160, 60, 80 ));
		this._keys.push(new Key( 'L', 30+60*8, 160, 60, 80 ));
		
		this._keys.push(new Key( 'Z', 30+60*1, 240, 60, 80 ));
		this._keys.push(new Key( 'X', 30+60*2, 240, 60, 80 ));
		this._keys.push(new Key( 'C', 30+60*3, 240, 60, 80 ));
		this._keys.push(new Key( 'V', 30+60*4, 240, 60, 80 ));
		this._keys.push(new Key( 'B', 30+60*5, 240, 60, 80 ));
		this._keys.push(new Key( 'N', 30+60*6, 240, 60, 80 ));
		this._keys.push(new Key( 'M', 30+60*7, 240, 60, 80 ));
		
		this._keys.push(new Key( 'BACKSPACE', 30+60*8, 240, 90, 80 ));
		this._keys.push(new Key( ' ', 180, 320, 240, 80 ));
	}
	
}
