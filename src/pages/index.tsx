import type { GetStaticProps } from "next";

import getLayout from "@/Layout";
import Expedition from "@/components/Expedition";
import { NAVBAR_HEIGHT } from "@/styles/styles";
import { TCruiseLinesAndExpeditions } from "@/type";

export default function Home({ expeditions }: TCruiseLinesAndExpeditions) {
  const offset = NAVBAR_HEIGHT * 2;

  return (
    <div
      className="w-full bg-lighter_gray"
      style={{
        height: `calc(100dvh - ${offset}px)`,
        maxHeight: `calc(100dvh - ${offset}px)`,
      }}
    >
      <div className="w-full h-full max-w-screen-lg mr-auto ml-auto">
        <div
          className={`h-[${NAVBAR_HEIGHT}px] flex items-center justify-center text-base sm:text-lg font-bold md:text-xl p-2 sm:p-4`}
        >
          Expeditions
        </div>

        <div className="flex flex-row h-full">
          <div
            id="side-panel"
            className="hidden lg:flex w-[304px] bg-gray-400"
          ></div>

          <div
            id="main-panel"
            className="w-full space-y-4 lg:space-y-0 px-4 lg:px-2"
          >
            <div className="lg:hidden h-[80px] bg-gray-400"></div>

            <div
              id="expeditions-list"
              className="flex flex-col items-center space-y-6 overflow-y-auto lg:max-h-full"
            >
              {expeditions.map((expedition, index) => (
                <Expedition
                  key={"expedition" + index}
                  expedition={expedition}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = (async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL || "");
  const { cruiseLines, expeditions } = await res.json();

  return { props: { cruiseLines, expeditions } };
}) satisfies GetStaticProps<TCruiseLinesAndExpeditions>;

Home.getLayout = getLayout;
