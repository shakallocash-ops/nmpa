import { NIGER_LGAS } from "@/lib/geo/niger-lgas";

export type DirectorySchool = {
  id: string;
  name: string;
  lga: string;
  zone: "A" | "B" | "C";
  lat: number;
  lng: number;
  status: "VIABLE" | "NON_VIABLE";
  enrolmentMale: number;
  enrolmentFemale: number;
  teachersMale: number;
  teachersFemale: number;
  classroomsGood: number;
  classroomsBad: number;
  hasSolar: boolean;
  hasBorehole: boolean;
};

const hamlets = [
  "Etsu Musa",
  "Tungan Kawo",
  "Gbajibo",
  "Allawa",
  "Kuta",
  "Wawa",
  "Rofia",
  "Kaffin Koro",
  "Maje",
  "Gulu",
  "Jebba Road",
  "Kwakuti",
  "Sarkin Pawa",
  "Tegina",
  "Bangi"
];

function jitter(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

export function buildSchoolDirectory(): DirectorySchool[] {
  const schools: DirectorySchool[] = [];
  let index = 0;
  for (const lga of NIGER_LGAS) {
    for (let n = 1; n <= 11; n += 1) {
      index += 1;
      const seed = index * 17 + lga.name.length * 3;
      const hamlet = hamlets[(index + lga.name.length) % hamlets.length];
      const viable = seed % 10 > 2;
      const offsetLat = (jitter(seed) - 0.5) * 0.18;
      const offsetLng = (jitter(seed + 7) - 0.5) * 0.18;
      schools.push({
        id: `nps-${index.toString().padStart(3, "0")}`,
        name:
          n === 1
            ? `Nomadic Primary School, ${lga.name}`
            : `Nomadic Primary School, ${hamlet} (${lga.name})`,
        lga: lga.name,
        zone: lga.zone,
        lat: lga.lat + offsetLat,
        lng: lga.lng + offsetLng,
        status: viable ? "VIABLE" : "NON_VIABLE",
        enrolmentMale: 40 + (seed % 140),
        enrolmentFemale: 22 + (seed % 95),
        teachersMale: 1 + (seed % 7),
        teachersFemale: seed % 6,
        classroomsGood: viable ? 2 + (seed % 6) : seed % 2,
        classroomsBad: viable ? seed % 3 : 2 + (seed % 4),
        hasSolar: viable && seed % 3 !== 0,
        hasBorehole: viable && seed % 2 === 0
      });
    }
  }
  return schools;
}

export const SCHOOL_DIRECTORY = buildSchoolDirectory();
