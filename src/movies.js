import hash from './hash.js';

global.movies =  [
	// Level 1
	[
		['\u{231B}\u{1F415}', 2009, ['A'].map(title => hash(title))],
		['RUN', 1994, ['B', 'C']],
	],
	// Level 2
	[
		['Film2.1', 2009, ['F'].map(title => hash(title))],
		['Film2.2', 1994, ['FF', 'FFF']],
	],
	// Level 3
	[
		['Film3.1', 2009, ['A'].map(title => hash(title))],
		['Film3.2', 1994, ['AA', 'AAA']],
	]
]