import styles from "../css/PageNotFound.module.css";
import { NavLink } from "react-router-dom";
import { CircleAlert } from "lucide-react";

export default function PageNotFound() {
  return (
    <>
      <head>
        <meta
          name="description"
          content="The page you're trying to access doesn't exist."
        ></meta>
        <title>Page not found</title>
      </head>
      <main className={styles.noPageMain}>
        <div className={styles.noPageContainer}>
          <CircleAlert size={38} />
          <h1>Page not found</h1>
          <p>The page you're trying to access doesn't exist.</p>
          <p>Try going back to the home page.</p>
          <NavLink to="/">
            <button className={styles.noPageBtn} title="Go to home">
              Go to home
            </button>
          </NavLink>
        </div>
      </main>
    </>
  );
}
