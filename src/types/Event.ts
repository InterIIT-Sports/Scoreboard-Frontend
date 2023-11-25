import EventCatagories from "./EventCategories";

export default interface Event {
	_id?: string;
	title: string;
	event: EventCatagories;
	isStarted: boolean;
	startTime: number;
	endTime: number;
	teams: any[]; // list of teams who are compeating
	roomID: EventCatagories; // event is the roomID for socketIO
	score: {};
}
