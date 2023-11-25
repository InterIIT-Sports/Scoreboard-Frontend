import { useEffect } from "react";
import Header from "../components/Header/header";
import LiveEventsViewer from "../components/LiveEventsViewer";
import { socket } from "../Utilities/Socket";

const Home = () => {
	useEffect(() => {
		socket.on("connect", () => console.log("connected"));

		return () => {
			socket.off("connect");
		};
	}, []);

	return (
		<>
			<div className="navbar">
				<Header />
			</div>
			<div className="content">
				<div className="leftContainer">
					<LiveEventsViewer />
					<div className="wire allEvents">
						All Events sorted according to time of event
					</div>
				</div>
				<div className="wire rightContainer">Past Games Results</div>
			</div>
			<div className="wire footer">Footer</div>
		</>
	);
};

export default Home;
