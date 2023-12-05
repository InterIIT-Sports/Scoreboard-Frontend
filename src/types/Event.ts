import EventCatagories from "./EventCategories";

export default interface Event {
	_id?: string;
	title: string;
	event: EventCatagories;
	isStarted: boolean;
	isCompleted: boolean;
	startTime: number | string;
	endTime: number | string;
	teams: any[]; // list of teams who are compeating
	roomID: EventCatagories; // event is the roomID for socketIO
	score: {};
}
