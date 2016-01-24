class TitleBehavior extends Sup.Behavior {
	fadeIn_tween: TWEEN.Tween;
	fadeOut_tween: TWEEN.Tween;
	music: Sup.Audio.SoundPlayer;

	awake() {
		let self = this;
		Game.currentScene = "Title Scene";
		this.fadeIn_tween = new TWEEN.Tween( {opacity:1} ).to( {opacity: 0}, 1000 ).onUpdate( function() { Sup.getActor("Fade").spriteRenderer.setOpacity(this.opacity); } );
		this.fadeOut_tween = new TWEEN.Tween( {opacity:0} ).to( {opacity: 1}, 1000 ).onUpdate( function() { Sup.getActor("Fade").spriteRenderer.setOpacity(this.opacity); } )
			.onComplete(function() { self.music.stop(); Sup.loadScene("Game Scene"); });
		Game.start = true;
		Game.canMove = true;
		Game.Best_score = parseInt(Sup.Storage.get("BestScore", "0"));
	}

	start() {
		this.fadeIn_tween.start();
		this.music = new Sup.Audio.SoundPlayer("Music/Music_title", 0.1, {loop: true});
		this.music.play();
	}

	update() {
		fps.updateFps();
		TWEEN.update();
	}
}
Sup.registerBehavior(TitleBehavior);
