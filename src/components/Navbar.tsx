import React from "react";
import Logo from "./Logo";

function Navbar() {
  return (
    <>
      <div className="fixed z-10 w-full top-0 h-[56px] bg-white border-b border-gray-100">
        <div className="w-full max-w-screen-lg mr-auto ml-auto p-2">
          <Logo size={"sm"} />
        </div>
      </div>

      <div className="mt-[56px]" />
    </>
  );
}

export default Navbar;
