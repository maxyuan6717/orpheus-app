import { useEffect } from "react";
import FAQ from "../components/faq";
import ThankYou from "../components/thankyou";

const FAQPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="fade-in">
      <FAQ />
      <ThankYou />
    </div>
  );
};

export default FAQPage;
