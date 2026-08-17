import type { PartialMessages } from ".";

/**
 * Gbagyi (Gwari) — complete UI coverage for Niger State speakers.
 * Native Gbagyi is used where it is standard (Gye, Kwe yn she, Tuci, Kpe she).
 * Hausa loans appear for modern government terms that have no settled Gbagyi form.
 */
const gbr: PartialMessages = {
  gov: {
    government: "Gwamnatin Niger State",
    ministry: "Ma’aikata Tuci Azna Naku da Kiwo",
    ministryShort: "NMPA",
    state: "Niger State",
    place: "Minna · Niger State · Jamhuriyar Tarayyar Najeriya",
    country: "Jamhuriyar Tarayyar Najeriya",
    headquarters: "Babban Ofishi Ma’aikata, Minna, Niger State",
    established: "16 ga Agusta 2023",
    commissionerTitle: "Mai Girma Kwamishina",
    governorTitle: "Gwamna Niger State",
    crestAlt:
      "Tambarin Ma’aikata Tuci Azna Naku da Kiwo, Niger State"
  },

  nav: {
    mainNavLabel: "Hanya tuci Gye",
    skipToContent: "Tsallake ga abun ciki",
    openMenu: "Buɗe menu",
    closeMenu: "Rufe menu",
    homeAria: "Ma’aikata Tuci Azna Naku da Kiwo — Gye",
    breadcrumbLabel: "Hanya da wo bi",
    staffLogin: "Shiga ma’aikata",
    home: "Gye",
    about: "Kwe yn she",
    departments: "Sassa",
    programmes: "Tuci",
    resources: "Kayan bayani",
    news: "Labari",
    gallery: "Foto",
    contact: "Kpe she",
    aboutOverview: "Bayani Ma’aikata",
    aboutMandates: "Aiki da aka na",
    aboutLeadership: "Shugabanci",
    departmentsAll: "Sassa gba",
    programmesAll: "Tuci gba",
    programmesEducation: "Ilimin makiyaya",
    programmesPeace: "Lafia da tsaro",
    programmesProjects: "Tuci da kayan aiki",
    resourcesDownloads: "Rahotanni da sauke",
    resourcesData: "Binciken bayani",
    resourcesSchools: "Rajistar makarantun makiyaya"
  },

  language: {
    label: "Harshe",
    selectLabel: "Zaɓi harshe",
    current: "Harshe yn yanzu: {language}",
    switchTo: "Canja ga {language}",
    partialNotice:
      "Ana fassara wannan shafi ga {language}. Shafukan da ba a fassara ba tukuna suna bayyana a Turanci.",
    dismissNotice: "Rufe"
  },

  common: {
    readMore: "Kwe gaba",
    viewDetails: "Kwe bayani",
    viewAll: "Kwe gba",
    learnMore: "Ma gaba",
    search: "Nemi",
    filter: "Tace",
    clearFilters: "Share tacewa",
    previous: "Baya",
    next: "Gaba",
    pageOf: "Shafi {current} daga {total}",
    showingOf: "Ana nuna {shown} daga {total}",
    noResults: "Ba a samu sakamako ba.",
    noData: "Babu bayani.",
    loading: "Ana lo…",
    loadingMap: "Ana lo taswira…",
    optional: "Ba dole ba",
    yes: "Oo",
    no: "A’a",
    all: "Gba",
    allLgas: "Ƙananan Hukumomi 25 gba",
    allStatuses: "Matsayi gba",
    lga: "Ƙaramar Hukuma",
    lgaShort: "LGA",
    zone: "Yanki",
    senatorialZone: "Yankin sanatoci",
    source: "Majiya",
    download: "Sauke",
    pdf: "PDF",
    csv: "CSV",
    close: "Rufe",
    dateLabel: "Kwanan wata",
    notPublished: "Ba a bayyana ba",
    notAvailable: "Babu",
    officialLanguageNotice:
      "An buga wannan a harshen da aka fitar da shi.",
    monthsShort: [
      "Jan",
      "Fab",
      "Mar",
      "Afr",
      "May",
      "Yun",
      "Yul",
      "Agu",
      "Sat",
      "Okt",
      "Nuw",
      "Dis"
    ]
  },

  status: {
    planning: "Shirin tuci",
    ongoing: "Ana tuci",
    completed: "An kammala",
    viable: "Mai tuci",
    nonViable: "Ba tuci ba",
    notAssessed: "Ba a auna ba",
    pending: "Ana jira",
    inMediation: "Ana sulhu",
    resolved: "An warware",
    escalated: "An ɗaga kara",
    continuous: "Na ci gaba",
    ongoingDelivery: "Ana ci gaba da aiwatarwa"
  },

  ministry: {
    vision:
      "Niger State mai lafia da wadata, inda azna naku suke azna ƙasa cikakke — masu ilimi, an ƙidaya su, masu ƙarfin kasuwanci, kuma suna zaman adalci da maƙwabtansu manoma.",
    mission:
      "Kusantar azna naku da gwamnati; rajistar makiyaya da naku lo; kawo ilimin makiyaya, nuwa da wuraren kiwo; sulhunta rikicin manoma da makiyaya ta Kwamitin Mutum 30; da kuma mayar da kiwo daga rayuwar gado zuwa kasuwanci mai daraja.",
    mandates: {
      register: {
        title: "Rajista da shaidar makiyayi",
        body: "Ƙidaya she lo, bayar da shaidar makiyayi, da gina rajistar naku lo a Ƙananan Hukumomi 25 gba."
      },
      education: {
        title: "Ilimin makiyaya",
        body: "Tabbatar da makarantun makiyaya suna tuci, suna da malamai da wyin lo — haɗe da shirin Koma Makaranta ga wyin da suke tafiya da naku."
      },
      peace: {
        title: "Lafia da sulhu",
        body: "Warware rikicin manoma da makiyaya ta tattaunawa, Kwamitin Mutum 30, da diyya mai adalci."
      },
      grazing: {
        title: "Wuraren kiwo da gonakin naku",
        body: "Kare hanyoyin naku, gyara wuraren kiwo, da tallafawa kiwo na zamani bisa doka."
      },
      water: {
        title: "Nuwa da kayan hasken rana",
        body: "Kawo rijiyoyin burtsatse masu hasken rana da kwaruruka don azna da naku kada su yi faɗa kan rafi ɗaya."
      },
      livestock: {
        title: "Habaka naku",
        body: "Ƙara amfani ta tarin madara, aikin likitan dabbobi, da sauyi daga kiwo na abinci zuwa kasuwanci."
      },
      data: {
        title: "Shaida da tsare-tsare",
        body: "Buga bayanan tushe, rahotannin Ƙananan Hukumomi da bincike don a rubuta manufa bisa gaskiya."
      }
    },
    departments: {
      administration: {
        name: "Gudanarwa",
        summary:
          "Aiwatar da manufofi, harkokin ma’aikata, da rarraba kayan Ma’aikata bisa tsari.",
        functions: [
          "Fassara da yaɗa shawarwarin Majalisar Zartaswa",
          "Kula da ma’aikata, bayani da harkokin aiki",
          "Daidaita ofishin Mai Girma Kwamishina",
          "Ka’idojin hidima da wasiƙun cikin gida"
        ],
        achievements: [
          "Kafa sabuwar Ma’aikata daga tushe a shekarar 2023",
          "Kafa hulɗa da Ƙananan Hukumomi kan Kwamitin Mutum 30"
        ]
      },
      planning: {
        name: "Tsare-tsare, Bincike da Ƙididdiga",
        summary:
          "Tsare-tsare na gajeren zango da na dogon zango, bayanan tushe na azna naku, da ƙashin bayan ƙididdigar Ma’aikata.",
        functions: [
          "Tsara yadda za a ƙidaya she lo da naku",
          "Rahotannin Ƙananan Hukumomi da hasashen gaba",
          "Sa ido kan tuci da muhimman sakamako",
          "Haɗin gwiwar bincike da manyan makarantu"
        ],
        achievements: [
          "An rubuta she lo na makiyaya a fadin jihar",
          "An shigar da naku lo cikin rajistar jiha"
        ]
      },
      education: {
        name: "Ilimin Makiyaya",
        summary:
          "Makarantun da suke tafiya tare da azna — malamai, azuzuwa, shiga makaranta da shirin Koma Makaranta.",
        functions: [
          "Auna tuci yn makarantun makiyaya",
          "Tura malamai da kayan koyarwa",
          "Wayar da kai kan Koma Makaranta a wuraren kiwo",
          "Gyara azuzuwa tare da hukumomin ’yan uwa"
        ],
        achievements: [
          "Zana taswirar tuci yn makarantu a fadin jihar",
          "Dawo da wyin lo a wuraren da ba a taɓa kaiwa ba"
        ]
      },
      peace: {
        name: "Lafia da Warware Rikici",
        summary:
          "Sulhu, Kwamitin Mutum 30, diyya, da doguwar aikin zaman maƙwabtaka.",
        functions: [
          "Karɓar kara, sulhu da mika kara",
          "Sakatariyar Kwamitin Mutum 30 da Kwamitin Lafia",
          "Tarukan lafia da yaƙin neman Haɗa Hannu",
          "Haɗin gwiwa da jami’an tsaro da sarakunan gargajiya"
        ],
        achievements: [
          "An warware rikice-rikice ta tattaunawa",
          "Kwamitoci suna tuci a Ƙananan Hukumomi"
        ]
      },
      finance: {
        name: "Kuɗi da Kayan Aiki",
        summary:
          "Kasafin kuɗi, tsaurin kuɗi, sayayya da ɗakunan da ke tallafawa tuci a filin.",
        functions: [
          "Shirya kasafin kuɗi na shekara da kare shi",
          "Sarrafa biyan kuɗi da littattafan kuɗi",
          "Sayen kayan rijiya, makaranta da tarurruka",
          "Ɗakunan ajiya, motoci da jigilar filin"
        ],
        achievements: [
          "Bibiyar kuɗin tuci yn rijiyoyi a bayyane",
          "Kai kaya zuwa wuraren kiwo masu nisa"
        ]
      }
    },
    roles: {
      commissioner: "Mai Girma Kwamishina",
      permanentSecretary: "Sakatare na Dindindin",
      directorAdministration: "Darakta, Gudanarwa",
      directorPlanning: "Darakta, Tsare-tsare, Bincike da Ƙididdiga",
      directorEducation: "Darakta, Ilimin Makiyaya",
      directorPeace: "Darakta, Lafia da Warware Rikici",
      directorFinance: "Darakta, Kuɗi da Kayan Aiki",
      informationUnit: "Shugaban Sashen Yaɗa Labari",
      director: "Darakta"
    },
    offices: {
      commissioner: "Ofishin Mai Girma Kwamishina",
      permanentSecretary: "Ofishin Sakatare na Dindindin",
      administration: "Daraktocin Gudanarwa",
      planning: "Daraktocin Tsare-tsare, Bincike da Ƙididdiga",
      education: "Daraktocin Ilimin Makiyaya",
      peace: "Daraktocin Lafia da Warware Rikici",
      finance: "Daraktocin Kuɗi da Kayan Aiki",
      information: "Sashen Yaɗa Labari da Yarjejeniya"
    }
  },

  home: {
    hero: {
      eyebrow: "An kafa {date}",
      title: "Ba Azna Naku da Kiwo Ƙarfi a Niger State Gba",
      description:
        "Ma’aikata na rajistar she lo na makiyaya, na taimaka makarantun makiyaya, na kawo nuwa da wuraren kiwo, kuma na sulhunta rikicin manoma da makiyaya a Ƙananan Hukumomi 25 gba.",
      ctaPrimary: "Kwe Tuci Ma’aikata",
      ctaSecondary: "Kpe Ministry"
    },
    quickAccess: {
      eyebrow: "Hidimomin azna",
      title: "Shiga da sauri",
      departments: "Sassa",
      departmentsDescription: "Daraktoci biyar da tuci nasu",
      schools: "Makarantun makiyaya",
      schoolsDescription: "Nemi rajista da taswirar tuci",
      report: "Kai ƙarar rikici",
      reportDescription: "Shigar da ƙara don sulhu",
      projects: "Tuci",
      projectsDescription: "Rijiyoyi, azuzuwa da tuci yn kiwo",
      news: "Labari da sanarwa",
      newsDescription: "Sanarwar manema labari da sanarwa",
      contact: "Kpe Ma’aikata",
      contactDescription: "Rajista, ofisoshi da tambayoyi"
    },
    stats: {
      title: "Muhimman lambobi",
      note: "Lambobin da Ma’aikata Tuci Azna Naku da Kiwo ta buga, ana sabunta su daga rajistar she lo, makarantu da ƙararraki.",
      lgas: "Ƙananan Hukumomi",
      lgasContext: "Da tuci yn filin Ma’aikata ke kaiwa",
      schools: "Makarantun makiyaya",
      schoolsContext: "A rajistar ilimin makiyaya",
      households: "She lo da aka rubuta",
      householdsContext: "She lo na makiyaya da aka ƙidaya",
      livestock: "Dabbobi da aka rubuta",
      livestockContext: "A rajistar dabbobi na jiha",
      conflicts: "Rikice-rikicen da aka warware",
      conflictsContext: "An daidaita ta sulhu da tattaunawa",
      appointments: "Naɗe-naɗen siyasa",
      appointmentsContext: "Wakilcin azna naku a gwamnati"
    },
    intro: {
      eyebrow: "Kwe yn she Ma’aikata",
      title: "Ma’aikata ta musamman ga azna naku da kiwo",
      paragraph1:
        "An kafa Ma’aikata Tuci Azna Naku da Kiwo a {date} ta Gwamnatin {state} don shigar da azna naku cikakke a cikin hidimomin jama’a da tsare-tsaren ci gaba.",
      commissionerLabel: "Mai Girma Kwamishina",
      establishedLabel: "An kafa",
      cta: "Ma gaba game da Ma’aikata",
      imageAlt: "Garken naku a wurin kiwo a Niger State"
    },
    mandates: {
      eyebrow: "Aikin da doka ta ba mu",
      title: "Tuci yn Ma’aikata",
      description:
        "Aiki bakwai ne ke jagorantar tuci yn Ma’aikata a fannin rajista, ilimi, gina lafia, kayan aiki da bayani ga azna."
    },
    departments: {
      eyebrow: "Tsarin tuci",
      title: "Sassan Ma’aikata",
      description:
        "Kowane darakta yana da alhakin wani fanni na manufa da isar da hidima.",
      viewAll: "Kwe sassa gba",
      viewDepartment: "Kwe sashe"
    },
    projects: {
      eyebrow: "Tuci da ayyuka",
      title: "Tuci yn yanzu a faɗin Jihar",
      viewAll: "Kwe tuci gba"
    },
    peaceBand: {
      eyebrow: "Lafia da tsaro",
      title: "Kai ƙarar rikicin manomi da makiyayi don sulhu",
      description:
        "Sashen Lafia da Warware Rikici yana karɓar ƙara, sannan yana mika ta ga kwamitin Ƙaramar Hukuma da ya dace. A lokacin gaggawa, fara tuntuɓar jami’an tsaro.",
      cta: "Kai ƙarar rikici"
    },
    news: {
      eyebrow: "Sashen labari",
      title: "Labari da sanarwa",
      viewAll: "Kwe labari gba"
    }
  },

  about: {
    hero: {
      eyebrow: "Kwe yn she Ma’aikata",
      title:
        "An kafa ta don shigar da azna naku cikin da’irar gwamnati",
      description: "An ƙirƙira a {date} ta Gwamnatin {state}."
    },
    background: {
      eyebrow: "Tarihi",
      title: "Yadda Ma’aikata ta samu",
      paragraph1:
        "An kafa Ma’aikata Tuci Azna Naku da Kiwo a {date} ta {governor}, {governorTitle}, a matsayin wani ɓangare na alkawarin gwamnati mai hidima ga azna gba na {state}.",
      paragraph2:
        "An naɗa {commissioner} a matsayin {commissionerTitle} na farko. An ba Ma’aikata aiki bayyananne: sanin azna naku, ilmantar da wyin nasu, samar da nuwa da kiwo bisa doka, da daidaita rikici tsakanin makiyaya da manoma kafin ya koma tashin hankali.",
      paragraph3:
        "Ma’aikata tana tuci ta daraktoci biyar kuma tana da wakilci a Ƙananan Hukumomi 25 gba, tana tuci tare da sarakunan gargajiya, jami’an tsaro da abokan ci gaba."
    },
    facts: {
      established: "An kafa",
      commissioner: "Mai Girma Kwamishina",
      governor: "Gwamna",
      headquarters: "Babban ofishi",
      directorates: "Daraktoci",
      directoratesValue: "Biyar",
      coverage: "Iyaka",
      coverageValue: "Ƙananan Hukumomi 25"
    },
    vision: "Gani gaba",
    mission: "Tuci yn yi",
    mandates: {
      eyebrow: "Aikin da doka ta ba mu",
      title: "Aiki bakwai na Ma’aikata",
      description:
        "An ba kowane darakta aikinsa, kuma ana ba da rahoto a kansa a zagayen tsare-tsaren Ma’aikata.",
      number: "Aiki {number}"
    },
    organogram: {
      eyebrow: "Tsarin gudanarwa",
      title: "Tsarin shugabanci",
      description: "Zaɓi kowane ofishi domin karanta ayyukansa.",
      permanentSecretaryDetail: "Jami’in kuɗi",
      administrationDetail: "Harkokin ma’aikata da bayani",
      planningDetail: "Shaida da sa ido",
      educationDetail: "Makarantu da shiga makaranta",
      peaceDetail: "Sulhu da kwamitoci",
      financeDetail: "Kasafin kuɗi da sayayya"
    },
    leadership: {
      eyebrow: "Shugabanci",
      title: "Ofisoshin Ma’aikata",
      description:
        "Shugabancin siyasa da na aiki masu alhakin manufa, aiwatarwa da bayar da lissafi."
    },
    accessibility: {
      eyebrow: "Samun dama",
      title: "An gina wannan shafi domin kowa ya iya amfani da shi",
      description:
        "Shafuka sun cika ka’idar bambancin launi ta WCAG 2.1 AA, suna tuci da maɓallin kewayawa da na’urar karatu, kuma suna girmama zaɓin rage motsi. Idan wo fuskanci matsala, rubuta wa Ma’aikata za mu ba wo bayani a wata hanya.",
      cta: "Kpe Ma’aikata",
      imageAlt: "Taron masu ruwa da tsaki tare da jami’an Ma’aikata"
    }
  },

  departments: {
    hero: {
      eyebrow: "Tsarin tuci",
      title: "Sassan Ma’aikata",
      description:
        "An tsara manufa da aiwatarwa cikin daraktoci biyar, kowanne yana ba Sakatare na Dindindin lissafi."
    },
    directorateNumber: "Darakta {number}",
    viewDepartment: "Kwe sashe",
    detail: {
      eyebrow: "Darakta",
      functionsTitle: "Abin da wannan sashe ke yi",
      achievementsTitle: "Nasarorin da aka rubuta",
      contactsTitle: "Hanyoyin kpe she yn sashe",
      contactsEmpty:
        "Ana karɓar tambayoyin wannan sashe ta rajistar Ma’aikata.",
      contactsCta: "Kpe Ma’aikata",
      otherTitle: "Sauran sassa",
      otherAria: "Sauran sassa",
      relatedEyebrow: "Tuci da suka danganta",
      relatedTitle: "Tuci a faɗin Jihar",
      relatedDescription:
        "Zaɓaɓɓun tuci da Ma’aikata ta rubuta."
    }
  },

  programmes: {
    hero: {
      eyebrow: "Tuci da hidimomi",
      title: "Abin da Ma’aikata ke aiwatarwa",
      description:
        "Fannoni shida na tuci ne ke kai aikin Ma’aikata zuwa Ƙananan Hukumomi."
    },
    section: {
      eyebrow: "Fannonin tuci",
      title: "Tuci yn Ma’aikata",
      description:
        "Darakta ke jagorantar kowane shiri, kuma ana ba da rahoto a kansa a zagayen tsare-tsaren Ma’aikata."
    },
    education: {
      label: "Ilimin makiyaya",
      body: "Auna tuci yn makarantu, tura malamai, gyara azuzuwa da shirin Koma Makaranta ga wyin lo a wuraren kiwo. Ana buga bayanan kowace makaranta a rajistar makarantun makiyaya.",
      actionPrimary: "Shirin ilimi",
      actionSecondary: "Rajistar makarantu"
    },
    peace: {
      label: "Lafia da warware rikici",
      body: "Sulhunta rikicin manoma da makiyaya ta Kwamitin Mutum 30 a kowace Ƙaramar Hukuma, diyya inda ya kamata, da tarukan lafia na Haɗa Hannu a yankunan sanatoci uku.",
      actionPrimary: "Lafia da tsaro",
      actionSecondary: "Kai ƙarar rikici"
    },
    water: {
      label: "Nuwa da kayan hasken rana",
      body: "Rijiyoyin burtsatse masu hasken rana da kwaruruka a wuraren da za su hana she lo da garken naku yin faɗa kan rafi ɗaya. Ana rubuta aiwatarwa tuci bayan tuci.",
      actionPrimary: "Kwe tuci"
    },
    grazing: {
      label: "Wuraren kiwo da gonakin naku",
      body: "Kare hanyoyin naku, gyara wuraren kiwo da aka amince da su, da tallafawa kiwo na zamani bisa doka.",
      actionPrimary: "Kwe tuci"
    },
    livestock: {
      label: "Habaka naku da madara",
      body: "Cibiyoyin tarin madara, aikin likitan dabbobi da koyar da sana’a domin mayar da kiwo daga abinci kawai zuwa kasuwanci.",
      actionPrimary: "Kwe tuci"
    },
    registration: {
      label: "Rajistar she lo da shaidar makiyayi",
      body: "Ƙidaya she lo na makiyaya, shaidar makiyayi da rajistar naku a fadin jihar. Ana buga sakamakon gaba ɗaya a cikin binciken bayani.",
      actionPrimary: "Binciken bayani",
      actionSecondary: "Rahotanni da sauke"
    }
  },

  resources: {
    hero: {
      eyebrow: "Kayan bayani",
      title: "Rahotanni, rajista da bayani",
      description:
        "Ma’aikata tana buga rajistarta domin Ƙananan Hukumomi, masu bincike da abokan ci gaba su yi tsare-tsare bisa shaida ɗaya."
    },
    downloads: {
      eyebrow: "Sauke fayiloli",
      title: "Rajistar da aka buga",
      description:
        "Ana ƙirƙirar fayiloli daga bayanan Ma’aikata na yanzu a lokacin da aka sauke su."
    },
    baseline: {
      title: "Bayanan tushe na azna naku bisa Ƙaramar Hukuma",
      description:
        "She lo da aka ƙidaya da naku da aka rubuta ga kowace Ƙaramar Hukuma 25.",
      updated: "An sabunta daga rajistar she lo na Ma’aikata"
    },
    schools: {
      title: "Rajistar makarantun makiyaya",
      description:
        "Kowace makaranta a rajista tare da Ƙaramar Hukuma, wyin lo bisa jinsi, malamai da matsayin tuci.",
      updated: "{count, plural, one {# makaranta a jeri} other {# makarantu a jeri}}"
    },
    projects: {
      title: "Rajistar tuci",
      description:
        "Rijiyoyi, azuzuwa, cibiyoyin madara, tuci yn kiwo da shirye-shiryen sana’a da Ma’aikata ta rubuta.",
      updated:
        "{count, plural, one {# tuci a jeri} other {# tuci a jeri}}"
    },
    sourceLive: "Rajistar she lo, makarantu da tuci na Ma’aikata",
    sourcePublished:
      "Bayanan tushe da aka buga da rajistar Ma’aikata",
    sourceNote:
      "Majiya: {source}. Domin bayanin da ba a buga a nan ba, rubuta wa rajistar Ma’aikata.",
    related: {
      eyebrow: "Bayani da suka danganta",
      title: "Kwe bayanan tushe",
      dataLabel: "Binciken bayani",
      dataDescription:
        "Zane-zane masu mu’amala kan she lo, naku da alƙaluma tare da tacewa bisa yanki.",
      schoolsLabel: "Rajistar makarantun makiyaya",
      schoolsDescription:
        "Taswira da tebur mai bincike na kowace makaranta tare da wyin lo da matsayin tuci.",
      newsLabel: "Sanarwar manema labari",
      newsDescription:
        "Sanarwar hukuma, sanarwa da sanarwar taruka."
    }
  },

  education: {
    hero: {
      eyebrow: "Tuci",
      title: "Ilimin makiyaya",
      description:
        "Makarantun da suke tafiya tare da azna — an auna su, an tura malamai, kuma an buga bayanansu ga jama’a."
    },
    figures: {
      schools: "Makarantu a rajista",
      viable: "An auna a matsayin masu tuci",
      enrolment: "Wyin da suka shiga",
      teachers: "Malaman da aka tura"
    },
    programme: {
      eyebrow: "Shirin",
      title: "Wyin da yake tafiya har yanzu ɗan Niger State ne",
      paragraph1:
        "Daraktocin Ilimin Makiyaya suna auna kowace makaranta a rajista: ko akwai malamai, ko wyin lo sun shiga, kuma ko ajin yana da ƙarfi. Ana buga sakamako domin abokan aiki su kwe a ina malami, rufi ko rijiya za su canja rayuwa.",
      paragraph2:
        "Shirin Koma Makaranta yana bin garke. Ƙungiyoyin wayar da kai suna tuci tare da Ardo da Wakili domin dawo da wyin da suke tafiya cikin karatu, da sanya ’yan mata a makarantun da iyalansu za su amince da su.",
      points: [
        "Auna tuci da buga bayani ga kowace makarantar makiyaya",
        "Tura malamai da kayan koyarwa",
        "Wayar da kai kan Koma Makaranta a wuraren kiwo",
        "Gyara azuzuwa tare da hukumomin ’yan uwa"
      ],
      ctaRegister: "Buɗe rajistar makarantu",
      ctaDepartment: "Kwe sashe",
      classroomAlt: "Aji a makarantar makiyaya a Niger State",
      pupilsAlt: "Wyin lo a makarantar makiyaya"
    },
    band: {
      eyebrow: "Rajistar makarantu",
      title:
        "Nemi makarantar makiyaya bisa suna, Ƙaramar Hukuma ko matsayi",
      description:
        "Ana buga wyin lo bisa jinsi, malamai, yanayin aji, hasken rana da rijiya ga kowace makaranta.",
      cta: "Buɗe rajista"
    }
  },

  schools: {
    hero: {
      eyebrow: "Kayan bayani",
      title: "Rajistar makarantun makiyaya",
      description:
        "Nemi rajista, tace bisa Ƙaramar Hukuma ko matsayin tuci, sannan buɗe kowace makaranta domin cikakken bayani."
    },
    filters: {
      searchLabel: "Nemi bisa suna ko Ƙaramar Hukuma",
      searchPlaceholder: "Misali: Makarantar Firamare ta Makiyaya",
      lgaLabel: "Ƙaramar Hukuma",
      statusLabel: "Matsayin tuci"
    },
    summary: {
      count: "Makarantu {shown} daga {total}",
      viable: "{count} masu tuci",
      nonViable: "{count} ba tuci ba"
    },
    view: {
      label: "Yadda ake nunawa",
      map: "Taswira",
      list: "Jeri"
    },
    table: {
      caption: "Rajistar makarantun makiyaya a Niger State",
      school: "Makaranta",
      lga: "Ƙaramar Hukuma",
      enrolment: "Wyin lo",
      status: "Matsayi",
      action: "Aiki",
      viewRecord: "Kwe bayani",
      empty: "Babu makarantar da ta dace da tacewar da aka zaɓa."
    },
    mapNote:
      "Alamun kore suna nuna makarantun da aka auna a matsayin masu tuci; alamun ja suna nuna waɗanda ba tuci ba. Bayanan taswira © masu ba da gudummawa ga OpenStreetMap.",
    popup: {
      enrolment: "Wyin lo",
      teachers: "Malamai",
      classrooms: "Azuzuwa",
      solarBorehole: "Hasken rana · Rijiya",
      classroomsValue: "{good} masu ƙarfi / {bad} marasa ƙarfi",
      bySex: "{male}M / {female}F",
      viewRecord: "Kwe cikakken bayani"
    },
    detail: {
      metaDescription:
        "{name}, Ƙaramar Hukumar {lga} — wyin lo, malamai, yanayin aji da matsayin tuci.",
      heroDescription:
        "Bayanin da Daraktocin Ilimin Makiyaya suka buga.",
      viableNote: "Wannan makaranta ta cika ka’idar tuci ta Ma’aikata.",
      nonViableNote:
        "An auna wannan makaranta a matsayin wadda ba ta tuci, kuma an shirya masa gyara.",
      tableCaption: "Bayanin makaranta",
      fields: {
        lga: "Ƙaramar Hukuma",
        zone: "Yankin sanatoci",
        enrolmentTotal: "Jimillar wyin lo",
        enrolmentBySex: "Wyin lo bisa jinsi",
        teachersTotal: "Malaman da aka tura",
        teachersBySex: "Malamai bisa jinsi",
        classrooms: "Azuzuwa",
        classroomCondition: "Yanayin aji",
        solar: "Hasken rana",
        borehole: "Rijiya",
        ratio: "Adadin wyin ga malami",
        coordinates: "Wurin da yake"
      },
      classroomsTotal: "{count} gaba ɗaya",
      classroomsCondition: "{good} masu ƙarfi / {bad} na buƙatar gyara",
      installed: "An sanya",
      notInstalled: "Ba a sanya ba",
      present: "Akwai",
      notPresent: "Babu",
      bySexLong: "{male} maza / {female} mata",
      backToRegister: "Koma rajista",
      reportError: "Kai ƙarar kuskure a wannan bayani"
    }
  },

  peace: {
    hero: {
      eyebrow: "Tuci",
      title: "Lafia da warware rikici",
      description:
        "Sulhu tsakanin azna noma da azna naku, kwamitoci a kowace Ƙaramar Hukuma, da bayanin ƙararrakin da aka daidaita."
    },
    dashboard: {
      eyebrow: "Warware rikici",
      title: "Matsayin ƙararraki",
      description: "An ɗauko lambobin daga rajistar sulhu na Ma’aikata.",
      total: "Ƙararrakin da aka rubuta",
      resolved: "An warware",
      mediation: "Ana sulhu",
      pending: "Ana jira a karɓa"
    },
    trend: {
      title: "Ƙararrakin da aka warware kowane wata",
      description: "Matsayin sulhu na watanni goma sha biyu na baya.",
      series: "Ƙararrakin da aka warware"
    },
    recent: {
      title: "Ƙararrakin da aka warware kwanan nan"
    },
    settlements: {
      title: "Sulhun da aka buga"
    },
    committees: {
      eyebrow: "Tsarin kwamiti",
      title: "Kwamitin Mutum 30",
      description:
        "Kowace Ƙaramar Hukuma tana da kwamitin wakilan gargajiya, mata da matasa da suke zama tare da maƙwabtansu manoma. Ana buga sunayen mambobi bayan tabbatarwa.",
      searchLabel: "Nemi kwamitoci",
      searchPlaceholder:
        "Nemi bisa Ƙaramar Hukuma, mamba ko matsayi",
      memberCount:
        "{count, plural, =0 {ba mamba a bayyana ba} one {# mamba a bayyana} other {# mambobi a bayyana}}",
      notPublished:
        "Ba a buga mambobin kwamitin {lga} ba tukuna. Tuntuɓi Sashen Lafia da Warware Rikici domin jerin yanzu.",
      contactVia: "Kpe she ta Sashen Lafia"
    },

    /** Ardo and Wakili are traditional titles and are not translated. */
    roles: {
      ardo: "Ardo",
      wakili: "Wakili",
      chairman: "Shugaba",
      viceChairman: "Mataimakin Shugaba",
      secretary: "Sakatare",
      youthLeader: "Shugaban Matasa",
      womenLeader: "Shugabar Mata",
      treasurer: "Ma’aji",
      pro: "Jami’in Hulɗa da Jama’a",
      legalAdviser: "Mai Ba da Shawara kan Shari’a",
      member: "Mamba"
    },
    committeeTypes: {
      thirtyMan: "Kwamitin Mutum 30",
      peace: "Kwamitin Lafia"
    },
    rallies: {
      eyebrow: "Haɗa Hannu",
      title: "Tarukan lafia da shirye-shirye",
      description:
        "Tarurruka suna biyo bayan aikin sulhu, ba wata hanya ba. Kowane fili ana rigaya da sulhu.",
      captions: [
        "Haɗa Hannu — sanarwar zaman maƙwabtaka a bainar jama’a",
        "Sarakunan gargajiya, matasa da Kwamitin Mutum 30 a fili guda",
        "Hannayen da suka yi sulhu, sannan suka haɗu",
        "Taron yana bin hanyar naku, ba kawai titin kwalta ba"
      ]
    },

    /** Index-aligned with `peaceStories` in lib/content/peace.ts. */
    stories: [
      {
        title: "Hanyar Jebba — amfanin gona da naku",
        body: "Motsi a ƙarshen rani ya kai garke cikin shinkafa. Kwamitin Mutum 30 ya zauna. An biya diyya. An sake yiwa hanyar alama. Kakar gaba, ɓangarorin biyu sun sha nuwa daga rafi guda bisa lokaci."
      },
      {
        title: "Allawa — nuwa ba tare da faɗa ba",
        body: "Rafin kakar ya zama hujjar mallaka. Sulhu ya samar da lokutan shan nuwa daban-daban. Daga baya rijiyar hasken rana ta rage matsin lamba kan rafin gaba ɗaya."
      },
      {
        title: "Kontagora — an buɗe hanya",
        body: "An yi shinge a hanyar naku ta gargajiya domin noma. Daraktocin Lafia sun bi layin tare da manoma da makiyaya. Shingen ya sauya wuri. Gonar ta ci gaba. Naku kuma sun sami hanya bisa doka."
      }
    ],

    /** Index-aligned with `peaceTimeline` in lib/content/peace.ts. */
    timeline: [
      {
        title: "An kafa Ma’aikata",
        body: "A 16 ga Agusta 2023 Gwamna Mohammed Umaru Bago ya kafa Ma’aikata Tuci Azna Naku da Kiwo ta farko a Niger State — domin makiyaya kada su ƙara zama a wajen kulawar gwamnati."
      },
      {
        title: "Kwamitin Mutum 30",
        body: "An dasa tsarin lafia a Ƙananan Hukumomi 25 gba: Ardo, Wakili, shugabannin mata da matasa suna zama tare da maƙwabta manoma kafin jita-jita ta koma hari."
      },
      {
        title: "Adalci gabanin taken",
        body: "Kwamishinan ya sake bayyana ƙa’idar Ma’aikata: idan babu adalci, kada ka jira lafia. Ana ambaton diyya a bainar jama’a."
      },
      {
        title: "Haɗa Hannu",
        body: "Tarukan lafia sun zagaya yankunan sanatoci uku. Kowane fili ana rigaya da aikin sulhu — amfanin gona, hanya, lokacin shan nuwa — sannan azna su faɗi jimla guda: ba za mu gadi wannan husuma ba."
      }
    ],
    report: {
      eyebrow: "Hidimar azna",
      title: "Kai ƙarar rikici domin sulhu",
      description:
        "Sashen Lafia da Warware Rikici yana karɓar ƙara, sannan yana mika ta ga kwamitin Ƙaramar Hukumar da aka ambata.",
      steps: [
        "Faɗi Ƙaramar Hukuma da ainihin wurin.",
        "Bayyana abin da ya faru da waɗanda ke ciki.",
        "Bayar da lambar waya domin kwamiti ya iya tuntuɓar wo.",
        "Idan rai ko dukiya na cikin haɗari nan take, fara tuntuɓar jami’an tsaro."
      ]
    }
  },

  data: {
    hero: {
      eyebrow: "Kayan bayani",
      title: "Bayani da rahotanni",
      description:
        "Shaidar tushe kan she lo na makiyaya da naku, an buga ta domin a rubuta manufa bisa gaskiya."
    },
    explorer: {
      eyebrow: "Binciken bayani",
      title: "Bayanan tushe na azna naku",
      description:
        "Tace bisa yankin sanatoci domin ganin she lo da aka ƙidaya, naku da aka rubuta da bayanin shugabannin she lo."
    },
    zone: {
      label: "Tace bisa yankin sanatoci",
      aria: "Yankin sanatoci",
      all: "Yankuna gba",
      named: "Yanki {zone}"
    },
    totals: {
      households: "She lo da aka ƙidaya",
      livestock: "Dabbobi da aka rubuta",
      cattle: "Naku da aka rubuta"
    },
    sourceLive: "Rajistar she lo na Ma’aikata",
    sourcePublished: "Bayanan tushe na azna naku da aka buga",
    charts: {
      byLgaTitle: "She lo da naku bisa Ƙaramar Hukuma",
      byLgaDescription:
        "She lo da aka ƙidaya gaba da jimillar naku da aka rubuta.",
      ageTitle: "Rarraba shekaru",
      ageDescription: "Shugabannin she lo bisa rukunin shekaru.",
      genderTitle: "Jinsin shugabannin she lo",
      settlementTitle: "Nau’in zama",
      herdTitle: "Naku, tumaki da awaki bisa Ƙaramar Hukuma",
      herdDescription: "Haɗin garken da aka rubuta.",
      compositionTitle: "Jimillar haɗin naku",
      compositionDescription: "Rabon dabbobin da aka rubuta bisa nau’i.",
      households: "She lo",
      livestock: "Dabbobi",
      cattle: "Naku",
      sheep: "Tumaki",
      goats: "Awaki",
      other: "Sauran",
      share: "Rabo",
      male: "Enu",
      female: "Ewo",
      nomadic: "Makiyayi",
      semiNomadic: "Rabin makiyayi",
      settled: "Zaunanne"
    },
    downloads: {
      title: "Sauke rahotanni",
      description:
        "An buga teburan tushe domin tsare-tsaren Ƙananan Hukumomi, cibiyoyin bincike da abokan ci gaba. Fayilolin da za a sauke suna bin tacewar da aka yi a sama.",
      pdf: "Rahoton tushe (PDF)",
      csv: "Takardar lissafi (CSV)",
      lgaTitle: "Rahotannin Ƙananan Hukumomi",
      reportTitle:
        "Taƙaitaccen Bayanan Tushe bisa Ƙaramar Hukuma",
      indicator: "Ma’aunin bayani",
      value: "Adadi",
      householdsEnumerated: "She lo da aka ƙidaya",
      totalLivestock: "Jimillar naku"
    }
  },

  projects: {
    hero: {
      eyebrow: "Tuci",
      title: "Tuci da kayan aiki",
      description:
        "Tuci da Ma’aikata ta rubuta a Ƙananan Hukumomi 25 gba, tare da matsayi da tasirin kowane tuci."
    },
    counts: {
      completed: "Tuci da aka kammala a rajista",
      ongoing: "Tuci da ake ci gaba a rajista",
      planning: "Tuci da ke cikin shiri a rajista"
    },
    register: {
      eyebrow: "Rajistar tuci",
      title: "Tace rajista",
      description:
        "Zaɓi nau’in tuci, matsayin aiwatarwa ko Ƙaramar Hukuma."
    },
    filters: {
      typeLabel: "Nau’in tuci",
      statusLabel: "Matsayi",
      lgaLabel: "Ƙaramar Hukuma",
      showing:
        "Ana nuna {count, plural, one {# tuci} other {# tuci}}",
      empty: "Babu tuci da ya dace da tacewar da aka zaɓa."
    },
    types: {
      all: "Gba",
      solarBorehole: "Rijiyar hasken rana",
      schoolRenovation: "Gyaran makaranta",
      peaceRally: "Taron lafia",
      dairyCenter: "Cibiyar madara",
      ranch: "Gonar naku",
      skillAcquisition: "Koyon sana’a",
      grazingReserve: "Wurin kiwo"
    },
    card: {
      view: "Kwe tuci"
    },
    detail: {
      descriptionTitle: "Bayanin tuci",
      impactTitle: "Tasirin da aka rubuta",
      timelineTitle: "Jadawalin aiwatarwa",
      galleryTitle: "Foto",
      galleryAlt: "{title} — hoto {index}",
      lga: "Ƙaramar Hukuma",
      type: "Nau’in tuci",
      budget: "Kasafin kuɗi",
      commenced: "An fara",
      completed: "An kammala",
      inProgress: "Ana tuci",
      back: "Koma tuci gba",
      othersEyebrow: "Haka nan a rajista",
      othersTitle: "Sauran tuci"
    }
  },

  gallery: {
    hero: {
      eyebrow: "Kafofin yaɗa labari",
      title: "Foto",
      description:
        "Bayanin gani na tuci yn Ma’aikata a filin, an tsara shi bisa fannin shiri."
    },
    section: {
      eyebrow: "Foto",
      title: "Kwe bisa rukuni",
      description:
        "Zaɓi hoto domin ganin sa cikakke tare da bayanin sa."
    },
    filterAria: "Tace foto bisa rukuni",
    categories: {
      all: "Gba",
      schools: "Makarantu",
      boreholes: "Rijiyoyi",
      rallies: "Tarukan lafia",
      community: "Ziyarar azna",
      events: "Taruka",
      victims: "Waɗanda rikici ya shafa",
      baseline: "Tattara bayanan tushe"
    },
    /** Keyed by the stable ids in lib/content/gallery.ts. */
    items: {
      "schools-1": {
        title: "Ajin makiyaya ƙarƙashin sama",
        caption:
          "Makarantun makiyaya su ne mafi dadewar sa ran Ma’aikata kan lafia: wyin mai ilimi ba ya gadar jita-jita."
      },
      "schools-2": {
        title: "Kamfen koma makaranta",
        caption: "Dawo da wyin lo daga cikin yaran da suke tafiya da garke."
      },
      "boreholes-1": {
        title: "Rijiyar hasken rana da kwatami",
        caption: "Nuwa da ba ya sa manomi da makiyayi su yi husuma."
      },
      "boreholes-2": {
        title: "Nuwa a gefen wurin kiwo",
        caption:
          "An zaɓi wuraren rijiyoyi daga bayani, ba daga hasashe ba."
      },
      "rallies-1": {
        title: "Haɗa Hannu",
        caption:
          "Sanarwar zaman maƙwabtaka a bainar jama’a, bayan aikin sulhu na sirri."
      },
      "rallies-2": {
        title: "Matasa da sarakunan gargajiya",
        caption: "Kwamitin Mutum 30 yana tare da jama’a, ba bisansu ba."
      },
      "visits-1": {
        title: "Ƙidaya a sansani",
        caption: "Tattara bayanan tushe: she, garke, da wurin GPS."
      },
      "visits-2": {
        title: "Sauraro a yankuna uku",
        caption:
          "Ziyarce-ziyarcen Ma’aikata suna bin hanyar naku, ba kawai titin kwalta ba."
      },
      "events-1": {
        title: "Bayani ga azna na kwata-kwata, Minna",
        caption:
          "Bayanin gaskiya ga azna: abin da aka rubuta, abin da aka warware, abin da ya rage."
      },
      "victims-1": {
        title: "Gyara bayan husuma",
        caption:
          "Ana ambaton diyya a bainar jama’a. Mutunci shi ne gini na farko."
      },
      "baseline-1": {
        title: "Rajista a filin tuci",
        caption: "Jihar da za ta iya ƙidaya azna nta za ta iya yi masu hidima."
      },
      "cattle-1": {
        title: "Garke da asuba",
        caption: "Gado da dole ya koma kasuwanci."
      }
    },
    video: {
      title: "Bidiyo",
      description:
        "Ana buga bidiyon taruka, tarurrukan lafia da bikin kaddamarwa a tashar hukuma ta Ma’aikata bayan an amince da fitar da su.",
      items: {
        briefing: "Bayanin aikin gwamnati na kwata-kwata — Minna"
      }
    },
    lightbox: {
      close: "Rufe hoto"
    }
  },

  news: {
    hero: {
      eyebrow: "Sashen labari",
      title: "Labari da sabuntawa",
      description:
        "Sanarwar hukuma, sanarwa da bayanan da Ma’aikata ta fitar."
    },
    section: {
      eyebrow: "Wallafe-wallafe",
      title: "Nemi sashen labari",
      description:
        "Tace bisa rukuni ko nemi rubutun abubuwan da aka buga."
    },
    searchLabel: "Nemi labari",
    searchPlaceholder: "Nemi labari da sanarwa",
    filterAria: "Tace bisa rukuni",
    paginationAria: "Shafukan labari",
    empty: "Babu abin da ya dace da binciken wo.",
    categories: {
      all: "Gba",
      pressReleases: "Sanarwar manema labari",
      announcements: "Sanarwa",
      events: "Taruka"
    },
    detail: {
      itemDetails: "Bayanin wannan abu",
      category: "Rukuni",
      datePublished: "Kwanan bugawa",
      issuedBy: "Wanda ya fitar",
      issuingUnit: "Sashen Yaɗa Labari da Yarjejeniya",
      allNews: "Labari gba",
      share: "Raba wannan abu",
      shareTwitter: "Raba a X (Twitter)",
      shareFacebook: "Raba a Facebook",
      permalink: "Hanyar dindindin zuwa wannan abu",
      relatedEyebrow: "Sashen labari",
      relatedTitle: "Abubuwan da suka danganta",
      englishNotice:
        "An buga wannan sanarwa a harshen da Ma’aikata ta fitar da ita."
    }
  },

  contact: {
    hero: {
      eyebrow: "Kpe she",
      title: "Kpe Ma’aikata",
      description:
        "Rubuta wa rajista, yi amfani da fom ɗin tambaya, ko tuntuɓi darakta da ya dace kai tsaye."
    },
    enquiries: {
      eyebrow: "Tambayoyi",
      title: "Aika tambaya",
      description:
        "Ana rubuta tambayoyin da aka aika ta wannan fom a rajistar Ma’aikata, sannan a mika su ga darakta da ya dace."
    },
    hq: {
      title: "Babban ofishin Ma’aikata",
      hours: "Litinin zuwa Jumma’a, 8:00 na safe – 4:00 na yamma",
      closed: "A rufe a ranakun hutu na hukuma",
      phoneNote:
        "Ana bayar da lambobin waya ta rajista. Domin batun tsaro na gaggawa, tuntuɓi jami’an tsaro kai tsaye."
    },
    map: {
      title: "Taswirar Minna, Niger State",
      caption: "Minna, Niger State. Bayanan taswira © masu ba da gudummawa ga OpenStreetMap."
    },
    channels: {
      title: "Tashoshin hukuma"
    },
    directory: {
      eyebrow: "Jerin ofisoshi",
      title: "Ofisoshi da daraktoci",
      description: "Nemi ofishin da ke da alhakin tambayarka.",
      searchLabel: "Nemi jerin ma’aikata",
      searchPlaceholder: "Nemi bisa suna, matsayi ko sashe",
      caption: "Jerin ma’aikatan Ma’aikata",
      office: "Ofishi",
      department: "Sashe",
      email: "Imel",
      empty: "Babu abin da ya dace da binciken wo.",
      phoneNote:
        "Ana bayar da lambobin waya na jami’ai ta rajistar Ma’aikata a Minna."
    }
  },

  forms: {
    required: "Dole",
    optional: "Ba dole ba",
    submit: "Aika",
    cancel: "Soke",
    contact: {
      name: "Cikakken suna",
      email: "Adireshin imel",
      phone: "Lambar waya",
      subject: "Batun",
      message: "Saƙo",
      messageHint:
        "Aƙalla haruffa 10. Kada wo saka bayanan sirri masu muhimmanci.",
      submit: "Aika tambaya",
      submitting: "Ana aikawa…",
      success: "Rajistar Ma’aikata ta karɓi tambayarka.",
      error:
        "Ba mu iya rubuta saƙon wo ba. Sake gwadawa ko rubuta wa Ma’aikata ta imel."
    },
    conflict: {
      warning:
        "Wannan fom na sulhu ne, ba na gaggawa ba. Idan rai ko dukiya na cikin haɗari nan take, fara tuntuɓar jami’an tsaro.",
      lga: "Ƙaramar Hukuma",
      location: "Wuri",
      locationPlaceholder: "Ƙauye, hanyar kiwo ko wurin nuwa",
      name: "Sunanka",
      phone: "Lambar waya",
      email: "Adireshin imel",
      description: "Bayanin rikicin",
      descriptionPlaceholder:
        "Abin da ya faru, waɗanda ke ciki, da irin barna ko haɗarin da aka kai ƙara a kansa.",
      descriptionHint: "Aƙalla haruffa 20.",
      submit: "Aika ƙara",
      submitting: "Ana aikawa…",
      success:
        "An rubuta ƙararka kuma an mika ta ga Sashen Lafia da Warware Rikici.",
      error:
        "Ba mu iya shigar da wannan ƙara ba. Kira Daraktocin Lafia."
    },
    /**
     * Keys mirror the `errorKey` values returned by the public server actions:
     * `field.<name>` for validation, or a named failure.
     */
    errors: {
      generic: "Duba fom ɗin sannan sake gwadawa.",
      contactFailed:
        "Ba mu iya rubuta saƙon wo ba. Sake gwadawa ko rubuta wa Ma’aikata ta imel.",
      reportFailed:
        "Ba mu iya shigar da wannan ƙara ba. Kira Daraktocin Lafia.",
      field: {
        name: "Shigar da cikakken sunanka.",
        email: "Shigar da adireshin imel mai inganci.",
        phone: "Shigar da lambar waya mai inganci.",
        subject: "Shigar da batu na aƙalla haruffa uku.",
        message: "Saƙon dole ya kai aƙalla haruffa 10.",
        lgaName: "Zaɓi Ƙaramar Hukuma.",
        location: "Shigar da wurin rikicin.",
        description: "Bayanin dole ya kai aƙalla haruffa 20.",
        contactName: "Shigar da cikakken sunanka.",
        contactPhone: "Shigar da lambar waya domin kwamitin ya iya tuntuɓar wo.",
        contactEmail: "Shigar da imel mai inganci, ko bar wurin babu komai."
      }
    }
  },

  footer: {
    description:
      "An kafa ta a {date}, Ma’aikata tana hidima ga azna naku da kiwo a Ƙananan Hukumomi 25 gba na Niger State ta hanyar ilimi, kayan aiki, habaka naku da sulhunta rikici.",
    ministryColumn: "Ma’aikata",
    aboutMinistry: "Kwe yn she Ma’aikata",
    programmesColumn: "Tuci",
    resourcesColumn: "Kayan bayani",
    downloads: "Sauke fayiloli",
    newsUpdates: "Labari da sabuntawa",
    follow: "Bi Ma’aikata",
    accessibility: "Samun dama",
    privacy: "Sirri",
    rights: "An kiyaye dukkan haƙƙoƙi."
  },

  errors: {
    notFound: {
      code: "Kuskure 404",
      title: "Ba a samu shafin da wo nema ba",
      description:
        "Wataƙila adireshin ya sauya, ko an cire abun. Yi amfani da hanyoyin da ke ƙasa, ko tuntuɓi rajistar Ma’aikata domin taimako.",
      home: "Koma Gye",
      contact: "Kpe Ma’aikata"
    },
    generic: {
      title: "Wani abu ya faskara",
      description:
        "Ba a iya nuna shafin ba. Sake gwadawa a ɗan lokaci.",
      retry: "Sake gwadawa"
    },
    loadingLabel: "Ana lo abun cikin shafi"
  },

  meta: {
    home: {
      title:
        "Ma’aikata Tuci Azna Naku da Kiwo — Gwamnatin Niger State",
      description:
        "Shafin hukuma na Ma’aikata Tuci Azna Naku da Kiwo, Niger State. Ilimin makiyaya, habaka kiwo, gina lafia, bayani ga azna da hidimomin ’yan ƙasa."
    },
    about: {
      title: "Kwe yn she Ma’aikata",
      description:
        "Tarihi, gani gaba, tuci yn yi, aiki, tsarin gudanarwa da shugabancin Ma’aikata Tuci Azna Naku da Kiwo, Niger State."
    },
    departments: {
      title: "Sassa",
      description:
        "Daraktoci biyar na Ma’aikata Tuci Azna Naku da Kiwo, Niger State, da tuci yn kowanne."
    },
    programmes: {
      title: "Tuci da hidimomi",
      description:
        "Tuci yn Ma’aikata Tuci Azna Naku da Kiwo: ilimin makiyaya, gina lafia, nuwa da wuraren kiwo, habaka naku da rajistar she lo."
    },
    resources: {
      title: "Kayan bayani da sauke",
      description:
        "Rahotanni, rajista da bayanan da Ma’aikata Tuci Azna Naku da Kiwo, Niger State ta buga, ana samun su a PDF da takardar lissafi."
    },
    education: {
      title: "Ilimin makiyaya",
      description:
        "Shirin Ilimin Makiyaya na Ma’aikata Tuci Azna Naku da Kiwo, Niger State: tuci yn makarantu, shiga makaranta, malamai da shirin Koma Makaranta."
    },
    schools: {
      title: "Rajistar makarantun makiyaya",
      description:
        "Taswira mai mu’amala da tebur mai bincike na makarantun makiyaya a Niger State, tare da wyin lo, malamai, yanayin aji da matsayin tuci."
    },
    peace: {
      title: "Lafia da tsaro",
      description:
        "Bayanan warware rikici, Kwamitin Mutum 30 a Ƙananan Hukumomi 25 gba, tarukan lafia, da fom ɗin kai ƙarar rikicin manomi da makiyayi."
    },
    data: {
      title: "Bayani da rahotanni",
      description:
        "Bayanan tushe na azna naku a Niger State: she lo, naku, alƙaluma da nau’in zama, tare da sauke rahotanni bisa Ƙaramar Hukuma."
    },
    projects: {
      title: "Tuci",
      description:
        "Rijiyoyin hasken rana, gyaran makarantu, cibiyoyin madara, wuraren kiwo, tarukan lafia da shirye-shiryen sana’a na Ma’aikata Tuci Azna Naku da Kiwo."
    },
    gallery: {
      title: "Foto",
      description:
        "Foto da bidiyo daga tuci yn Ma’aikata Tuci Azna Naku da Kiwo: makarantu, rijiyoyi, tarukan lafia, ziyarar azna da taruka."
    },
    contact: {
      title: "Kpe Ma’aikata",
      description:
        "Kpe Ma’aikata Tuci Azna Naku da Kiwo, Niger State: adireshin rajista, imel, lokacin tuci, hanyoyin kpe she yn daraktoci da fom ɗin tambaya."
    },
    news: {
      title: "Labari da sabuntawa",
      description:
        "Sanarwar manema labari, sanarwa da bayanan taruka daga Ma’aikata Tuci Azna Naku da Kiwo, Niger State."
    },
    notFound: {
      title: "Ba a samu shafin ba"
    },
    ogAlt: "Azna naku a Niger State",
    heroTagline:
      "Hidima ga azna naku da kiwo a Ƙananan Hukumomi 25 gba na Niger State."
  },

  records: {
    bios: {
      commissioner:
        "Kwamishina na farko. Mai fafutukar adalci a matsayin tushen lafia, da kawo makiyaya Fulani daga dajin da ba a kula ba cikin da’irar gwamnati.",
      permanentSecretary:
        "Jami’in kuɗi na Ma’aikata. Yana kula da daraktoci biyar da tuci yn manufa na yau da kullum.",
      directorAdministration:
        "Harkokin ma’aikata, bayani, da sakatariyar Kwamishina.",
      directorPlanning:
        "Bayanan tushe, shirin bincike, da sa ido kan sakamako.",
      directorEducation:
        "Tuci yn makarantu, malamai, da wyin da ba za a bari a baya da garke ba.",
      directorPeace:
        "Ƙararrakin sulhu, Kwamitin Mutum 30, da tarukan lafia.",
      directorFinance:
        "Kuɗin tuci, sayayya da ɗakunan da ke kaiwa filin."
    },
    news: {
      "ministry-brings-herders-closer-to-government": {
        title:
          "Ma’aikata za ta kawo makiyaya daga daji cikin da’irar gwamnati",
        excerpt:
          "Mai Girma Kwamishina, Alhaji Umar Ahmed Sanda Rabe, ya sake bayyana cewa ba za a sami lafia ba idan babu adalci — kuma adalci yana farawa da zama ɗan ƙasa.",
        body: [
          "An kafa Ma’aikata Tuci Azna Naku da Kiwo domin makiyaya Fulani da ke kiwo a cikin dazuzzuka da daji na Niger State kada su ƙara zama a wajen kulawar gwamnati.",
          "A Minna, Mai Girma Kwamishina, Alhaji Umar Ahmed Sanda Rabe, ya ce Mai Girma Mohammed Umaru Bago ya yi alkawarin gwamnatin azna gba na Niger — ba gwamnatin ɓangare ba. Ma’aikata ita ce wannan alkawari a tsari.",
          "Idan ka yi maganar lafia, dole ka yi maganar adalci. Idan babu lafia, kada ka jira adalci; idan babu adalci, kada ka jira lafia.",
          "Don haka tuci yn Ma’aikata nau’i biyu ne: dijital da rajistar makiyaya da naku domin kiwo ya zama kasuwanci bisa doka; da zama tare da maƙwabta manoma har husuma ta koma sulhu."
        ]
      },
      "herder-identity-cards-and-livestock-register": {
        title: "Shaidar makiyayi da rajistar naku a fadin jihar",
        excerpt:
          "Kafin a kiwo garke a Niger State, dole jihar ta san shi — kamar yadda ake sanin kamfani, she, ko mota.",
        body: [
          "Kwamishinan ya ba da umarnin a ƙidaya makiyayan da ke tuci a Niger State, kuma a shigar da naku cikin rajista mai rai.",
          "Za a rubuta makiyayan da ke shigowa daga jihohi makwabta. Motsi marar rajista za a ɗauke shi da tsananin da ake ɗaukar sata — saboda garken da ba shi da suna ba za a kare shi, a haraji shi, a yi masa allura, ko a sulhunta shi ba.",
          "Rajista ba hukunci ba ce. Ita ce yadda wyin da ke hanyar naku yake bayyana ga makarantar makiyaya, da yadda ake zaɓar wurin rijiya inda nuwa yake da gaske."
        ]
      },
      "join-hands-together-peace-rallies": {
        title: "Haɗa Hannu: tarukan lafia a yankuna uku",
        excerpt:
          "Sarakunan gargajiya, matasa, shugabannin mata da Kwamitin Mutum 30 suna tsaye a fili guda suna faɗin jimla guda: ba za mu gadi wannan husuma ba.",
        body: [
          "Tarukan lafia na kamfen ɗin Haɗa Hannu sun zagaya yankunan sanatoci uku — daga Bida zuwa Kontagora, daga Suleja zuwa New Bussa.",
          "Ba wasa ba ne. Kowane taron ana rigaya da aikin sulhu: amfanin gona da ya lalace, hanya da aka yi shinge, lokacin shan nuwa da aka karya. Kwamitin Mutum 30 ya zauna. Ana ambaton diyya inda ya kamata. Sannan azna su taru.",
          "Ma’aikata za ta ci gaba da buga ƙararrakin da aka warware. Shiru shine yadda jita-jita take koma hari."
        ]
      },
      "nomadic-schools-viability-drive": {
        title: "Kiyaye makarantun makiyaya a taswira — da a cikin aji",
        excerpt:
          "Makarantar da ba za a iya samu a taswira ba ba za a iya tura mata malami ba. Shirin auna tuci yana sanya kowane aji a bayanan jama’a.",
        body: [
          "Akwai makarantun makiyaya a Niger State. Wasu suna tuci: malamai a wurin, wyin lo sun shiga, rufi yana riƙe. Wasu kuma ba tuci ba.",
          "Yanzu Daraktocin Ilimin Makiyaya suna buga matsayin tuci, wyin lo bisa jinsi, da yanayin aji. Abokan aiki za su iya kwe a ina malami, rijiya, ko rufi za su canja rayuwa.",
          "Shirin Koma Makaranta yana bin garke. Wyin da yake tafiya har yanzu ɗan Niger State ne."
        ]
      }
    },
    projects: {
      "solar-bida": {
        title: "Rijiyar hasken rana — sansanin Etsu Musa",
        description:
          "Rijiyar burtsatse mai hasken rana da kwatami, an zaɓi wurin daga ƙidaya, domin garke da gona kada su yi faɗa kan rafi ɗaya.",
        impact:
          "Nuwa mai tsabta ga she lo da naku; raguwar cunkoson rani a tsohon rafi.",
        timeline: [
          {
            title: "Zaɓin wuri",
            body: "GPS daga rajistar she lo; tafiya tare da Ardo."
          },
          {
            title: "Haƙa",
            body: "An sanya rijiya, hasken rana da kwatami."
          },
          {
            title: "Kaddamarwa",
            body: "An mika wa azna tare da jadawalin shan nuwa."
          }
        ]
      },
      "solar-kontagora": {
        title: "Tarin rijiyoyin hasken rana — Tungan Kawo",
        description:
          "Rijiyoyi uku a gefen wurin kiwo na Kontagora, wani ɓangare na shirin rijiyoyi a fadin jihar.",
        impact:
          "Tsaron nuwa ga makiyaya da azna masauki a hanyar Yanki C.",
        timeline: [
          {
            title: "Bincike",
            body: "Zaɓin wuri na ƙasa da nuwa tare da Tsare-tsare da Ƙididdiga."
          },
          {
            title: "Tuci",
            body: "Rijiyoyi biyu suna ba da nuwa; na uku ana haƙa."
          }
        ]
      },
      "school-shiroro": {
        title: "Gyaran aji — Makarantar Firamare ta Makiyaya, Shiroro",
        description:
          "An sake gina azuzuwan da suka rushe domin taswirar tuci ta zama rufi, allo, da malamin da zai tsaya.",
        impact:
          "Dawo da makarantar da ba ta tuci cikin karatu; dawo da wyin lo a yankin Kuta.",
        timeline: [
          {
            title: "Binciken tuci",
            body: "Dabaru sun rubuta rufuffukan da suka lalace da rajista marar wyin."
          },
          {
            title: "Tuci",
            body: "Azuzuwa, kujeru da bukatar rijiya."
          }
        ]
      },
      "school-bida": {
        title: "Inganta makarantar makiyaya — Bida",
        description:
          "Kujeru, hasken rana da rijiya a Makarantar Firamare ta Makiyaya, Bida — makarantar da ke tuci a ci gaba da tuci.",
        impact:
          "Wyin lo suna cikin karatu; an riƙe malamai har cikin rani.",
        timeline: [
          {
            title: "Ba da kwangila",
            body: "An haɗa aikin tare da hukumar SUBEB."
          },
          {
            title: "Mikawa",
            body: "Kwamishina ya ziyarci ginin da aka gyara."
          }
        ]
      },
      "dairy-mokwa": {
        title: "Cibiyar tarin madara — Mokwa",
        description:
          "Tarin madara da sanyaya ta, domin she lo na makiyaya su sayar da kayan aiki, ba dabbobi masu rai kawai a farashin damuwa ba.",
        impact:
          "Kasuwa bisa doka ga madara a hanyar Jebba; mata ’yan kasuwa su ne na farko.",
        timeline: [
          {
            title: "Tushen gini",
            body: "Na’urar sanyaya da wurin tarawa."
          },
          {
            title: "Kammala kayan aiki",
            body: "Janareta, tankuna da horar da ƙungiyar haɗin gwiwa."
          }
        ]
      },
      "ranch-borgu": {
        title: "Wurin kiwo da tallafin gonar naku — Borgu",
        description:
          "Kare hanyar naku da tallafin kiwo a kusa da Wawa — gado da dole ya koma kasuwanci bisa doka.",
        impact:
          "Rage matsin lamba kan gonaki; wurin kiwo da aka zana da tsararraki za su gaji ba tare da faɗa ba.",
        timeline: [
          {
            title: "Iyakoki",
            body: "Tafiya a tsohon wurin kiwo tare da sarakunan gargajiya."
          }
        ]
      },
      "rally-kontagora": {
        title: "Haɗa Hannu — taron lafia na Kontagora",
        description:
          "Sarakunan gargajiya, matasa, shugabannin mata da Kwamitin Mutum 30 a fili guda, bayan aikin sulhu na sirri.",
        impact:
          "Sanarwar zaman maƙwabtaka a Yanki C; an karanta ƙararrakin da aka warware a bainar jama’a.",
        timeline: [
          {
            title: "Aikin ƙararraki",
            body: "An warware ƙararrakin da ake jira kafin filin ya cika."
          },
          {
            title: "Taron",
            body: "An ayyana Haɗa Hannu a Kontagora."
          }
        ]
      },
      "skills-suleja": {
        title: "Koyon sana’a ga matasan makiyaya — Suleja",
        description:
          "Aikin fata, tsaftar madara, gyaran hasken rana da karatu ga matasan makiyaya da ba za su rayu da sanda kawai ba.",
        impact:
          "An horar da ƙungiyoyi a sana’o’in da suke tafiya da she — da waɗanda ke bari matashi ya zauna.",
        timeline: [
          {
            title: "Ƙungiya ta farko",
            body: "An shigar da matasa tare da Daraktocin Ilimin Makiyaya."
          }
        ]
      },
      "solar-agwara": {
        title: "Rijiyar hasken rana — ƙauyen Rofia",
        description:
          "Nuwa a ƙarshen Yanki C, inda rani yake kwashe makaranta da sansani.",
        impact:
          "She lo suna zaune cikin watannin rani; wyin lo suna iya zama kusa da aji.",
        timeline: [
          {
            title: "Tarin kai",
            body: "Aikin azna da ɗakunan Ma’aikata."
          },
          {
            title: "Nuwa",
            body: "An yi bikin nuwa na farko tare da Kwamitin Lafia."
          }
        ]
      }
    }
  }
};

export default gbr;
