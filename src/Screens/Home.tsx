import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header/header";
import LiveEventsViewer from "../components/LiveEventsViewer";
import { socket } from "../Utilities/Socket";
import API from "../Utilities/ApiEndpoints";
import Event from "../types/Event";
import SplashScreen from "../components/SplashScreen";

const Home = () => {
	const [events, setEvents] = useState<Event[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchEvents = async () => {
		const result: Event[] = (await API.GetEvents()).data;
		setEvents(result);
		setIsLoading(false);
	};

	useEffect(() => {
		socket.on("connect", () => console.log("connected WS"));
		fetchEvents();

		return () => {
			socket.off("connect");
		};
	}, []);

	const liveEvents = useMemo(
		() => events.filter((event) => event.isStarted),
		[events]
	);

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
							<LiveEventsViewer liveEvents={liveEvents} />
							<div className="wire allEvents">
								All Events sorted according to time of event
							</div>
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
