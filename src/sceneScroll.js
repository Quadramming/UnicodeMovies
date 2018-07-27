function clipCamera(camera, clip) {
	if ( camera.x > clip.right ) {
		camera.x = clip.right;
	} else if ( camera.x < clip.left ) {
		camera.x = clip.left;
	}
	if ( camera.y > clip.top ) {
		camera.y = clip.top;
	} else if ( camera.y < clip.bottom ) {
		camera.y = clip.bottom;
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
			camera.x += (pointer.x - p.x);
			camera.y += (pointer.y - p.y);
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
