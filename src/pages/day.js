import { useEffect, useState } from "react";
import styles from "./day.module.css";
import { useParams, useHistory } from "react-router-dom";
import Assessment from "../components/assessment";
import Intro from "../components/intro";
import Day from "../components/day";
import { getUser, readIntro } from "../util/api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import Spacer from "../components/spacer";
import { days } from "../util/constants";
import Loading from "../components/loading";

const DayPage = () => {
  let { day_no } = useParams();
  const [info, setInfo] = useState({});
  const history = useHistory();

  if (!days.includes(day_no)) {
    history.push(`/`);
  }
  if (day_no === "intro") day_no = "-1";
  day_no = parseInt(day_no);
  if (day_no > info.day) {
    history.push(`/`);
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let userInfo = await getUser();
        if (userInfo.data && userInfo.data.fetchedUser) {
          setInfo(userInfo.data.fetchedUser);
          if (userInfo.data.fetchedUser.day === -1 && day_no === 0) {
            await readIntro();
          }
          // console.log(userInfo.data.fetchedUser);
        } else {
          history.push("/");
        }
      } catch (err) {
        console.log(err);
        history.push("/");
      }
    };
    fetchUser();
  }, [day_no]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {Object.keys(info).length > 0 ? (
          <>
            <Row className="mx-auto justify-content-center">
              <Link to={`/`} className={styles.back_btn}>
                Back to dashboard
              </Link>
            </Row>
            <Row className="mx-auto">
              <Link
                className="my-auto mr-2"
                to={`/${day_no - 1 >= 0 ? day_no - 1 : "intro"}`}
                style={{ pointerEvents: day_no > -1 ? null : "none" }}
              >
                <FaChevronLeft size={25} className={styles.arrow} />
              </Link>
              <span className="header">
                {day_no >= 0 ? `Day ${day_no}` : "Introduction"}
              </span>
              <Link
                className="my-auto ml-2"
                to={`/${day_no + 1}`}
                style={{
                  pointerEvents:
                    day_no < Math.min(21, info.day) ? null : "none",
                }}
              >
                <FaChevronRight size={25} className={styles.arrow} />
              </Link>
            </Row>
            <Spacer />
            {day_no === -1 ? (
              <Intro />
            ) : day_no === 0 ? (
              <Assessment info={info} />
            ) : (
              <Day info={info} day_no={day_no} />
            )}
          </>
        ) : (
          <div className="d-flex" style={{ width: "100%" }}>
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default DayPage;
