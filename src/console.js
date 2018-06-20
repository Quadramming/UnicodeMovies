export default (msg, ...rest) => {
	let out = msg;
	if ( rest.length > 0 ) {
		out = String(msg);
		for ( const msg of rest ) {
			out += ', ' + msg;
		}
	}
	console.log(out);
}

