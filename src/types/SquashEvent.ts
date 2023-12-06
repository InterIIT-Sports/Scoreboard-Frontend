import Event from "./Event";

export default interface SquashEvent extends Event {
	winner?: {
		team: string;
		participants: string[];
	};
	score: SquashScore;
}

export interface SquashScore {
	teamA_points: number;
	teamB_points: number;
}
