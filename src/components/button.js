import { Link } from "react-router-dom";
import styles from "./button.module.css";

const Button = ({
  text,
  width = "14.125rem",
  height = "4.375rem",
  type,
  ...otherProps
}) => {
  return type === "link" ? (
    <a
      className={styles.container}
      {...otherProps}
      style={{ width: width, height: height }}
    >
      <div className="m-auto">{text}</div>
    </a>
  ) : (
    <Link
      className={styles.container}
      {...otherProps}
      style={{ width: width, height: height }}
    >
      <div className="m-auto">{text}</div>
    </Link>
  );
};

export default Button;
