import Event from "../types/Event";
import "./UpcomingEventsViewer.css";

export const StartingDate = 15;

const UpcomingEventsViewer = ({
	events,
	heading,
}: {
	events: Event[];
	heading?: React.JSX.Element;
}) => {
	return (
		<div className={events.length !== 0 ? "allEvents" : "allEvents wire"}>
			{heading}
			{events.length !== 0 ? (
				events.map((event, i) => (
					<div key={i} className="fjalla">
						<div className="vertical-line-blue"></div>
						<div className="event-event">{event.event}</div>
						<div className="vertical-line-grey"></div>
						<span>{event.title}</span>
						<span>{event.subtitle}</span>
						<span style={{ color: "rgb(127, 132, 140)" }}>
							Day {new Date(event.startTime).getDate() - StartingDate + 1} -{" "}
							{new Date(event.startTime).toLocaleString("en-US", {
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							})}{" "}
						</span>
						<ul>
							{event.teams.map((team, i) => (
								<li key={i}>{team.name} </li>
							))}
						</ul>
					</div>
				))
			) : (
				<>No Upcoming Events!</>
			)}
		</div>
	);
};

export default UpcomingEventsViewer;
