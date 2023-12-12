/* eslint-disable react-hooks/exhaustive-deps */
import "./EditScores.css";
import { useEffect, useMemo, useState, useContext, useRef } from "react";
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
import AthleticsEvent, { Participant } from "../../types/AthleticsEvent";
import { AthleticsEventWithDistance } from "../../types/AthleticsEventTypes";

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
	const [eventToToggle, setEventToToggle] = useState<Event>();
	const confirmToggleDialog = useRef<HTMLDialogElement | null>(null);
	const athlEventWinnerDialog = useRef<HTMLDialogElement | null>(null);

	const openDialog = () => {
		confirmToggleDialog.current?.showModal();
	};
	const closeDialog = () => {
		confirmToggleDialog.current?.close();
		athlEventWinnerDialog.current?.close();
	};

	const fetchEvents = async () => {
		const result: Event[] = (await API.GetEvents()).data;
		setAllEvents(result);
		setLoading(false);
	};

	const handleScoreUpdate = async (id: string, score: any) => {
		try {
			await API.UpdateScore(getAccessToken(), id, score);
			const newEvents = allEvents.map((e) => {
				if (e._id === id) return { ...e, score: score };
				else return e;
			});
			setAllEvents(newEvents);
		} catch (error: any) {
			try {
				setToast(JSON.parse(error.request.response).message);
			} catch {
				setToast("Could not connect with the Server");
				console.log(error);
			}
		}
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	const getEventBox = (event: Event, i: number): React.JSX.Element => {
		console.log(event.event);
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
			case EventCatagories.SQUASH_MEN:
			case EventCatagories.SQUASH_WOMEN:
				return (
					<SquashEventBox
						isAdmin
						onScoreUpdate={(score) => handleScoreUpdate(event._id!, score)}
						key={i}
						event={event as SquashEvent}
					/>
				);
			case EventCatagories.TENNIS_MEN:
			case EventCatagories.TENNIS_WOMEN:
				return (
					<TennisEventBox
						isAdmin
						onScoreUpdate={(score) => handleScoreUpdate(event._id!, score)}
						key={i}
						event={event as TennisEvent}
					/>
				);
			default:
				console.log("no card" + event.event);
				return <></>;
		}
	};

	return (
		<div className="usersContainer">
			<div className="top" style={{ fontWeight: "600" }}>
				Live Events
				<dialog ref={confirmToggleDialog}>
					<button className="styledButton" onClick={closeDialog}>
						Close
					</button>
					<h3>Caution</h3>
					Are you sure you want to end this event?
					<br />{" "}
					<b>
						{eventToToggle?.event}{" "}
						{eventToToggle?.event === EventCatagories.ATHLETICS
							? (eventToToggle as AthleticsEvent)?.athleticsEventType
							: eventToToggle?.title}{" "}
						|{" "}
						{eventToToggle?.event === EventCatagories.ATHLETICS
							? (eventToToggle as AthleticsEvent)?.title
							: eventToToggle?.subtitle}
					</b>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							if (eventToToggle?.event === EventCatagories.ATHLETICS) {
								confirmToggleDialog.current?.close();
								athlEventWinnerDialog.current!.showModal();
								return;
							}
							try {
								await API.ToggleEventStatus(
									getAccessToken(),
									eventToToggle!._id!
								);
								setToast("Successfull");
								setLoading(true);
								fetchEvents();
							} catch (error: any) {
								try {
									setToast(JSON.parse(error.request.response).message);
								} catch {
									setToast("Could not connect with the Server");
									console.log(error);
								}
							}
							confirmToggleDialog.current?.close();
							setEventToToggle(undefined);
						}}
					>
						<button className="styledButton" type="submit">
							Yes
						</button>
					</form>
				</dialog>
				{eventToToggle?.event === EventCatagories.ATHLETICS && (
					<dialog ref={athlEventWinnerDialog}>
						<button className="styledButton" onClick={closeDialog}>
							Close
						</button>
						<h3>
							{(Object.values(AthleticsEventWithDistance) as any[]).includes(
								(eventToToggle as AthleticsEvent).athleticsEventType
							)
								? "Enter Distances (In meter)"
								: "Enter Times (min:sec:millisec)"}
						</h3>
						<AthlEventParticipantDetailsForm
							event={eventToToggle as AthleticsEvent}
							onSuccess={() => {
								athlEventWinnerDialog.current?.close();
								setEventToToggle(undefined);
								setLoading(true);
								fetchEvents();
							}}
						/>
					</dialog>
				)}
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
								-{" "}
								{event.isStarted ? (
									<span className="chip">Is Live</span>
								) : (
									"Not Live"
								)}
								<ul>
									{event.event === EventCatagories.ATHLETICS
										? (event as AthleticsEvent).participants[0].map((p, i) => (
												<li key={i}>
													{p.name} : {p.team}
												</li>
										  ))
										: event.teams.map((team, i) => (
												<li key={i}>{team.name} </li>
										  ))}
								</ul>
								<button
									className="styledButton"
									onClick={async () => {
										if (event!.isStarted) {
											if ((event!.endTime as number) > new Date().getTime()) {
												setToast("Can't end this event right now!");
												return;
											}
											setEventToToggle(event);
											openDialog();
										} else {
											try {
												await API.ToggleEventStatus(
													getAccessToken(),
													event!._id!
												);
												setToast("Successfull");
												setLoading(true);
												fetchEvents();
											} catch (error: any) {
												try {
													setToast(JSON.parse(error.request.response).message);
												} catch {
													setToast("Could not connect with the Server");
													console.log(error);
												}
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

const AthlEventParticipantDetailsForm = ({
	event,
	onSuccess,
}: {
	event: AthleticsEvent;
	onSuccess: () => void;
}) => {
	const getAccessToken = useAuthHeader();
	const setToast = useContext(ToastContext).setToastMessage;
	const [participants, setParticipants] = useState(event.participants[0]);

	const getMillis = (time: string) => {
		const timeParts = time.split(":");
		let millis = Number(timeParts[0]) * 60 * 1000;
		if (timeParts.length >= 2) millis += Number(timeParts[1]) * 1000;
		if (timeParts.length >= 3) millis += Number(timeParts[2]);
		return millis;
	};

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				let newParticipants: Participant[] = [];
				participants.forEach((p) => {
					if (p.detail === undefined) {
						setToast("Incomplete Details");
						return;
					}
					newParticipants.push(
						(Object.values(AthleticsEventWithDistance) as any[]).includes(
							(event as AthleticsEvent).athleticsEventType
						)
							? { name: p.name, team: p.team, distance: Number(p.detail) }
							: { name: p.name, team: p.team, time: getMillis(p.detail) }
					);
				});
				try {
					await API.SetAthleticsEventDetails(
						getAccessToken(),
						event._id!,
						newParticipants
					);
					await API.ToggleEventStatus(getAccessToken(), event!._id!);
					setToast("Successfull");
					onSuccess();
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
			{participants.map((p, i) => (
				<div>
					<label>{p.name}</label>
					<input
						name="details"
						type="text"
						onChange={(e) =>
							setParticipants(
								participants.map((op) =>
									op.name === p.name ? { ...op, detail: e.target.value } : op
								)
							)
						}
						value={participants[i].detail}
						className="styledInput"
					/>
				</div>
			))}
			<button className="styledButton" type="submit">
				Submit
			</button>
		</form>
	);
};
