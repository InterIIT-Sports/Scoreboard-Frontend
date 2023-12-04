import { useEffect } from "react";
import Event from "../types/Event";
import EventCatagories from "../types/EventCategories";
import FootballEvent from "../types/FootballEvent";
import FootballEventBox from "./LiveEventBoxes/FootballEventBox";
import { socket } from "../Utilities/Socket";

const LiveScoresBox = ({
	event,
	onScoreUpdate,
}: {
	event: Event;
	onScoreUpdate: (score: {}, eventID: string) => void;
}) => {
	useEffect(() => {
		socket.emit("subscribe", event.roomID);
		socket.on(`scoreUpdate/${event.roomID}`, (data: string) =>
			onScoreUpdate(JSON.parse(data), event._id!)
		);

		return () => {
			socket.emit("unsubscribe", event.roomID);
			socket.off(`scoreUpdate/${event.roomID}`, (data: string) =>
				onScoreUpdate(JSON.parse(data), event._id!)
			);
		};
	}, [event, onScoreUpdate]);

	const getEventBox = (event: Event): React.JSX.Element => {
		switch (event.event) {
			case EventCatagories.FOOTBALL:
				return <FootballEventBox event={event as FootballEvent} />;
			default:
				return <></>;
		}
	};
	return getEventBox(event);
};

export default LiveScoresBox;