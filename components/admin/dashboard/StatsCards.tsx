"use client";

import {
  FolderKanban,
  GraduationCap,
  MapPinned,
  Scale,
  Users,
  Wheat
} from "lucide-react";
import { AnimatedCounter } from "@/components/admin/dashboard/AnimatedCounter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const cards = [
  { key: "totalLGAs", label: "Total LGAs", icon: MapPinned, suffix: "" },
  { key: "totalSchools", label: "Nomadic Schools", icon: GraduationCap, suffix: "" },
  {
    key: "totalHouseholds",
    label: "Households Documented",
    icon: Users,
    suffix: "+"
  },
  {
    key: "totalLivestock",
    label: "Livestock Recorded",
    icon: Wheat,
    suffix: "+"
  },
  {
    key: "conflictsResolved",
    label: "Conflicts Resolved",
    icon: Scale,
    suffix: "+"
  },
  {
    key: "activeProjects",
    label: "Active Projects",
    icon: FolderKanban,
    suffix: ""
  }
] as const;

export function StatsCards({
  stats
}: {
  stats: {
    totalLGAs: number;
    totalSchools: number;
    totalHouseholds: number;
    totalLivestock: number;
    conflictsResolved: number;
    activeProjects: number;
  };
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/70">
                {card.label}
              </CardTitle>
              <Icon className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                <AnimatedCounter value={stats[card.key]} suffix={card.suffix} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
