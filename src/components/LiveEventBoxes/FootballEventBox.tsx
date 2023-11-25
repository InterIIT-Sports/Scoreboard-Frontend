import FootballEvent, { FootballScore } from "../../types/FootballEvent";
import "./LiveEventBox.css";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const FootballEventBox = ({
	event,
	isAdmin,
	onScoreUpdate,
}: {
	isAdmin?: boolean;
	onScoreUpdate?: (score: FootballScore) => void;
	event: FootballEvent;
}) => {
	return (
		<div className="liveEventBox">
			<span className="eventCategory">
				<SportsSoccerIcon />
				Football
			</span>
			<h3 className="fjalla">{event.title}</h3>
			<div className="footballScoresContainer">
				<div>
					<h3>{event.teams[0].name}</h3>
					<p>{event.score.teamA_score}</p>
					{isAdmin && (
						<button
							onClick={() => {
								onScoreUpdate!({
									...event.score,
									teamA_score: event.score.teamA_score + 1,
								});
							}}
							className="styledButton"
						>
							Add 1
						</button>
					)}
				</div>
				<p className=" fjalla VS">VS</p>
				<div>
					<h3>{event.teams[1].name}</h3>
					<p>{event.score.teamB_score}</p>
					{isAdmin && (
						<button
							onClick={() => {
								onScoreUpdate!({
									...event.score,
									teamB_score: event.score.teamB_score + 1,
								});
							}}
							className="styledButton"
						>
							Add 1
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default FootballEventBox;
