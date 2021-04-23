import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Spinner
      className="m-auto"
      animation="border"
      role="status"
      style={{ width: "100px", height: "100px" }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loading;
