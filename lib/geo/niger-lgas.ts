export type ZoneCode = "A" | "B" | "C";

export type LgaGeo = {
  name: string;
  zone: ZoneCode;
  lat: number;
  lng: number;
};

export const NIGER_LGAS: LgaGeo[] = [
  { name: "Agaie", zone: "A", lat: 9.0167, lng: 6.3167 },
  { name: "Bida", zone: "A", lat: 9.0833, lng: 6.0167 },
  { name: "Edati", zone: "A", lat: 9.05, lng: 5.95 },
  { name: "Gbako", zone: "A", lat: 9.23, lng: 6.13 },
  { name: "Katcha", zone: "A", lat: 8.95, lng: 6.32 },
  { name: "Lapai", zone: "A", lat: 9.044, lng: 6.571 },
  { name: "Lavun", zone: "A", lat: 9.37, lng: 5.78 },
  { name: "Mokwa", zone: "A", lat: 9.292, lng: 5.054 },
  { name: "Bosso", zone: "B", lat: 9.65, lng: 6.53 },
  { name: "Chanchaga", zone: "B", lat: 9.613, lng: 6.556 },
  { name: "Gurara", zone: "B", lat: 9.35, lng: 7.15 },
  { name: "Munya", zone: "B", lat: 9.85, lng: 6.85 },
  { name: "Paikoro", zone: "B", lat: 9.43, lng: 6.64 },
  { name: "Rafi", zone: "B", lat: 10.03, lng: 6.25 },
  { name: "Shiroro", zone: "B", lat: 10.155, lng: 6.773 },
  { name: "Suleja", zone: "B", lat: 9.181, lng: 7.179 },
  { name: "Tafa", zone: "B", lat: 9.25, lng: 7.25 },
  { name: "Agwara", zone: "C", lat: 10.7, lng: 4.58 },
  { name: "Borgu", zone: "C", lat: 9.883, lng: 4.517 },
  { name: "Kontagora", zone: "C", lat: 10.403, lng: 5.471 },
  { name: "Magama", zone: "C", lat: 10.05, lng: 5.32 },
  { name: "Mariga", zone: "C", lat: 10.52, lng: 5.92 },
  { name: "Mashegu", zone: "C", lat: 9.97, lng: 5.73 },
  { name: "Rijau", zone: "C", lat: 11.1, lng: 5.27 },
  { name: "Wushishi", zone: "C", lat: 9.73, lng: 6.07 }
];

export const NIGER_CENTER: [number, number] = [9.6, 6.55];
