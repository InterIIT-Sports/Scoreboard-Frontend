import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./header.css";
function Header() {
	const Navigate = useNavigate();
	const [headerBackground, setHeaderBackground] = useState("transparent");
	const [showNavbar, setShowNavbar] = useState(false);
	const color = "white";
	// const anticolor = color === "white" ? "black" : "white";
	const linkbg = color;

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setHeaderBackground("#fff");
				(
					document.getElementsByClassName(
						"cm-header-wrap"
					) as HTMLCollectionOf<HTMLElement>
				)[0].style.marginTop = "-1px";
				if (window.innerWidth > 991) {
					(
						document.getElementsByClassName(
							"cm-menu-inner"
						) as HTMLCollectionOf<HTMLElement>
					)[0].style.boxShadow = "0 0 2rem 0 rgba(0,0,0,0.2)";
				}
				// color === 'white' ? setLinkbg(anticolor) : setLinkbg(color)
			} else {
				color === "white"
					? setHeaderBackground("transparent")
					: setHeaderBackground("#fff");
				if (window.innerWidth > 991) {
					(
						document.getElementsByClassName(
							"cm-header-wrap"
						) as HTMLCollectionOf<HTMLElement>
					)[0].style.marginTop = "15px";
					(
						document.getElementsByClassName(
							"cm-menu-inner"
						) as HTMLCollectionOf<HTMLElement>
					)[0].style.boxShadow = "none";
				}
				// setLinkbg(color)
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleFooterLink = () => {
		const element = document.getElementsByClassName("footer-div")[0];
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		} else {
			Navigate("/");
			setTimeout(() => {
				const updatedElement = document.getElementsByClassName("footer-div")[0];
				if (updatedElement) {
					updatedElement.scrollIntoView({ behavior: "smooth" });
				}
			}, 500);
		}
	};
	const HomeLink = () => {
		const element = document.getElementsByClassName("logos")[0];
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		} else {
			Navigate("/");
			setTimeout(() => {
				const updatedElement = document.getElementsByClassName("logos")[0];
				if (updatedElement) {
					updatedElement.scrollIntoView({ behavior: "smooth" });
				}
			}, 500);
		}
	};
	return (
		<section className="header">
			<div className="logos">
				<Link to="/">
					<img
						alt="InterIIT Logo"
						className="company-logo"
						src="../favicon.ico"
					/>
				</Link>
			</div>
			<div
				className="cm-header-wrap"
				style={{ backgroundColor: headerBackground }}
			>
				<div className="cm-menu-wrap">
					<div
						onClick={() => setShowNavbar((prev) => !prev)}
						className="cm-menu-btn fa fa-bars"
					></div>
					<div className={"cm-menu-inner " + (showNavbar ? "show" : "")}>
						<ul className="menu-ul clear-all">
							<li className="has-child">
								<div
									onClick={HomeLink}
									className="about-link links"
									style={{ color: linkbg }}
								>
									<Link
										target="blank"
										to="https://interiit.in/#/"
										className="links"
										style={{ color: linkbg }}
									>
										Home
									</Link>
								</div>
							</li>
							<li className="has-child">
								<Link to="/" className="link1 links" style={{ color: linkbg }}>
									Live Scores
								</Link>
							</li>
							<li className="has-child">
								<Link
									target="blank"
									to="https://interiit.in/#/Schedule"
									className="link1 links"
									style={{ color: linkbg }}
								>
									Schedule
								</Link>
							</li>
							<li className="has-child">
								{/* <a href="https://interiit.in/#/Results" >Results</a> */}
								<Link
									target="blank"
									to="https://interiit.in/#/Results"
									className="link1 links"
									style={{ color: linkbg }}
								>
									Results
								</Link>
							</li>
							<li className="has-child">
								<div
									onClick={handleFooterLink}
									className="link1 links contact-link"
									style={{ color: linkbg, fontSize: "1.4rem" }}
								>
									Contact us
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Header;
