import Event from "./Event";

export default interface TennisEvent extends Event {
	matchType: MatchTypes;
	winner?: {
		team: string;
		participants: string[];
	};
	score: TennisScore;
}

export interface TennisScore {
	teamA_points: number;
	teamB_points: number;
}

export enum MatchTypes {
	DOUBLES = "Doubles",
	SINGLES = "Singles",
}
