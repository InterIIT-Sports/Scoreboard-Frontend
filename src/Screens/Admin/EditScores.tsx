/* eslint-disable react-hooks/exhaustive-deps */
import "./EditScores.css";
import { useEffect, useMemo, useState, useContext } from "react";
import Event from "../../types/Event";
import EventCatagories from "../../types/EventCategories";
import FootballEvent from "../../types/FootballEvent";
import FootballEventBox from "../../components/LiveEventBoxes/FootballEventBox";
import API from "../../Utilities/ApiEndpoints";
import { useAuthHeader } from "react-auth-kit";
import { ToastContext } from "../../Utilities/ToastContext";
import ChessEventBox from "../../components/LiveEventBoxes/ChessEventBox";
import ChessEvent from "../../types/ChessEvent";
import SquashEventBox from "../../components/LiveEventBoxes/SquashEventBox";
import SquashEvent from "../../types/SquashEvent";
import TennisEventBox from "../../components/LiveEventBoxes/TennisEventBox";
import TennisEvent from "../../types/TennisEvent";
import AthleticsEvent from "../../types/AthleticsEvent";

const EVENT_START_BUFFER = 15 * 60 * 1000; //in milliseconds

const EditScores = () => {
	const getAccessToken = useAuthHeader();
	const setToast = useContext(ToastContext).setToastMessage;

	const [loading, setLoading] = useState(true);

	const [allEvents, setAllEvents] = useState<Event[]>([]);
	const liveEvents = useMemo(
		() => allEvents.filter((event) => event.isStarted),
		[allEvents]
	);
	const liveAbleEvents = useMemo(
		() =>
			allEvents.filter(
				(e) =>
					!e.isCompleted &&
					(e.startTime as number) <= new Date().getTime() + EVENT_START_BUFFER
			),
		[allEvents]
	);

	const fetchEvents = async () => {
		const result: Event[] = (await API.GetEvents()).data;
		setAllEvents(result);
		setLoading(false);
	};

	const handleScoreUpdate = async (id: string, score: any) => {
		await API.UpdateScore(getAccessToken(), id, score);
		const newEvents = allEvents.map((e) => {
			if (e._id === id) return { ...e, score: score };
			else return e;
		});
		setAllEvents(newEvents);
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
			case EventCatagories.CHESS:
				return (
					<ChessEventBox
						isAdmin
						onScoreUpdate={(score) => handleScoreUpdate(event._id!, score)}
						key={i}
						event={event as ChessEvent}
					/>
				);
			case EventCatagories.SQUASH_MEN || EventCatagories.SQUASH_WOMEN:
				return (
					<SquashEventBox
						isAdmin
						onScoreUpdate={(score) => handleScoreUpdate(event._id!, score)}
						key={i}
						event={event as SquashEvent}
					/>
				);
			case EventCatagories.TENNIS_MEN || EventCatagories.TENNIS_WOMEN:
				return (
					<TennisEventBox
						isAdmin
						onScoreUpdate={(score) => handleScoreUpdate(event._id!, score)}
						key={i}
						event={event as TennisEvent}
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
					{liveAbleEvents.length !== 0 ? (
						liveAbleEvents.map((event, i) => (
							<div key={i}>
								{event.event} -{" "}
								{(event as AthleticsEvent).athleticsEventType
									? (event as AthleticsEvent).athleticsEventType + " - "
									: null}
								{event.title} -{" "}
								{new Date(event.startTime).toLocaleDateString("en-GB")} - Start
								Time:{" "}
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
										if (event.isStarted) {
											if (
												(event.endTime as number) - EVENT_START_BUFFER >
												new Date().getTime()
											) {
												setToast("Can't end this event right now!");
												return;
											}
										}
										try {
											await API.ToggleEventStatus(getAccessToken(), event._id!);
											fetchEvents();
										} catch (error: any) {
											try {
												setToast(JSON.parse(error.request.response).message);
											} catch {
												setToast("Could not connect with the Server");
												console.log(error);
											}
										}
									}}
								>
									{event.isStarted ? "End Event" : "Go Live"}
								</button>
							</div>
						))
					) : (
						<>No Events which can be toggled live!</>
					)}
				</section>
			</div>
		</div>
	);
};

export default EditScores;
