import md5 from 'md5';

function normalize(text) {
	text = text.toLowerCase();
	text = text.replace(/^the |^a /g, '');
	text = text.replace(/( a | the )/g, ' ');
	text = text.replace(/[^0-9a-zа-яё]/g, '');
	return text;
}

export default (text) => {
	text = normalize(text);
	const salt = 'CR4MP1N7H3L395p0r71n9';
	return md5(text + salt);
}
