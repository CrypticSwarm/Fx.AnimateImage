Fx.AnimateImage
===========
For multiple named animation sequences on an sprite sheet.

How to use
-----------------
Create an Animation sequence object and add names of animations and what frame the animation begins and ends.

var anims = new Animations({
		anims: {
			walk_left:  { start: 0, end: 7 },
			walk_right: { start: 8, end: 15 },
			walk_front: { start: 16, end: 23 },
			walk_back:  { start: 24, end: 31 },
			dance:      { start: 32, end: 39 }
		},
		frameSize: { x: 128, y: 128 },
		cols: 8
});
var animImg = new Fx.AnimateImage(anims, $('anim'), 'imgName.png');

