import type { PartialMessages } from ".";

/** French (Français) — complete UI coverage for international partners. */
const fr: PartialMessages = {
  gov: {
    government: "Gouvernement de l’État du Niger",
    ministry: "Ministère des Affaires Nomades et Pastorales",
    ministryShort: "NMPA",
    state: "État du Niger",
    place: "Minna · État du Niger · République Fédérale du Nigéria",
    country: "République Fédérale du Nigéria",
    headquarters: "Siège du Ministère, Minna, État du Niger",
    established: "16 août 2023",
    commissionerTitle: "Monsieur le Commissaire",
    governorTitle: "Gouverneur de l’État du Niger",
    crestAlt:
      "Armoiries du Ministère des Affaires Nomades et Pastorales, État du Niger"
  },

  nav: {
    mainNavLabel: "Navigation principale",
    skipToContent: "Aller au contenu principal",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    homeAria: "Ministère des Affaires Nomades et Pastorales — accueil",
    breadcrumbLabel: "Fil d’Ariane",
    staffLogin: "Espace personnel",
    home: "Accueil",
    about: "À propos",
    departments: "Directions",
    programmes: "Programmes",
    resources: "Ressources",
    news: "Actualités",
    gallery: "Galerie",
    contact: "Contact",
    aboutOverview: "Présentation du Ministère",
    aboutMandates: "Missions",
    aboutLeadership: "Direction",
    departmentsAll: "Toutes les directions",
    programmesAll: "Tous les programmes",
    programmesEducation: "Éducation nomade",
    programmesPeace: "Paix et sécurité",
    programmesProjects: "Projets et infrastructures",
    resourcesDownloads: "Rapports et téléchargements",
    resourcesData: "Explorateur de données",
    resourcesSchools: "Registre des écoles nomades"
  },

  language: {
    label: "Langue",
    selectLabel: "Choisir une langue",
    current: "Langue actuelle : {language}",
    switchTo: "Passer au {language}",
    partialNotice:
      "La traduction de ce site en {language} est en cours. Les pages non encore traduites sont affichées en anglais.",
    dismissNotice: "Fermer"
  },

  common: {
    readMore: "Lire la suite",
    viewDetails: "Voir le détail",
    viewAll: "Voir tout",
    learnMore: "En savoir plus",
    search: "Rechercher",
    filter: "Filtrer",
    clearFilters: "Effacer les filtres",
    previous: "Précédent",
    next: "Suivant",
    pageOf: "Page {current} sur {total}",
    showingOf: "Affichage de {shown} sur {total}",
    noResults: "Aucun résultat.",
    noData: "Aucune donnée disponible.",
    loading: "Chargement…",
    loadingMap: "Chargement de la carte…",
    optional: "Facultatif",
    yes: "Oui",
    no: "Non",
    all: "Tous",
    allLgas: "Les 25 collectivités locales",
    allStatuses: "Tous les statuts",
    lga: "Collectivité locale",
    lgaShort: "CL",
    zone: "Zone",
    senatorialZone: "Zone sénatoriale",
    source: "Source",
    download: "Télécharger",
    pdf: "PDF",
    csv: "CSV",
    close: "Fermer",
    dateLabel: "Date",
    notPublished: "Non publié",
    notAvailable: "Non disponible",
    officialLanguageNotice:
      "Ce document est publié dans la langue de sa diffusion.",
    monthsShort: [
      "janv.",
      "févr.",
      "mars",
      "avr.",
      "mai",
      "juin",
      "juil.",
      "août",
      "sept.",
      "oct.",
      "nov.",
      "déc."
    ]
  },

  status: {
    planning: "En préparation",
    ongoing: "En cours",
    completed: "Achevé",
    viable: "Viable",
    nonViable: "Non viable",
    notAssessed: "Non évalué",
    pending: "En attente",
    inMediation: "En médiation",
    resolved: "Résolu",
    escalated: "Transmis à l’échelon supérieur",
    continuous: "Permanent",
    ongoingDelivery: "Mise en œuvre continue"
  },

  ministry: {
    vision:
      "Un État du Niger pacifique et prospère où les communautés nomades et pastorales sont des citoyens de plein droit — instruites, recensées, économiquement viables et vivant en bonne entente avec leurs voisins agriculteurs.",
    mission:
      "Rapprocher les éleveurs de l’administration ; enregistrer les éleveurs et le cheptel ; assurer l’éducation nomade, l’accès à l’eau et les infrastructures de pâturage ; arbitrer les conflits agriculteurs-éleveurs par les Comités des 30 ; et faire passer l’élevage de la survie héritée à une activité commerciale digne.",
    mandates: {
      register: {
        title: "Enregistrement et identité",
        body: "Recenser les ménages, délivrer une identité aux éleveurs et tenir un registre vivant du cheptel dans les 25 collectivités locales."
      },
      education: {
        title: "Éducation nomade",
        body: "Maintenir les écoles nomades viables, dotées d’enseignants et fréquentées — y compris l’initiative Retour à l’école pour les enfants en déplacement."
      },
      peace: {
        title: "Paix et médiation",
        body: "Régler les différends entre agriculteurs et éleveurs par le dialogue, le Comité des 30 et une indemnisation équitable."
      },
      grazing: {
        title: "Réserves de pâturage et ranchs",
        body: "Protéger les couloirs de transhumance, restaurer les réserves de pâturage et soutenir le ranching comme activité moderne et légale."
      },
      water: {
        title: "Eau et infrastructures solaires",
        body: "Réaliser des forages solaires et des abreuvoirs afin que les communautés et les troupeaux ne se disputent pas un même point d’eau."
      },
      livestock: {
        title: "Productivité de l’élevage",
        body: "Accroître les rendements par la collecte laitière, la vulgarisation vétérinaire et le passage de l’élevage de subsistance à l’entreprise."
      },
      data: {
        title: "Données et planification",
        body: "Publier les données de référence, les rapports par collectivité locale et les travaux de recherche afin que la politique publique s’appuie sur des faits."
      }
    },
    departments: {
      administration: {
        name: "Administration",
        summary:
          "Mise en œuvre des politiques, gestion du personnel et affectation ordonnée des ressources du Ministère.",
        functions: [
          "Interpréter et diffuser les décisions du Conseil exécutif",
          "Gestion des ressources humaines, des archives et du personnel",
          "Coordination du cabinet du Commissaire",
          "Normes de service interne et correspondance"
        ],
        achievements: [
          "Création d’un ministère nouveau à partir de zéro en 2023",
          "Mise en place de la liaison avec les collectivités locales pour le réseau des Comités des 30"
        ]
      },
      planning: {
        name: "Planification, Recherche et Statistiques",
        summary:
          "Planification à court et long terme, données de référence pastorales et colonne vertébrale statistique du Ministère.",
        functions: [
          "Conception du recensement des ménages et du cheptel",
          "Rapports de situation par collectivité locale et prévisions",
          "Suivi des projets et des résultats clés",
          "Partenariats de recherche avec les établissements supérieurs"
        ],
        achievements: [
          "Ménages pastoraux recensés à l’échelle de l’État",
          "Cheptel inscrit au registre de l’État"
        ]
      },
      education: {
        name: "Éducation Nomade",
        summary:
          "Des écoles qui suivent les populations — enseignants, salles de classe, effectifs et campagne Retour à l’école.",
        functions: [
          "Évaluation de la viabilité des écoles nomades",
          "Affectation des enseignants et matériel pédagogique",
          "Mobilisation Retour à l’école dans les zones de pâturage",
          "Réhabilitation des salles de classe avec les agences partenaires"
        ],
        achievements: [
          "Cartographie de la viabilité des écoles dans tout l’État",
          "Reprise des effectifs dans des campements jusque-là non desservis"
        ]
      },
      peace: {
        name: "Paix et Règlement des Conflits",
        summary:
          "Médiation, Comité des 30, indemnisation et le long travail du bon voisinage.",
        functions: [
          "Réception des dossiers, médiation et orientation",
          "Secrétariat des Comités des 30 et des comités de paix",
          "Rassemblements pour la paix et campagnes Unissons nos mains",
          "Coordination avec les forces de sécurité et les autorités traditionnelles"
        ],
        achievements: [
          "Conflits réglés par le dialogue",
          "Structures de comités actives dans les collectivités locales"
        ]
      },
      finance: {
        name: "Finances et Approvisionnement",
        summary:
          "Budgets, discipline de trésorerie, marchés publics et magasins qui soutiennent le travail de terrain.",
        functions: [
          "Préparation et défense du budget annuel",
          "Traitement des paiements et tenue des registres de crédits",
          "Achat de matériel pour forages, écoles et rassemblements",
          "Magasins, parc automobile et logistique de terrain"
        ],
        achievements: [
          "Suivi transparent des crédits affectés aux forages solaires",
          "Chaînes d’approvisionnement vers les zones de pâturage éloignées"
        ]
      }
    },
    roles: {
      commissioner: "Monsieur le Commissaire",
      permanentSecretary: "Secrétaire Permanent",
      directorAdministration: "Directeur de l’Administration",
      directorPlanning:
        "Directeur de la Planification, de la Recherche et des Statistiques",
      directorEducation: "Directeur de l’Éducation Nomade",
      directorPeace: "Directeur de la Paix et du Règlement des Conflits",
      directorFinance: "Directeur des Finances et de l’Approvisionnement",
      informationUnit: "Chef du Service de l’Information et du Protocole",
      director: "Directeur"
    },
    offices: {
      commissioner: "Cabinet du Commissaire",
      permanentSecretary: "Cabinet du Secrétaire Permanent",
      administration: "Direction de l’Administration",
      planning:
        "Direction de la Planification, de la Recherche et des Statistiques",
      education: "Direction de l’Éducation Nomade",
      peace: "Direction de la Paix et du Règlement des Conflits",
      finance: "Direction des Finances et de l’Approvisionnement",
      information: "Service de l’Information et du Protocole"
    }
  },

  home: {
    hero: {
      eyebrow: "Créé le {date}",
      title:
        "Au service des communautés nomades et pastorales de l’État du Niger",
      description:
        "Le Ministère enregistre les ménages pastoraux, soutient les écoles nomades, réalise les infrastructures d’eau et de pâturage et arbitre les conflits agriculteurs-éleveurs dans les 25 collectivités locales.",
      ctaPrimary: "Voir les programmes du Ministère",
      ctaSecondary: "Contacter le Ministère"
    },
    quickAccess: {
      eyebrow: "Services aux citoyens",
      title: "Accès rapide",
      departments: "Directions",
      departmentsDescription: "Cinq directions et leurs attributions",
      schools: "Écoles nomades",
      schoolsDescription: "Consulter le registre et la carte de viabilité",
      report: "Signaler un conflit",
      reportDescription: "Déposer un différend pour médiation",
      projects: "Projets",
      projectsDescription: "Forages, salles de classe et aménagements pastoraux",
      news: "Actualités et avis",
      newsDescription: "Communiqués de presse et annonces",
      contact: "Contacter le Ministère",
      contactDescription: "Secrétariat, bureaux et demandes"
    },
    stats: {
      title: "Chiffres clés",
      note: "Chiffres publiés par le Ministère des Affaires Nomades et Pastorales, actualisés à partir des registres des ménages, des écoles et des dossiers.",
      lgas: "Collectivités locales",
      lgasContext: "Couvertes par les opérations de terrain du Ministère",
      schools: "Écoles nomades",
      schoolsContext: "Inscrites au registre de l’éducation nomade",
      households: "Ménages recensés",
      householdsContext: "Ménages pastoraux dénombrés",
      livestock: "Animaux enregistrés",
      livestockContext: "Inscrits au registre du cheptel de l’État",
      conflicts: "Conflits résolus",
      conflictsContext: "Réglés par la médiation et le dialogue",
      appointments: "Nominations politiques",
      appointmentsContext: "Représentation pastorale au gouvernement"
    },
    intro: {
      eyebrow: "À propos du Ministère",
      title: "Un ministère dédié aux communautés nomades et pastorales",
      paragraph1:
        "Le Ministère des Affaires Nomades et Pastorales a été créé le {date} par le Gouvernement de l’{state} afin d’assurer la pleine participation des communautés pastorales aux services publics et à la planification du développement.",
      commissionerLabel: "Monsieur le Commissaire",
      establishedLabel: "Créé le",
      cta: "En savoir plus sur le Ministère",
      imageAlt: "Troupeau sur un pâturage de l’État du Niger"
    },
    mandates: {
      eyebrow: "Mandat statutaire",
      title: "Attributions du Ministère",
      description:
        "Sept missions orientent l’action du Ministère : enregistrement, éducation, consolidation de la paix, infrastructures et information du public."
    },
    departments: {
      eyebrow: "Organisation",
      title: "Directions du Ministère",
      description:
        "Chaque direction est responsable d’un domaine défini de politique publique et de prestation de services.",
      viewAll: "Voir toutes les directions",
      viewDepartment: "Voir la direction"
    },
    projects: {
      eyebrow: "Programmes et projets",
      title: "Travaux en cours dans l’État",
      viewAll: "Voir tous les projets"
    },
    peaceBand: {
      eyebrow: "Paix et sécurité",
      title: "Signaler un différend agriculteur-éleveur pour médiation",
      description:
        "Les signalements sont reçus par la Direction de la Paix et du Règlement des Conflits, puis transmis au comité de la collectivité locale concernée. En cas d’urgence, contactez d’abord les forces de sécurité.",
      cta: "Signaler un conflit"
    },
    news: {
      eyebrow: "Salle de presse",
      title: "Actualités et annonces",
      viewAll: "Voir toutes les actualités"
    }
  },

  about: {
    hero: {
      eyebrow: "À propos du Ministère",
      title:
        "Créé pour intégrer les communautés pastorales à l’action publique",
      description: "Créé le {date} par le Gouvernement de l’{state}."
    },
    background: {
      eyebrow: "Historique",
      title: "La création du Ministère",
      paragraph1:
        "Le Ministère des Affaires Nomades et Pastorales a été créé le {date} par {governor}, {governorTitle}, dans le cadre d’un engagement en faveur d’un gouvernement au service de toutes les communautés de l’{state}.",
      paragraph2:
        "{commissioner} a été nommé premier {commissionerTitle}. Une mission claire a été confiée au Ministère : connaître la population pastorale, instruire ses enfants, garantir l’accès à l’eau et à un pâturage légal, et régler les différends entre éleveurs et agriculteurs avant qu’ils ne dégénèrent.",
      paragraph3:
        "Le Ministère agit par cinq directions et est présent dans les 25 collectivités locales, en collaboration avec les autorités traditionnelles, les forces de sécurité et les partenaires au développement."
    },
    facts: {
      established: "Création",
      commissioner: "Commissaire",
      governor: "Gouverneur",
      headquarters: "Siège",
      directorates: "Directions",
      directoratesValue: "Cinq",
      coverage: "Couverture",
      coverageValue: "25 collectivités locales"
    },
    vision: "Vision",
    mission: "Mission",
    mandates: {
      eyebrow: "Mandat statutaire",
      title: "Les sept missions du Ministère",
      description:
        "Chaque mission est confiée à une direction et fait l’objet d’un rapport dans le cycle de planification du Ministère.",
      number: "Mission {number}"
    },
    organogram: {
      eyebrow: "Structure organisationnelle",
      title: "Organigramme",
      description: "Sélectionnez un bureau pour lire ses attributions.",
      permanentSecretaryDetail: "Ordonnateur",
      administrationDetail: "Personnel et archives",
      planningDetail: "Données et suivi",
      educationDetail: "Écoles et effectifs",
      peaceDetail: "Médiation et comités",
      financeDetail: "Budget et marchés"
    },
    leadership: {
      eyebrow: "Direction",
      title: "Bureaux du Ministère",
      description:
        "Responsables politiques et administratifs chargés de la politique, de la mise en œuvre et de la reddition de comptes."
    },
    accessibility: {
      eyebrow: "Accessibilité",
      title: "Ce site est conçu pour être utilisé par tous",
      description:
        "Les pages respectent les contrastes WCAG 2.1 AA, fonctionnent avec la navigation au clavier et les lecteurs d’écran, et tiennent compte des préférences de mouvement réduit. En cas de difficulté, écrivez au Ministère : l’information vous sera fournie sous un autre format.",
      cta: "Contacter le Ministère",
      imageAlt:
        "Réunion entre acteurs communautaires et responsables du Ministère"
    }
  },

  departments: {
    hero: {
      eyebrow: "Organisation",
      title: "Directions du Ministère",
      description:
        "La politique et la mise en œuvre sont réparties entre cinq directions, chacune responsable devant le Secrétaire Permanent."
    },
    directorateNumber: "Direction {number}",
    viewDepartment: "Voir la direction",
    detail: {
      eyebrow: "Direction",
      functionsTitle: "Attributions de cette direction",
      achievementsTitle: "Réalisations enregistrées",
      contactsTitle: "Contacts de la direction",
      contactsEmpty:
        "Les demandes destinées à cette direction sont reçues par le secrétariat du Ministère.",
      contactsCta: "Contacter le Ministère",
      otherTitle: "Autres directions",
      otherAria: "Autres directions",
      relatedEyebrow: "Travaux connexes",
      relatedTitle: "Projets dans l’État",
      relatedDescription:
        "Sélection de projets actuellement enregistrés par le Ministère."
    }
  },

  programmes: {
    hero: {
      eyebrow: "Programmes et services",
      title: "Ce que réalise le Ministère",
      description:
        "Six domaines de programme portent le mandat du Ministère dans les collectivités locales."
    },
    section: {
      eyebrow: "Domaines de programme",
      title: "Programmes du Ministère",
      description:
        "Chaque programme est piloté par une direction et fait l’objet d’un rapport dans le cycle de planification du Ministère."
    },
    education: {
      label: "Éducation nomade",
      body: "Évaluation de la viabilité, affectation des enseignants, réhabilitation des salles de classe et campagne Retour à l’école pour les enfants des zones de pâturage. Les données par école sont publiées dans le registre des écoles nomades.",
      actionPrimary: "Programme d’éducation",
      actionSecondary: "Registre des écoles"
    },
    peace: {
      label: "Paix et règlement des conflits",
      body: "Médiation des différends agriculteurs-éleveurs par les Comités des 30 dans chaque collectivité locale, indemnisation lorsqu’elle est due, et rassemblements Unissons nos mains dans les trois zones sénatoriales.",
      actionPrimary: "Paix et sécurité",
      actionSecondary: "Signaler un conflit"
    },
    water: {
      label: "Eau et infrastructures solaires",
      body: "Forages solaires et abreuvoirs implantés de sorte que ménages et troupeaux ne se disputent pas le même point d’eau. La réalisation est consignée projet par projet.",
      actionPrimary: "Voir les projets"
    },
    grazing: {
      label: "Réserves de pâturage et ranching",
      body: "Protection des couloirs de transhumance, restauration des réserves de pâturage classées et soutien au ranching comme activité légale et moderne.",
      actionPrimary: "Voir les projets"
    },
    livestock: {
      label: "Élevage et développement laitier",
      body: "Centres de collecte laitière, vulgarisation vétérinaire et acquisition de compétences destinés à faire passer l’élevage de la subsistance à l’entreprise.",
      actionPrimary: "Voir les projets"
    },
    registration: {
      label: "Enregistrement des ménages et identité",
      body: "Recensement des ménages pastoraux, identité des éleveurs et registre du cheptel à l’échelle de l’État. Les résultats agrégés sont publiés dans l’explorateur de données.",
      actionPrimary: "Explorateur de données",
      actionSecondary: "Rapports et téléchargements"
    }
  },

  resources: {
    hero: {
      eyebrow: "Ressources",
      title: "Rapports, registres et jeux de données",
      description:
        "Le Ministère publie ses registres afin que les collectivités locales, les chercheurs et les partenaires au développement planifient à partir des mêmes données."
    },
    downloads: {
      eyebrow: "Téléchargements",
      title: "Registres publiés",
      description:
        "Les fichiers sont générés à partir des données courantes du Ministère au moment du téléchargement."
    },
    baseline: {
      title: "Données de référence pastorales par collectivité locale",
      description:
        "Ménages recensés et cheptel enregistré pour chacune des 25 collectivités locales.",
      updated: "Actualisé depuis le registre des ménages du Ministère"
    },
    schools: {
      title: "Registre des écoles nomades",
      description:
        "Chaque école du registre avec sa collectivité locale, ses effectifs par sexe, ses enseignants et son statut de viabilité.",
      updated:
        "{count, plural, one {# école recensée} other {# écoles recensées}}"
    },
    projects: {
      title: "Registre des projets",
      description:
        "Forages, salles de classe, centres laitiers, aménagements pastoraux et programmes de compétences enregistrés par le Ministère.",
      updated:
        "{count, plural, one {# projet recensé} other {# projets recensés}}"
    },
    sourceLive:
      "Registres des ménages, des écoles et des projets du Ministère",
    sourcePublished:
      "Données de référence pastorales publiées et registres du Ministère",
    sourceNote:
      "Source : {source}. Pour les données non publiées ici, écrivez au secrétariat du Ministère.",
    related: {
      eyebrow: "Informations connexes",
      title: "Explorer les données sources",
      dataLabel: "Explorateur de données",
      dataDescription:
        "Graphiques interactifs sur les ménages, le cheptel et la démographie, avec filtres par zone.",
      schoolsLabel: "Registre des écoles nomades",
      schoolsDescription:
        "Carte et tableau interrogeables de chaque école, avec effectifs et statut de viabilité.",
      newsLabel: "Communiqués et avis",
      newsDescription: "Déclarations officielles, annonces et avis d’événements."
    }
  },

  education: {
    hero: {
      eyebrow: "Programmes",
      title: "Éducation nomade",
      description:
        "Des écoles qui suivent les populations — évaluées, dotées d’enseignants et inscrites au registre public."
    },
    figures: {
      schools: "Écoles au registre",
      viable: "Évaluées viables",
      enrolment: "Élèves inscrits",
      teachers: "Enseignants affectés"
    },
    programme: {
      eyebrow: "Le programme",
      title:
        "Un enfant qui se déplace reste un enfant de l’État du Niger",
      paragraph1:
        "La Direction de l’Éducation Nomade évalue la viabilité de chaque école du registre : présence des enseignants, inscription des enfants, état de la salle de classe. Les résultats sont publiés afin que les partenaires voient précisément où un enseignant, une toiture ou un forage changera une vie.",
      paragraph2:
        "L’initiative Retour à l’école suit les troupeaux. Les équipes de mobilisation travaillent avec les Ardo et Wakili pour ramener à l’instruction les enfants en déplacement et inscrire les filles dans des écoles auxquelles leurs familles font confiance.",
      points: [
        "Évaluation de la viabilité et publication pour chaque école nomade",
        "Affectation des enseignants et matériel pédagogique",
        "Mobilisation Retour à l’école dans les zones de pâturage",
        "Réhabilitation des salles de classe avec les agences partenaires"
      ],
      ctaRegister: "Ouvrir le registre des écoles",
      ctaDepartment: "Voir la direction",
      classroomAlt: "Salle de classe d’une école nomade de l’État du Niger",
      pupilsAlt: "Élèves d’une école nomade"
    },
    band: {
      eyebrow: "Registre des écoles",
      title:
        "Rechercher une école nomade par nom, collectivité locale ou statut",
      description:
        "Les effectifs par sexe, les enseignants, l’état des salles de classe, l’équipement solaire et le forage sont publiés pour chaque école.",
      cta: "Ouvrir le registre"
    }
  },

  schools: {
    hero: {
      eyebrow: "Ressources",
      title: "Registre des écoles nomades",
      description:
        "Consultez le registre, filtrez par collectivité locale ou viabilité, et ouvrez une école pour son dossier complet."
    },
    filters: {
      searchLabel: "Rechercher par nom ou collectivité locale",
      searchPlaceholder: "Par exemple : école primaire nomade",
      lgaLabel: "Collectivité locale",
      statusLabel: "Statut de viabilité"
    },
    summary: {
      count: "{shown} écoles sur {total}",
      viable: "{count} viables",
      nonViable: "{count} non viables"
    },
    view: {
      label: "Mode d’affichage",
      map: "Carte",
      list: "Liste"
    },
    table: {
      caption: "Registre des écoles nomades de l’État du Niger",
      school: "École",
      lga: "Collectivité locale",
      enrolment: "Effectifs",
      status: "Statut",
      action: "Action",
      viewRecord: "Voir le dossier",
      empty: "Aucune école ne correspond aux filtres sélectionnés."
    },
    mapNote:
      "Les repères verts signalent les écoles évaluées viables ; les repères rouges, les écoles non viables. Données cartographiques © contributeurs d’OpenStreetMap.",
    popup: {
      enrolment: "Effectifs",
      teachers: "Enseignants",
      classrooms: "Salles de classe",
      solarBorehole: "Solaire · Forage",
      classroomsValue: "{good} en bon état / {bad} dégradées",
      bySex: "{male}H / {female}F",
      viewRecord: "Voir le dossier complet"
    },
    detail: {
      metaDescription:
        "{name}, collectivité locale de {lga} — effectifs, enseignants, état des salles de classe et statut de viabilité.",
      heroDescription:
        "Dossier publié par la Direction de l’Éducation Nomade.",
      viableNote:
        "Cette école satisfait aux critères de viabilité du Ministère.",
      nonViableNote:
        "Cette école a été évaluée non viable et fait l’objet d’une intervention programmée.",
      tableCaption: "Dossier scolaire",
      fields: {
        lga: "Collectivité locale",
        zone: "Zone sénatoriale",
        enrolmentTotal: "Effectif total",
        enrolmentBySex: "Effectifs par sexe",
        teachersTotal: "Enseignants affectés",
        teachersBySex: "Enseignants par sexe",
        classrooms: "Salles de classe",
        classroomCondition: "État des salles de classe",
        solar: "Énergie solaire",
        borehole: "Forage",
        ratio: "Ratio élèves-enseignant",
        coordinates: "Coordonnées"
      },
      classroomsTotal: "{count} au total",
      classroomsCondition: "{good} en bon état / {bad} à réhabiliter",
      installed: "Installée",
      notInstalled: "Non installée",
      present: "Présent",
      notPresent: "Absent",
      bySexLong: "{male} garçons / {female} filles",
      backToRegister: "Retour au registre",
      reportError: "Signaler une erreur dans ce dossier"
    }
  },

  peace: {
    hero: {
      eyebrow: "Programmes",
      title: "Paix et règlement des conflits",
      description:
        "Médiation entre communautés agricoles et pastorales, comités dans chaque collectivité locale et registre public des dossiers réglés."
    },
    dashboard: {
      eyebrow: "Règlement des conflits",
      title: "État des dossiers",
      description:
        "Les chiffres sont issus du registre de médiation du Ministère.",
      total: "Dossiers enregistrés",
      resolved: "Résolus",
      mediation: "En médiation",
      pending: "En attente d’instruction"
    },
    trend: {
      title: "Dossiers résolus par mois",
      description: "Position glissante sur douze mois du rôle de médiation.",
      series: "Dossiers résolus"
    },
    recent: {
      title: "Dossiers récemment résolus"
    },
    settlements: {
      title: "Règlements publiés"
    },
    committees: {
      eyebrow: "Structure des comités",
      title: "Les Comités des 30",
      description:
        "Chaque collectivité locale entretient un comité de représentants traditionnels, de femmes et de jeunes siégeant avec les voisins agriculteurs. La composition est publiée à mesure qu’elle est confirmée.",
      searchLabel: "Rechercher un comité",
      searchPlaceholder:
        "Rechercher par collectivité locale, membre ou fonction",
      memberCount:
        "{count, plural, =0 {aucun membre publié} one {# membre publié} other {# membres publiés}}",
      notPublished:
        "La composition du comité de {lga} n’est pas encore publiée. Contactez la Direction de la Paix et du Règlement des Conflits pour la liste actuelle.",
      contactVia: "Contacter par la Direction de la Paix"
    },
    roles: {
      ardo: "Ardo",
      wakili: "Wakili",
      chairman: "Président",
      viceChairman: "Vice-président",
      secretary: "Secrétaire",
      youthLeader: "Responsable des jeunes",
      womenLeader: "Responsable des femmes",
      treasurer: "Trésorier",
      pro: "Chargé des relations publiques",
      legalAdviser: "Conseiller juridique",
      member: "Membre"
    },
    committeeTypes: {
      thirtyMan: "Comité des 30",
      peace: "Comité de paix"
    },
    rallies: {
      eyebrow: "Unissons nos mains",
      title: "Rassemblements et initiatives pour la paix",
      description:
        "Les rassemblements suivent le travail sur dossier, et non l’inverse. Chaque place publique est précédée d’un règlement.",
      captions: [
        "Unissons nos mains — une déclaration publique de bon voisinage",
        "Autorité traditionnelle, jeunes et Comité des 30 sur une même place",
        "Des mains qui ont médié, puis se sont rassemblées",
        "Le rassemblement suit la piste à bétail, et pas seulement la route bitumée"
      ]
    },
    stories: [
      {
        title: "Corridor de Jebba — culture et bétail",
        body: "Un déplacement tardif de saison sèche a conduit un troupeau dans une rizière. Le Comité des 30 s’est réuni. Une indemnisation a été versée. La piste a été rebalisée. La saison suivante, les deux parties ont utilisé le même cours d’eau selon un horaire."
      },
      {
        title: "Allawa — de l’eau sans querelle",
        body: "Un cours d’eau saisonnier était devenu un titre de propriété. La médiation a instauré des heures d’abreuvement échelonnées. Un forage solaire a ensuite allégé la pression sur le cours d’eau."
      },
      {
        title: "Kontagora — une piste rouverte",
        body: "Une piste à bétail traditionnelle avait été clôturée pour la culture. La Direction de la Paix a parcouru le tracé avec agriculteurs et éleveurs. La clôture a été déplacée. Le champ est resté. Le bétail a conservé un passage légal."
      }
    ],
    timeline: [
      {
        title: "Naissance d’un ministère",
        body: "Le 16 août 2023, le Gouverneur Mohammed Umaru Bago a créé le premier Ministère des Affaires Nomades et Pastorales de l’État du Niger — afin que les éleveurs ne vivent plus hors de portée de l’État."
      },
      {
        title: "Comités des 30",
        body: "L’architecture de paix est implantée dans les 25 collectivités locales : Ardo, Wakili, responsables des femmes et des jeunes siègent avec leurs voisins agriculteurs avant qu’une rumeur ne devienne une attaque."
      },
      {
        title: "La justice avant les slogans",
        body: "Le Commissaire réaffirme le principe du Ministère : en l’absence de justice, n’attendez pas la paix. Les indemnisations sont annoncées publiquement."
      },
      {
        title: "Unissons nos mains",
        body: "Les rassemblements pour la paix parcourent les trois zones sénatoriales. Chaque place publique est précédée d’un travail sur dossier — une culture, une piste, un horaire d’abreuvement — puis la population prononce la même phrase : nous n’hériterons pas de cette querelle."
      }
    ],
    report: {
      eyebrow: "Service au citoyen",
      title: "Signaler un conflit pour médiation",
      description:
        "Les signalements sont reçus par la Direction de la Paix et du Règlement des Conflits et transmis au comité de la collectivité locale indiquée.",
      steps: [
        "Indiquez la collectivité locale et le lieu exact.",
        "Décrivez les faits et les personnes concernées.",
        "Fournissez un numéro de téléphone afin que le comité puisse vous joindre.",
        "Si des vies ou des biens sont en danger immédiat, contactez d’abord les forces de sécurité."
      ]
    }
  },

  data: {
    hero: {
      eyebrow: "Ressources",
      title: "Données et rapports",
      description:
        "Données de référence sur les ménages pastoraux et le cheptel, publiées afin que la politique publique s’appuie sur des faits."
    },
    explorer: {
      eyebrow: "Explorateur de données",
      title: "Données de référence pastorales",
      description:
        "Filtrez par zone sénatoriale pour consulter les ménages recensés, le cheptel enregistré et le profil démographique des chefs de ménage."
    },
    zone: {
      label: "Filtrer par zone sénatoriale",
      aria: "Zone sénatoriale",
      all: "Toutes les zones",
      named: "Zone {zone}"
    },
    totals: {
      households: "Ménages recensés",
      livestock: "Animaux enregistrés",
      cattle: "Bovins enregistrés"
    },
    sourceLive: "Registre des ménages du Ministère",
    sourcePublished: "Données de référence pastorales publiées",
    charts: {
      byLgaTitle: "Ménages et cheptel par collectivité locale",
      byLgaDescription:
        "Ménages recensés au regard du cheptel total enregistré.",
      ageTitle: "Répartition par âge",
      ageDescription: "Chefs de ménage par tranche d’âge.",
      genderTitle: "Sexe des chefs de ménage",
      settlementTitle: "Type d’établissement",
      herdTitle: "Bovins, ovins et caprins par collectivité locale",
      herdDescription: "Composition cumulée des troupeaux enregistrés.",
      compositionTitle: "Composition globale du cheptel",
      compositionDescription: "Part des animaux enregistrés par espèce.",
      households: "Ménages",
      livestock: "Cheptel",
      cattle: "Bovins",
      sheep: "Ovins",
      goats: "Caprins",
      other: "Autres",
      share: "Part",
      male: "Hommes",
      female: "Femmes",
      nomadic: "Nomade",
      semiNomadic: "Semi-nomade",
      settled: "Sédentaire"
    },
    downloads: {
      title: "Télécharger les rapports",
      description:
        "Les tableaux de référence sont publiés pour la planification locale, les institutions de recherche et les partenaires au développement. Les exports reflètent les filtres appliqués ci-dessus.",
      pdf: "Rapport de référence (PDF)",
      csv: "Tableur (CSV)",
      lgaTitle: "Rapports par collectivité locale",
      reportTitle:
        "Synthèse des données de référence pastorales par collectivité locale",
      indicator: "Indicateur",
      value: "Valeur",
      householdsEnumerated: "Ménages recensés",
      totalLivestock: "Cheptel total"
    }
  },

  projects: {
    hero: {
      eyebrow: "Programmes",
      title: "Projets et infrastructures",
      description:
        "Travaux enregistrés par le Ministère dans les 25 collectivités locales, avec le statut et l’impact de chaque projet."
    },
    counts: {
      completed: "Projets achevés au registre",
      ongoing: "Projets en cours au registre",
      planning: "Projets en préparation au registre"
    },
    register: {
      eyebrow: "Registre des projets",
      title: "Filtrer le registre",
      description:
        "Sélectionnez un type de projet, un statut de réalisation ou une collectivité locale."
    },
    filters: {
      typeLabel: "Type de projet",
      statusLabel: "Statut",
      lgaLabel: "Collectivité locale",
      showing:
        "Affichage de {count, plural, one {# projet} other {# projets}}",
      empty: "Aucun projet ne correspond aux filtres sélectionnés."
    },
    types: {
      all: "Tous",
      solarBorehole: "Forage solaire",
      schoolRenovation: "Réhabilitation d’école",
      peaceRally: "Rassemblement pour la paix",
      dairyCenter: "Centre laitier",
      ranch: "Ranch",
      skillAcquisition: "Acquisition de compétences",
      grazingReserve: "Réserve de pâturage"
    },
    card: {
      view: "Voir le projet"
    },
    detail: {
      descriptionTitle: "Description du projet",
      impactTitle: "Impact enregistré",
      timelineTitle: "Calendrier de réalisation",
      galleryTitle: "Galerie",
      galleryAlt: "{title} — image {index}",
      lga: "Collectivité locale",
      type: "Type de projet",
      budget: "Budget",
      commenced: "Démarrage",
      completed: "Achèvement",
      inProgress: "En cours",
      back: "Retour à tous les projets",
      othersEyebrow: "Également au registre",
      othersTitle: "Autres projets"
    }
  },

  gallery: {
    hero: {
      eyebrow: "Médias",
      title: "Galerie",
      description:
        "Un témoignage visuel de l’action du Ministère sur le terrain, classé par domaine de programme."
    },
    section: {
      eyebrow: "Photographies",
      title: "Parcourir par catégorie",
      description:
        "Sélectionnez une image pour la voir en grand format avec sa légende."
    },
    filterAria: "Filtrer la galerie par catégorie",
    categories: {
      all: "Toutes",
      schools: "Écoles",
      boreholes: "Forages",
      rallies: "Rassemblements pour la paix",
      community: "Visites communautaires",
      events: "Événements",
      victims: "Victimes de conflits",
      baseline: "Collecte des données de référence"
    },
    items: {
      "schools-1": {
        title: "Salle de classe nomade, à ciel ouvert",
        caption:
          "Les écoles nomades demeurent le pari le plus long du Ministère sur la paix : un enfant instruit n’hérite pas d’une rumeur."
      },
      "schools-2": {
        title: "Mobilisation « Retour à l’école »",
        caption:
          "Reprise des effectifs parmi les enfants qui se déplacent avec le troupeau."
      },
      "boreholes-1": {
        title: "Forage solaire et abreuvoir",
        caption:
          "Une eau qui n’oppose pas l’agriculteur à l’éleveur."
      },
      "boreholes-2": {
        title: "L’eau à la lisière des pâturages",
        caption:
          "Des installations solaires implantées d’après le recensement, non au hasard."
      },
      "rallies-1": {
        title: "Unissons nos mains",
        caption:
          "Une déclaration publique de bon voisinage, après le travail discret de médiation."
      },
      "rallies-2": {
        title: "Jeunesse et autorité traditionnelle",
        caption:
          "Le Comité des 30 se tient avec la place publique, non au-dessus d’elle."
      },
      "visits-1": {
        title: "Recensement au campement",
        caption:
          "Collecte des données de référence : un ménage, un troupeau, un point GPS."
      },
      "visits-2": {
        title: "À l’écoute dans les trois zones",
        caption:
          "Les tournées du Ministère suivent la piste à bétail, et pas seulement la route bitumée."
      },
      "events-1": {
        title: "Point d’information trimestriel, Minna",
        caption:
          "Reddition de comptes : ce qui a été enregistré, ce qui a été réglé, ce qui reste."
      },
      "victims-1": {
        title: "Réparer après la querelle",
        caption:
          "L’indemnisation est annoncée publiquement. La dignité est la première reconstruction."
      },
      "baseline-1": {
        title: "Le registre sur le terrain",
        caption:
          "Un État capable de compter sa population est capable de la servir."
      },
      "cattle-1": {
        title: "Troupeau aux premières lueurs",
        caption: "Un patrimoine qui doit désormais devenir une entreprise."
      }
    },
    video: {
      title: "Vidéo",
      description:
        "Les enregistrements de points de presse, de rassemblements et de cérémonies d’inauguration sont publiés sur la chaîne officielle du Ministère dès leur autorisation de diffusion.",
      items: {
        briefing:
          "Point trimestriel sur la performance du gouvernement — Minna"
      }
    },
    lightbox: {
      close: "Fermer l’image"
    }
  },

  news: {
    hero: {
      eyebrow: "Salle de presse",
      title: "Actualités et informations",
      description:
        "Déclarations officielles, annonces et avis publiés par le Ministère."
    },
    section: {
      eyebrow: "Publications",
      title: "Rechercher dans la salle de presse",
      description:
        "Filtrez par catégorie ou recherchez dans le texte intégral des publications."
    },
    searchLabel: "Rechercher une actualité",
    searchPlaceholder: "Rechercher actualités et annonces",
    filterAria: "Filtrer par catégorie",
    paginationAria: "Pagination des actualités",
    empty: "Aucun élément ne correspond à votre recherche.",
    categories: {
      all: "Toutes",
      pressReleases: "Communiqués de presse",
      announcements: "Annonces",
      events: "Événements"
    },
    detail: {
      itemDetails: "Détails de la publication",
      category: "Catégorie",
      datePublished: "Date de publication",
      issuedBy: "Émis par",
      issuingUnit: "Service de l’Information et du Protocole",
      allNews: "Toutes les actualités",
      share: "Partager",
      shareTwitter: "Partager sur X (Twitter)",
      shareFacebook: "Partager sur Facebook",
      permalink: "Lien permanent vers cette publication",
      relatedEyebrow: "Salle de presse",
      relatedTitle: "Publications liées",
      englishNotice:
        "Cette déclaration est publiée dans la langue dans laquelle le Ministère l’a diffusée."
    }
  },

  contact: {
    hero: {
      eyebrow: "Contact",
      title: "Contacter le Ministère",
      description:
        "Écrivez au secrétariat, utilisez le formulaire de demande ou contactez directement la direction concernée."
    },
    enquiries: {
      eyebrow: "Demandes",
      title: "Envoyer une demande",
      description:
        "Les demandes transmises par ce formulaire sont consignées au secrétariat du Ministère et attribuées à la direction compétente."
    },
    hq: {
      title: "Siège du Ministère",
      hours: "Du lundi au vendredi, 8h00 – 16h00",
      closed: "Fermé les jours fériés",
      phoneNote:
        "Les lignes téléphoniques sont attribuées par le secrétariat. Pour les questions de sécurité urgentes, contactez directement les forces de sécurité."
    },
    map: {
      title: "Carte de Minna, État du Niger",
      caption:
        "Minna, État du Niger. Données cartographiques © contributeurs d’OpenStreetMap."
    },
    channels: {
      title: "Canaux officiels"
    },
    directory: {
      eyebrow: "Annuaire",
      title: "Bureaux et directions",
      description: "Trouvez le bureau compétent pour votre demande.",
      searchLabel: "Rechercher dans l’annuaire",
      searchPlaceholder: "Rechercher par nom, fonction ou direction",
      caption: "Annuaire du personnel du Ministère",
      office: "Bureau",
      department: "Direction",
      email: "Courriel",
      empty: "Aucune entrée ne correspond à votre recherche.",
      phoneNote:
        "Les numéros de téléphone des agents sont communiqués par le secrétariat du Ministère à Minna."
    }
  },

  forms: {
    required: "Obligatoire",
    optional: "Facultatif",
    submit: "Envoyer",
    cancel: "Annuler",
    contact: {
      name: "Nom complet",
      email: "Adresse électronique",
      phone: "Téléphone",
      subject: "Objet",
      message: "Message",
      messageHint:
        "10 caractères minimum. N’indiquez pas de données personnelles sensibles.",
      submit: "Envoyer la demande",
      submitting: "Envoi…",
      success: "Votre demande a été reçue par le secrétariat du Ministère.",
      error:
        "Nous n’avons pas pu enregistrer votre message. Réessayez ou écrivez au Ministère par courriel."
    },
    conflict: {
      warning:
        "Ce formulaire sert à la médiation, non aux urgences. Si des vies ou des biens sont en danger immédiat, contactez d’abord les forces de sécurité.",
      lga: "Collectivité locale",
      location: "Lieu",
      locationPlaceholder: "Village, couloir de transhumance ou point d’eau",
      name: "Votre nom",
      phone: "Téléphone",
      email: "Adresse électronique",
      description: "Description du différend",
      descriptionPlaceholder:
        "Ce qui s’est passé, les personnes concernées, les dommages ou risques signalés.",
      descriptionHint: "20 caractères minimum.",
      submit: "Envoyer le signalement",
      submitting: "Envoi…",
      success:
        "Votre signalement a été enregistré et transmis à la Direction de la Paix et du Règlement des Conflits.",
      error:
        "Nous n’avons pas pu enregistrer ce signalement. Veuillez téléphoner à la Direction de la Paix."
    },
    errors: {
      generic: "Veuillez vérifier le formulaire et réessayer.",
      contactFailed:
        "Nous n’avons pas pu enregistrer votre message. Veuillez réessayer ou écrire au Ministère par courriel.",
      reportFailed:
        "Nous n’avons pas pu enregistrer ce signalement. Veuillez téléphoner à la Direction de la Paix.",
      field: {
        name: "Indiquez votre nom complet.",
        email: "Indiquez une adresse électronique valide.",
        phone: "Indiquez un numéro de téléphone valide.",
        subject: "Indiquez un objet de trois caractères au moins.",
        message: "Le message doit comporter au moins 10 caractères.",
        lgaName: "Sélectionnez une collectivité locale.",
        location: "Indiquez le lieu du différend.",
        description: "La description doit comporter au moins 20 caractères.",
        contactName: "Indiquez votre nom complet.",
        contactPhone:
          "Indiquez un numéro de téléphone afin que le comité puisse vous joindre.",
        contactEmail:
          "Indiquez une adresse électronique valide, ou laissez le champ vide."
      }
    }
  },

  footer: {
    description:
      "Créé le {date}, le Ministère sert les communautés nomades et pastorales des 25 collectivités locales de l’État du Niger par l’éducation, les infrastructures, le développement de l’élevage et la médiation des conflits.",
    ministryColumn: "Le Ministère",
    aboutMinistry: "À propos du Ministère",
    programmesColumn: "Programmes",
    resourcesColumn: "Ressources",
    downloads: "Téléchargements",
    newsUpdates: "Actualités",
    follow: "Suivre le Ministère",
    accessibility: "Accessibilité",
    privacy: "Confidentialité",
    rights: "Tous droits réservés."
  },

  errors: {
    notFound: {
      code: "Erreur 404",
      title: "La page demandée est introuvable",
      description:
        "L’adresse a peut-être changé ou la publication a été retirée. Utilisez les liens ci-dessous ou contactez le secrétariat du Ministère.",
      home: "Retour à l’accueil",
      contact: "Contacter le Ministère"
    },
    generic: {
      title: "Une erreur est survenue",
      description:
        "La page n’a pas pu être affichée. Veuillez réessayer dans un instant.",
      retry: "Réessayer"
    },
    loadingLabel: "Chargement du contenu de la page"
  },

  meta: {
    home: {
      title:
        "Ministère des Affaires Nomades et Pastorales — Gouvernement de l’État du Niger",
      description:
        "Site officiel du Ministère des Affaires Nomades et Pastorales, État du Niger. Éducation nomade, développement pastoral, consolidation de la paix, données publiques et services aux citoyens."
    },
    about: {
      title: "À propos du Ministère",
      description:
        "Historique, vision, mission, missions statutaires, structure organisationnelle et direction du Ministère des Affaires Nomades et Pastorales, État du Niger."
    },
    departments: {
      title: "Directions",
      description:
        "Les cinq directions du Ministère des Affaires Nomades et Pastorales, État du Niger, et les fonctions de chacune."
    },
    programmes: {
      title: "Programmes et services",
      description:
        "Programmes du Ministère des Affaires Nomades et Pastorales : éducation nomade, consolidation de la paix, infrastructures d’eau et de pâturage, développement de l’élevage et enregistrement des ménages."
    },
    resources: {
      title: "Ressources et téléchargements",
      description:
        "Rapports, registres et jeux de données publiés par le Ministère des Affaires Nomades et Pastorales, État du Niger, disponibles en PDF et en tableur."
    },
    education: {
      title: "Éducation nomade",
      description:
        "Le programme d’Éducation Nomade du Ministère des Affaires Nomades et Pastorales, État du Niger : viabilité des écoles, effectifs, enseignants et initiative Retour à l’école."
    },
    schools: {
      title: "Registre des écoles nomades",
      description:
        "Carte interactive et tableau interrogeable des écoles nomades de l’État du Niger, avec effectifs, enseignants, état des salles de classe et statut de viabilité."
    },
    peace: {
      title: "Paix et sécurité",
      description:
        "Tableau de bord du règlement des conflits, Comités des 30 dans les 25 collectivités locales, rassemblements pour la paix et formulaire de signalement d’un différend agriculteur-éleveur."
    },
    data: {
      title: "Données et rapports",
      description:
        "Données de référence pastorales de l’État du Niger : ménages, cheptel, démographie et type d’établissement, avec rapports téléchargeables par collectivité locale."
    },
    projects: {
      title: "Projets",
      description:
        "Forages solaires, réhabilitations d’écoles, centres laitiers, réserves de pâturage, rassemblements pour la paix et programmes de compétences réalisés par le Ministère des Affaires Nomades et Pastorales."
    },
    gallery: {
      title: "Galerie",
      description:
        "Photographies et vidéos de l’action du Ministère des Affaires Nomades et Pastorales : écoles, forages, rassemblements pour la paix, visites communautaires et événements."
    },
    contact: {
      title: "Contacter le Ministère",
      description:
        "Contacter le Ministère des Affaires Nomades et Pastorales, État du Niger : adresse du secrétariat, courriel, horaires, contacts des directions et formulaire de demande."
    },
    news: {
      title: "Actualités",
      description:
        "Communiqués de presse, annonces et avis d’événements du Ministère des Affaires Nomades et Pastorales, État du Niger."
    },
    notFound: {
      title: "Page introuvable"
    },
    ogAlt: "Communautés pastorales de l’État du Niger",
    heroTagline:
      "Au service des communautés nomades et pastorales des 25 collectivités locales de l’État du Niger."
  },

  records: {
    bios: {
      commissioner:
        "Commissaire pionnier. Défenseur public de la justice comme condition de la paix, et de l’entrée des éleveurs peuls, jusqu’alors hors de portée de l’État, dans le cercle du gouvernement.",
      permanentSecretary:
        "Ordonnateur du Ministère. Supervise les cinq directions et le fonctionnement quotidien de la politique publique.",
      directorAdministration:
        "Effectifs, archives et secrétariat du Commissaire.",
      directorPlanning:
        "Données de référence, programme de recherche et suivi des résultats.",
      directorEducation:
        "Viabilité des écoles, enseignants, et l’enfant qui ne doit pas rester derrière le troupeau.",
      directorPeace:
        "Dossier de médiation, Comités des 30 et rassemblements pour la paix.",
      directorFinance:
        "Crédits, marchés publics et magasins qui atteignent le terrain."
    },
    news: {
      "ministry-brings-herders-closer-to-government": {
        title:
          "Le Ministère veut ramener les éleveurs de la brousse dans le cercle du gouvernement",
        excerpt:
          "Monsieur le Commissaire, Alhaji Umar Ahmed Sanda Rabe, rappelle que la paix est impossible sans justice — et que la justice commence par l’appartenance.",
        body: [
          "Le Ministère des Affaires Nomades et Pastorales a été créé pour que les éleveurs peuls qui font paître leurs troupeaux dans les forêts et la brousse de l’État du Niger ne vivent plus hors de portée du gouvernement.",
          "S’exprimant à Minna, Monsieur le Commissaire, Alhaji Umar Ahmed Sanda Rabe, a déclaré que Son Excellence Mohammed Umaru Bago avait promis un gouvernement de tout le peuple du Niger — et non un gouvernement de faction. Le Ministère est cette promesse devenue institution.",
          "Quand on parle de paix, il faut parler de justice. En l’absence de paix, n’attendez pas la justice ; en l’absence de justice, n’attendez pas la paix.",
          "Le travail du Ministère est donc double : numériser l’identité et le cheptel pour que l’élevage devienne une activité licite et rentable ; et s’asseoir avec les voisins agriculteurs jusqu’à ce qu’un différend devienne un règlement."
        ]
      },
      "herder-identity-cards-and-livestock-register": {
        title:
          "Cartes d’identité des éleveurs et registre du cheptel à l’échelle de l’État",
        excerpt:
          "Avant qu’un troupeau ne soit élevé dans l’État du Niger, l’État doit le connaître — comme on connaît une entreprise, une maison ou un véhicule.",
        body: [
          "Le Commissaire a demandé que les pasteurs opérant dans l’État du Niger soient recensés, et que le cheptel soit inscrit dans un registre vivant.",
          "Les éleveurs venant des États voisins seront enregistrés. Un déplacement non déclaré sera traité avec la gravité réservée au vol de bétail — car un troupeau sans nom ne peut être protégé, taxé, vacciné ni réconcilié.",
          "Le registre n’est pas une punition. C’est ainsi qu’un enfant sur la piste de transhumance devient visible pour une école nomade, et qu’un forage est implanté là où l’eau est réellement nécessaire."
        ]
      },
      "join-hands-together-peace-rallies": {
        title:
          "Unissons nos mains : rassemblements pour la paix dans les trois zones",
        excerpt:
          "Chefs traditionnels, jeunes, dirigeantes et Comités des 30 se tiennent sur une même place et disent la même phrase : nous n’hériterons pas de cette querelle.",
        body: [
          "Les rassemblements pour la paix de la campagne Unissons nos mains ont parcouru les trois zones sénatoriales — de Bida à Kontagora, de Suleja à New Bussa.",
          "Ce n’est pas du théâtre. Chaque rassemblement est précédé d’un travail de dossier : une récolte endommagée, une piste clôturée, un tour d’eau rompu. Le Comité des 30 siège. L’indemnisation, lorsqu’elle est due, est nommée. Puis le peuple se rassemble.",
          "Le Ministère continuera de publier les affaires résolues. Le silence est le moyen par lequel une rumeur devient un raid."
        ]
      },
      "nomadic-schools-viability-drive": {
        title: "Maintenir les écoles nomades sur la carte — et en classe",
        excerpt:
          "Une école introuvable sur une carte ne peut pas être pourvue d’enseignants. L’évaluation de viabilité inscrit chaque classe nomade au registre public.",
        body: [
          "Des écoles nomades existent dans l’État du Niger. Certaines sont viables : enseignants présents, enfants inscrits, un toit qui tient. D’autres ne le sont pas.",
          "La Direction de l’éducation nomade publie désormais la viabilité, les effectifs par sexe et l’état des salles. Les partenaires peuvent voir où un enseignant, un forage ou un toit changera une vie.",
          "L’initiative Retour à l’école suit le troupeau. Un enfant qui se déplace reste un enfant de l’État du Niger."
        ]
      }
    },
    projects: {
      "solar-bida": {
        title: "Forage solaire — campement Etsu Musa",
        description:
          "Un forage solaire et un abreuvoir implantés à partir du recensement, pour que le troupeau et la ferme n’aient plus à se disputer le même cours d’eau.",
        impact:
          "Eau potable pour les ménages et le cheptel ; moins d’affluence en saison sèche à l’ancien cours d’eau.",
        timeline: [
          {
            title: "Implantation",
            body: "GPS issu du registre des ménages ; marche communautaire avec l’Ardo."
          },
          {
            title: "Forage",
            body: "Forage, champ solaire et abreuvoir installés."
          },
          {
            title: "Mise en service",
            body: "Remis à la communauté avec un calendrier d’abreuvement."
          }
        ]
      },
      "solar-kontagora": {
        title: "Groupe de forages solaires — Tungan Kawo",
        description:
          "Trois ouvrages solaires en lisière de pâturage de Kontagora, dans le cadre du programme de forages à l’échelle de l’État.",
        impact:
          "Sécurité hydrique pour les éleveurs et les communautés d’accueil du couloir de la zone C.",
        timeline: [
          {
            title: "Étude",
            body: "Implantation hydrogéologique avec Planification et Statistiques."
          },
          {
            title: "Travaux",
            body: "Deux forages productifs ; le troisième en cours de forage."
          }
        ]
      },
      "school-shiroro": {
        title: "Réhabilitation de classes — École primaire nomade, Shiroro",
        description:
          "Classes effondrées reconstruites pour que la carte de viabilité devienne un toit, un tableau et un enseignant qui reste.",
        impact:
          "Retour en session d’une école non viable ; reprise des effectifs dans l’arrière-pays de Kuta.",
        timeline: [
          {
            title: "Constat de viabilité",
            body: "Les inspecteurs ont relevé des toits ruinés et un registre silencieux."
          },
          {
            title: "Travaux",
            body: "Salles de classe, mobilier et demande de forage."
          }
        ]
      },
      "school-bida": {
        title: "Mise à niveau de l’école nomade — Bida",
        description:
          "Mobilier, éclairage solaire et forage à l’école primaire nomade de Bida — une école viable maintenue viable.",
        impact:
          "Enfants en classe ; enseignants retenus pendant la saison sèche.",
        timeline: [
          {
            title: "Attribution",
            body: "Travaux regroupés avec les homologues du SUBEB."
          },
          {
            title: "Remise",
            body: "Le Commissaire visite le bâtiment restauré."
          }
        ]
      },
      "dairy-mokwa": {
        title: "Centre de collecte laitière — Mokwa",
        description:
          "Collecte et refroidissement du lait pour que les ménages pastoraux vendent un produit, et non seulement un animal vivant à un prix de détresse.",
        impact:
          "Un marché licite pour le lait le long du couloir de Jebba ; les commerçantes en première ligne.",
        timeline: [
          {
            title: "Fondations",
            body: "Unité de refroidissement et quai de collecte."
          },
          {
            title: "Équipement",
            body: "Groupe électrogène, citernes et formation coopérative."
          }
        ]
      },
      "ranch-borgu": {
        title: "Réserve de pâturage et appui à l’élevage — Borgu",
        description:
          "Protection des pistes de transhumance et appui à l’élevage autour de Wawa — un patrimoine qui doit devenir une activité licite.",
        impact:
          "Moins de pression sur les cultures ; une réserve cartographiée que la génération suivante pourra hériter sans conflit.",
        timeline: [
          {
            title: "Délimitation",
            body: "Parcours de l’ancienne réserve avec les autorités traditionnelles."
          }
        ]
      },
      "rally-kontagora": {
        title: "Unissons nos mains — rassemblement pour la paix à Kontagora",
        description:
          "Chefs traditionnels, jeunes, dirigeantes et Comité des 30 sur une même place, après le travail privé de médiation.",
        impact:
          "Une déclaration publique de bon voisinage dans la zone C ; affaires résolues lues à haute voix.",
        timeline: [
          {
            title: "Dossiers",
            body: "Affaires en instance traitées avant que la place ne se remplisse."
          },
          {
            title: "Rassemblement",
            body: "Unissons nos mains proclamé à Kontagora."
          }
        ]
      },
      "skills-suleja": {
        title: "Acquisition de compétences pour les jeunes pasteurs — Suleja",
        description:
          "Travail du cuir, hygiène laitière, maintenance solaire et alphabétisation pour de jeunes éleveurs qui ne vivront pas seulement du bâton.",
        impact:
          "Cohortes formées à des métiers qui voyagent avec le ménage — et à des métiers qui permettent à un jeune de rester.",
        timeline: [
          {
            title: "Première cohorte",
            body: "Jeunes inscrits avec la Direction de l’éducation nomade."
          }
        ]
      },
      "solar-agwara": {
        title: "Forage solaire — localité de Rofia",
        description:
          "De l’eau à l’extrémité de la zone C, où la saison sèche vidait autrefois l’école et le campement.",
        impact:
          "Ménages qui restent pendant les mois secs ; enfants pouvant demeurer près d’une classe.",
        timeline: [
          {
            title: "Mobilisation",
            body: "Main-d’œuvre communautaire et magasins du Ministère."
          },
          {
            title: "Eau",
            body: "Premier débit célébré avec le Comité de paix."
          }
        ]
      }
    }
  }
};

export default fr;
