import { SignUp } from "@clerk/nextjs";
import Styles from './Signup.module.css'

export default function Page() {
  return  <div className={Styles.signup}>
  <SignUp />
</div>;
}