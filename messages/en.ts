/**
 * Source-of-truth catalogue. Every other locale is a partial of this shape and
 * is deep-merged over it, so a missing translation degrades to English rather
 * than to a raw key.
 *
 * Typographic apostrophes (’) are used deliberately: a straight quote is an
 * escape character in ICU MessageFormat.
 */
const en = {
  gov: {
    government: "Niger State Government",
    ministry: "Ministry of Nomadic and Pastoral Affairs",
    ministryShort: "NMPA",
    state: "Niger State",
    place: "Minna · Niger State · Federal Republic of Nigeria",
    country: "Federal Republic of Nigeria",
    headquarters: "Ministry Headquarters, Minna, Niger State",
    established: "16 August 2023",
    commissionerTitle: "Honourable Commissioner",
    governorTitle: "Executive Governor of Niger State",
    crestAlt:
      "Coat of arms of the Ministry of Nomadic and Pastoral Affairs, Niger State"
  },

  nav: {
    mainNavLabel: "Main navigation",
    skipToContent: "Skip to main content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeAria: "Ministry of Nomadic and Pastoral Affairs — home",
    breadcrumbLabel: "Breadcrumb",
    staffLogin: "Staff login",
    home: "Home",
    about: "About",
    departments: "Departments",
    programmes: "Programmes",
    resources: "Resources",
    news: "News",
    gallery: "Gallery",
    contact: "Contact",
    aboutOverview: "Ministry overview",
    aboutMandates: "Mandates",
    aboutLeadership: "Leadership",
    departmentsAll: "All departments",
    programmesAll: "All programmes",
    programmesEducation: "Nomadic education",
    programmesPeace: "Peace & security",
    programmesProjects: "Projects & infrastructure",
    resourcesDownloads: "Reports & downloads",
    resourcesData: "Data explorer",
    resourcesSchools: "Nomadic schools register"
  },

  language: {
    label: "Language",
    selectLabel: "Select a language",
    current: "Current language: {language}",
    switchTo: "Switch to {language}",
    partialNotice:
      "This site is being translated into {language}. Pages that are not yet translated are shown in English.",
    dismissNotice: "Dismiss"
  },

  common: {
    readMore: "Read more",
    viewDetails: "View details",
    viewAll: "View all",
    learnMore: "Learn more",
    search: "Search",
    filter: "Filter",
    clearFilters: "Clear filters",
    previous: "Previous",
    next: "Next",
    pageOf: "Page {current} of {total}",
    showingOf: "Showing {shown} of {total}",
    noResults: "No results found.",
    noData: "No data available.",
    loading: "Loading…",
    loadingMap: "Loading map…",
    optional: "Optional",
    yes: "Yes",
    no: "No",
    all: "All",
    allLgas: "All 25 Local Government Areas",
    allStatuses: "All statuses",
    lga: "Local Government Area",
    lgaShort: "LGA",
    zone: "Zone",
    senatorialZone: "Senatorial zone",
    source: "Source",
    download: "Download",
    pdf: "PDF",
    csv: "CSV",
    close: "Close",
    dateLabel: "Date",
    notPublished: "Not published",
    notAvailable: "Not available",
    officialLanguageNotice:
      "This item is published in the language in which it was issued.",
    monthsShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]
  },

  status: {
    planning: "Planning",
    ongoing: "Ongoing",
    completed: "Completed",
    viable: "Viable",
    nonViable: "Non-viable",
    notAssessed: "Not assessed",
    pending: "Pending",
    inMediation: "In mediation",
    resolved: "Resolved",
    escalated: "Escalated",
    continuous: "Continuous",
    ongoingDelivery: "Ongoing delivery"
  },

  ministry: {
    vision:
      "A peaceful and prosperous Niger State in which nomadic and pastoral communities are full citizens of the commonwealth — educated, enumerated, economically viable, and living in justice with their farming neighbours.",
    mission:
      "To bring pastoralists closer to government; to register herders and livestock; to deliver nomadic education, water and grazing infrastructure; to mediate farmer–herder conflict through the 30-Man Committees; and to move livestock production from hereditary survival to commercial dignity.",
    mandates: {
      register: {
        title: "Registration & identity",
        body: "Enumerate households, issue herder identity, and build a living register of livestock across all 25 Local Government Areas."
      },
      education: {
        title: "Nomadic education",
        body: "Keep nomadic schools viable, staffed and enrolled — including the Back-to-School initiative for children on the move."
      },
      peace: {
        title: "Peace & mediation",
        body: "Resolve farmer–herder disputes through dialogue, the 30-Man Committee, and fair compensation."
      },
      grazing: {
        title: "Grazing reserves & ranches",
        body: "Protect stock routes, restore grazing reserves, and support ranching as a modern, lawful livelihood."
      },
      water: {
        title: "Water & solar infrastructure",
        body: "Deliver solar boreholes and cattle troughs so that communities and herds need not contest a single stream."
      },
      livestock: {
        title: "Livestock productivity",
        body: "Raise yields through dairy collection, veterinary extension, and a shift from subsistence herding to enterprise."
      },
      data: {
        title: "Evidence & planning",
        body: "Publish baseline data, Local Government reports and research so that policy is written from facts."
      }
    },
    departments: {
      administration: {
        name: "Administration",
        summary:
          "Policy implementation, establishment matters, and the orderly allocation of the Ministry’s resources.",
        functions: [
          "Interpret and circulate Executive Council decisions",
          "Human resource, records and establishment control",
          "Coordination of the Honourable Commissioner’s office",
          "Internal service standards and correspondence"
        ],
        achievements: [
          "Stood up a new Ministry from first principles in 2023",
          "Established Local Government liaison for the 30-Man Committee network"
        ]
      },
      planning: {
        name: "Planning, Research & Statistics",
        summary:
          "Short- and long-range planning, the pastoralist baseline, and the Ministry’s statistical spine.",
        functions: [
          "Household and livestock enumeration design",
          "Local Government situational reports and forecasting",
          "Monitoring of projects and key results",
          "Research partnerships with tertiary institutions"
        ],
        achievements: [
          "Pastoralist households documented statewide",
          "Livestock recorded in the state register"
        ]
      },
      education: {
        name: "Nomadic Education",
        summary:
          "Schools that move with the people — teachers, classrooms, enrolment and the Back-to-School drive.",
        functions: [
          "Viability assessment of nomadic schools",
          "Teacher posting and instructional materials",
          "Back-to-School mobilisation in grazing communities",
          "Classroom rehabilitation with sister agencies"
        ],
        achievements: [
          "Statewide school viability mapping",
          "Enrolment recovery in previously unserved settlements"
        ]
      },
      peace: {
        name: "Peace & Conflict Resolution",
        summary:
          "Mediation, the 30-Man Committee, compensation, and the long work of neighbourliness.",
        functions: [
          "Case intake, mediation and referral",
          "Secretariat of the 30-Man and Peace Committees",
          "Peace rallies and Join Hands Together campaigns",
          "Coordination with security and traditional institutions"
        ],
        achievements: [
          "Conflicts resolved through dialogue",
          "Committee structures active across the Local Government Areas"
        ]
      },
      finance: {
        name: "Finance & Supply",
        summary:
          "Budgets, treasury discipline, procurement and the stores that keep field work moving.",
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
    },
    roles: {
      commissioner: "Honourable Commissioner",
      permanentSecretary: "Permanent Secretary",
      directorAdministration: "Director, Administration",
      directorPlanning: "Director, Planning, Research & Statistics",
      directorEducation: "Director, Nomadic Education",
      directorPeace: "Director, Peace & Conflict Resolution",
      directorFinance: "Director, Finance & Supply",
      informationUnit: "Head, Information & Protocol",
      director: "Director"
    },
    offices: {
      commissioner: "Office of the Honourable Commissioner",
      permanentSecretary: "Office of the Permanent Secretary",
      administration: "Directorate of Administration",
      planning: "Directorate of Planning, Research & Statistics",
      education: "Directorate of Nomadic Education",
      peace: "Directorate of Peace & Conflict Resolution",
      finance: "Directorate of Finance & Supply",
      information: "Information & Protocol Unit"
    }
  },

  home: {
    hero: {
      eyebrow: "Established {date}",
      title: "Empowering Nomadic and Pastoral Communities Across Niger State",
      description:
        "The Ministry registers pastoral households, sustains nomadic schools, delivers water and grazing infrastructure, and mediates farmer–herder disputes in all 25 Local Government Areas.",
      ctaPrimary: "View Ministry Programmes",
      ctaSecondary: "Contact the Ministry"
    },
    quickAccess: {
      eyebrow: "Citizen services",
      title: "Quick access",
      departments: "Departments",
      departmentsDescription: "Five directorates and their responsibilities",
      schools: "Nomadic schools",
      schoolsDescription: "Search the register and viability map",
      report: "Report a conflict",
      reportDescription: "File a dispute for mediation",
      projects: "Projects",
      projectsDescription: "Boreholes, classrooms and grazing works",
      news: "News & notices",
      newsDescription: "Press releases and announcements",
      contact: "Contact the Ministry",
      contactDescription: "Registry, offices and enquiries"
    },
    stats: {
      title: "Key figures",
      note: "Figures published by the Ministry of Nomadic and Pastoral Affairs and updated from the Ministry’s household, school and case registers.",
      lgas: "Local Government Areas",
      lgasContext: "Covered by Ministry field operations",
      schools: "Nomadic schools",
      schoolsContext: "On the nomadic education register",
      households: "Households documented",
      householdsContext: "Enumerated pastoral households",
      livestock: "Livestock recorded",
      livestockContext: "Recorded in the state livestock register",
      conflicts: "Conflicts resolved",
      conflictsContext: "Settled through mediation and dialogue",
      appointments: "Political appointments",
      appointmentsContext: "Pastoral representation in government"
    },
    intro: {
      eyebrow: "About the Ministry",
      title: "A dedicated ministry for nomadic and pastoral communities",
      paragraph1:
        "The Ministry of Nomadic and Pastoral Affairs was established on {date} by the Government of {state} to bring pastoral communities into full participation in public services and development planning.",
      commissionerLabel: "Honourable Commissioner",
      establishedLabel: "Established",
      cta: "Learn more about the Ministry",
      imageAlt: "Pastoral herd on grazing land in Niger State"
    },
    mandates: {
      eyebrow: "Statutory mandate",
      title: "Responsibilities of the Ministry",
      description:
        "Seven mandates guide the Ministry’s work across registration, education, peacebuilding, infrastructure and public information."
    },
    departments: {
      eyebrow: "Organisation",
      title: "Departments of the Ministry",
      description:
        "Each directorate is responsible for a defined area of policy and service delivery.",
      viewAll: "View all departments",
      viewDepartment: "View department"
    },
    projects: {
      eyebrow: "Programmes & projects",
      title: "Current work across the State",
      viewAll: "View all projects"
    },
    peaceBand: {
      eyebrow: "Peace & security",
      title: "Report a farmer–herder dispute for mediation",
      description:
        "Reports are received by the Department of Peace and Conflict Resolution and referred to the appropriate Local Government committee. In an emergency, contact security agencies first.",
      cta: "Report a conflict"
    },
    news: {
      eyebrow: "Newsroom",
      title: "News and announcements",
      viewAll: "View all news"
    }
  },

  about: {
    hero: {
      eyebrow: "About the Ministry",
      title:
        "Established to bring pastoral communities into the circle of government",
      description: "Created on {date} by the Government of {state}."
    },
    background: {
      eyebrow: "Background",
      title: "How the Ministry came to be",
      paragraph1:
        "The Ministry of Nomadic and Pastoral Affairs was established on {date} by {governor}, {governorTitle}, as part of a commitment to a government that serves all communities of {state}.",
      paragraph2:
        "{commissioner} was appointed pioneer {commissionerTitle}. The Ministry was given a plain charge: to know the pastoral population, to educate its children, to secure water and lawful grazing, and to settle disputes between herders and farmers before they harden into violence.",
      paragraph3:
        "The Ministry operates through five directorates and maintains a presence in all 25 Local Government Areas, working with traditional institutions, security agencies and development partners."
    },
    facts: {
      established: "Established",
      commissioner: "Honourable Commissioner",
      governor: "Executive Governor",
      headquarters: "Headquarters",
      directorates: "Directorates",
      directoratesValue: "Five",
      coverage: "Coverage",
      coverageValue: "25 Local Government Areas"
    },
    vision: "Vision",
    mission: "Mission",
    mandates: {
      eyebrow: "Statutory mandate",
      title: "Seven mandates of the Ministry",
      description:
        "Each mandate is assigned to a directorate and reported against in the Ministry’s planning cycle.",
      number: "Mandate {number}"
    },
    organogram: {
      eyebrow: "Organisational structure",
      title: "Organogram",
      description: "Select any office to read its responsibilities.",
      permanentSecretaryDetail: "Accounting officer",
      administrationDetail: "Establishment & records",
      planningDetail: "Evidence & monitoring",
      educationDetail: "Schools & enrolment",
      peaceDetail: "Mediation & committees",
      financeDetail: "Budget & procurement"
    },
    leadership: {
      eyebrow: "Leadership",
      title: "Offices of the Ministry",
      description:
        "Political and career leadership responsible for policy, delivery and accountability."
    },
    accessibility: {
      eyebrow: "Accessibility",
      title: "This website is built to be used by everyone",
      description:
        "Pages meet WCAG 2.1 AA colour contrast, work with keyboard navigation and screen readers, and respect reduced-motion settings. If you encounter a barrier, write to the Ministry and we will provide the information in another format.",
      cta: "Contact the Ministry",
      imageAlt: "Community stakeholders meeting with Ministry officials"
    }
  },

  departments: {
    hero: {
      eyebrow: "Organisation",
      title: "Departments of the Ministry",
      description:
        "Policy and delivery are organised into five directorates, each accountable to the Permanent Secretary."
    },
    directorateNumber: "Directorate {number}",
    viewDepartment: "View department",
    detail: {
      eyebrow: "Directorate",
      functionsTitle: "What this directorate does",
      achievementsTitle: "Recorded achievements",
      contactsTitle: "Directorate contacts",
      contactsEmpty:
        "Enquiries for this directorate are received through the Ministry registry.",
      contactsCta: "Contact the Ministry",
      otherTitle: "Other departments",
      otherAria: "Other departments",
      relatedEyebrow: "Related work",
      relatedTitle: "Projects across the State",
      relatedDescription:
        "Selected projects currently recorded by the Ministry."
    }
  },

  programmes: {
    hero: {
      eyebrow: "Programmes and services",
      title: "What the Ministry delivers",
      description:
        "Six programme areas carry the Ministry’s mandate into the Local Government Areas."
    },
    section: {
      eyebrow: "Programme areas",
      title: "Programmes of the Ministry",
      description:
        "Each programme is led by a directorate and reported against in the Ministry’s planning cycle."
    },
    education: {
      label: "Nomadic education",
      body: "Viability assessment, teacher posting, classroom rehabilitation and the Back-to-School drive for children in grazing communities. School-level records are published in the nomadic schools register.",
      actionPrimary: "Education programme",
      actionSecondary: "Schools register"
    },
    peace: {
      label: "Peace and conflict resolution",
      body: "Mediation of farmer–herder disputes through the 30-Man Committees in every Local Government Area, compensation where due, and the Join Hands Together peace rallies across the three senatorial zones.",
      actionPrimary: "Peace and security",
      actionSecondary: "Report a conflict"
    },
    water: {
      label: "Water and solar infrastructure",
      body: "Solar-powered boreholes and cattle troughs sited so that households and herds are not forced to contest the same stream. Delivery is recorded project by project.",
      actionPrimary: "View projects"
    },
    grazing: {
      label: "Grazing reserves and ranching",
      body: "Protection of stock routes, restoration of gazetted grazing reserves and support for ranching as a lawful, modern livelihood.",
      actionPrimary: "View projects"
    },
    livestock: {
      label: "Livestock and dairy development",
      body: "Dairy collection centres, veterinary extension and skills acquisition intended to move livestock keeping from subsistence to enterprise.",
      actionPrimary: "View projects"
    },
    registration: {
      label: "Household registration and identity",
      body: "Enumeration of pastoral households, herder identity and a statewide livestock register. Aggregate results are published in the data explorer.",
      actionPrimary: "Data explorer",
      actionSecondary: "Reports and downloads"
    }
  },

  resources: {
    hero: {
      eyebrow: "Resources",
      title: "Reports, registers and datasets",
      description:
        "The Ministry publishes its registers so that local governments, researchers and development partners can plan from the same evidence."
    },
    downloads: {
      eyebrow: "Downloads",
      title: "Published registers",
      description:
        "Files are generated from current Ministry records at the moment of download."
    },
    baseline: {
      title: "Pastoralist baseline by Local Government Area",
      description:
        "Households enumerated and livestock recorded for each of the 25 Local Government Areas.",
      updated: "Updated from the Ministry household register"
    },
    schools: {
      title: "Nomadic schools register",
      description:
        "Every school on the register with Local Government Area, enrolment by sex, teachers and viability status.",
      updated: "{count, plural, one {# school listed} other {# schools listed}}"
    },
    projects: {
      title: "Project register",
      description:
        "Boreholes, classrooms, dairy centres, grazing works and skills programmes recorded by the Ministry.",
      updated:
        "{count, plural, one {# project listed} other {# projects listed}}"
    },
    sourceLive: "Ministry household, school and project registers",
    sourcePublished:
      "Published pastoralist baseline and Ministry registers",
    sourceNote:
      "Source: {source}. For data not published here, write to the Ministry registry.",
    related: {
      eyebrow: "Related information",
      title: "Explore the underlying records",
      dataLabel: "Data explorer",
      dataDescription:
        "Interactive charts for households, livestock and demographics with zone filters.",
      schoolsLabel: "Nomadic schools register",
      schoolsDescription:
        "Searchable map and table of every school with enrolment and viability status.",
      newsLabel: "Press releases and notices",
      newsDescription:
        "Official statements, announcements and event notices."
    }
  },

  education: {
    hero: {
      eyebrow: "Programmes",
      title: "Nomadic education",
      description:
        "Schools that move with the people — assessed, staffed and published on the public record."
    },
    figures: {
      schools: "Schools on the register",
      viable: "Assessed as viable",
      enrolment: "Pupils enrolled",
      teachers: "Teachers posted"
    },
    programme: {
      eyebrow: "The programme",
      title: "A child who moves is still a child of Niger State",
      paragraph1:
        "The Directorate of Nomadic Education assesses every school on the register for viability: whether teachers are present, children are enrolled, and the classroom is sound. Results are published so that partners can see exactly where a teacher, a roof or a borehole will change a life.",
      paragraph2:
        "The Back-to-School initiative follows the herd. Mobilisation teams work with Ardo and Wakili leaders to return children in transit to instruction, and to place girls in schools that their families will trust.",
      points: [
        "Viability assessment and publication for every nomadic school",
        "Teacher posting and instructional materials",
        "Back-to-School mobilisation in grazing communities",
        "Classroom rehabilitation with sister agencies"
      ],
      ctaRegister: "Open the schools register",
      ctaDepartment: "View department",
      classroomAlt: "Classroom in a nomadic school in Niger State",
      pupilsAlt: "Pupils at a nomadic school"
    },
    band: {
      eyebrow: "Schools register",
      title:
        "Find a nomadic school by name, Local Government Area or status",
      description:
        "Enrolment by sex, teachers, classroom condition, solar and borehole provision are published for each school.",
      cta: "Open the register"
    }
  },

  schools: {
    hero: {
      eyebrow: "Resources",
      title: "Nomadic schools register",
      description:
        "Search the register, filter by Local Government Area or viability, and open any school for its full record."
    },
    filters: {
      searchLabel: "Search by name or Local Government Area",
      searchPlaceholder: "For example: Nomadic Primary School",
      lgaLabel: "Local Government Area",
      statusLabel: "Viability status"
    },
    summary: {
      count: "{shown} of {total} schools",
      viable: "{count} viable",
      nonViable: "{count} non-viable"
    },
    view: {
      label: "Display mode",
      map: "Map",
      list: "List"
    },
    table: {
      caption: "Register of nomadic schools in Niger State",
      school: "School",
      lga: "Local Government Area",
      enrolment: "Enrolment",
      status: "Status",
      action: "Action",
      viewRecord: "View record",
      empty: "No schools match the selected filters."
    },
    mapNote:
      "Green markers indicate schools assessed as viable; red markers indicate schools assessed as non-viable. Map data © OpenStreetMap contributors.",
    popup: {
      enrolment: "Enrolment",
      teachers: "Teachers",
      classrooms: "Classrooms",
      solarBorehole: "Solar · Borehole",
      classroomsValue: "{good} sound / {bad} poor",
      bySex: "{male}M / {female}F",
      viewRecord: "View full record"
    },
    detail: {
      metaDescription:
        "{name}, {lga} Local Government Area — enrolment, teachers, classroom condition and viability status.",
      heroDescription:
        "Record published by the Directorate of Nomadic Education.",
      viableNote: "This school meets the Ministry’s viability criteria.",
      nonViableNote:
        "This school has been assessed as non-viable and is scheduled for intervention.",
      tableCaption: "School record",
      fields: {
        lga: "Local Government Area",
        zone: "Senatorial zone",
        enrolmentTotal: "Total enrolment",
        enrolmentBySex: "Enrolment by sex",
        teachersTotal: "Teachers posted",
        teachersBySex: "Teachers by sex",
        classrooms: "Classrooms",
        classroomCondition: "Classroom condition",
        solar: "Solar power",
        borehole: "Borehole",
        ratio: "Pupil–teacher ratio",
        coordinates: "Coordinates"
      },
      classroomsTotal: "{count} total",
      classroomsCondition: "{good} sound / {bad} requiring works",
      installed: "Installed",
      notInstalled: "Not installed",
      present: "Present",
      notPresent: "Not present",
      bySexLong: "{male} male / {female} female",
      backToRegister: "Back to the register",
      reportError: "Report an error in this record"
    }
  },

  peace: {
    hero: {
      eyebrow: "Programmes",
      title: "Peace and conflict resolution",
      description:
        "Mediation between farming and pastoral communities, committee structures in every Local Government Area, and a public record of settled cases."
    },
    dashboard: {
      eyebrow: "Conflict resolution",
      title: "Case position",
      description: "Figures are drawn from the Ministry’s mediation register.",
      total: "Cases recorded",
      resolved: "Resolved",
      mediation: "In mediation",
      pending: "Pending intake"
    },
    trend: {
      title: "Cases resolved by month",
      description: "Rolling twelve-month position of the mediation docket.",
      series: "Cases resolved"
    },
    recent: {
      title: "Recently resolved cases"
    },
    settlements: {
      title: "Published settlements"
    },
    committees: {
      eyebrow: "Committee structure",
      title: "The 30-Man Committees",
      description:
        "Each Local Government Area maintains a committee of traditional, women’s and youth representatives sitting with farming neighbours. Membership is published as it is confirmed.",
      searchLabel: "Search committees",
      searchPlaceholder:
        "Search by Local Government Area, member or role",
      memberCount:
        "{count, plural, =0 {no members published} one {# member published} other {# members published}}",
      notPublished:
        "Committee membership for {lga} has not yet been published. Contact the Department of Peace and Conflict Resolution for the current list.",
      contactVia: "Contact through the Department of Peace"
    },

    /** Ardo and Wakili are traditional titles and are not translated. */
    roles: {
      ardo: "Ardo",
      wakili: "Wakili",
      chairman: "Chairman",
      viceChairman: "Vice Chairman",
      secretary: "Secretary",
      youthLeader: "Youth Leader",
      womenLeader: "Women Leader",
      treasurer: "Treasurer",
      pro: "Public Relations Officer",
      legalAdviser: "Legal Adviser",
      member: "Member"
    },
    committeeTypes: {
      thirtyMan: "30-Man Committee",
      peace: "Peace Committee"
    },
    rallies: {
      eyebrow: "Join Hands Together",
      title: "Peace rallies and initiatives",
      description:
        "Rallies follow casework, not the other way round. Each square is preceded by a settlement.",
      captions: [
        "Join Hands Together — a public sentence of neighbourliness",
        "Traditional authority, youth and the 30-Man Committee in one square",
        "Hands that have mediated, then gathered",
        "The rally follows the cattle track, not only the tarred road"
      ]
    },

    /** Index-aligned with `peaceStories` in lib/content/peace.ts. */
    stories: [
      {
        title: "Jebba corridor — crop and cattle",
        body: "Late dry-season movement took a herd into rice. The 30-Man Committee sat. Compensation was paid. The route was remarked. The next season, both sides used the same stream on a timetable."
      },
      {
        title: "Allawa — water without a fight",
        body: "A seasonal stream had become a sentence of ownership. Mediation produced staggered watering hours. A solar borehole later took the pressure off the stream altogether."
      },
      {
        title: "Kontagora — a route unblocked",
        body: "A traditional stock route had been fenced for farming. The Peace Directorate walked the line with farmers and herders. The fence moved. The farm remained. The cattle still had a lawful path."
      }
    ],

    /** Index-aligned with `peaceTimeline` in lib/content/peace.ts. */
    timeline: [
      {
        title: "A ministry is born",
        body: "On 16 August 2023 the Executive Governor, Mohammed Umaru Bago, created the first Ministry of Nomadic and Pastoral Affairs in Niger State — so that herders would no longer live beyond the reach of government."
      },
      {
        title: "30-Man Committees",
        body: "Peace architecture is planted in all 25 Local Government Areas: Ardo, Wakili, women and youth leaders sitting with farming neighbours before a rumour becomes a raid."
      },
      {
        title: "Justice before slogans",
        body: "The Honourable Commissioner restates the Ministry’s creed: in the absence of justice, do not expect peace. Compensation is named in the open."
      },
      {
        title: "Join Hands Together",
        body: "Peace rallies travel the three senatorial zones. Each square is preceded by casework — a crop, a route, a watering order — then the people say the same sentence: we will not inherit this quarrel."
      }
    ],
    report: {
      eyebrow: "Citizen service",
      title: "Report a conflict for mediation",
      description:
        "Reports are received by the Department of Peace and Conflict Resolution and referred to the committee for the Local Government Area named.",
      steps: [
        "State the Local Government Area and the exact location.",
        "Describe what happened and who is involved.",
        "Provide a telephone number so the committee can reach you.",
        "Where life or property is in immediate danger, contact security agencies first."
      ]
    }
  },

  data: {
    hero: {
      eyebrow: "Resources",
      title: "Data and reports",
      description:
        "Baseline evidence on pastoral households and livestock, published so that policy is written from facts."
    },
    explorer: {
      eyebrow: "Data explorer",
      title: "Pastoralist baseline",
      description:
        "Filter by senatorial zone to see households enumerated, livestock recorded and the demographic profile of household heads."
    },
    zone: {
      label: "Filter by senatorial zone",
      aria: "Senatorial zone",
      all: "All zones",
      named: "Zone {zone}"
    },
    totals: {
      households: "Households enumerated",
      livestock: "Livestock recorded",
      cattle: "Cattle recorded"
    },
    sourceLive: "Ministry household register",
    sourcePublished: "Published pastoralist baseline",
    charts: {
      byLgaTitle: "Households and livestock by Local Government Area",
      byLgaDescription:
        "Enumerated households against total recorded livestock.",
      ageTitle: "Age distribution",
      ageDescription: "Household heads by age band.",
      genderTitle: "Gender of household heads",
      settlementTitle: "Settlement type",
      herdTitle: "Cattle, sheep and goats by Local Government Area",
      herdDescription: "Stacked composition of recorded herds.",
      compositionTitle: "Overall livestock composition",
      compositionDescription: "Share of recorded animals by species.",
      households: "Households",
      livestock: "Livestock",
      cattle: "Cattle",
      sheep: "Sheep",
      goats: "Goats",
      other: "Other",
      share: "Share",
      male: "Male",
      female: "Female",
      nomadic: "Nomadic",
      semiNomadic: "Semi-nomadic",
      settled: "Settled"
    },
    downloads: {
      title: "Download reports",
      description:
        "Baseline tables are published for local government planning, research institutions and development partners. Exports reflect the filters applied above.",
      pdf: "Baseline report (PDF)",
      csv: "Spreadsheet (CSV)",
      lgaTitle: "Individual Local Government reports",
      reportTitle:
        "Pastoralist Baseline Summary by Local Government Area",
      indicator: "Indicator",
      value: "Value",
      householdsEnumerated: "Households enumerated",
      totalLivestock: "Total livestock"
    }
  },

  projects: {
    hero: {
      eyebrow: "Programmes",
      title: "Projects and infrastructure",
      description:
        "Works recorded by the Ministry across the 25 Local Government Areas, with status and impact for each project."
    },
    counts: {
      completed: "Completed projects on the register",
      ongoing: "Ongoing projects on the register",
      planning: "Projects in planning on the register"
    },
    register: {
      eyebrow: "Project register",
      title: "Filter the register",
      description:
        "Select a project type, delivery status or Local Government Area."
    },
    filters: {
      typeLabel: "Project type",
      statusLabel: "Status",
      lgaLabel: "Local Government Area",
      showing:
        "Showing {count, plural, one {# project} other {# projects}}",
      empty: "No projects match the selected filters."
    },
    types: {
      all: "All",
      solarBorehole: "Solar borehole",
      schoolRenovation: "School renovation",
      peaceRally: "Peace rally",
      dairyCenter: "Dairy centre",
      ranch: "Ranch",
      skillAcquisition: "Skill acquisition",
      grazingReserve: "Grazing reserve"
    },
    card: {
      view: "View project"
    },
    detail: {
      descriptionTitle: "Project description",
      impactTitle: "Recorded impact",
      timelineTitle: "Implementation timeline",
      galleryTitle: "Gallery",
      galleryAlt: "{title} — image {index}",
      lga: "Local Government Area",
      type: "Project type",
      budget: "Budget",
      commenced: "Commenced",
      completed: "Completed",
      inProgress: "In progress",
      back: "Back to all projects",
      othersEyebrow: "Also on the register",
      othersTitle: "Other projects"
    }
  },

  gallery: {
    hero: {
      eyebrow: "Media",
      title: "Gallery",
      description:
        "A visual record of the Ministry’s work in the field, organised by programme area."
    },
    section: {
      eyebrow: "Photographs",
      title: "Browse by category",
      description:
        "Select an image to view it at full size with its caption."
    },
    filterAria: "Filter gallery by category",
    categories: {
      all: "All",
      schools: "Schools",
      boreholes: "Boreholes",
      rallies: "Peace rallies",
      community: "Community visits",
      events: "Events",
      victims: "Conflict victims",
      baseline: "Baseline data collection"
    },
    /** Keyed by the stable ids in lib/content/gallery.ts. */
    items: {
      "schools-1": {
        title: "Nomadic classroom, open sky",
        caption:
          "Nomadic schools remain the Ministry’s longest bet on peace: a literate child does not inherit a rumour."
      },
      "schools-2": {
        title: "Back-to-School mobilisation",
        caption: "Enrolment recovery among children who move with the herd."
      },
      "boreholes-1": {
        title: "Solar borehole and cattle trough",
        caption: "Water that does not pit the farmer against the herder."
      },
      "boreholes-2": {
        title: "Water at the grazing edge",
        caption:
          "Solar schemes sited from enumeration rather than from guesswork."
      },
      "rallies-1": {
        title: "Join Hands Together",
        caption:
          "A public sentence of neighbourliness, after the private work of mediation."
      },
      "rallies-2": {
        title: "Youth and traditional authority",
        caption: "The 30-Man Committee stands with the square, not above it."
      },
      "visits-1": {
        title: "Enumeration in camp",
        caption: "Baseline data collection: a household, a herd, a GPS point."
      },
      "visits-2": {
        title: "Listening in the three zones",
        caption:
          "Ministry tours follow the cattle track, not only the tarred road."
      },
      "events-1": {
        title: "Quarterly citizen briefing, Minna",
        caption:
          "Public accounting: what was registered, what was resolved, what remains."
      },
      "victims-1": {
        title: "Repair after the quarrel",
        caption:
          "Compensation is named in the open. Dignity is the first reconstruction."
      },
      "baseline-1": {
        title: "The register in the field",
        caption: "A state that can count its people can serve them."
      },
      "cattle-1": {
        title: "Herd at first light",
        caption: "Heritage that must now become enterprise."
      }
    },
    video: {
      title: "Video",
      description:
        "Recordings of briefings, rallies and commissioning ceremonies are published on the Ministry’s official channel as they are cleared for release.",
      items: {
        briefing: "Quarterly government performance briefing — Minna"
      }
    },
    lightbox: {
      close: "Close image"
    }
  },

  news: {
    hero: {
      eyebrow: "Newsroom",
      title: "News and updates",
      description:
        "Official statements, announcements and notices issued by the Ministry."
    },
    section: {
      eyebrow: "Publications",
      title: "Search the newsroom",
      description:
        "Filter by category or search the full text of published items."
    },
    searchLabel: "Search news",
    searchPlaceholder: "Search news and announcements",
    filterAria: "Filter by category",
    paginationAria: "News pagination",
    empty: "No items match your search.",
    categories: {
      all: "All",
      pressReleases: "Press releases",
      announcements: "Announcements",
      events: "Events"
    },
    detail: {
      itemDetails: "Item details",
      category: "Category",
      datePublished: "Date published",
      issuedBy: "Issued by",
      issuingUnit: "Information & Protocol Unit",
      allNews: "All news",
      share: "Share this item",
      shareTwitter: "Share on X (Twitter)",
      shareFacebook: "Share on Facebook",
      permalink: "Permanent link to this item",
      relatedEyebrow: "Newsroom",
      relatedTitle: "Related items",
      englishNotice:
        "This statement is published in the language in which it was issued by the Ministry."
    }
  },

  contact: {
    hero: {
      eyebrow: "Contact",
      title: "Contact the Ministry",
      description:
        "Write to the registry, use the enquiry form, or reach the relevant directorate directly."
    },
    enquiries: {
      eyebrow: "Enquiries",
      title: "Send an enquiry",
      description:
        "Enquiries submitted through this form are recorded in the Ministry registry and assigned to the appropriate directorate."
    },
    hq: {
      title: "Ministry headquarters",
      hours: "Monday to Friday, 8:00 a.m. – 4:00 p.m.",
      closed: "Closed on public holidays",
      phoneNote:
        "Telephone lines are issued through the registry. For urgent security matters, contact the security agencies directly."
    },
    map: {
      title: "Map showing Minna, Niger State",
      caption: "Minna, Niger State. Map data © OpenStreetMap contributors."
    },
    channels: {
      title: "Official channels"
    },
    directory: {
      eyebrow: "Directory",
      title: "Offices and directorates",
      description: "Search for the office responsible for your enquiry.",
      searchLabel: "Search staff directory",
      searchPlaceholder: "Search by name, role or department",
      caption: "Ministry staff directory",
      office: "Office",
      department: "Department",
      email: "Email",
      empty: "No entries match your search.",
      phoneNote:
        "Telephone numbers for individual officers are issued through the Ministry registry in Minna."
    }
  },

  forms: {
    required: "Required",
    optional: "Optional",
    submit: "Submit",
    cancel: "Cancel",
    contact: {
      name: "Full name",
      email: "Email address",
      phone: "Telephone",
      subject: "Subject",
      message: "Message",
      messageHint:
        "Minimum 10 characters. Do not include sensitive personal data.",
      submit: "Submit enquiry",
      submitting: "Sending…",
      success: "Your enquiry has been received by the Ministry registry.",
      error:
        "We could not record your message. Please try again or write to the Ministry by email."
    },
    conflict: {
      warning:
        "This form is for mediation, not emergencies. Where life or property is in immediate danger, contact security agencies first.",
      lga: "Local Government Area",
      location: "Location",
      locationPlaceholder: "Community, grazing route or water point",
      name: "Your name",
      phone: "Telephone",
      email: "Email address",
      description: "Description of the dispute",
      descriptionPlaceholder:
        "What happened, who is involved, and what damage or risk is reported.",
      descriptionHint: "Minimum 20 characters.",
      submit: "Submit report",
      submitting: "Submitting…",
      success:
        "Your report has been recorded and referred to the Department of Peace and Conflict Resolution.",
      error:
        "We could not file this report. Please telephone the Peace Directorate."
    },
    /**
     * Keys mirror the `errorKey` values returned by the public server actions:
     * `field.<name>` for validation, or a named failure.
     */
    errors: {
      generic: "Please check the form and try again.",
      contactFailed:
        "We could not record your message. Please try again or write to the Ministry by email.",
      reportFailed:
        "We could not file this report. Please telephone the Peace Directorate.",
      field: {
        name: "Enter your full name.",
        email: "Enter a valid email address.",
        phone: "Enter a valid telephone number.",
        subject: "Enter a subject of at least three characters.",
        message: "The message must be at least 10 characters.",
        lgaName: "Select a Local Government Area.",
        location: "Enter the location of the dispute.",
        description: "The description must be at least 20 characters.",
        contactName: "Enter your full name.",
        contactPhone: "Enter a telephone number so the committee can reach you.",
        contactEmail: "Enter a valid email address, or leave the field empty."
      }
    }
  },

  footer: {
    description:
      "Established on {date}, the Ministry serves nomadic and pastoral communities across the 25 Local Government Areas of Niger State through education, infrastructure, livestock development and conflict mediation.",
    ministryColumn: "The Ministry",
    aboutMinistry: "About the Ministry",
    programmesColumn: "Programmes",
    resourcesColumn: "Resources",
    downloads: "Downloads",
    newsUpdates: "News & updates",
    follow: "Follow the Ministry",
    accessibility: "Accessibility",
    privacy: "Privacy",
    rights: "All rights reserved."
  },

  errors: {
    notFound: {
      code: "Error 404",
      title: "The page you requested could not be found",
      description:
        "The address may have changed, or the item may have been withdrawn. Use the links below to continue, or contact the Ministry registry for assistance.",
      home: "Return to the homepage",
      contact: "Contact the Ministry"
    },
    generic: {
      title: "Something went wrong",
      description:
        "The page could not be displayed. Please try again in a moment.",
      retry: "Try again"
    },
    loadingLabel: "Loading page content"
  },

  meta: {
    home: {
      title:
        "Ministry of Nomadic and Pastoral Affairs — Niger State Government",
      description:
        "Official website of the Ministry of Nomadic and Pastoral Affairs, Niger State. Nomadic education, pastoral development, peacebuilding, public data and citizen services."
    },
    about: {
      title: "About the Ministry",
      description:
        "Background, vision, mission, mandates, organisational structure and leadership of the Ministry of Nomadic and Pastoral Affairs, Niger State."
    },
    departments: {
      title: "Departments",
      description:
        "The five directorates of the Ministry of Nomadic and Pastoral Affairs, Niger State, and the functions each performs."
    },
    programmes: {
      title: "Programmes and services",
      description:
        "Programmes of the Ministry of Nomadic and Pastoral Affairs: nomadic education, peacebuilding, water and grazing infrastructure, livestock development and household registration."
    },
    resources: {
      title: "Resources and downloads",
      description:
        "Reports, registers and datasets published by the Ministry of Nomadic and Pastoral Affairs, Niger State, available as PDF and spreadsheet downloads."
    },
    education: {
      title: "Nomadic education",
      description:
        "The Nomadic Education programme of the Ministry of Nomadic and Pastoral Affairs, Niger State: school viability, enrolment, teachers and the Back-to-School initiative."
    },
    schools: {
      title: "Nomadic schools register",
      description:
        "Interactive map and searchable table of nomadic schools in Niger State, with enrolment, teachers, classroom condition and viability status."
    },
    peace: {
      title: "Peace and security",
      description:
        "Conflict resolution dashboard, 30-Man Committees in all 25 Local Government Areas, peace rallies, and the form for reporting a farmer–herder dispute."
    },
    data: {
      title: "Data and reports",
      description:
        "Pastoralist baseline data for Niger State: households, livestock, demographics and settlement type, with report downloads by Local Government Area."
    },
    projects: {
      title: "Projects",
      description:
        "Solar boreholes, school renovations, dairy centres, grazing reserves, peace rallies and skills programmes delivered by the Ministry of Nomadic and Pastoral Affairs."
    },
    gallery: {
      title: "Gallery",
      description:
        "Photographs and video from the work of the Ministry of Nomadic and Pastoral Affairs: schools, boreholes, peace rallies, community visits and events."
    },
    contact: {
      title: "Contact the Ministry",
      description:
        "Contact the Ministry of Nomadic and Pastoral Affairs, Niger State: registry address, email, office hours, directorate contacts and enquiry form."
    },
    news: {
      title: "News and updates",
      description:
        "Press releases, announcements and event notices from the Ministry of Nomadic and Pastoral Affairs, Niger State."
    },
    notFound: {
      title: "Page not found"
    },
    ogAlt: "Pastoral communities in Niger State",
    heroTagline:
      "Serving nomadic and pastoral communities across the 25 Local Government Areas of Niger State."
  },

  records: {
    bios: {
      commissioner:
        "Pioneer Commissioner. A public advocate for justice as the precondition of peace, and for bringing Fulani herders from the ungoverned forest into the circle of government.",
      permanentSecretary:
        "Accounting officer of the Ministry. Supervises the five directorates and the daily machinery of policy.",
      directorAdministration:
        "Establishment, records, and the Commissioner’s secretariat.",
      directorPlanning:
        "Baseline data, research agenda, and results monitoring.",
      directorEducation:
        "School viability, teachers, and the child who must not be left behind the herd.",
      directorPeace:
        "Mediation docket, 30-Man Committees, and peace rallies.",
      directorFinance:
        "Votes, procurement and the stores that reach the field."
    },
    news: {
      "ministry-brings-herders-closer-to-government": {
        title:
          "Ministry to bring herders from the forest into the circle of government",
        excerpt:
          "The Honourable Commissioner, Alhaji Umar Ahmed Sanda Rabe, restates that peace is impossible without justice — and justice begins with belonging.",
        body: [
          "The Ministry of Nomadic and Pastoral Affairs was created so that Fulani herders rearing cattle in the forests and bushes of Niger State would no longer live beyond the reach of government.",
          "Speaking in Minna, the Honourable Commissioner, Alhaji Umar Ahmed Sanda Rabe, said His Excellency Mohammed Umaru Bago had promised a government of all Niger people — not a factional government. The Ministry is that promise made institutional.",
          "When you are talking about peace, you must talk about justice. In the absence of peace, do not expect justice; in the absence of justice, do not expect peace.",
          "The Ministry’s work is therefore twofold: to digitalise identity and livestock so that herding becomes a lawful, profitable enterprise; and to sit with farming neighbours until a quarrel becomes a settlement."
        ]
      },
      "herder-identity-cards-and-livestock-register": {
        title: "Herder identity cards and a statewide livestock register",
        excerpt:
          "Before a herd is reared in Niger State it must be known to the State — as a company, a house, or a vehicle is known.",
        body: [
          "The Commissioner has directed that pastoralists operating in Niger State be profiled, and that livestock be entered in a living register.",
          "Incoming herders from neighbouring states will be documented. Unregistered movement will be treated with the seriousness reserved for rustling — because a nameless herd cannot be protected, taxed, vaccinated or reconciled.",
          "The register is not a punishment. It is how a child on the cattle track becomes visible to a nomadic school, and how a borehole is sited where the water is actually needed."
        ]
      },
      "join-hands-together-peace-rallies": {
        title: "Join Hands Together: peace rallies across the three zones",
        excerpt:
          "Traditional rulers, youth, women leaders and the 30-Man Committees stand in one square and say the same sentence: we will not inherit this quarrel.",
        body: [
          "Peace rallies under the Join Hands Together campaign have travelled the three senatorial zones — from Bida to Kontagora, from Suleja to New Bussa.",
          "They are not theatre. Each rally is preceded by casework: a crop damaged, a route fenced, a watering order broken. The 30-Man Committee sits. Compensation, where due, is named. Then the people gather.",
          "The Ministry will continue to publish resolved cases. Silence is how a rumour becomes a raid."
        ]
      },
      "nomadic-schools-viability-drive": {
        title: "Keeping nomadic schools on the map — and in session",
        excerpt:
          "A school that cannot be found on a map cannot be staffed. The viability drive puts every nomadic classroom on the public record.",
        body: [
          "Nomadic schools stand in Niger State. Some are viable: teachers present, children enrolled, a roof that holds. Others are not.",
          "The Nomadic Education Directorate now publishes viability, enrolment by sex, and classroom condition. Partners can see where a teacher, a borehole, or a roof will change a life.",
          "The Back-to-School initiative follows the herd. A child who moves is still a child of Niger State."
        ]
      }
    },
    projects: {
      "solar-bida": {
        title: "Solar borehole — Etsu Musa camp",
        description:
          "A solar-powered borehole and cattle trough sited from enumeration, so the herd and the farm need not contest a single stream.",
        impact:
          "Clean water for households and livestock; reduced dry-season crowding at the old stream.",
        timeline: [
          {
            title: "Siting",
            body: "GPS from the household register; community walk with the Ardo."
          },
          {
            title: "Drilling",
            body: "Borehole, solar array and cattle trough installed."
          },
          {
            title: "Commissioned",
            body: "Handed to the community with a watering timetable."
          }
        ]
      },
      "solar-kontagora": {
        title: "Solar borehole cluster — Tungan Kawo",
        description:
          "Three solar schemes along the Kontagora grazing edge, part of the statewide borehole programme.",
        impact:
          "Water security for herders and host communities on the Zone C corridor.",
        timeline: [
          {
            title: "Survey",
            body: "Hydrogeological siting with Planning & Statistics."
          },
          {
            title: "Works",
            body: "First two holes yielding; third in drilling."
          }
        ]
      },
      "school-shiroro": {
        title: "Classroom rehabilitation — Nomadic Primary, Shiroro",
        description:
          "Collapsed classrooms rebuilt so the viability map becomes a roof, a chalkboard, and a teacher who stays.",
        impact:
          "Return of a non-viable school to session; enrolment recovery for children on the Kuta hinterland.",
        timeline: [
          {
            title: "Viability finding",
            body: "Inspectors recorded failed roofs and a silent roll."
          },
          {
            title: "Works",
            body: "Classrooms, furniture and a borehole request."
          }
        ]
      },
      "school-bida": {
        title: "Nomadic school upgrade — Bida",
        description:
          "Furniture, solar lighting and a borehole at Nomadic Primary School, Bida — a viable school kept viable.",
        impact:
          "Children in session; teachers retained through the dry season.",
        timeline: [
          {
            title: "Award",
            body: "Works packaged with SUBEB counterparts."
          },
          {
            title: "Handover",
            body: "Commissioner visits the restored block."
          }
        ]
      },
      "dairy-mokwa": {
        title: "Dairy collection centre — Mokwa",
        description:
          "Milk collection and cooling so pastoral households sell a product, not only a live animal at distress prices.",
        impact:
          "A lawful market for milk along the Jebba corridor; women traders first in line.",
        timeline: [
          {
            title: "Foundation",
            body: "Cooling plant and collection bay."
          },
          {
            title: "Fit-out",
            body: "Generator, tanks and cooperative training."
          }
        ]
      },
      "ranch-borgu": {
        title: "Grazing reserve and ranch support — Borgu",
        description:
          "Stock route protection and ranching support around Wawa — heritage that must now become a lawful enterprise.",
        impact:
          "Reduced pressure on farms; a mapped reserve the next generation can inherit without a fight.",
        timeline: [
          {
            title: "Demarcation",
            body: "Walking the old reserve with traditional rulers."
          }
        ]
      },
      "rally-kontagora": {
        title: "Join Hands Together — Kontagora peace rally",
        description:
          "Traditional rulers, youth, women leaders and the 30-Man Committee in one square, after the private work of mediation.",
        impact:
          "A public sentence of neighbourliness across Zone C; resolved cases read aloud.",
        timeline: [
          {
            title: "Casework",
            body: "Pending dockets cleared before the square filled."
          },
          {
            title: "Rally",
            body: "Join Hands Together declared in Kontagora."
          }
        ]
      },
      "skills-suleja": {
        title: "Skill acquisition for pastoral youth — Suleja",
        description:
          "Leatherwork, dairy hygiene, solar maintenance and literacy for young herders who will not live only by the stick.",
        impact:
          "Cohorts trained in trades that travel with the household — and in trades that let a youth stay.",
        timeline: [
          {
            title: "First cohort",
            body: "Youth enrolled with the Nomadic Education Directorate."
          }
        ]
      },
      "solar-agwara": {
        title: "Solar borehole — Rofia settlement",
        description:
          "Water at the far edge of Zone C, where a dry season used to empty both the school and the camp.",
        impact:
          "Households remaining through the dry months; children able to stay near a classroom.",
        timeline: [
          {
            title: "Mobilisation",
            body: "Community labour and Ministry stores."
          },
          {
            title: "Water",
            body: "First yield celebrated with the Peace Committee."
          }
        ]
      }
    }
  }
} as const;

export default en;
export type Messages = typeof en;
