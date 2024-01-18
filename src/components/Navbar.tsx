import React from "react";
import Logo from "./Logo";

function Navbar() {
  return (
    <div className="flex w-full border-b border-gray-100">
      <div className="w-full max-w-screen-lg mr-auto ml-auto p-2">
        <Logo size={"sm"} />
      </div>
    </div>
  );
}

export default Navbar;
