import Event from "../types/Event";
import LiveScoresBox from "./LiveScoresBox";

const LiveEventsViewer = ({
	liveEvents,
	onScoreUpdate,
}: {
	liveEvents: Event[];
	onScoreUpdate: (score: {}, eventID: string) => void;
}) => {
	return (
		<div className={liveEvents.length !== 0 ? "liveEvents" : "liveEvents wire"}>
			{liveEvents.length !== 0 ? (
				liveEvents.map((event, i) => (
					<LiveScoresBox onScoreUpdate={onScoreUpdate} event={event} key={i} />
				))
			) : (
				<>No Live Events Right Now!</>
			)}
		</div>
	);
};

export default LiveEventsViewer;
