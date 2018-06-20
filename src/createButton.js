export default (scene, fn, ...rest) => {
	const obj = scene.add.text(...rest);
	obj.setInteractive(new Phaser.Geom.Rectangle(0, 0, obj.width, obj.height), Phaser.Geom.Rectangle.Contains);
	obj.on('pointerdown', fn);
	return obj;
}
