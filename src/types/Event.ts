import EventCatagories from "./EventCategories";

export default interface Event {
	_id?: string; // also roomId for socket room
	title: string;
	subtitle?: string;
	event: EventCatagories;
	isStarted: boolean;
	isCompleted: boolean;
	startTime: number | string;
	endTime: number | string;
	teams: any[]; // list of teams who are compeating
	score: {};
	winner?: { team: string };
}
