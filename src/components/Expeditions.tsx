import { TExpedition } from "@/type";
import React from "react";
import Expedition from "./Expedition";

function Expeditions({ expeditions }: { expeditions: TExpedition[] }) {
  return (
    <div
      id="expeditions-list"
      className="flex flex-col items-center space-y-6 overflow-y-auto mb-2"
    >
      {expeditions.map((expedition, index) => (
        <Expedition key={"expedition" + index} expedition={expedition} />
      ))}
    </div>
  );
}

export default Expeditions;
