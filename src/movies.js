import hash from './hash.js';

export default [
	// Level 1
	[
		['\u{231B}\u{1F415}', 2009, ['A'].map(title => hash(title))],
		['RUN', 1994, ['B', 'C'].map(title => hash(title))],
	],
	// Level 2
	[
		['Film2.1', 2009, ['A'].map(title => hash(title))],
		['Film2.2', 1994, ['B', 'C'].map(title => hash(title))],
	],
	// Level 3
	[
		['Film3.1', 2009, ['A'].map(title => hash(title))],
		['Film3.2', 1994, ['AA', 'AAA'].map(title => hash(title))],
	]
]
