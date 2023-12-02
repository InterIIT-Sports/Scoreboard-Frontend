import Event from "../types/Event";
import LiveScoresBox from "./LiveScoresBox";

const LiveEventsViewer = ({ liveEvents }: { liveEvents: Event[] }) => {
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
