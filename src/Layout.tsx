import { ReactElement } from "react";

import Navbar from "./components/Navbar";

function getLayout(page: ReactElement) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {page}
    </div>
  );
}

export default getLayout;
