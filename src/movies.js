import hash from './hash.js';

export default [
	// Level 1
	[
		['\u{231B}\u{1F415}', 2009, ['A'].map(title => hash(title))],
		['RUN', 1994, ['B', 'C']],
	]
]