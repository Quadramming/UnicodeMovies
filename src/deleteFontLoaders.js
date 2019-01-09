export default () => {
	const elements = document.getElementsByClassName('fontLoader');
	while ( elements.length > 0 ) {
		const el = elements[0];
		if ( el.parentNode ) {
			el.parentNode.removeChild(el);
		}
	}
}
