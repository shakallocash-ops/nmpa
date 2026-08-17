import { IMAGES } from "./images";

export type PublicProject = {
  id: string;
  title: string;
  description: string;
  lga: string;
  type: string;
  typeKey: string;
  status: "PLANNING" | "ONGOING" | "COMPLETED";
  budget: number | null;
  startDate: string | null;
  endDate: string | null;
  impact: string;
  image: string;
  gallery: string[];
  timeline: Array<{ date: string; title: string; body: string }>;
};

export const FEATURED_PROJECTS: PublicProject[] = [
  {
    id: "solar-bida",
    title: "Solar borehole — Etsu Musa camp",
    description:
      "A solar-powered borehole and cattle trough sited from enumeration, so the herd and the farm need not contest a single stream.",
    lga: "Bida",
    type: "Solar borehole",
    typeKey: "SOLAR_BOREHOLE",
    status: "COMPLETED",
    budget: 28_000_000,
    startDate: "2024-01-15",
    endDate: "2024-09-30",
    impact: "Clean water for households and livestock; reduced dry-season crowding at the old stream.",
    image: IMAGES.borehole,
    gallery: [IMAGES.borehole, IMAGES.water, IMAGES.village],
    timeline: [
      { date: "Jan 2024", title: "Siting", body: "GPS from the household register; community walk with the Ardo." },
      { date: "Apr 2024", title: "Drilling", body: "Borehole, solar array and cattle trough installed." },
      { date: "Sep 2024", title: "Commissioned", body: "Handed to the community with a watering timetable." }
    ]
  },
  {
    id: "solar-kontagora",
    title: "Solar borehole cluster — Tungan Kawo",
    description:
      "Three solar schemes along the Kontagora grazing edge, part of the statewide 30+ borehole programme.",
    lga: "Kontagora",
    type: "Solar borehole",
    typeKey: "SOLAR_BOREHOLE",
    status: "ONGOING",
    budget: 64_000_000,
    startDate: "2025-02-01",
    endDate: "2025-11-15",
    impact: "Water security for herders and host communities on the Zone C corridor.",
    image: IMAGES.water,
    gallery: [IMAGES.water, IMAGES.borehole, IMAGES.field],
    timeline: [
      { date: "Feb 2025", title: "Survey", body: "Hydrogeological siting with Planning & Statistics." },
      { date: "Jun 2025", title: "Works", body: "First two holes yielding; third in drilling." }
    ]
  },
  {
    id: "school-shiroro",
    title: "Classroom rehabilitation — Nomadic Primary, Shiroro",
    description:
      "Four collapsed classrooms rebuilt so the viability map becomes a roof, a chalkboard, and a teacher who stays.",
    lga: "Shiroro",
    type: "School renovation",
    typeKey: "SCHOOL_RENOVATION",
    status: "PLANNING",
    budget: 19_500_000,
    startDate: null,
    endDate: null,
    impact: "Return of a non-viable school to session; enrolment recovery for children on the Kuta hinterland.",
    image: IMAGES.classroom,
    gallery: [IMAGES.classroom, IMAGES.school, IMAGES.children],
    timeline: [
      { date: "2025", title: "Viability finding", body: "Inspectors recorded failed roofs and a silent roll." },
      { date: "Next", title: "Works", body: "Four classrooms, furniture and a borehole request." }
    ]
  },
  {
    id: "school-bida",
    title: "Nomadic school upgrade — Bida",
    description:
      "Furniture, solar lighting and a borehole at Nomadic Primary School, Bida — a viable school kept viable.",
    lga: "Bida",
    type: "School renovation",
    typeKey: "SCHOOL_RENOVATION",
    status: "COMPLETED",
    budget: 12_400_000,
    startDate: "2024-09-01",
    endDate: "2025-03-20",
    impact: "239 children in session; teachers retained through the dry season.",
    image: IMAGES.school,
    gallery: [IMAGES.school, IMAGES.children, IMAGES.classroom],
    timeline: [
      { date: "Sep 2024", title: "Award", body: "Works packaged with SUBEB counterparts." },
      { date: "Mar 2025", title: "Handover", body: "Commissioner visits the restored block." }
    ]
  },
  {
    id: "dairy-mokwa",
    title: "Dairy collection centre — Mokwa",
    description:
      "Milk collection and cooling so pastoral households sell a product, not only a live animal at distress prices.",
    lga: "Mokwa",
    type: "Dairy center",
    typeKey: "DAIRY_CENTER",
    status: "ONGOING",
    budget: 41_000_000,
    startDate: "2025-02-10",
    endDate: "2025-11-20",
    impact: "A lawful market for milk along the Jebba corridor; women traders first in line.",
    image: IMAGES.cattle,
    gallery: [IMAGES.cattle, IMAGES.village, IMAGES.field],
    timeline: [
      { date: "Feb 2025", title: "Foundation", body: "Cooling plant and collection bay." },
      { date: "Now", title: "Fit-out", body: "Generator, tanks and cooperative training." }
    ]
  },
  {
    id: "ranch-borgu",
    title: "Grazing reserve & ranch support — Borgu",
    description:
      "Stock route protection and ranching support around Wawa — heritage that must now become a lawful enterprise.",
    lga: "Borgu",
    type: "Ranch",
    typeKey: "RANCH",
    status: "PLANNING",
    budget: 85_000_000,
    startDate: null,
    endDate: null,
    impact: "Reduced pressure on farms; a mapped reserve the next generation can inherit without a fight.",
    image: IMAGES.savanna,
    gallery: [IMAGES.savanna, IMAGES.cattle, IMAGES.landscape],
    timeline: [
      { date: "2025", title: "Demarcation", body: "Walking the old reserve with traditional rulers." }
    ]
  },
  {
    id: "rally-kontagora",
    title: "Join Hands Together — Kontagora peace rally",
    description:
      "Traditional rulers, youth, women leaders and the 30-Man Committee in one square, after the private work of mediation.",
    lga: "Kontagora",
    type: "Peace rally",
    typeKey: "PEACE_RALLY",
    status: "COMPLETED",
    budget: 4_500_000,
    startDate: "2025-03-01",
    endDate: "2025-03-12",
    impact: "A public sentence of neighbourliness across Zone C; resolved cases read aloud.",
    image: IMAGES.rally,
    gallery: [IMAGES.rally, IMAGES.meeting, IMAGES.hands],
    timeline: [
      { date: "Mar 2025", title: "Casework", body: "Pending dockets cleared before the square filled." },
      { date: "12 Mar", title: "Rally", body: "Join Hands Together declared in Kontagora." }
    ]
  },
  {
    id: "skills-suleja",
    title: "Skill acquisition for pastoral youth — Suleja",
    description:
      "Leatherwork, dairy hygiene, solar maintenance and literacy for young herders who will not live only by the stick.",
    lga: "Suleja",
    type: "Skill acquisition",
    typeKey: "SKILL_ACQUISITION",
    status: "ONGOING",
    budget: 18_200_000,
    startDate: "2025-04-08",
    endDate: "2025-12-15",
    impact: "Cohorts trained in trades that travel with the household — and in trades that let a youth stay.",
    image: IMAGES.meeting,
    gallery: [IMAGES.meeting, IMAGES.children, IMAGES.hands],
    timeline: [
      { date: "Apr 2025", title: "First cohort", body: "Eighty youth enrolled with the Nomadic Education Directorate." }
    ]
  },
  {
    id: "solar-agwara",
    title: "Solar borehole — Rofia settlement",
    description:
      "Water at the far edge of Zone C, where a dry season used to empty both the school and the camp.",
    lga: "Agwara",
    type: "Solar borehole",
    typeKey: "SOLAR_BOREHOLE",
    status: "COMPLETED",
    budget: 22_000_000,
    startDate: "2024-11-01",
    endDate: "2025-05-18",
    impact: "Households remaining through the dry months; children able to stay near a classroom.",
    image: IMAGES.dusk,
    gallery: [IMAGES.dusk, IMAGES.borehole, IMAGES.village],
    timeline: [
      { date: "Nov 2024", title: "Mobilisation", body: "Community labour and Ministry stores." },
      { date: "May 2025", title: "Water", body: "First yield celebrated with the Peace Committee." }
    ]
  }
];

export const projectTypeFilters = [
  "All",
  "Solar borehole",
  "School renovation",
  "Dairy center",
  "Ranch",
  "Peace rally",
  "Skill acquisition"
] as const;

export function projectImageForType(typeKey: string) {
  switch (typeKey) {
    case "SOLAR_BOREHOLE":
      return IMAGES.borehole;
    case "SCHOOL_RENOVATION":
      return IMAGES.school;
    case "DAIRY_CENTER":
      return IMAGES.cattle;
    case "RANCH":
      return IMAGES.savanna;
    case "PEACE_RALLY":
      return IMAGES.rally;
    default:
      return IMAGES.field;
  }
}
