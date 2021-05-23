import { Link } from "react-router-dom";
import styles from "./button.module.css";

const Button = ({
  text,
  width = "14.125rem",
  height = "4.375rem",
  borderRadius = "2rem",
  fontSize = "1.25em",
  type,
  ...otherProps
}) => {
  const styleProps = { width, height, borderRadius, fontSize };
  return type === "link" ? (
    <a className={styles.container} {...otherProps} style={styleProps}>
      <div className="m-auto">{text}</div>
    </a>
  ) : (
    <Link className={styles.container} {...otherProps} style={styleProps}>
      <div className="m-auto">{text}</div>
    </Link>
  );
};

export default Button;
