import { useEffect, useState } from "react";
import Event from "../types/Event";
import LiveScoresBox from "./LiveScoresBox";

const LiveEventsViewer = () => {
	const [liveEvents, setLiveEvents] = useState<Event[]>();

	useEffect(() => {}, []);

	return (
		<div className="wire liveEvents">
			{liveEvents ? (
				liveEvents.map((event, i) => <LiveScoresBox event={event} key={i} />)
			) : (
				<>No Live Events Right Now!</>
			)}
		</div>
	);
};

export default LiveEventsViewer;
