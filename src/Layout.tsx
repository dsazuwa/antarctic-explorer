import { ReactElement } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function getLayout(page: ReactElement) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-lighter_gray">
      <Navbar />
      {page}
      <Footer />
    </div>
  );
}

export default getLayout;
