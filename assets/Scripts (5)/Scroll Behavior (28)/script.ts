class ScrollBehavior extends Sup.Behavior {
	speed: number = 0;

	awake() {
	}

	update() {
		
		// Si le jeu est lancé , apres avoir touché l'ecran
		if( Game.start && Game.canMove ) {
			let pos = this.actor.getPosition().toVector2();

			pos.x -= this.speed * fps.getDT();

			if(pos.x <= -384) pos.x = 0;

			this.actor.setPosition(pos);
		}
	}
}
Sup.registerBehavior(ScrollBehavior);
