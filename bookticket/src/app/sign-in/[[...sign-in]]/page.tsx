import { SignIn } from "@clerk/nextjs";
import Styles from './Signin.module.css'

export default function Page() {
  return<div className={Styles.signin}>
  <SignIn />
  </div>;
}