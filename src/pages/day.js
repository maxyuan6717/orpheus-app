import { useEffect, useState } from "react";
import styles from "./day.module.css";
import { useParams, useHistory } from "react-router-dom";
import Assessment from "../components/assessment";
import Day from "../components/day";
import { getUser } from "../util/api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import Spacer from "../components/spacer";
import { days } from "../util/constants";

const DayPage = () => {
  let { day_no } = useParams();
  const [info, setInfo] = useState({});
  const history = useHistory();

  if (!days.includes(day_no)) {
    history.push(`/`);
  }
  day_no = parseInt(day_no);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let userInfo = await getUser();
        if (userInfo.data && userInfo.data.fetchedUser) {
          setInfo(userInfo.data.fetchedUser);
          // console.log(userInfo.data.fetchedUser);
        } else {
          history.push("/");
        }
      } catch (err) {
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
                to={`/${day_no - 1}`}
                style={{ pointerEvents: day_no > 0 ? null : "none" }}
              >
                <FaChevronLeft size={25} className={styles.arrow} />
              </Link>
              <span className="header">Day {day_no}</span>
              <Link
                className="my-auto ml-2"
                to={`/${day_no + 1}`}
                style={{ pointerEvents: day_no < 21 ? null : "none" }}
              >
                <FaChevronRight size={25} className={styles.arrow} />
              </Link>
            </Row>
            <Spacer />
            {day_no === 0 ? (
              <Assessment info={info} />
            ) : (
              <Day info={info} day_no={day_no} />
            )}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default DayPage;
