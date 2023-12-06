import { useEffect } from "react";
import Event from "../types/Event";
import EventCatagories from "../types/EventCategories";
import FootballEvent from "../types/FootballEvent";
import FootballEventBox from "./LiveEventBoxes/FootballEventBox";
import { socket } from "../Utilities/Socket";
import ChessEventBox from "./LiveEventBoxes/ChessEventBox";
import ChessEvent from "../types/ChessEvent";

const LiveScoresBox = ({
	event,
	onScoreUpdate,
}: {
	event: Event;
	onScoreUpdate: (score: {}, eventID: string) => void;
}) => {
	useEffect(() => {
		socket.emit("subscribe", event._id);
		socket.on(`scoreUpdate/${event._id}`, (data: string) =>
			onScoreUpdate(JSON.parse(data), event._id!)
		);

		return () => {
			socket.emit("unsubscribe", event._id);
			socket.off(`scoreUpdate/${event._id}`, (data: string) =>
				onScoreUpdate(JSON.parse(data), event._id!)
			);
		};
	}, [event, onScoreUpdate]);

	const getEventBox = (event: Event): React.JSX.Element => {
		switch (event.event) {
			case EventCatagories.FOOTBALL:
				return <FootballEventBox event={event as FootballEvent} />;
			case EventCatagories.CHESS:
				return <ChessEventBox event={event as ChessEvent} />;
			default:
				return <></>;
		}
	};
	return getEventBox(event);
};

export default LiveScoresBox;
