import { useEffect } from "react";
import Team from "../components/team";
import ThankYou from "../components/thankyou";

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="fade-in">
      <Team />
      <ThankYou />
    </div>
  );
};

export default TeamPage;
