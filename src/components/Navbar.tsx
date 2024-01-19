import { NAVBAR_HEIGHT } from "@/styles/styles";
import Logo from "./Logo";

function Navbar() {
  const h = NAVBAR_HEIGHT;

  return (
    <>
      <div className={`fixed z-10 w-full top-0 h-[${h}px] bg-light_gray`}>
        <div className="w-full max-w-screen-lg mr-auto ml-auto py-2 px-4">
          <Logo size={"sm"} />
        </div>
      </div>

      <div className={`mt-[${h}px]`} />
    </>
  );
}

export default Navbar;
