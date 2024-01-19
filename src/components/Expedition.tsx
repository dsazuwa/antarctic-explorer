import React from "react";

import { TExpedition } from "@/type";

function Expedition({ expedition }: { expedition: TExpedition }) {
  const { name, photoUrl } = expedition;

  return (
    <div
      id="card"
      className="flex flex-col sm:flex-row w-full sm:max-w-[800px] sm:h-[240px] rounded-md shadow bg-white"
    >
      <img
        id="card-image"
        className="sm:w-5/12 sm:max-w-5/12 h-[240px] sm:h-full object-cover rounded-t-md sm:rounded-none sm:rounded-l-md"
        src={photoUrl}
        alt={name}
      />

      <div id="card-content" className="sm:flex-1 p-2 h-[160px]">
        <div className="font-semibold text-[12px] text-navy text-center line-clamp-2">
          {name}
        </div>
      </div>
    </div>
  );
}

export default Expedition;
