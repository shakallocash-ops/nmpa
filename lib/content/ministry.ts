export const PUBLISHED_STATS = {
  lgas: 25,
  conflictsResolved: 300,
  schools: 275,
  households: 18462,
  livestock: 2_352_000,
  appointments: 65,
  solarBoreholes: 30
} as const;

export const ministry = {
  name: "Ministry of Nomadic and Pastoral Affairs",
  shortName: "NMPA",
  state: "Niger State",
  government: "Niger State Government",
  established: "16 August 2023",
  headquarters: "Ministry Headquarters, Minna, Niger State",
  commissioner: {
    name: "Alhaji Umar Ahmed Sanda Rabe",
    title: "Honourable Commissioner"
  },
  governor: {
    name: "His Excellency Mohammed Umaru Bago",
    title: "Executive Governor of Niger State"
  },
  email: "info@nomadicafairs.nigerstate.gov.ng",
  phone: "+234 (0) 70 0000 0000",
  social: {
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com"
  }
};

export const vision =
  "A peaceful and prosperous Niger State in which nomadic and pastoral communities are full citizens of the commonwealth — educated, enumerated, economically viable, and living in justice with their farming neighbours.";

export const mission =
  "To bring pastoralists closer to government; to register herders and livestock; to deliver nomadic education, water and grazing infrastructure; to mediate farmer–herder conflict through the 30-Man Committees; and to move livestock production from hereditary survival to commercial dignity.";

export const mandates = [
  {
    id: "register",
    title: "Registration & identity",
    body: "Enumerate households, issue herder identity, and build a living register of livestock across all 25 LGAs."
  },
  {
    id: "education",
    title: "Nomadic education",
    body: "Keep 275 nomadic schools viable, staffed and enrolled — including the Back-to-School initiative for children on the move."
  },
  {
    id: "peace",
    title: "Peace & mediation",
    body: "Resolve farmer–herder disputes through dialogue, the 30-Man Committee, and fair compensation — not through silence."
  },
  {
    id: "grazing",
    title: "Grazing reserves & ranches",
    body: "Protect stock routes, restore grazing reserves, and support ranching as a modern, lawful livelihood."
  },
  {
    id: "water",
    title: "Water & solar infrastructure",
    body: "Deliver solar boreholes and cattle troughs so communities and herds need not contest a single stream."
  },
  {
    id: "livestock",
    title: "Livestock productivity",
    body: "Raise yields through dairy collection, veterinary extension, and a shift from subsistence herding to enterprise."
  },
  {
    id: "data",
    title: "Evidence & planning",
    body: "Publish baseline data, LGA reports and research so policy is written from facts, not rumour."
  }
];

export const departments = [
  {
    slug: "administration",
    name: "Administration",
    summary: "Policy implementation, establishment matters, and the orderly allocation of the Ministry’s resources.",
    functions: [
      "Interpret and circulate Executive Council decisions",
      "Human resource, records and establishment control",
      "Coordination of the Honourable Commissioner’s office",
      "Internal service standards and correspondence"
    ],
    achievements: [
      "Stood up a new Ministry from first principles in 2023",
      "Established LGA liaison for the 30-Man Committee network"
    ]
  },
  {
    slug: "planning",
    name: "Planning, Research & Statistics",
    summary: "Short- and long-range planning, the pastoralist baseline, and the Ministry’s statistical spine.",
    functions: [
      "Household and livestock enumeration design",
      "LGA situational reports and forecasting",
      "Monitoring of projects and key results",
      "Research partnerships with tertiary institutions"
    ],
    achievements: [
      "18,462+ pastoralist households documented",
      "2.35 million livestock recorded in the state register"
    ]
  },
  {
    slug: "education",
    name: "Nomadic Education",
    summary: "Schools that move with the people — teachers, classrooms, enrolment and the Back-to-School drive.",
    functions: [
      "Viability assessment of 275 nomadic schools",
      "Teacher posting and instructional materials",
      "Back-to-School mobilisation in grazing communities",
      "Classroom rehabilitation with sister agencies"
    ],
    achievements: [
      "Statewide school viability mapping",
      "Enrolment recovery in previously silent settlements"
    ]
  },
  {
    slug: "peace",
    name: "Peace & Conflict Resolution",
    summary: "Mediation, the 30-Man Committee, compensation, and the long work of neighbourliness.",
    functions: [
      "Case intake, mediation and referral",
      "Secretariat of the 30-Man and Peace Committees",
      "Peace rallies and Join Hands Together campaigns",
      "Coordination with security and traditional institutions"
    ],
    achievements: [
      "300+ conflicts resolved through dialogue",
      "Committee structures active across 25 LGAs"
    ]
  },
  {
    slug: "finance",
    name: "Finance & Supply",
    summary: "Budgets, treasury discipline, procurement and the stores that keep field work moving.",
    functions: [
      "Annual budget preparation and defence",
      "Payment processing and vote books",
      "Procurement of borehole, school and rally materials",
      "Stores, fleet and field logistics"
    ],
    achievements: [
      "Transparent project vote tracking for solar boreholes",
      "Supply chains to remote grazing areas"
    ]
  }
];

export const leadership = [
  {
    name: "Alhaji Umar Ahmed Sanda Rabe",
    role: "Honourable Commissioner",
    bio: "Pioneer Commissioner. A public advocate for justice as the precondition of peace, and for bringing Fulani herders from the ungoverned forest into the circle of government."
  },
  {
    name: "Office of the Permanent Secretary",
    role: "Permanent Secretary",
    bio: "Accounting officer of the Ministry. Supervises the five directorates and the daily machinery of policy."
  },
  {
    name: "Directorate of Administration",
    role: "Director, Administration",
    bio: "Establishment, records, and the Commissioner’s secretariat."
  },
  {
    name: "Directorate of Planning",
    role: "Director, Planning, Research & Statistics",
    bio: "Baseline data, research agenda, and results monitoring."
  },
  {
    name: "Directorate of Nomadic Education",
    role: "Director, Nomadic Education",
    bio: "School viability, teachers, and the child who must not be left behind the herd."
  },
  {
    name: "Directorate of Peace",
    role: "Director, Peace & Conflict Resolution",
    bio: "Mediation docket, 30-Man Committees, and peace rallies."
  },
  {
    name: "Directorate of Finance",
    role: "Director, Finance & Supply",
    bio: "Votes, procurement and the stores that reach the field."
  }
];
