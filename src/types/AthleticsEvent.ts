import AthleticsEventTypes from "./AthleticsEventTypes";
import Event from "./Event";

export default interface AthleticsEvent extends Event {
	athleticsEventType: AthleticsEventTypes;
	participants: [
		{ name: string; team: string; distance?: number; time?: number }[]
	];
}
