export default () => {
	const style = Phaser.style;
	
	style.set('Noto', {fontFamily: 'Noto Sans'});
	style.set('Black', {color: '#000000'});
	
	style.set('Title', {style: ['Noto', 'Black', {fontSize: 64}]});
	style.set('Button', {style: ['Noto', 'Black', {fontSize: 50}]});
}
