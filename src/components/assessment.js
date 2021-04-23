import { useState } from "react";
import styles from "./assessment.module.css";
import { Row, Col } from "react-bootstrap";
import Spacer from "./spacer";
import Button from "./button";
import { saveUser } from "../util/api";

const Assessment = ({ info }) => {
  const res = info && info.responses ? info.responses[0] : {};
  const [firstWord, setFirstWord] = useState(
    res["firstWord"] ? res["firstWord"] : ""
  );
  const [techHabits, setTechHabits] = useState(
    res["techHabits"] ? res["techHabits"] : ""
  );
  const [devUsage, setDevUsage] = useState(
    res["devUsage"]
      ? res["devUsage"]
      : [
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
        ]
  );
  const [mustHave, setMustHave] = useState(
    res["mustHave"] ? res["mustHave"] : ""
  );
  const [joy, setJoy] = useState(res["joy"] ? res["joy"] : "");
  const [distract, setDistract] = useState(
    res["distract"] ? res["distract"] : ""
  );
  const [healthy, setHealthy] = useState(res["healthy"] ? res["healthy"] : "");
  const [usageChange, setUsageChange] = useState(
    res["usageChange"] ? res["usageChange"] : ""
  );
  const [tethered, setTethered] = useState(
    res["tethered"] ? res["tethered"] : ""
  );
  const [news, setNews] = useState(res["news"] ? res["news"] : "");

  const [everyone, setEveryone] = useState(
    res["everyone"] ? res["everyone"] : [false, false, false, false]
  );
  const [recommend, setRecommend] = useState(
    res["recommend"] ? res["recommend"] : [false, false, false]
  );
  const [strategy, setStrategy] = useState(
    res["strategy"] ? res["strategy"] : null
  );
  const [filters, setFilters] = useState(
    res["filters"] ? res["filters"] : ["", "", ""]
  );
  const [filter_news, setFilterNews] = useState(
    res["filter_news"] ? res["filter_news"] : ""
  );
  const [commit, setCommit] = useState(res["commit"] ? res["commit"] : "");
  const [signature, setSignature] = useState(
    res["signature"] ? res["signature"] : ""
  );

  const dev_questions = [
    "Cellular device",
    "Most used app",
    "2nd most used app",
    "Daily average of pickups",
  ];

  const everyone_check = [
    "Complete introductory materials",
    "Find a drawer, closet or space that's not easily accessible to store your phone when not in use",
    "Announce your plans to be offline / have minimal technology usage to family, friends, and social media",
    "Turn off all non-essential notifications",
  ];

  const recommend_check = [
    "Identify a few family members and/or close friends to join you (helps with accountability!)",
    'Provide alternative ways to stay in touch (designate "online hours")',
    "Remove addictive apps (like Facebook, TikTok, Instagram)",
  ];

  const filter_labels = [
    "Allowed sites:",
    "Allowed apps:",
    "Allowed times to check:",
  ];

  const [saved, setSaved] = useState(0);

  const saveResponses = async () => {
    const temp = [...info.responses];
    temp[0] = {
      firstWord,
      techHabits,
      devUsage,
      mustHave,
      joy,
      distract,
      healthy,
      usageChange,
      tethered,
      news,
      everyone,
      recommend,
      strategy,
      filters,
      filter_news,
      commit,
      signature,
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
      <div className="header">Assess your relationship with technology</div>
      <div className="subheader">Reflect on your usage</div>
      <Spacer />
      <Row className="mx-auto">
        <Col md={4} className="p-0">
          What is the first word or thought that comes to mind when you think of
          your phone?
        </Col>
        <Col md={8}>
          <textarea
            value={firstWord}
            onChange={(e) => {
              setFirstWord(e.target.value);
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </Col>
      </Row>
      <Spacer />
      <Row className="mx-auto">
        <Col md={6} className="pl-0 d-flex">
          <span className="mt-auto">
            What are your technology usage habits?
          </span>
        </Col>
        <Col md={6} className="pr-0">
          How well do you know your device usage?
          <Row className="mx-auto">
            <Col xs={4} className="px-1" />
            <Col xs={4} className="px-1">
              <strong className={styles.question_small}>
                Estimate daily time spent on:
              </strong>
            </Col>
            <Col xs={4} className="px-1">
              <strong className={styles.question_small}>
                *Actual daily time spent on:
              </strong>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mx-auto">
        <Col md={6} className="pl-0">
          <textarea
            value={techHabits}
            onChange={(e) => {
              setTechHabits(e.target.value);
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </Col>
        <Col md={6} className="pl-0">
          {dev_questions.map((question, index) => (
            <Row className="mx-auto" key={index}>
              <Col xs={4} className="px-1 py-1 text-right">
                {question}
              </Col>
              {[0, 1].map((indx) => (
                <Col xs={4} className="px-1 py-1" key={indx}>
                  <textarea
                    value={devUsage[index][indx]}
                    onChange={(e) => {
                      let temp = JSON.parse(JSON.stringify(devUsage));
                      temp[index][indx] = e.target.value;
                      setDevUsage(temp);
                    }}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Col>
              ))}
            </Row>
          ))}
        </Col>
      </Row>
      <Spacer />
      <Row className="mx-auto my-2">
        <Col md={2} />
        <Col md={2} className="text-right pr-1">
          <span className={styles.question_small}>Must have device for</span>
        </Col>
        <Col md={6} className="px-0">
          <textarea
            value={mustHave}
            onChange={(e) => {
              setMustHave(e.target.value);
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </Col>
        <Col md={2} />
      </Row>
      <Row className="mx-auto my-2">
        <Col md={2} />
        <Col md={2} className="text-right pr-1">
          <span className={styles.question_small}>
            When does your device and social media bring you joy?
          </span>
        </Col>
        <Col md={6} className="px-0">
          <textarea
            value={joy}
            onChange={(e) => {
              setJoy(e.target.value);
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </Col>
        <Col md={2} />
      </Row>
      <Row className="mx-auto my-2">
        <Col md={2} />
        <Col md={2} className="text-right pr-1">
          <span className={styles.question_small}>
            How does your device distract you
          </span>
        </Col>
        <Col md={6} className="px-0">
          <textarea
            value={distract}
            onChange={(e) => {
              setDistract(e.target.value);
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </Col>
        <Col md={2} />
      </Row>
      <Spacer />
      <div className="header">Your Approach</div>
      <div className="subheader">What Strategy is Best for You</div>
      <Spacer />
      <Row className="mx-auto">
        <Col md={4} className="p-0">
          What does a healthy relationship with technology look like for you?
        </Col>
        <Col md={8}>
          <textarea
            value={healthy}
            onChange={(e) => {
              setHealthy(e.target.value);
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </Col>
      </Row>
      <Spacer />
      <div className="text-center">
        1. How do you want to change your current patterns of usage (restrict or
        reduce)?
      </div>
      <Row className="mx-auto justify-content-center">
        <div
          className={`${styles.select_container} mx-4 ${
            usageChange === "clear" ? styles.selected : ""
          }`}
          onClick={() => {
            setUsageChange("clear");
          }}
        >
          <span className={styles.select_header}>
            Setting clear
            <br />
            restrictions
          </span>
          <br />
          (Going cold turkey)
        </div>
        <div
          className={`${styles.select_container} mx-4 ${
            usageChange === "gradual" ? styles.selected : ""
          }`}
          onClick={() => {
            setUsageChange("gradual");
          }}
        >
          <span className={styles.select_header}>
            Gradual reduction or
            <br />
            progress over time
          </span>
          <br />
          (Enjoy small daily wins)
        </div>
      </Row>
      <Spacer />
      <div className="text-center">
        2. What are you tethered to? (Circle answer)
      </div>
      <Row className="mx-auto justify-content-center">
        <div
          className={`${styles.select_container} mx-4 ${
            tethered === "device" ? styles.selected : ""
          }`}
          onClick={() => {
            setTethered("device");
          }}
        >
          <span className={styles.select_header}>Device</span>
          <br />
          (eg. Phone)
        </div>
        <div
          className={`${styles.select_container} mx-4 ${
            tethered === "platforms" ? styles.selected : ""
          }`}
          onClick={() => {
            setTethered("platforms");
          }}
        >
          <span className={styles.select_header}>Specific Platforms</span>
          <br />
          (List top 3 to the side)
        </div>
      </Row>
      <Spacer />
      <div className="text-center">
        3. In terms of following the news, would you rather:
      </div>
      <Row className="mx-auto justify-content-center">
        <div
          className={`${styles.select_container} mx-4 ${
            news === "summary" ? styles.selected : ""
          }`}
          onClick={() => {
            setNews("summary");
          }}
        >
          <span className={styles.select_header}>
            Have a summary
            <br />
            with clear updates
          </span>
        </div>
        <div
          className={`${styles.select_container} mx-4 ${
            news === "continue" ? styles.selected : ""
          }`}
          onClick={() => {
            setNews("continue");
          }}
        >
          <span className={styles.select_header}>
            Continue usual
            <br />
            reading patterns
          </span>
        </div>
      </Row>
      <Spacer />
      <div className="header">Prepare Yourself</div>
      <div className="subheader">Get ready with the following checklists</div>
      <Row className="mx-auto">
        <Col md={6} className="pl-0">
          <div className="text1 bold">Everyone</div>
          {everyone_check.map((check, index) => (
            <div key={index}>
              <input
                key={index}
                type="checkbox"
                id={`everyone_${index}`}
                name={`everyone_${index}`}
                checked={everyone[index]}
                onChange={() => {
                  const temp = [...everyone];
                  temp[index] = !temp[index];
                  setEveryone(temp);
                }}
              />
              <label
                style={{ display: "inline" }}
                htmlFor={`everyone_${index}`}
                className="ml-2"
              >
                {check}
              </label>
            </div>
          ))}
        </Col>
        <Col md={6} className="pl-0">
          <div className="text1 bold">Recommendations</div>
          {recommend_check.map((check, index) => (
            <div key={index}>
              <input
                key={index}
                type="checkbox"
                id={`recommend_${index}`}
                name={`recommend_${index}`}
                checked={recommend[index]}
                onChange={() => {
                  const temp = [...recommend];
                  temp[index] = !temp[index];
                  setRecommend(temp);
                }}
              />
              <label
                style={{ display: "inline" }}
                htmlFor={`recommend_${index}`}
                className="ml-2"
              >
                {check}
              </label>
            </div>
          ))}
        </Col>
      </Row>
      <Spacer />
      <div className="text1 bold">Specific Strategy</div>
      <div className="">Select and fill out one of the following.</div>
      <Row className="mx-auto px-5">
        <Col
          className={`p-2 ${styles.strategy} ${
            strategy === "A" ? styles.selected_strat : null
          }`}
          md={6}
          onClick={() => {
            setStrategy("A");
          }}
        >
          <div className="text1 bold">A. Device Restriction</div>
          <div>
            Set an upper-bound of your usage per day (eg: use phone for 1 hr/day
            at 9am)
          </div>
        </Col>
        <Col
          className={`p-2 ${styles.strategy} ${
            strategy === "B" ? styles.selected_strat : null
          }`}
          md={6}
          onClick={() => {
            setStrategy("B");
          }}
        >
          <div className="text1 bold">B. Device Reduction</div>
          <div>Gradually decrease usage of your phone, improve day-to-day</div>
        </Col>
      </Row>
      <Row className="mx-auto px-5">
        <Col
          className={`p-2 ${styles.strategy} ${
            strategy === "C" ? styles.selected_strat : null
          }`}
          md={6}
          onClick={() => {
            setStrategy("C");
          }}
        >
          <div className="text1 bold">C. App Restriction</div>
          <div>Delete or sign out of your top 3 most used apps.</div>
        </Col>
        <Col
          className={`p-2 ${styles.strategy} ${
            strategy === "D" ? styles.selected_strat : null
          }`}
          md={6}
          onClick={() => {
            setStrategy("D");
          }}
        >
          <div className="text1 bold">D. App Reduction</div>
          <div>Set screen time limits on select platforms</div>
        </Col>
      </Row>
      <Spacer />
      <div className="text1 bold">Choose Filters</div>
      <Row className="mx-auto px-5">
        <Col md={6} className="pl-0">
          {filter_labels.map((filter, index) => (
            <div key={index}>
              <div>{filter}</div>
              <textarea
                value={filters[index]}
                onChange={(e) => {
                  let temp = [...filters];
                  temp[index] = e.target.value;
                  setFilters(temp);
                }}
                style={{ width: "100%" }}
                rows={1}
              />
            </div>
          ))}
        </Col>
        <Col md={6} className="pl-0">
          <div>News consumption</div>
          <div style={{ fontStyle: "italic" }}>
            If you want to change your media in-take...
          </div>
          <ul>
            <li>Follow summary newsletters (1440, Morning Brew, BBC)</li>
            <li>
              Listen to daily news podcasts (NPR Up First, The Daily, etc)
            </li>
          </ul>
        </Col>
      </Row>
      <Spacer />
      <div className="header">Pledge</div>
      <div className="m-4">
        <div className="text1 bold">A quick note:</div>
        <Spacer />
        <ol>
          <li>
            If you're not ready today, that does not mean anything about whether
            you might eventually be able to do this. People are sometimes forced
            into change but often will simply find themselves ready. The
            important thing is that you have learned something about yourself.
          </li>
          <li>
            If you do want to start, but are worried you can't make it all the
            way through - that is okay. In fact, the act of simply starting is a
            positive indicator that you will eventually making the changes you
            are looking for. Do what you can and seek out others if at all
            possible, to do it together.
          </li>
          <li>
            Now, if you are still good to go, gear up! There is work to do...
          </li>
        </ol>
      </div>
      <Spacer />
      <div className="text1 bold">
        Write down where you are at. Do you want to try and can you commit? (Why
        or why not?)
      </div>
      <textarea
        style={{ width: "100%" }}
        value={commit}
        onChange={(e) => {
          setCommit(e.target.value);
        }}
      />
      <Spacer />
      <div className="text-center text1 bold">Take the pledge</div>
      <div className="text1" style={{ fontStyle: "italic" }}>
        I have the desire to better understand myself, to recognize the benefits
        and harms of technology, and to improve my relationship with these
        technology devices.
      </div>

      <Spacer />
      <Row className="mx-auto justify-content-center">
        <div className="text1 mr-2" style={{ fontStyle: "italic" }}>
          Signature
        </div>
        <textarea
          style={{ width: "50%" }}
          rows={1}
          value={signature}
          onChange={(e) => {
            setSignature(e.target.value);
          }}
        />
      </Row>
      <Spacer />
      <Row className="mx-auto justify-content-center">
        <Button onClick={saveResponses} text="save" type="link" />
        <span>
          {saved === -1 ? "Saving..." : saved === 1 ? "Saved :)" : ""}
        </span>
      </Row>
    </div>
  );
};

export default Assessment;
