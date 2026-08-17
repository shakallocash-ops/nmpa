"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tooltipStyle = {
  backgroundColor: "#12293F",
  border: "1px solid rgba(201,168,76,0.3)",
  borderRadius: 8,
  color: "#f8f5ee"
};

export function DashboardCharts({
  livestockByLga,
  schoolViability,
  conflictsByMonth
}: {
  livestockByLga: Array<{ lga: string; count: number }>;
  schoolViability: Array<{ name: string; value: number; fill: string }>;
  conflictsByMonth: Array<{ month: string; resolved: number }>;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Livestock distribution by LGA</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          {livestockByLga.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={livestockByLga}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="lga" stroke="#94a3b8" tick={{ fontSize: 11 }} interval={0} angle={-30} textAnchor="end" height={70} />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="count" fill="#C6A15B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart message="Add household livestock records to populate this chart." />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>School viability</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          {schoolViability.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={schoolViability}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  label
                >
                  {schoolViability.map((slice) => (
                    <Cell key={slice.name} fill={slice.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart message="Add nomadic schools to populate this chart." />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conflicts resolved over time</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conflictsByMonth}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94a3b8" allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="#C6A15B"
                strokeWidth={3}
                dot={{ fill: "#C6A15B" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="flex h-full items-center justify-center text-sm text-white/50">
      {message}
    </div>
  );
}
