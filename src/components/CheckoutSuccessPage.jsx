import { NavLink } from "react-router-dom";
import { Check } from "lucide-react";
import styles from "../css/CheckoutSuccess.module.css";

export default function CheckoutSuccessPage() {
  return (
    <main>
      <div className={styles.checkoutSuccess}>
        <div className={styles.checkoutSuccessBorder}>
          <div className={styles.checkmarkContainer}>
            <Check color="white" size={32} strokeWidth={1.5} />
          </div>
          <h1>Thank you for your purchase!</h1>
          <p>
            We've recieved your order and will begin processing it. Order
            confirmation will be sent to your email.
          </p>
          <NavLink to="/">
            <button className={styles.checkoutSuccessBtn} title="Go to home">
              Back to home
            </button>
          </NavLink>
        </div>
      </div>
    </main>
  );
}
