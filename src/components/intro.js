import Spacer from "./spacer";
import { Row } from "react-bootstrap";
import Button from "./button";

const Intro = () => {
  return (
    <div>
      <Spacer />
      <div>
        Orpheus Pledge is a guided program to reduce technology dependence. Our
        devices, paired with addictive platforms like Facebook, Youtube, and
        TikTok are double-edged swords— allowing us to connect to friends and
        news and simultaneously controlling our behavior. They're designed to
        hook our attention, exploit our innate need for connection, evolving
        into a danger to the mental well-being of millions.
        <br />
        <br />
        Completely disconnecting from technology is rare these days, so—how do
        we maintain a healthy relationship with our technologies while staying
        present in our daily lives?
        <br />
        <br />
        The Pledge is designed to make you reflect on how you interact with
        technology, your goals, and provides methods of reducing usage of your
        device and select platforms.
        <br />
        <br />
        It will take 15-20 minutes to complete the first few pages of
        assessments and only a few minutes a day to complete the readings and
        exercises. The end goal is for you to be more intentional, aware, and
        reimagine your relationship with technology.
      </div>
      <Spacer />
      <Row className="mx-auto justify-content-center">
        <div>
          <Button to="/0" text="Begin Assessment" width="300px" />
        </div>
      </Row>
    </div>
  );
};

export default Intro;
