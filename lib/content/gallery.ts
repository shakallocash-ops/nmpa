import { IMAGES } from "./images";

export const galleryItems = [
  {
    id: "schools-1",
    category: "Schools",
    title: "Nomadic classroom, open sky",
    caption: "Chapter 5.3 — Nomadic schools remain the Ministry’s longest bet on peace: a literate child does not inherit a rumour.",
    image: IMAGES.classroom
  },
  {
    id: "schools-2",
    category: "Schools",
    title: "Back to School mobilisation",
    caption: "Enrolment recovery among children who move with the herd.",
    image: IMAGES.children
  },
  {
    id: "boreholes-1",
    category: "Boreholes",
    title: "Solar borehole and cattle trough",
    caption: "Chapter 6.2 — Water that does not pit the farmer against the herder.",
    image: IMAGES.borehole
  },
  {
    id: "boreholes-2",
    category: "Boreholes",
    title: "Water at the grazing edge",
    caption: "Thirty-plus solar schemes sited from enumeration, not from guesswork.",
    image: IMAGES.water
  },
  {
    id: "rallies-1",
    category: "Peace Rallies",
    title: "Join Hands Together",
    caption: "Chapter 8 — A public sentence of neighbourliness, after the private work of mediation.",
    image: IMAGES.rally
  },
  {
    id: "rallies-2",
    category: "Peace Rallies",
    title: "Youth and traditional authority",
    caption: "The 30-Man Committee stands with the square, not above it.",
    image: IMAGES.meeting
  },
  {
    id: "visits-1",
    category: "Community Visits",
    title: "Enumeration in camp",
    caption: "Chapter 7 — Baseline data collection: a household, a herd, a GPS point.",
    image: IMAGES.village
  },
  {
    id: "visits-2",
    category: "Community Visits",
    title: "Listening in the three zones",
    caption: "The Commissioner’s tours follow the cattle track, not only the tarred road.",
    image: IMAGES.savanna
  },
  {
    id: "events-1",
    category: "Events",
    title: "Quarterly citizen briefing, Minna",
    caption: "Public accounting: what was registered, what was resolved, what remains.",
    image: IMAGES.hands
  },
  {
    id: "victims-1",
    category: "Conflict Victims",
    title: "Repair after the quarrel",
    caption: "Chapter 4.4 — Compensation is named in the open. Dignity is the first reconstruction.",
    image: IMAGES.dusk
  },
  {
    id: "baseline-1",
    category: "Baseline Data Collection",
    title: "The register in the field",
    caption: "Chapter 7 — 18,462+ households. A state that can count its people can serve them.",
    image: IMAGES.field
  },
  {
    id: "cattle-1",
    category: "Community Visits",
    title: "Herd at first light",
    caption: "Heritage that must now become enterprise.",
    image: IMAGES.cattle
  }
] as const;

export const galleryCategories = [
  "All",
  "Schools",
  "Boreholes",
  "Peace Rallies",
  "Community Visits",
  "Events",
  "Conflict Victims",
  "Baseline Data Collection"
] as const;

export const videos: Array<{ id: string; title: string; href: string }> = [
  {
    id: "briefing",
    title: "Quarterly government performance briefing — Minna",
    href: "https://www.youtube.com"
  }
];
