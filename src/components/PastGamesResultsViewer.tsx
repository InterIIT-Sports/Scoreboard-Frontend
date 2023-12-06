import Event from "../types/Event";

const PastGamesResultsViewer = ({ events }: { events: Event[] }) => {
	return (
		<div
			className={events.length === 0 ? "wire rightContainer" : "rightContainer"}
		>
			{events.length === 0 ? (
				<>Past Games Results</>
			) : (
				events.map((e, i) => (
					<div>
						{e.event} {e.title}
					</div>
				))
			)}
		</div>
	);
};

export default PastGamesResultsViewer;
