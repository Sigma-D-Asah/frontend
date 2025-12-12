import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";

import { IChartData } from "@/services/mock-data";

// Menerima data dari Parent Component
interface SensorChartProps {
  data: IChartData[];
  color?: string;
}

export default function SensorChart({
  data,
  color = "#4F46E5",
}: SensorChartProps) {
  return (
    <div className="w-full h-[300px] font-sans">
      <ResponsiveContainer height="100%" width="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#E5E7EB"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            axisLine={false}
            dataKey="time"
            dy={10}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            domain={[0, 1.2]}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />

          <ReferenceLine
            label={{
              value: "Danger Threshold (0.8g)",
              fill: "#EF4444",
              fontSize: 12,
              position: "insideTopRight",
            }}
            stroke="#EF4444"
            strokeDasharray="3 3"
            y={0.8}
          />

          <defs>
            <linearGradient id="colorValue" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <Area
            dataKey="value"
            fill="url(#colorValue)"
            stroke="none"
            type="monotone"
          />

          <Line
            activeDot={{ r: 6 }}
            animationDuration={500} // Percepat animasi saat ganti data agar transisi mulus
            dataKey="value"
            dot={{ r: 4, fill: color, strokeWidth: 2, stroke: "#fff" }}
            stroke={color}
            strokeWidth={3}
            type="monotone"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
