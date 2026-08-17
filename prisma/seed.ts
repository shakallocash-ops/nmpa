import {
  CommitteeRole,
  CommitteeType,
  ConflictStatus,
  Gender,
  InterviewStatus,
  LivestockType,
  PrismaClient,
  ProjectStatus,
  ProjectType,
  SchoolStatus,
  SettlementType,
  UserRole,
  Zone
} from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const lgas: Array<{ name: string; zone: Zone }> = [
  { name: "Agaie", zone: Zone.A },
  { name: "Bida", zone: Zone.A },
  { name: "Edati", zone: Zone.A },
  { name: "Gbako", zone: Zone.A },
  { name: "Katcha", zone: Zone.A },
  { name: "Lapai", zone: Zone.A },
  { name: "Lavun", zone: Zone.A },
  { name: "Mokwa", zone: Zone.A },
  { name: "Bosso", zone: Zone.B },
  { name: "Chanchaga", zone: Zone.B },
  { name: "Gurara", zone: Zone.B },
  { name: "Munya", zone: Zone.B },
  { name: "Paikoro", zone: Zone.B },
  { name: "Rafi", zone: Zone.B },
  { name: "Shiroro", zone: Zone.B },
  { name: "Suleja", zone: Zone.B },
  { name: "Tafa", zone: Zone.B },
  { name: "Agwara", zone: Zone.C },
  { name: "Borgu", zone: Zone.C },
  { name: "Kontagora", zone: Zone.C },
  { name: "Magama", zone: Zone.C },
  { name: "Mariga", zone: Zone.C },
  { name: "Mashegu", zone: Zone.C },
  { name: "Rijau", zone: Zone.C },
  { name: "Wushishi", zone: Zone.C }
];

async function main() {
  for (const lga of lgas) {
    await prisma.lGA.upsert({
      where: { name: lga.name },
      update: { zone: lga.zone },
      create: lga
    });
  }

  const email =
    process.env.SEED_ADMIN_EMAIL ??
    "admin@nomadicafairs.nigerstate.gov.ng";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "SecurePass123!";

  const admin = await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: {
      name: "System Administrator",
      role: UserRole.SUPER_ADMIN,
      isActive: true
    },
    create: {
      name: "System Administrator",
      email: email.toLowerCase(),
      passwordHash: await hash(password, 12),
      role: UserRole.SUPER_ADMIN,
      department: "ICT / Administration"
    }
  });

  try {
    await seedDemoRecords(admin.id);
  } catch (error) {
    console.warn("Demo records were not fully seeded:", error);
  }
}

