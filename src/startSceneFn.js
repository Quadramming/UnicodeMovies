import scene from './scene.js';

export default (name, context, ...args) => {
	return () => {
		scene.start(name, context, ...args);
	}
}
