import { useState } from "react";
import { Modal, Row } from "react-bootstrap";
import styled from "styled-components";
import Rating from "react-rating";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Button from "./button";
import { addSurvey } from "../util/api";

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 20px;
  }
`;

const StyledTitle = styled(Modal.Title)`
  font-family: "QuickSand", sans-serif;
`;

const StyledQuestion = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const StyledListItem = styled.li`
  font-size: 20px;
  font-weight: 500;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
`;

const SurveyModal = ({ day_no, show, setShow }) => {
  const star_size = 30;
  const [rating, setRating] = useState();
  const [engaging, setEngaging] = useState();
  const [engaging_comments, setEngagingComments] = useState("");
  const [improve, setImprove] = useState("");
  const [message, setMessage] = useState("");

  const submitSurvey = async () => {
    if (!rating || !engaging) {
      setMessage("Please respond to all questions");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }
    await addSurvey(rating, engaging, engaging_comments, improve, day_no);
    setShow(false);
    setRating(null);
    setEngaging(null);
    setEngagingComments("");
    setImprove("");
  };

  return (
    <StyledModal
      size="lg"
      centered
      show={show}
      onHide={() => {
        setShow(false);
        setRating(null);
        setEngaging(null);
        setEngagingComments("");
        setImprove("");
      }}
    >
      <Modal.Header closeButton>
        <StyledTitle id="contained-modal-title-vcenter">
          Please take 1 minute to help us improve our program
        </StyledTitle>
      </Modal.Header>
      <Modal.Body>
        <ol>
          <StyledListItem>
            <StyledQuestion>
              How has your journey with Orpheus been so far?
            </StyledQuestion>
            <Rating
              emptySymbol={<AiOutlineStar size={star_size} />}
              fullSymbol={<AiFillStar size={star_size} />}
              fractions={2}
              initialRating={rating}
              onClick={(val) => {
                setRating(val);
              }}
            />
          </StyledListItem>
          <StyledListItem>
            <StyledQuestion>
              Did you find today's entry engaging or helpful?
            </StyledQuestion>
            {["Yes", "No"].map((ans) => {
              return (
                <div key={ans}>
                  <input
                    type="radio"
                    id={ans}
                    name={ans}
                    checked={engaging === ans}
                    onChange={() => {
                      setEngaging(ans);
                    }}
                  />
                  <label
                    htmlFor={ans}
                    className="ml-2 mb-0"
                    style={{ fontSize: "16px" }}
                  >
                    {ans}
                  </label>
                </div>
              );
            })}
            <StyledTextArea
              rows={2}
              placeholder="Comments :)"
              value={engaging_comments}
              onChange={(e) => {
                setEngagingComments(e.target.value);
              }}
            />
          </StyledListItem>
          <StyledListItem>
            <StyledQuestion>Anything we can improve on?</StyledQuestion>
            <StyledTextArea
              placeholder="Something that I found interesting...&#10;Something that I appreciated...&#10;An improvement that could be made is...&#10;I feel....&#10;"
              rows={4}
              value={improve}
              onChange={(e) => {
                setImprove(e.target.value);
              }}
            />
          </StyledListItem>
        </ol>
        <Row className="mx-auto justify-content-center">
          <Button onClick={submitSurvey} text="Submit" type="link" />
          <div>{message}</div>
        </Row>
      </Modal.Body>
    </StyledModal>
  );
};

export default SurveyModal;
