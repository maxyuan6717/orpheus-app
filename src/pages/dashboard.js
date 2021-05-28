import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { getUser } from "../util/api";
import styles from "./dashboard.module.css";
import { Row } from "react-bootstrap";
import { ResponsiveLine } from "@nivo/line";
import Button from "../components/button";
import Loading from "../components/loading";
import ReactGA from "react-ga";

const Dashboard = () => {
  const [info, setInfo] = useState({});
  const [screentime, setScreentime] = useState(new Array(21).fill(0));
  const [social_screentime, setSocialScreentime] = useState(
    new Array(21).fill(0)
  );
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
    let temp_minutes = [...screentime];
    let temp_social = [...social_screentime];
    for (let i = 1; i <= 21; i++) {
      temp_minutes[i - 1] = res[i].minutes ? parseInt(res[i].minutes) : 0;
      temp_social[i - 1] = res[i].social_minutes
        ? parseInt(res[i].social_minutes)
        : 0;
    }

    if (JSON.stringify(temp_minutes) !== JSON.stringify(screentime))
      setScreentime(temp_minutes);
    if (JSON.stringify(temp_social) !== JSON.stringify(social_screentime))
      setSocialScreentime(temp_social);
  }, [info, screentime, social_screentime]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {loading ? (
          <div className="d-flex" style={{ width: "100%" }}>
            <Loading />
          </div>
        ) : (
          <>
            <Row className="mx-auto justify-content-between">
              <div className="header">
                Hello, {info.name ? info.name : info.email}!
              </div>
            </Row>

            <div className="subheader">
              <Row className="mx-auto">
                <span className="my-auto">
                  {info.day > 21
                    ? "Congrats! You completed the Orpheus Pledge"
                    : `Welcome to day ${info.day === -1 ? 0 : info.day}/21`}
                  <span className="mx-3">|</span>
                  <Link
                    className={styles.entry_link + " my-auto"}
                    to={`/${
                      info.day === -1 ? "intro" : Math.min(21, info.day)
                    }`}
                    onClick={() => {
                      ReactGA.event({
                        category: "Dashboard",
                        action: "Goto Daily Entry",
                      });
                    }}
                  >
                    {info.day > 21
                      ? "See your past entries →"
                      : "Fill out today's entry →"}
                  </Link>
                </span>
              </Row>
            </div>
            <div className={styles.graph_container + " mt-5"}>
              <div className={styles.graph_title}>
                Your Screen Time Progress
              </div>
              <ResponsiveLine
                colors={{ scheme: "set1" }}
                data={[
                  {
                    id: "Social Media",
                    color: "hsl(152, 70%, 50%)",
                    data: social_screentime.map((min, index) => {
                      return { x: index + 1, y: min };
                    }),
                  },
                  {
                    id: "Total",
                    color: "red",
                    data: screentime.map((min, index) => {
                      return { x: index + 1, y: min };
                    }),
                  },
                ]}
                title="Hello"
                margin={{ top: 75, right: 75, bottom: 75, left: 75 }}
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
                enableSlices="x"
                useMesh={true}
                sliceTooltip={({ slice }) => {
                  return (
                    <div
                      style={{
                        background: "white",
                        padding: "9px 12px",
                        border: "1px solid #ccc",
                        zIndex: "420 !important",
                      }}
                    >
                      <div style={{ color: "black" }}>
                        Day {slice.points[1].index + 1}
                      </div>
                      {slice.points.map((point) => (
                        <div
                          key={point.id}
                          style={{
                            color: point.serieColor,
                          }}
                        >
                          <strong>{point.serieId}:</strong>
                          {"  " + point.data.yFormatted}
                        </div>
                      ))}
                    </div>
                  );
                }}
                legends={[
                  {
                    anchor: "top-right",
                    direction: "column",
                    justify: false,
                    translateX: 0,
                    translateY: 8,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 100,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
                theme={{
                  background: "#ffffff",
                }}
              />
            </div>
            <Row className="mx-auto justify-content-center my-5">
              <a
                href="https://www.notion.so/Tips-Resources-6d7d8bcfea8a481d9cd3c6cb13f8dc67"
                onClick={() => {
                  ReactGA.event({
                    category: "Dashboard",
                    action: "Click Resources",
                  });
                }}
                rel="noreferrer"
                target="_blank"
                className={styles.entry_link}
                style={{ fontSize: "18px" }}
              >
                Click here for community tips & resources →
              </a>
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
