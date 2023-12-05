import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header/header";
import LiveEventsViewer from "../components/LiveEventsViewer";
import { socket } from "../Utilities/Socket";
import API from "../Utilities/ApiEndpoints";
import Event from "../types/Event";
import SplashScreen from "../components/SplashScreen";
import UpcomingEventsViewer from "./Admin/components/UpcomingEventsViewer";
import "./styles/Home.css";

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
				(event) => (event.endTime as number) > new Date().getTime()
			),
		[events]
	);

	const fetchEvents = async () => {
		const result: Event[] = (await API.GetEvents()).data;
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
						? { ...event, isStarted: eventToBeUpdated.isStarted }
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
						<div className="leftContainer">
							<LiveEventsViewer
								onScoreUpdate={updateScoreOfEvent}
								liveEvents={liveEvents}
							/>
							<UpcomingEventsViewer events={upcomingEvents} />
						</div>
						<div className="wire rightContainer">Past Games Results</div>
					</div>
					<div className="wire footer">Footer</div>
				</>
			)}
		</>
	);
};

export default Home;
