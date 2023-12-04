import Event from "../../../types/Event";

const UpcomingEventsViewer = ({ events }: { events: Event[] }) => {
	return (
		<div className="allEvents">
			{events.map((event, i) => (
				<div key={i} className="fjalla">
					<div className="vertical-line-blue"></div>
					<div>{event.event}</div>
					<div className="vertical-line-grey"></div>
					<span>{event.title}</span>
					<span style={{ color: "rgb(127, 132, 140)" }}>
						Start Time:{" "}
						{new Date(event.startTime).toLocaleString("en-US", {
							hour: "numeric",
							minute: "numeric",
							hour12: true,
						})}
					</span>
					<ul>
						{event.teams.map((team, i) => (
							<li key={i}>{team.name} </li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default UpcomingEventsViewer;
