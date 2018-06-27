import Toucher from './Toucher.js';

export default (scene, fn, ...rest) => {
	
	const obj = scene.add.text(...rest);
	obj.setOrigin(0.5);
	obj.setInteractive(
		new Phaser.Geom.Rectangle(0, 0, obj.width, obj.height),
		Phaser.Geom.Rectangle.Contains
	);
	
	const toucher = new Toucher(scene);
	toucher.assignObj(obj);
	toucher.setOnUp(() => {
		fn();
	});
	
	return obj;
}
