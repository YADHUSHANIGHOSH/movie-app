import Image from "next/image";
import Styles from "./page.module.css";

import HomeSlider from "@/components/HomeSlider/page";
import Movielist from "./movielist/[type]/page";
import Cards from "@/components/card/page";

export default function Home() {
  return (
    <main className={Styles.landingpage}>
      <div></div>
      <HomeSlider/>
      <Movielist/>
    </main>
    
  );
}
