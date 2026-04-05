import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

export default function Charts() {
  const { transactions } = useContext(AppContext);

  const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ef4444"];

  // ✅ Detect screen size
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let balance = 0;

  const lineData = [...transactions]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((t) => {
      balance += t.type === "income" ? t.amount : -t.amount;
      return { date: t.date, balance };
    });

  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      if (t.type === "expense") {
        acc[t.category] = acc[t.category] || {
          name: t.category,
          value: 0
        };
        acc[t.category].value += t.amount;
      }
      return acc;
    }, {})
  );

  return (
    <div className="charts">

      {/* LINE CHART */}
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={lineData}
            margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
          >
            <XAxis
              dataKey="date"
              tick={{ fontSize: isMobile ? 8 : 10 }}
              interval={0}
              angle={isMobile ? -25 : -35}
              textAnchor="end"
              minTickGap={20}
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short"
                })
              }
            />
            <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={isMobile ? false : 2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* DONUT CHART */}
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              innerRadius={isMobile ? "50%" : "40%"}
              outerRadius={isMobile ? "70%" : "80%"}
              labelLine={!isMobile}
              label={(props) => {
                const {
                  cx,
                  cy,
                  midAngle,
                  outerRadius,
                  percent,
                  name,
                  index
                } = props;

                const RADIAN = Math.PI / 180;

                // ✅ Responsive label distance
                const radius = isMobile
                  ? outerRadius + 10
                  : outerRadius + 25;

                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                const color = COLORS[index % COLORS.length];

                // ✅ Hide small labels on mobile
                if (isMobile && percent < 0.08) return null;

                return (
                  <text
                    x={x}
                    y={y}
                    fill={color}
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={isMobile ? 10 : 14}
                    fontWeight="bold"
                  >
                    {isMobile
                      ? `${(percent * 100).toFixed(0)}%`
                      : `${name} ${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>

            {/* ✅ Center text (optional) */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={isMobile ? 12 : 16}
              fontWeight="bold"
              fill="#fff"
            >
              Expenses
            </text>

          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}