class CameraBehavior extends Sup.Behavior {
	ray: Sup.Math.Ray;

	awake() {
		Game.Button_tween_is_finish = false;
		this.ray = new Sup.Math.Ray(this.actor.getPosition(), new Sup.Math.Vector3(0,0,-1));
	}

	update() {
		this.ray.setFromCamera(this.actor.camera, Sup.Input.getMousePosition());
		
		if(Game.currentScene === "Game Scene") {
			if( this.ray.intersectActor(Sup.getActor("Hud").getChild("Button").getChild("New Game")).length > 0 && Game.Button_tween_is_finish) {
				if( Sup.Input.wasMouseButtonJustPressed(0) ) {
					Sup.loadScene("Game Scene");
				}
			}
			if( this.ray.intersectActor(Sup.getActor("Hud").getChild("Button").getChild("Menu")).length > 0 && Game.Button_tween_is_finish ) {
				if( Sup.Input.wasMouseButtonJustPressed(0) ) {
					Sup.getActor("World").getBehavior(WorldBehavior).fadeOut_tween.start();
				}
			}
		} else if(Game.currentScene === "Title Scene") {
			if( this.ray.intersectActor(Sup.getActor("Title").getChild("Start")).length > 0 ) {
				if( Sup.Input.wasMouseButtonJustPressed(0) ) {
					//Sup.loadScene("Game Scene");
					Sup.getActor("World").getBehavior(TitleBehavior).fadeOut_tween.start();
				}
			}
		}
		
		Sup.log(Game.Button_tween_is_finish)
	}
}
Sup.registerBehavior(CameraBehavior);