async function seedDemoRecords(adminId: string) {
  const allLgas = await prisma.lGA.findMany({ orderBy: { name: "asc" } });
  const byName = Object.fromEntries(allLgas.map((lga) => [lga.name, lga]));

  if ((await prisma.nomadicSchool.count()) === 0) {
    await prisma.nomadicSchool.createMany({
      data: [
        {
          name: "Nomadic Primary School, Bida",
          lgaId: byName.Bida.id,
          location: "Etsu Musa grazing area, Bida",
          status: SchoolStatus.VIABLE,
          teacherCountMale: 6,
          teacherCountFemale: 4,
          studentEnrollmentMale: 148,
          studentEnrollmentFemale: 91,
          classroomGood: 6,
          classroomBad: 1,
          hasSolar: true,
          hasBorehole: true
        },
        {
          name: "Nomadic Primary School, Mokwa",
          lgaId: byName.Mokwa.id,
          location: "Jebba road corridor",
          status: SchoolStatus.VIABLE,
          teacherCountMale: 5,
          teacherCountFemale: 3,
          studentEnrollmentMale: 121,
          studentEnrollmentFemale: 77,
          classroomGood: 4,
          classroomBad: 2,
          hasSolar: true,
          hasBorehole: false
        },
        {
          name: "Nomadic Primary School, Shiroro",
          lgaId: byName.Shiroro.id,
          location: "Kuta hinterland",
          status: SchoolStatus.NON_VIABLE,
          teacherCountMale: 2,
          teacherCountFemale: 1,
          studentEnrollmentMale: 38,
          studentEnrollmentFemale: 19,
          classroomGood: 1,
          classroomBad: 4,
          hasSolar: false,
          hasBorehole: false
        },
        {
          name: "Nomadic Primary School, Kontagora",
          lgaId: byName.Kontagora.id,
          location: "Tungan Kawo",
          status: SchoolStatus.VIABLE,
          teacherCountMale: 7,
          teacherCountFemale: 5,
          studentEnrollmentMale: 166,
          studentEnrollmentFemale: 102,
          classroomGood: 7,
          classroomBad: 0,
          hasSolar: true,
          hasBorehole: true
        },
        {
          name: "Nomadic Primary School, Agwara",
          lgaId: byName.Agwara.id,
          location: "Rofia settlement",
          status: SchoolStatus.NON_VIABLE,
          teacherCountMale: 1,
          teacherCountFemale: 1,
          studentEnrollmentMale: 24,
          studentEnrollmentFemale: 11,
          classroomGood: 0,
          classroomBad: 3,
          hasSolar: false,
          hasBorehole: false
        },
        {
          name: "Nomadic Primary School, Paikoro",
          lgaId: byName.Paikoro.id,
          location: "Kaffin Koro",
          status: SchoolStatus.NOT_ASSESSED,
          teacherCountMale: 3,
          teacherCountFemale: 2,
          studentEnrollmentMale: 64,
          studentEnrollmentFemale: 41,
          classroomGood: 2,
          classroomBad: 2,
          hasSolar: false,
          hasBorehole: true
        }
      ]
    });
  }

  if ((await prisma.household.count()) === 0) {
    const samples = [
      {
        lga: "Bida",
        ward: "Bariki",
        communityName: "Etsu Musa camp",
        headName: "Ardo Usman Bello",
        gps: "9.0833, 6.0167",
        livestock: [
          { type: LivestockType.CATTLE, count: 86 },
          { type: LivestockType.SHEEP, count: 40 },
          { type: LivestockType.GOAT, count: 22 }
        ]
      },
      {
        lga: "Mokwa",
        ward: "Jebba",
        communityName: "Gbajibo",
        headName: "Hajiya Amina Sule",
        gps: "9.2833, 5.0500",
        livestock: [
          { type: LivestockType.CATTLE, count: 54 },
          { type: LivestockType.GOAT, count: 31 }
        ]
      },
      {
        lga: "Shiroro",
        ward: "Kuta",
        communityName: "Allawa",
        headName: "Alhaji Musa Ibrahim",
        gps: "10.1667, 6.7667",
        livestock: [
          { type: LivestockType.CATTLE, count: 120 },
          { type: LivestockType.SHEEP, count: 65 },
          { type: LivestockType.CAMEL, count: 4 }
        ]
      },
      {
        lga: "Kontagora",
        ward: "Tungan Kawo",
        communityName: "Maje",
        headName: "Wakili Abdullahi Garba",
        gps: "10.4000, 5.4667",
        livestock: [
          { type: LivestockType.CATTLE, count: 97 },
          { type: LivestockType.SHEEP, count: 50 },
          { type: LivestockType.CHICKEN, count: 80 }
        ]
      },
      {
        lga: "Borgu",
        ward: "New Bussa",
        communityName: "Wawa",
        headName: "Ardo Sani Mohammed",
        gps: "9.8833, 4.5167",
        livestock: [
          { type: LivestockType.CATTLE, count: 140 },
          { type: LivestockType.GOAT, count: 44 }
        ]
      },
      {
        lga: "Lapai",
        ward: "Gulu",
        communityName: "Gulu camp",
        headName: "Mallam Yusuf Tanko",
        gps: "9.0500, 6.5667",
        livestock: [
          { type: LivestockType.CATTLE, count: 41 },
          { type: LivestockType.SHEEP, count: 18 }
        ]
      }
    ];

    for (const sample of samples) {
      await prisma.household.create({
        data: {
          lgaId: byName[sample.lga].id,
          ward: sample.ward,
          communityName: sample.communityName,
          headName: sample.headName,
          headAge: 47,
          headGender: Gender.MALE,
          phone: "08012345678",
          gpsCoordinates: sample.gps,
          settlementType: SettlementType.NOMADIC,
          interviewStatus: InterviewStatus.COMPLETED,
          enumeratorId: adminId,
          livestock: { create: sample.livestock }
        }
      });
    }
  }

  if ((await prisma.conflictCase.count()) === 0) {
    const now = new Date();
    await prisma.conflictCase.createMany({
      data: [
        {
          title: "Crop damage along Jebba corridor",
          description: "Cattle strayed into rice farms during late dry-season movement.",
          lgaId: byName.Mokwa.id,
          location: "Jebba-Gbajibo axis",
          dateReported: new Date(now.getFullYear(), now.getMonth() - 5, 8),
          status: ConflictStatus.RESOLVED,
          resolutionDetails: "Joint mediation with 30-man committee; compensation paid to farmers.",
          compensationAmount: 850000,
          partiesInvolved: [
            { name: "Gbajibo farmers association", type: "Farming community", phone: "08011112222" },
            { name: "Ardo Usman group", type: "Pastoralist group", phone: "08033334444" }
          ],
          resolvedById: adminId,
          resolvedAt: new Date(now.getFullYear(), now.getMonth() - 4, 18)
        },
        {
          title: "Water-point dispute in Shiroro",
          description: "Competing access to a seasonal stream near Allawa.",
          lgaId: byName.Shiroro.id,
          location: "Allawa",
          dateReported: new Date(now.getFullYear(), now.getMonth() - 3, 12),
          status: ConflictStatus.RESOLVED,
          resolutionDetails: "Staggered watering timetable agreed.",
          compensationAmount: 0,
          partiesInvolved: [
            { name: "Allawa community", type: "Host community", phone: "08055556666" },
            { name: "Kuta herders", type: "Pastoralist group", phone: "08077778888" }
          ],
          resolvedById: adminId,
          resolvedAt: new Date(now.getFullYear(), now.getMonth() - 2, 4)
        },
        {
          title: "Market access incident in Bida",
          description: "Dispute over livestock market levies.",
          lgaId: byName.Bida.id,
          location: "Bida central market",
          dateReported: new Date(now.getFullYear(), now.getMonth() - 1, 6),
          status: ConflictStatus.IN_MEDIATION,
          partiesInvolved: [
            { name: "Market union", type: "Trader group", phone: "08012121212" },
            { name: "Pastoral traders", type: "Pastoralist group", phone: "08034343434" }
          ]
        },
        {
          title: "Grazing route blockage in Kontagora",
          description: "Traditional route fenced for dry-season farming.",
          lgaId: byName.Kontagora.id,
          location: "Tungan Kawo",
          dateReported: new Date(now.getFullYear(), now.getMonth(), 3),
          status: ConflictStatus.PENDING,
          partiesInvolved: [
            { name: "Tungan Kawo farmers", type: "Farming community", phone: "08090909090" },
            { name: "Maje camp", type: "Pastoralist group", phone: "08080808080" }
          ]
        },
        {
          title: "Escalated clash near New Bussa",
          description: "Night-time cattle rustling allegation referred to security agencies.",
          lgaId: byName.Borgu.id,
          location: "Wawa",
          dateReported: new Date(now.getFullYear(), now.getMonth() - 1, 21),
          status: ConflictStatus.ESCALATED,
          partiesInvolved: [
            { name: "Wawa vigilante", type: "Community security", phone: "08065656565" },
            { name: "Ardo Sani camp", type: "Pastoralist group", phone: "08045454545" }
          ]
        }
      ]
    });
  }

  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "Solar borehole — Etsu Musa camp",
          description: "Solar-powered borehole and cattle trough for Bida grazing area.",
          lgaId: byName.Bida.id,
          type: ProjectType.SOLAR_BOREHOLE,
          budget: 28000000,
          status: ProjectStatus.ONGOING,
          startDate: new Date(new Date().getFullYear(), 0, 15),
          endDate: new Date(new Date().getFullYear(), 8, 30)
        },
        {
          title: "Classroom rehabilitation — Shiroro",
          description: "Rebuild four collapsed classrooms at Nomadic Primary School, Shiroro.",
          lgaId: byName.Shiroro.id,
          type: ProjectType.SCHOOL_RENOVATION,
          budget: 19500000,
          status: ProjectStatus.PLANNING
        },
        {
          title: "Peace rally — Kontagora",
          description: "Inter-community peace and reconciliation rally with traditional rulers.",
          lgaId: byName.Kontagora.id,
          type: ProjectType.PEACE_RALLY,
          budget: 4500000,
          status: ProjectStatus.COMPLETED,
          startDate: new Date(new Date().getFullYear(), 2, 1),
          endDate: new Date(new Date().getFullYear(), 2, 12)
        },
        {
          title: "Dairy collection centre — Mokwa",
          description: "Milk collection and cooling centre for pastoral households.",
          lgaId: byName.Mokwa.id,
          type: ProjectType.DAIRY_CENTER,
          budget: 41000000,
          status: ProjectStatus.ONGOING,
          startDate: new Date(new Date().getFullYear(), 1, 10),
          endDate: new Date(new Date().getFullYear(), 10, 20)
        }
      ]
    });
  }

  if ((await prisma.committeeMember.count()) === 0) {
    await prisma.committeeMember.createMany({
      data: [
        {
          name: "Ardo Usman Bello",
          phone: "08012345678",
          lgaId: byName.Bida.id,
          role: CommitteeRole.ARDO,
          committeeType: CommitteeType.THIRTY_MAN
        },
        {
          name: "Hajiya Fatima Lawal",
          phone: "08022223333",
          lgaId: byName.Bida.id,
          role: CommitteeRole.WOMEN_LEADER,
          committeeType: CommitteeType.THIRTY_MAN
        },
        {
          name: "Alhaji Ibrahim Sani",
          phone: "08044445555",
          lgaId: byName.Kontagora.id,
          role: CommitteeRole.CHAIRMAN,
          committeeType: CommitteeType.PEACE
        },
        {
          name: "Mallam Yusuf Tanko",
          phone: "08066667777",
          lgaId: byName.Lapai.id,
          role: CommitteeRole.SECRETARY,
          committeeType: CommitteeType.THIRTY_MAN
        },
        {
          name: "Wakili Abdullahi Garba",
          phone: "08088889999",
          lgaId: byName.Mokwa.id,
          role: CommitteeRole.WAKILI,
          committeeType: CommitteeType.PEACE
        },
        {
          name: "Sani Mohammed",
          phone: "08010101010",
          lgaId: byName.Borgu.id,
          role: CommitteeRole.YOUTH_LEADER,
          committeeType: CommitteeType.THIRTY_MAN
        }
      ]
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
