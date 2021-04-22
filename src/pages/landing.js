import { useEffect } from "react";
import Home from "../components/home";
import Addicted from "../components/addicted";
import Description from "../components/description";
import ThankYou from "../components/thankyou";

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="fade-in">
      <Home />
      <Addicted />
      <Description />
      <ThankYou />
    </div>
  );
};

export default Landing;
