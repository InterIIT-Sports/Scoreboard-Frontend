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
		<>
			{liveEvents.length !== 0 && (
				<h3
					style={{
						marginTop: "0em",
						marginBlockEnd: "0em",
						justifyContent: "center",
						paddingTop: "10px",
						paddingBottom: "10px",
						fontSize: "1.8em",
						fontWeight: 900,
					}}
					className="wire"
				>
					Live Scores
				</h3>
			)}
			<div
				className={
					liveEvents.length !== 0 ? "home liveEvents" : "home liveEvents wire"
				}
			>
				{liveEvents.length !== 0 ? (
					liveEvents.map((event, i) => (
						<LiveScoresBox
							onScoreUpdate={onScoreUpdate}
							event={event}
							key={i}
						/>
					))
				) : (
					<>No Live Events Right Now!</>
				)}
			</div>
		</>
	);
};

export default LiveEventsViewer;
