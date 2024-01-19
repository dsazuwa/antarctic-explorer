import React from "react";
import Logo from "./Logo";

function Navbar() {
  return (
    <>
      <div className="fixed z-10 w-full top-0 h-[56px] bg-light_gray">
        <div className="w-full max-w-screen-lg mr-auto ml-auto py-2 px-4">
          <Logo size={"sm"} />
        </div>
      </div>

      <div className="mt-[56px]" />
    </>
  );
}

export default Navbar;
