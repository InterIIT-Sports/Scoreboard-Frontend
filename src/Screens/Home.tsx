import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header/header";
import LiveEventsViewer from "../components/LiveEventsViewer";
import { socket } from "../Utilities/Socket";
import API from "../Utilities/ApiEndpoints";
import Event from "../types/Event";
import SplashScreen from "../components/SplashScreen";
import UpcomingEventsViewer from "../components/UpcomingEventsViewer";
import "./styles/Home.css";
import PastGamesResultsViewer from "../components/PastGamesResultsViewer";
import Footer from "../components/Footer/Footer";

const UPCOMING_EVENTS_LIMIT_BUFFER = 12 * 60 * 60 * 1000;

const Home = () => {
	const [events, setEvents] = useState<Event[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const liveEvents = useMemo(
		() => events.filter((event) => event.isStarted),
		[events]
	);

	const upcomingEvents = useMemo(
		() =>
			events.filter(
				(event) =>
					(event.endTime as number) > new Date().getTime() &&
					event.isStarted === false &&
					event.isCompleted === false
			),
		[events]
	);

	const pastEvents = useMemo(() => {
		let fEvents = events.filter((e) => e.isCompleted);
		fEvents.sort(
			(e1, e2) => (e1.startTime as number) - (e2.startTime as number)
		);
		fEvents.reverse();
		return fEvents;
		// recently ended events first
	}, [events]);

	const fetchEvents = async () => {
		const result: Event[] = (await API.GetEvents()).data;
		result.sort(
			(e1, e2) => (e1.startTime as number) - (e2.startTime as number)
		);
		setEvents(result);
		setIsLoading(false);
	};

	const updateScoreOfEvent = (score: {}, eventID: string) => {
		setEvents((prev) =>
			prev.map((event) => (eventID === event._id ? { ...event, score } : event))
		);
	};

	useEffect(() => {
		const updateEventsStatus = (data: string) => {
			const eventToBeUpdated = JSON.parse(data);
			setEvents((prev) =>
				prev.map((event) =>
					eventToBeUpdated.eventID === event._id
						? {
								...event,
								isStarted: eventToBeUpdated.isStarted,
								winner: eventToBeUpdated.winner,
								isCompleted: eventToBeUpdated.isCompleted,
						  }
						: event
				)
			);
		};

		socket.on("connect", () => console.log("connected WS"));
		fetchEvents();
		socket.on("eventStartOrEnd", updateEventsStatus);

		return () => {
			socket.off("connect");
			socket.off("eventStartOrEnd", updateEventsStatus);
		};
	}, []);

	return (
		<>
			{isLoading ? (
				<SplashScreen />
			) : (
				<>
					<div className="navbar">
						<Header />
					</div>
					<div className="content">
						<LiveEventsViewer
							onScoreUpdate={updateScoreOfEvent}
							liveEvents={liveEvents}
						/>
						<div className="bottomContainer">
							<div className="leftContainer">
								<UpcomingEventsViewer
									heading={
										<h3
											style={{ marginTop: "0", marginBlockEnd: "0.5em" }}
											className="wire"
										>
											Upcoming Events!
										</h3>
									}
									events={upcomingEvents.filter(
										(e) =>
											(e.startTime as number) <
											Date.now() + UPCOMING_EVENTS_LIMIT_BUFFER
									)}
								/>
							</div>
							<PastGamesResultsViewer events={pastEvents} />
						</div>
					</div>
					<Footer />
				</>
			)}
		</>
	);
};

export default Home;
