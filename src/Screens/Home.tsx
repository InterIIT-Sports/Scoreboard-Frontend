import { useNavigate } from "react-router";

const Home = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="wire navbar">
				<button onClick={() => navigate("/admin")}>admin</button>Navbar
			</div>
			<div className="content">
				<div className="leftContainer">
					<div className="wire liveEvents">Live Events</div>
					<div className="wire allEvents">
						All Events sorted according to time of event
					</div>
				</div>
				<div className="wire rightContainer">IIT Medal Tally/Leaderboard</div>
			</div>
			<div className="wire footer">Footer</div>
		</>
	);
};

export default Home;
