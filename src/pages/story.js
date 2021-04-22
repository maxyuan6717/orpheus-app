import { useEffect } from "react";
import Story from "../components/story";
import ThankYou from "../components/thankyou";

const StoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="fade-in">
      <Story />
      <ThankYou />
    </div>
  );
};

export default StoryPage;
