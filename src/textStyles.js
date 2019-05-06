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
style.set('Gray', {color: '#AAAAAA'});

style.set('Big', {fontSize: 100});
style.set('Sized', {fontSize: 50});

style.set('Title', {styles: ['Noto', 'TextColor'], fontSize: 64});
style.set('HintBubble', {styles: ['Noto', 'LightColor', {fontSize: 40}]});
style.set('Text', {styles: ['Noto', 'TextColor', {fontSize: 40}]});
style.set('Button', {styles: ['Noto', 'ButtonColor', 'Sized']});

style.set('AnswerInput', {styles: ['Noto', 'TextColor', 'Sized']});

style.set('MovieEmoji', { styles: ['Emoji'], fontSize: 70, color: '#404040' });
style.set('MovieEmojiDone', { styles: ['MovieEmoji', 'Green'] });

style.set('appBackGround', {color: '#F7F7F7', colorInt: 0xF7F7F7, r: 0xF7 , g: 0xF7, b: 0xF7});
