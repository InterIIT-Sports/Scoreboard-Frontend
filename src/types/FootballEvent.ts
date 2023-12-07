import Event from "./Event";

export default interface FootballEvent extends Event {
	teams: { name: string; points: number }[];
	winner?: {
		team: string;
		participants: string[];
	};
	score: FootballScore;
}

export interface FootballScore {
	teamA_score: number;
	teamB_score: number;
}
