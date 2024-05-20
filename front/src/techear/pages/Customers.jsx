import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Customers = () => {
  // بيانات وهمية
  const data = [
    { date: "2024-04-01", visitors: 150, enrollments: 20 },
    { date: "2024-04-02", visitors: 200, enrollments: 25 },
    { date: "2024-04-03", visitors: 180, enrollments: 30 },
    { date: "2024-04-04", visitors: 220, enrollments: 35 },
    { date: "2024-04-05", visitors: 250, enrollments: 40 },
    { date: "2024-04-06", visitors: 280, enrollments: 45 },
    { date: "2024-04-07", visitors: 300, enrollments: 50 },
  ];

  return (
    <div className="dashboard">
      <h3 style={{ alignItems: "center", marginLeft: "430px", color: "gray" }}>
        إحصائيات الموقع
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="enrollments" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Customers;
