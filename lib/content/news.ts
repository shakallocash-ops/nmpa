import { IMAGES } from "./images";

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Press Releases" | "Announcements" | "Events";
  date: string;
  image: string;
  body: string[];
};

export const newsPosts: NewsPost[] = [
  {
    slug: "ministry-brings-herders-closer-to-government",
    title: "Ministry to bring herders from the forest into the circle of government",
    excerpt:
      "The Honourable Commissioner, Alhaji Umar Ahmed Sanda Rabe, restates that peace is impossible without justice — and justice begins with belonging.",
    category: "Press Releases",
    date: "2024-11-12",
    image: IMAGES.cattle,
    body: [
      "The Ministry of Nomadic and Pastoral Affairs was created so that Fulani herders rearing cattle in the forests and bushes of Niger State would no longer live beyond the reach of government.",
      "Speaking in Minna, the Honourable Commissioner, Alhaji Umar Ahmed Sanda Rabe, said His Excellency Mohammed Umaru Bago had promised a government of all Niger people — not a factional government. The Ministry is that promise made institutional.",
      "“When you are talking about peace, you must talk about justice. In the absence of peace, do not expect justice; in the absence of justice, do not expect peace.”",
      "The Ministry’s work is therefore twofold: to digitalise identity and livestock so that herding becomes a lawful, profitable enterprise; and to sit with farming neighbours until a quarrel becomes a settlement."
    ]
  },
  {
    slug: "herder-identity-cards-and-livestock-register",
    title: "Herder identity cards and a statewide livestock register",
    excerpt:
      "Before a herd is reared in Niger State it must be known to the State — as a company, a house, or a vehicle is known.",
    category: "Announcements",
    date: "2025-03-04",
    image: IMAGES.field,
    body: [
      "The Commissioner has directed that pastoralists operating in Niger State be profiled, and that livestock be entered in a living register.",
      "Incoming herders from neighbouring states will be documented. Unregistered movement will be treated with the seriousness reserved for rustling — because a nameless herd cannot be protected, taxed, vaccinated or reconciled.",
      "The register is not a punishment. It is how a child on the cattle track becomes visible to a nomadic school, and how a borehole is sited where the water is actually needed."
    ]
  },
  {
    slug: "join-hands-together-peace-rallies",
    title: "Join Hands Together: peace rallies across the three zones",
    excerpt:
      "Traditional rulers, youth, women leaders and the 30-Man Committees stand in one square and say the same sentence: we will not inherit this quarrel.",
    category: "Events",
    date: "2025-06-18",
    image: IMAGES.rally,
    body: [
      "Peace rallies under the Join Hands Together campaign have travelled the three senatorial zones — from Bida to Kontagora, from Suleja to New Bussa.",
      "They are not theatre. Each rally is preceded by casework: a crop damaged, a route fenced, a watering order broken. The 30-Man Committee sits. Compensation, where due, is named. Then the people gather.",
      "The Ministry will continue to publish resolved cases. Silence is how a rumour becomes a raid."
    ]
  },
  {
    slug: "nomadic-schools-viability-drive",
    title: "Keeping 275 nomadic schools on the map — and in session",
    excerpt:
      "A school that cannot be found on a map cannot be staffed. The viability drive puts every nomadic classroom on the public record.",
    category: "Announcements",
    date: "2025-09-02",
    image: IMAGES.school,
    body: [
      "Two hundred and seventy-five nomadic schools stand in Niger State. Some are viable: teachers present, children enrolled, a roof that holds. Others are not.",
      "The Nomadic Education Directorate now publishes viability, enrolment by sex, and classroom condition. Partners — UNICEF, UBEC, and the State Universal Basic Education Board — can see where a teacher, a borehole, or a roof will change a life.",
      "The Back-to-School initiative follows the herd. A child who moves is still a child of Niger State."
    ]
  }
];

export function getNews(slug: string) {
  return newsPosts.find((post) => post.slug === slug) ?? null;
}

export function relatedNews(slug: string) {
  return newsPosts.filter((post) => post.slug !== slug).slice(0, 3);
}
