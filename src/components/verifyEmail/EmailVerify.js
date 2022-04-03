import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import pageNotFound from "../verifyEmail/page_not_found.svg";
import { useHistory } from "react-router-dom";
function EmailVerify() {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();
  let history = useHistory();
  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        await axios
          .get(
            `http://localhost:3001/api/users/${param.id}/verify/${param.token}`
          )
          .then((response) => {
            console.log(response.data);
            setValidUrl(true);
          });
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);
  return (
    <div className={styles.page_con}>
      {validUrl ? (
        <div className={styles.page_con}>
          <h1>Email verified successfully</h1>

          <button className={styles.btn} onClick={() => history.push("/login")}>
            Login
          </button>
        </div>
      ) : (
        <>
          <img src={pageNotFound} className={styles.not_found_svg} />
          <h1>
            <span>404</span> Not Found
          </h1>
        </>
      )}
    </div>
  );
}

export default EmailVerify;
