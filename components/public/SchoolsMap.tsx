"use client";

import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslations } from "next-intl";
import { NIGER_CENTER } from "@/lib/geo/niger-lgas";
import type { DirectorySchool } from "@/lib/content/schools-directory";
import { StatusBadge } from "@/components/public/StatusBadge";
import { Link } from "@/i18n/navigation";

export function SchoolsMap({ schools }: { schools: DirectorySchool[] }) {
  const t = useTranslations("schools.popup");
  const common = useTranslations("common");

  return (
    <div className="h-[min(70vh,640px)] w-full">
      <MapContainer
        center={NIGER_CENTER}
        zoom={7}
        scrollWheelZoom
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {schools.map((school) => {
          const viable = school.status === "VIABLE";
          return (
            <CircleMarker
              key={school.id}
              center={[school.lat, school.lng]}
              radius={6}
              pathOptions={{
                color: "#FFFFFF",
                weight: 1.5,
                fillColor: viable ? "#2D6A4F" : "#C0392B",
                fillOpacity: 0.95
              }}
            >
              <Popup>
                <div className="min-w-[230px]">
                  <p className="font-serif text-[15px] font-bold text-primary">
                    {school.name}
                  </p>
                  <p className="mt-1 text-caption tracking-normal text-ink-faint">
                    {school.lga} {common("lgaShort")} · {common("zone")}{" "}
                    {school.zone}
                  </p>
                  <div className="mt-2">
                    <StatusBadge status={school.status} />
                  </div>
                  <dl className="mt-3 space-y-1 text-[13px] text-ink-muted">
                    <div className="flex justify-between gap-4">
                      <dt>{t("enrolment")}</dt>
                      <dd className="font-medium text-ink">
                        {t("bySex", {
                          male: school.enrolmentMale,
                          female: school.enrolmentFemale
                        })}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>{t("teachers")}</dt>
                      <dd className="font-medium text-ink">
                        {t("bySex", {
                          male: school.teachersMale,
                          female: school.teachersFemale
                        })}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>{t("classrooms")}</dt>
                      <dd className="font-medium text-ink">
                        {t("classroomsValue", {
                          good: school.classroomsGood,
                          bad: school.classroomsBad
                        })}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>{t("solarBorehole")}</dt>
                      <dd className="font-medium text-ink">
                        {school.hasSolar ? common("yes") : common("no")} ·{" "}
                        {school.hasBorehole ? common("yes") : common("no")}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href={`/education/schools/${school.id}`}
                    className="mt-3 inline-block text-[13px] font-semibold text-secondary"
                  >
                    {t("viewRecord")} →
                  </Link>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
