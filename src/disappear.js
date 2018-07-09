const speed = 500;

export default (obj) => {
		obj.removeInteractive();
		obj.scene.tweens.add({
			targets: obj,
			alpha: 0,
			duration: speed,
			onComplete: () => {obj.destroy();}
		});
}

