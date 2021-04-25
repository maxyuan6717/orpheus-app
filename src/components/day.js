import { useEffect, useState } from "react";
import styles from "./day.module.css";
import { program } from "../util/ProgramText";
import Spacer from "./spacer";
import { saveUser } from "../util/api";
import { Row } from "react-bootstrap";
import Button from "./button";
import SurveyModal from "./surveymodal";

const Day = ({ info, day_no }) => {
  const questions = program[day_no - 1].questions;
  const N = questions.length;
  const res = info.responses[day_no];
  const [responses, setResponses] = useState(
    res["ans"] ? res["ans"] : new Array(N).fill("")
  );
  const [minutes, setMinutes] = useState(res["minutes"] ? res["minutes"] : "");
  const [social_minutes, setSocialMinutes] = useState(
    res["social_minutes"] ? res["social_minutes"] : ""
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    const temp_questions = program[day_no - 1].questions;
    const temp_N = temp_questions.length;
    const temp_res = info.responses[day_no];
    if (temp_res["ans"]) {
      setResponses(temp_res["ans"]);
    } else {
      setResponses(new Array(temp_N).fill(""));
    }
    if (temp_res["minutes"]) {
      setMinutes(temp_res["minutes"]);
    } else {
      setMinutes("");
    }
    if (temp_res["social_minutes"]) {
      setSocialMinutes(temp_res["social_minutes"]);
    } else {
      setSocialMinutes("");
    }
  }, [day_no, info]);

  const [saved, setSaved] = useState(0);
  const saveResponses = async () => {
    setShow(true);
    const temp = [...info.responses];
    temp[day_no] = {
      ans: responses,
      minutes: minutes,
      social_minutes: social_minutes,
    };
    setSaved(-1);
    await saveUser(temp);
    setSaved(1);
    setTimeout(() => {
      setSaved(0);
    }, 2000);
  };

  return (
    <div>
      <Spacer />
      <div className="text1 bold">
        Daily story: {program[day_no - 1].story_title}
      </div>
      <Spacer />
      <div>{program[day_no - 1].story_body}</div>
      <Spacer />
      <div className="text1 bold">Answer the following</div>
      {questions.map((q, index) => (
        <>
          <div>{`${index + 1}. ${q}`}</div>
          <textarea
            value={responses[index]}
            onChange={(e) => {
              let temp = [...responses];
              temp[index] = e.target.value;
              setResponses(temp);
            }}
            style={{ width: "100%" }}
          />
        </>
      ))}
      <div>{`${
        responses.length + 1
      }. How many minutes did you spend on your screen today?`}</div>
      <input
        value={minutes}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;
          if (e.target.value === "" || re.test(e.target.value)) {
            setMinutes(e.target.value);
          }
        }}
      />
      <Spacer />
      <div>{`${
        responses.length + 2
      }. How many minutes did you spend on your top 3 social media apps?`}</div>
      <input
        value={social_minutes}
        onChange={(e) => {
          const re = /^[0-9\b]+$/;
          if (e.target.value === "" || re.test(e.target.value)) {
            setSocialMinutes(e.target.value);
          }
        }}
      />
      <Spacer />
      <Row className="mx-auto justify-content-center">
        <Button onClick={saveResponses} text="save" type="link" />
        <span className="my-auto">
          {saved === -1 ? "Saving..." : saved === 1 ? "Saved :)" : ""}
        </span>
      </Row>
      <SurveyModal show={show} setShow={setShow} day_no={day_no} />
    </div>
  );
};

export default Day;
