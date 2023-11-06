import "./SplashScreen.css";
import irpLogo from "../imgs/lR&P-logo.webp";

const SplashScreen = () => {
  return (
    <>
      <div className="splashScreen">
        <img className="logo" src={irpLogo} alt="IR&P logo" />
      </div>
    </>
  );
};

export default SplashScreen;
