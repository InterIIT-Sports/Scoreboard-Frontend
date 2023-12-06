import Event from "./Event";

export default interface ChessEvent extends Event {
	winner?: {
		team: string;
		participant: string;
	};
	score: ChessScore;
}

export interface ChessScore {
	teamA_points: number;
	teamB_points: number;
}
