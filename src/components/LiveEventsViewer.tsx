import Event from "../types/Event";
import LiveScoresBox from "./LiveScoresBox";

const LiveEventsViewer = ({ liveEvents }: { liveEvents: Event[] }) => {
	return (
		<div className={liveEvents.length !== 0 ? "liveEvents" : "liveEvents wire"}>
			{liveEvents.length !== 0 ? (
				liveEvents.map((event, i) => <LiveScoresBox event={event} key={i} />)
			) : (
				<>No Live Events Right Now!</>
			)}
		</div>
	);
};

export default LiveEventsViewer;
