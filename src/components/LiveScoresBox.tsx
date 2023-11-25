import { useEffect, useState } from "react";
import Event from "../types/Event";
import EventCatagories from "../types/EventCategories";
import FootballEvent from "../types/FootballEvent";
import FootballEventBox from "./LiveEventBoxes/FootballEventBox";
import { socket } from "../Utilities/Socket";

const LiveScoresBox = ({ event }: { event: Event }) => {
	const [liveEvent, setLiveEvent] = useState(event);

	useEffect(() => {
		const updateScore = (data: string) => {
			const score = JSON.parse(data);
			console.log(score);
			setLiveEvent((prev) => {
				return { ...prev, score };
			});
		};

		socket.emit("subscribe", EventCatagories.FOOTBALL);
		socket.on(`scoreUpdate/${event.roomID}`, updateScore);

		return () => {
			socket.emit("unsubscribe", event.roomID);
			socket.off(`scoreUpdate/${event.roomID}`, updateScore);
		};
	}, [event]);

	const getEventBox = (event: Event): React.JSX.Element => {
		switch (event.event) {
			case EventCatagories.FOOTBALL:
				return <FootballEventBox event={event as FootballEvent} />;
			default:
				return <></>;
		}
	};
	return getEventBox(liveEvent);
};

export default LiveScoresBox;
