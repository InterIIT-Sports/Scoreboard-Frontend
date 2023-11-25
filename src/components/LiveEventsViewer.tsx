import { useEffect, useState } from "react";
import Event from "../types/Event";
import LiveScoresBox from "./LiveScoresBox";
import API from "../Utilities/ApiEndpoints";

const LiveEventsViewer = () => {
	const [liveEvents, setLiveEvents] = useState<Event[]>();

	const fetchLiveEvents = async () => {
		const result: Event[] = (await API.GetEvents()).data;
		const liveEvents = result.filter((event) => event.isStarted);
		setLiveEvents(liveEvents);
	};

	useEffect(() => {
		fetchLiveEvents();
	}, []);

	return (
		<div className={liveEvents ? "liveEvents" : "liveEvents wire"}>
			{liveEvents ? (
				liveEvents.map((event, i) => <LiveScoresBox event={event} key={i} />)
			) : (
				<>No Live Events Right Now!</>
			)}
		</div>
	);
};

export default LiveEventsViewer;
