class PlayerBehavior extends Sup.Behavior {

	old_pos = new Sup.Math.Vector2(0,0);
	collide_pipe = null;
	collide_sol = null;
	pipe_body: Sup.ArcadePhysics2D.Body[] = [];

	result_tween: TWEEN.Tween;
	gameOver_tween: TWEEN.Tween;
	button_tween: TWEEN.Tween;
	score_tween: TWEEN.Tween;

	awake() {
		this.actor.spriteRenderer.setAnimation( `skin_${Sup.Math.Random.integer(1,5)}`, true);
		this.actor.spriteRenderer.stopAnimation();
		Sup.ArcadePhysics2D.setGravity(0,0);
		
		this.gameOver_tween = new TWEEN.Tween( {opacity:0} )
			.to( {opacity: 1}, 500 )
			.onUpdate( function() { Sup.getActor("Hud").getChild("Game Over").spriteRenderer.setOpacity(this.opacity); } );
		
		this.button_tween = new TWEEN.Tween( {y:-40} )
			.to( {y: 156}, 300 )
			.onUpdate( function() { Sup.getActor("Hud").getChild("Button").setY(this.y); } )
			.onComplete(function() { Game.Button_tween_is_finish = true; });
		
		this.result_tween = new TWEEN.Tween( {y:592} )
			.to( {y: 256}, 300 )
			.onUpdate( function() { Sup.getActor("Hud").getChild("Result").setY(this.y); } )
			.chain(this.button_tween);
		
		this.score_tween = new TWEEN.Tween( {opacity:1} )
			.to( {opacity: 0}, 500 )
			.onUpdate( function() { Sup.getActor("Score").textRenderer.setOpacity(this.opacity); } );
	}

	update() {

		this.collide_sol = Sup.ArcadePhysics2D.intersects(this.actor.arcadeBody2D, Sup.getActor("sol_collision").arcadeBody2D);
		if(!Game.isFalling) this.collide_pipe = Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
		
		if(Game.start) {
			Sup.ArcadePhysics2D.setGravity(0,-0.3);
			if(!this.actor.spriteRenderer.isAnimationPlaying()) this.actor.spriteRenderer.playAnimation(true);
			
			if(this.collide_sol) {
				Game.isDie = true;
				this.old_pos = this.actor.getPosition().toVector2().add(0,9);
				Sup.ArcadePhysics2D.setGravity(0,0);
				this.actor.spriteRenderer.stopAnimation();
				if(!Game.isFalling) Sup.Audio.playSound("Sfx/Splash", 0.1, {loop: false});
				this.result_tween.start();
				Sup.Audio.playSound("Sfx/Menu_Show", 0.1, {loop: false});
			}
			
			if(this.collide_pipe && !Game.isFalling) {
				Game.isFalling = true;
				Game.canMove = false;
				this.actor.spriteRenderer.stopAnimation();
				Sup.Audio.playSound("Sfx/Splash", 0.1, {loop: false});
				this.gameOver_tween.start();
				Sup.getActor("Hud").getChild("Result").getChild("BestScore").textRenderer.setText(Game.Best_score);
				Sup.getActor("Hud").getChild("Result").getChild("YourScore").textRenderer.setText(Game.SF_score);
				this.score_tween.start();
			}
			
			this.actor.setLocalEulerZ( Sup.Math.toRadians( 7 * this.actor.arcadeBody2D.getVelocityY() ) );
		}
		
		if(Game.isDie) {
			Game.start = false;
			this.actor.setLocalEulerZ( Sup.Math.toRadians(-90) );
			this.actor.setPosition(this.old_pos);
			this.actor.arcadeBody2D.warpPosition(this.old_pos);
		}
		
		if(Game.isFalling) {
			this.actor.setLocalEulerZ( Sup.Math.toRadians(-90) );
			Sup.ArcadePhysics2D.setGravity(0,-1);
		}
	}
}
Sup.registerBehavior(PlayerBehavior);
