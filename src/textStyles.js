import style from './style.js';

style.set('Noto', {fontFamily: 'Noto Sans'});
style.set('Emoji', {fontFamily: 'Noto Emoji'});

//style.set('TextColor', {color: '#A4A4A4'}); // Static text
//style.set('ButtonColor', {color: '#737373'}); // Clickable text
//style.set('LightColor', {color: '#949494'}); // Light text

style.set('ButtonColor', {color: '#404040'}); // Clickable text
style.set('TextColor', {color: '#737373'}); // Static text
style.set('LightColor', {color: '#A4A4A4'}); // Light text


style.set('Green', {color: '#819B4D'});
style.set('Red', {color: '#FF0000'});
style.set('Gray', {color: '#aaaaaa'});

style.set('Title', {style: ['Noto', 'TextColor', {fontSize: 64}]});
style.set('HintBubble', {style: ['Noto', 'LightColor', {fontSize: 40}]});
style.set('Text', {style: ['Noto', 'TextColor', {fontSize: 40}]});
style.set('Button', {style: ['Noto', 'ButtonColor', {fontSize: 55}]});

style.set('MovieEmoji', { style: ['Emoji', 'TextColor'], fontSize: 70 });
style.set('MovieEmojiDone', { style: ['MovieEmoji', 'Green'] });

style.set('appBackGround', {color: '#F7F7F7', colorInt: 0xF7F7F7, r: 0xF7 , g: 0xF7, b: 0xF7});
