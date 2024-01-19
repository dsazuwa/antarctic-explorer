import type { GetStaticProps } from "next";

import getLayout from "@/Layout";
import Expedition from "@/components/Expedition";
import { TCruiseLinesAndExpeditions } from "@/type";

export default function Home({ expeditions }: TCruiseLinesAndExpeditions) {
  return (
    <div className="w-full">
      <div className="w-full max-w-screen-lg mr-auto ml-auto">
        <div className="flex flex-col items-center m-2 space-y-6">
          {expeditions.map((expedition, index) => (
            <Expedition key={"expedition" + index} expedition={expedition} />
          ))}
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
