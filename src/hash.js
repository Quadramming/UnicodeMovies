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
	const salt = '9n17r0p593L3H7N1PM4RC';
	return md5(text + salt);
}
