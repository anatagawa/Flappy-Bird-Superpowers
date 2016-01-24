
//Sup.ArcadePhysics2D.setGravity(0,-0.3);

class WorldBehavior extends Sup.Behavior {
	tick: number = 0;
	time: number = 0;
	pipe: Sup.Actor = null;
	clock: any;
	music: Sup.Audio.SoundPlayer;
	tween: TWEEN.Tween;
	fadeIn_tween: TWEEN.Tween;
	fadeOut_tween: TWEEN.Tween;

	awake() {
		Game.player = Sup.getActor("World").getChild("Player");
		Game.ScoreText = Sup.getActor("World").getChild("Score");
		Game.SF_score = 0;
		Game.addScore = false;
		Game.start = false;
		Game.isDie = false;
		Game.isFalling = false;
		Game.canMove = false;
		Game.currentScene = "Game Scene";
		this.time = 0;
		this.tween = new TWEEN.Tween( {opacity: 1} ).to( {opacity: 0}, 500 ).onUpdate( function() { Sup.getActor("Hud").getChild("get Ready").spriteRenderer.setOpacity(this.opacity); } );
		this.fadeIn_tween = new TWEEN.Tween( {opacity:1} ).to( {opacity: 0}, 1000 ).onUpdate( function() { Sup.getActor("Fade").spriteRenderer.setOpacity(this.opacity); } );
		this.fadeOut_tween = new TWEEN.Tween( {opacity:0} ).to( {opacity: 1}, 1000 ).onUpdate( function() { Sup.getActor("Fade").spriteRenderer.setOpacity(this.opacity); } )
			.onComplete(function() { Sup.loadScene("Title Scene"); });
	}

	start() {
		this.music = new Sup.Audio.SoundPlayer("Music/Music_game", 0.1, {loop: true}); //Sup.Audio.playSound("Music/Music_game", 0.1, {loop: true});
		this.music.play();
		this.fadeIn_tween.start();
	}

	update() {
		fps.updateFps();
		TWEEN.update();
		
		if( Game.start && !Game.isDie && !Game.isFalling ) {
			if( (Clock.getElapsedTime() - this.time) > 0.800) {
				this.addPipe();
				this.time = Clock.getElapsedTime();
			}

			if( Sup.Input.wasMouseButtonJustPressed(0) && Sup.getActor("Player").getY() < 480 ) {
				Sup.Audio.playSound("Sfx/Swing", 0.1, {loop: false});
				Game.player.arcadeBody2D.setVelocity(0,5)
			}
		}
		
		if( Sup.Input.wasMouseButtonJustPressed(0) && !Game.start && !Game.isDie ) {
			Game.start = true;
			Sup.getActor("Hud").getChild("tap").destroy();
			this.tween.start();
			Game.canMove = true;

		}
		
		if(Sup.Input.wasKeyJustPressed("SPACE")) {
			Sup.loadScene("Game Scene");
			this.music.stop();
			Game.pipe_body = [];
		}
		
		if(Game.isDie) {
			this.music.stop();
		}
	}

	addPipe() {
		this.pipe = Sup.appendScene("Pipe Scene", Sup.getActor("World").getChild("Pipe"))[0];

		for(let actor of this.pipe.getChildren()) {
			Game.pipe_body.push(actor.arcadeBody2D);
		}
	
		this.pipe.setPosition(
			416,
			Sup.Math.Random.integer(176,400)
		);
		
	}
}
Sup.registerBehavior(WorldBehavior);