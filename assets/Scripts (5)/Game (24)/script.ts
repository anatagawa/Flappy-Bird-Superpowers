class FPS {
	private fpsRange: number = 0;
	private previousFramesDuration: number[] = [];
	private fps: number = 0;
	private deltaTime: number = 0.0;
	private length: number = 0;
	private tick: number = 0;

	constructor(fpsRange: number) { this.fpsRange = fpsRange; }

	getFps() : number { return Math.floor(this.fps); }
	getDT() : number { return this.deltaTime / 1000; }
	getTick() : number { return this.tick; }

	updateFps() {
		this.tick++;
		var now = new Date().getTime();
		this.previousFramesDuration.push(now);
		this.length = this.previousFramesDuration.length;

		if (this.length >= 2) this.deltaTime = (this.previousFramesDuration[this.length - 1] - this.previousFramesDuration[this.length - 2]);
		
		if (this.length >= this.fpsRange) {
			if (this.length > this.fpsRange) {
				this.previousFramesDuration.splice(0, 1);
				this.length = this.previousFramesDuration.length;
			}
			var sum = 0;
			for (var id = 0; id < this.length - 1; id++) sum += this.previousFramesDuration[id + 1] - this.previousFramesDuration[id];
			this.fps = 1000.0 / (sum / (this.length - 1));
		}
	}
	
	Sign(value) {
		value = +value; // convert to a number
		if (value === 0 || isNaN(value)) return value;
		return value > 0 ? 1 : -1;
	}
}

let fps = new FPS(Sup.Game.getFPS());

declare let SupEngine;
let THREE = SupEngine.THREE;
let Clock = new THREE.Clock(true);

namespace Game {
	export let SF_score: number = 0;
	export let Best_score: number = 0;
	export let addScore: boolean = false;
	export let player: Sup.Actor = null;
	export let ScoreText: Sup.Actor = null;
	export let start: boolean = true;
	export let isDie: boolean = false;
	export let isFalling: boolean = false;
	export let canMove: boolean = true;
	export let pipe_body: any = [];
	export let currentScene: string = "Title Scene";
	
	export function setScore(score) {
		SF_score += score;
		if(SF_score > Best_score) Best_score = SF_score;
		Sup.Storage.set("BestScore", Best_score.toString());
		ScoreText.textRenderer.setText(SF_score);
		Sup.Audio.playSound("Sfx/AddScore", 0.1, {loop: false});
	}
}