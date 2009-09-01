var Animations = new Class({

	Implements: [Options],

	options: {
		cols: 1,
		frameSize: { x: 64, y: 64 },
		anims: {},
	},

	initialize: function(options){
		this.setOptions(options);
		this.size = this.options.frameSize;
		this.anims = this.options.anims;
		this.cols = this.options.cols;
	},

	addAnimation: function(name, start, end){
		this.anims[name] = { start: start, end: end };
	},

	get: function(name){
		return this.anims[name];
	},

	has: function(name){
		return $defined(this.anims[name]);
	}

});

var Fx.AnimateImage = new Class({

	Extends: Fx,

	options: {
		scale: 1,
		fps: 8,
		link: 'chain'
	},

	initialize: function(anims, imgHolder, url, options){
		this.parent(options);
		this.anims = anims;
		this.size = anims.size;
		this.container = imgHolder;
		this.container.setStyle('position', 'relative');
		this.image = new Element('img', { src: url, styles: { position: 'absolute' } }).inject(this.container);
		this.setScale(this.options.scale);
	},

	play: function(name, numTimes, forward){
		this.cancel();
		if(this.anims.has(name)){
			forward = $defined(forward) ? forward : true;
			this.nowPlaying = { anim: this.anims.get(name), name: name, curFrame: this.anims.get(name)[forward ? 'start' : 'end'], numTimes: numTimes || -1, forward: forward };
		}
		this.startTimer();
		this.setFrame();
		return this;		
	},

	start: function(name, numTimes, forward){
		if (!this.check(this.play, name, numTimes, forward)) return this;
		return this.play.apply(this, arguments);
	},

	stop: function(name){
		if(!$defined(name) || this.nowPlaying.name == name) this.cancel();
	},

	step: function(){
		if(!$defined(this.nowPlaying)) return;
		this.setFrame();

		var inc = (this.nowPlaying.forward ? 1 : -1);
		var cycleEndFrame = (this.nowPlaying.forward ? this.nowPlaying.anim.end : this.nowPlaying.anim.start);
		var cycleStartFrame = (this.nowPlaying.forward ? this.nowPlaying.anim.start : this.nowPlaying.anim.end);
		if(this.nowPlaying.curFrame == cycleEndFrame){
			this.nowPlaying.numTimes--;
			this.nowPlaying.curFrame = cycleStartFrame;
			if(this.nowPlaying.numTimes == 0) this.complete();
		}
		else this.nowPlaying.curFrame += inc;
	},

	setFrame: function(){
		if(!$defined(this.nowPlaying)) return;
		var col = this.nowPlaying.curFrame % this.anims.cols , row = (this.nowPlaying.curFrame / this.anims.cols).floor();
		this.image.setStyles({'left': -col * this.size.x * this.scale, 'top': -row * this.size.y * this.scale});
	},

	setScale: function(scale){
		this.scale = scale;
		this.container.setStyles({ width: this.size.x * this.scale, height: this.size.y * this.scale });
		this.image.setStyles({width: (this.scale * this.anims.cols * this.size.x).ceil() });
		this.setFrame();
	}

});
