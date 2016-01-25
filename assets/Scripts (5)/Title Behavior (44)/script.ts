class TitleBehavior extends Sup.Behavior {
	fadeIn_tween: TWEEN.Tween;
	fadeOut_tween: TWEEN.Tween;

	awake() {
		Game.music_title.stop();
		Game.currentScene = "Title Scene";
		
		this.fadeIn_tween = new TWEEN.Tween( {opacity:1} )
			.to( {opacity: 0}, 1000 )
			.onUpdate( function() { Sup.getActor("Fade").spriteRenderer.setOpacity(this.opacity); } );
		
		this.fadeOut_tween = new TWEEN.Tween( {opacity:0} )
			.to( {opacity: 1}, 1000 )
			.onUpdate( function() { Sup.getActor("Fade")
			.spriteRenderer.setOpacity(this.opacity); } )
			.onComplete(function() { Game.music_title.stop(); Sup.loadScene("Game Scene"); });
		
		Game.start = true;
		Game.canMove = true;
		Game.Best_score = parseInt(Sup.Storage.get("BestScore", "0"));
	}

	start() {
		this.fadeIn_tween.start();
		Game.music_title.play();
	}

	update() {
		fps.updateFps();
		TWEEN.update();
	}
}
Sup.registerBehavior(TitleBehavior);
