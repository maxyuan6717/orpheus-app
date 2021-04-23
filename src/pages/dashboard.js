import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { getUser } from "../util/api";
import styles from "./dashboard.module.css";
import { Row } from "react-bootstrap";
import { ResponsiveLine } from "@nivo/line";
import Button from "../components/button";
import Loading from "../components/loading";

const Dashboard = () => {
  const [info, setInfo] = useState({});
  const [screentime, setScreentime] = useState(new Array(21).fill(0));
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        let userInfo = await getUser();
        setLoading(false);
        if (userInfo.data && userInfo.data.fetchedUser) {
          setInfo(userInfo.data.fetchedUser);
        } else {
          history.push("/");
        }
      } catch (err) {
        history.push("/");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (Object.keys(info).length === 0) return;
    const res = info.responses;
    let temp = [...screentime];
    for (let i = 1; i <= 21; i++) {
      temp[i - 1] = res[i].minutes ? parseInt(res[i].minutes) : 0;
    }

    if (JSON.stringify(temp) !== JSON.stringify(screentime))
      setScreentime(temp);
  }, [info, screentime]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Row className="mx-auto justify-content-between">
              <div className="header">
                Hello {info.name ? info.name : info.email}
              </div>
              {!info.name && (
                <Button
                  to={`/register`}
                  text="Create Account"
                  height="2.5rem"
                />
              )}
            </Row>

            <div className="subheader">
              <Row className="mx-auto">
                <span className="my-auto">Welcome to day {info.day}/21</span>
                <span className="mx-3 my-auto">|</span>
                <Link
                  className={styles.entry_link + " my-auto"}
                  to={`/${info.day}`}
                >
                  Fill out today's entry →
                </Link>
              </Row>
            </div>
            <div className={styles.graph_container}>
              <ResponsiveLine
                data={[
                  {
                    id: "screentime",
                    color: "red",
                    data: screentime.map((hr, index) => {
                      return { x: index + 1, y: hr };
                    }),
                  },
                ]}
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Day",
                  legendOffset: 36,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Minutes",
                  legendOffset: -40,
                  legendPosition: "middle",
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
