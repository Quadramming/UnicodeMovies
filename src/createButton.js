const delta = 10;

function isInDelta(one, two) {
	return Math.abs(one - two) < delta;
}

export default (scene, fn, ...rest) => {
	const obj = scene.add.text(...rest);
	obj.setInteractive(new Phaser.Geom.Rectangle(0, 0, obj.width, obj.height), Phaser.Geom.Rectangle.Contains);
	
	let startTouch = false;
	let startX = null;
	let startY = null;
	obj.on('pointerdown', (pointer) => {
		startTouch = true;
		startX = pointer.position.x;
		startY = pointer.position.y;
	});
	obj.on('pointermove', (pointer) => {
		if ( startTouch ) {
			if ( ! isInDelta(pointer.position.x, startX) || ! isInDelta(pointer.position.y, startY) ) {
				startTouch = false;
			}
		}
	});
	obj.on('pointerup', (pointer, x, y) => {
		if ( startTouch ) {
			fn();
		}
	});
	return obj;
}
