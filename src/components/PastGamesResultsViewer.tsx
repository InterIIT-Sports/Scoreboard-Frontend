import Event from "../types/Event";
import { formatEventName } from "../types/EventCategories";
import TennisEvent from "../types/TennisEvent";
import "./PastGamesResultsViewer.css";

const PastGamesResultsViewer = ({ events }: { events: Event[] }) => {
	return (
		<div
			className={events.length === 0 ? "wire rightContainer" : "rightContainer"}
		>
			{events.length === 0 ? (
				<>Past Games Results</>
			) : (
				<>
					<h3
						style={{ marginTop: "0.5em", marginBlockEnd: "0.5em" }}
						className="wire"
					>
						Recent Results
					</h3>
					<section className="resultsLogsContainer">
						{events.map((e, i) => (
							<ResultLog key={i} event={e} />
						))}
					</section>
				</>
			)}
		</div>
	);
};

export default PastGamesResultsViewer;

const ResultLog = ({ event }: { event: Event }) => {
	const getOppName = (e: Event): string => {
		for (let i = 0; i < e.teams.length; i++) {
			const team = e.teams[i];
			if (team.name !== e.winner?.team?.name) return team.name;
		}
		return "-";
	};

	return (
		<div className="resultLog fjalla">
			<span className="winner">{event.winner?.team?.name}</span> won{" "}
			{formatEventName(event.event)}
			{(event as TennisEvent)?.matchType
				? "(" + (event as TennisEvent)?.matchType + ")"
				: null}{" "}
			{event.title} | {event.subtitle}, against{" "}
			<span className="loser">{getOppName(event)}</span>
		</div>
	);
};
