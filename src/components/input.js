import styles from "./input.module.css";

const Input = ({ ...otherProps }) => {
  return <input className={styles.container} {...otherProps} />;
};

export default Input;
