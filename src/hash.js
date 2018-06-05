import md5 from 'md5';

export default (text) => {
	const salt = 'CR4MP1N7H3L395p0r71n9';
	return md5(text + salt);
}
