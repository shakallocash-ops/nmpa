import { NIGER_LGAS } from "@/lib/geo/niger-lgas";
import { PUBLISHED_STATS } from "./ministry";

function hash(name: string) {
  return name.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function share(name: string, zone: string) {
  const zoneWeight = zone === "C" ? 1.18 : zone === "A" ? 1.05 : 0.9;
  return (0.72 + (hash(name) % 40) / 100) * zoneWeight;
}

const weights = NIGER_LGAS.map((lga) => ({
  ...lga,
  weight: share(lga.name, lga.zone)
}));
const weightSum = weights.reduce((sum, row) => sum + row.weight, 0);

export const baselineByLga = weights.map((lga) => {
  const portion = lga.weight / weightSum;
  const households = Math.round(PUBLISHED_STATS.households * portion);
  const cattle = Math.round(PUBLISHED_STATS.livestock * portion * 0.58);
  const sheep = Math.round(PUBLISHED_STATS.livestock * portion * 0.22);
  const goats = Math.round(PUBLISHED_STATS.livestock * portion * 0.16);
  const other = Math.round(PUBLISHED_STATS.livestock * portion * 0.04);
  return {
    lga: lga.name,
    zone: lga.zone,
    households,
    cattle,
    sheep,
    goats,
    other,
    livestock: cattle + sheep + goats + other
  };
});

export const demographicFallback = {
  gender: [
    { name: "Male", value: 62 },
    { name: "Female", value: 38 }
  ],
  settlement: [
    { name: "Nomadic", value: 48 },
    { name: "Semi-nomadic", value: 32 },
    { name: "Settled", value: 20 }
  ],
  age: [
    { name: "0–14", value: 38 },
    { name: "15–24", value: 19 },
    { name: "25–44", value: 27 },
    { name: "45–64", value: 12 },
    { name: "65+", value: 4 }
  ]
};

export const livestockCompositionFallback = [
  { name: "Cattle", value: 58, fill: "#0B1F33" },
  { name: "Sheep", value: 22, fill: "#C6A15B" },
  { name: "Goats", value: 16, fill: "#0B6B4F" },
  { name: "Other", value: 4, fill: "#8A7A5A" }
];
