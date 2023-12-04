/* eslint-disable react-hooks/exhaustive-deps */
import "./EditScores.css";
import { useEffect, useMemo, useState } from "react";
import Event from "../../types/Event";
import EventCatagories from "../../types/EventCategories";
import FootballEvent, { FootballScore } from "../../types/FootballEvent";
import FootballEventBox from "../../components/LiveEventBoxes/FootballEventBox";
import API from "../../Utilities/ApiEndpoints";
import { useAuthHeader } from "react-auth-kit";

const EditScores = () => {
	const getAccessToken = useAuthHeader();
	const [loading, setLoading] = useState(true);

	const [allEvents, setallEvents] = useState<Event[]>([]);
	const liveEvents = useMemo(
		() => allEvents.filter((event) => event.isStarted),
		[allEvents]
	);

	const fetchEvents = async () => {
		const result: Event[] = (await API.GetEvents()).data;
		setallEvents(result);
		setLoading(false);
	};

	const handleScoreUpdate = async (id: string, score: FootballScore) => {
		await API.UpdateFootballScores(getAccessToken(), id, score);
		const newEvents = allEvents.map((e) => {
			if (e._id === id) return { ...e, score: score };
			else return e;
		});
		setallEvents(newEvents);
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	const getEventBox = (event: Event, i: number): React.JSX.Element => {
		switch (event.event) {
			case EventCatagories.FOOTBALL:
				return (
					<FootballEventBox
						isAdmin
						onScoreUpdate={(score) => handleScoreUpdate(event._id!, score)}
						key={i}
						event={event as FootballEvent}
					/>
				);
			default:
				return <></>;
		}
	};

	return (
		<div className="usersContainer">
			<div className="top" style={{ fontWeight: "600" }}>
				Live Events
			</div>
			<div className="main">
				{!loading ? (
					liveEvents && (
						<section className="liveEvents">
							{liveEvents.map((event, i) => getEventBox(event, i))}
						</section>
					)
				) : (
					<>Loading Events Data...</>
				)}
				<section className="liveAbleEvents">
					{allEvents.map((event, i) => (
						<div key={i}>
							{event.event} - {event.title} - Start Time:{" "}
							{new Date(event.startTime).toLocaleString("en-US", {
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							})}{" "}
							- {event.isStarted ? "Is Live" : "Not Live"}
							<ul>
								{event.teams.map((team, i) => (
									<li key={i}>{team.name} </li>
								))}
							</ul>
							<button
								className="styledButton"
								onClick={async () => {
									await API.ToggleEventStatus(getAccessToken(), event._id!);
									fetchEvents();
								}}
							>
								Toggle Live
							</button>
						</div>
					))}
				</section>
			</div>
		</div>
	);
};

export default EditScores;
