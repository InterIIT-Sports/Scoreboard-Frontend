import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import "./footer.css";
const Footer = () => {
	return (
		<footer style={styles.footer1} className="footer-div">
			<div style={styles.description}>
				<h4 className="CRTDH-name-footer1">Inter IIT Sports Meet 2023</h4>
				<hr></hr>
				<p className="CRTDH-desc">
					Official website of INTER IIT Sports Meet 2023<br></br>Copyright ©
					2023, IIT Gandhinagar, All rights reserved{" "}
				</p>
				<hr />
				<p className="credits CRTDH-desc">
					Live Scoreboard developed with ❤️ by{" "}
					<a target="blank" href="https://www.linkedin.com/in/romit-mohane/">
						Romit
					</a>{" "}
					and{" "}
					<a target="blank" href="https://www.linkedin.com/in/karan-gan/">
						Karan
					</a>{" "}
				</p>
				<hr />
				<div className="social-icons">
					<h4
						className="CRTDH-name-footer1"
						style={{ marginBottom: "0px", marginTop: "30px" }}
					>
						Connect with us!
					</h4>
					<span>
						<a target="blank" href="https://www.facebook.com/interiit19">
							<FacebookIcon />
						</a>
						<a target="blank" href="https://instagram.com/interiit_2023">
							<InstagramIcon />
						</a>
						<a
							target="blank"
							href="https://www.linkedin.com/company/inter-iit-sports-meet-2023/"
						>
							<LinkedInIcon />
						</a>
						{/* <a target='blank' href='https://www.youtube.com/channel/UCAoBCMDA6s-wUOGfKF9c2kQ'><Youtube className="fa-brands youtube1" /></a> */}
					</span>
				</div>
			</div>
			<div className="quick-links-block" style={styles.quickLinks}>
				<h4 className="CRTDH-name-footer1">Quick Links</h4>
				<Link
					target="blank"
					to="https://interiit.in/#/"
					className="quick-links-link"
				>
					{" "}
					<p className="quick-links fjalla">
						<ArrowForwardIcon /> &nbsp;Home
					</p>
				</Link>
				<Link to="/Schedule" className="quick-links-link">
					<p className="quick-links fjalla">
						<ArrowForwardIcon /> &nbsp;Schedule
					</p>
				</Link>
				<Link
					target="blank"
					to="https://interiit.in/#/Results"
					className="quick-links-link"
				>
					<p className="quick-links fjalla">
						<ArrowForwardIcon /> &nbsp;Results
					</p>
				</Link>
			</div>
			<div style={styles.reachUs}>
				<h4 className="CRTDH-name-footer1">Reach Us</h4>
				<p className="Head-office fjalla">
					<HomeOutlinedIcon style={{ fontSize: "2rem" }} />
					&nbsp;&nbsp;Get In Touch
				</p>
				<p className="head-office-address">
					<Link
						to="https://www.google.com/maps/dir//Indian+Institute+Of+Technology+Gandhinagar+(IIT+Gandhinagar)+Indian+Institute+of+Technology+Palaj,+Gujarat+382355/@23.2114236,72.6842489,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x395c2adec1f16d8d:0xdc447b8706689bc3"
						target="_blank"
						style={{ color: "white", textDecoration: "none" }}
					>
						Sports Complex, IIT Gandhinagar, Palaj, Gandhinagar, Gujarat -
						382355
					</Link>{" "}
				</p>
				<hr></hr>
				<p className="Head-office fjalla">
					<CallOutlinedIcon style={{ fontSize: "2rem" }} />
					&nbsp;&nbsp;CALL US
				</p>
				<p className="head-office-address">
					Aman Samria(+91 7357637225) Sports Secretary <br></br>
					Anil Kataria (+91 83858 13914) Overall Coordinator <br></br>
					Suteekshna Mishra (+91 9044412185) Hospitality Core
				</p>
				<hr></hr>
				<p className="Head-office fjalla">
					<EmailOutlinedIcon style={{ fontSize: "2rem" }} />
					&nbsp;&nbsp;Email
				</p>
				<p className="head-office-address">sports.secretary@iitgn.ac.in</p>
			</div>
		</footer>
	);
};

export default Footer;

const styles = {
	footer1: {
		backgroundColor: "#0351a4",
		color: "#fff",
		padding: "20px",
		display: "flex",
		flexWrap: "wrap" as "wrap",
		justifyContent: "space-between",
		marginTop: "50px",
	},
	description: {
		flex: "1 1 30%",
		marginBottom: "20px",
		padding: "20px",
	},
	quickLinks: {
		display: "flex",
		// justifyContent:'center',
		flexDirection: "column" as "column",
		// alignItems:'center',
		flex: "1 1 30%",
		padding: "20px 20px 20px 70px",
	},
	reachUs: {
		flex: "1 1 30%",
		marginBottom: "20px",
		display: "flex",
		// justifyContent:'center',
		flexDirection: "column" as "column",
		alignItems: "left",
		padding: "20px",
	},
};
