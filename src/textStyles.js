import style from './style.js';

style.set('Noto', {fontFamily: 'Noto Sans'});
style.set('Emoji', {fontFamily: 'Noto Emoji'});
style.set('TextColor', {color: '#4B4B4B'});
style.set('ButtonColor', {color: '#4B4B4B'});

style.set('HintBubble', {style: ['Noto', {color: '#757575'}, {fontSize: 40}]});
style.set('Text', {style: ['Noto', 'TextColor', {fontSize: 40}]});
style.set('Title', {style: ['Noto', 'TextColor', {fontSize: 64}]});
style.set('Button', {style: ['Noto', 'ButtonColor', {fontSize: 55}]});

style.set('appBackGround', {color: '#F7F7F7', colorInt: 0xF7F7F7, r: 0xF7 , g: 0xF7, b: 0xF7});
