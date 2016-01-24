class PipeBehavior extends Sup.Behavior {
	speed: number = 180;

	pipe_haut : Sup.Actor;
	pipe_bas : Sup.Actor;

	addScore: boolean;

	awake() {
		//Sup.log(this.actor.arcadeBody2D.getVelocityX())
		this.pipe_haut = this.actor.getChild("pipe_haut");
		this.pipe_bas = this.actor.getChild("pipe_bas");
		
		this.pipe_bas.arcadeBody2D.setCustomGravity(0,0);
		this.pipe_haut.arcadeBody2D.setCustomGravity(0,0);
		
		this.addScore = false;
	}

	update() {
		if(Game.canMove) {
			let pos = this.actor.getPosition().toVector2();

			if( (this.actor.getX() <= Game.player.getX()) && !this.addScore ) {
				Game.setScore(1);
				this.addScore = true;
			}

			pos.x -= this.speed * fps.getDT(); // * Clock.getDelta();

			if(pos.x <= -64) {
				this.actor.destroy();
			} else {
				this.pipe_bas.arcadeBody2D.warpPosition( this.pipe_bas.getX(), this.pipe_bas.getY()	);
				this.pipe_haut.arcadeBody2D.warpPosition( this.pipe_haut.getX(), this.pipe_haut.getY()	);
				this.actor.setPosition(pos);
			}
		}
	}
}
Sup.registerBehavior(PipeBehavior);
