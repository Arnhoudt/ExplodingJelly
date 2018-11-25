import './style.css';
import 'phaser';
import Game from './js/Game.js';

{
  const init = () => {
    const WebFontConfig = {
      google: {
        families: ['Ubuntu:400,700']
      }
    };

    (function(d) {
      const wf = d.createElement('script'),
        s = d.scripts[0];
      wf.src =
        'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
      wf.async = true;
      s.parentNode.insertBefore(wf, s);
    })(document);
    new Game();
  };
  init();
}
