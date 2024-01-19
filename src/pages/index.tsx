import type { GetStaticProps } from "next";
import { useEffect, useState } from "react";

import getLayout from "@/Layout";
import BottomNavigation from "@/components/BottomNavigation";
import Expedition from "@/components/Expedition";
import ExpeditionSortHeader from "@/components/ExpeditionSortHeader";
import { NAVBAR_HEIGHT } from "@/styles/styles";
import { TCruiseLinesAndExpeditions } from "@/type";

export default function Home({ expeditions }: TCruiseLinesAndExpeditions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState(0);
  const options = [6, 12, 18, 24];
  const totalPages = Math.ceil(expeditions.length / options[selectedOption]);

  const setItemsPerPage = (index: number) => {
    console.log(index);
    setSelectedOption(index);
    setCurrentPage(1);
  };

  const previousPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  const nextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="w-full h-full max-w-screen-lg mr-auto ml-auto">
      <div
        className={`h-[${NAVBAR_HEIGHT}px] flex items-center justify-center text-base sm:text-lg font-bold md:text-xl p-2 sm:p-4`}
      >
        Expeditions
      </div>

      <div className="flex flex-row">
        <div
          id="side-panel"
          className="hidden lg:flex w-[304px] bg-gray-400"
        ></div>

        <div
          id="main-panel"
          className="w-full space-y-4 lg:space-y-0 px-4 lg:px-2"
        >
          <div className="lg:hidden h-[80px] bg-gray-400"></div>

          <ExpeditionSortHeader numExpeditions={expeditions.length} />

          <div
            id="expeditions-list"
            className="flex flex-col items-center space-y-6 overflow-y-auto mb-2"
          >
            {expeditions
              .filter(
                (_, i) =>
                  i < currentPage * options[selectedOption] &&
                  i + 1 > (currentPage - 1) * options[selectedOption],
              )
              .map((expedition, index) => (
                <Expedition
                  key={"expedition" + index}
                  expedition={expedition}
                />
              ))}
          </div>

          <BottomNavigation
            options={options}
            totalItems={expeditions.length}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={previousPage}
            handleNextPage={nextPage}
            setItemsPerPage={setItemsPerPage}
          />
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
