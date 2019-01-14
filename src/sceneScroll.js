function clipCamera(camera, clip) {
	if ( camera.scrollX > clip.right ) {
		camera.scrollX = clip.right;
	} else if ( camera.scrollX  < clip.left ) {
		camera.scrollX = clip.left;
	}
	if ( camera.scrollY > clip.top ) {
		camera.scrollY = clip.top;
	} else if ( camera.scrollY < clip.bottom ) {
		camera.scrollY = clip.bottom;
	}
}

export default (scene, clip = null) => {
	const camera = scene.cameras.main;
	const p = {
		active: false,
		x: 0,
		y: 0
	};
	scene.input.on('pointerup', (pointer) => {
		p.active = false;
	});
	scene.input.on('pointermove', (pointer) => {
		if ( ! pointer.isDown ) {
			return;
		}
		if ( p.active ) {
			camera.scrollX -= (pointer.x - p.x);
			camera.scrollY -= (pointer.y - p.y);
			if ( clip ) {
				clipCamera(camera, clip);
			}
		} else {
			p.active = true;
		}
		p.x = pointer.x;
		p.y = pointer.y;
	});
}
