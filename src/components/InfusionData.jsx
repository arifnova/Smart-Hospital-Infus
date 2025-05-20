import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../../firebase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const InfusionData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataRef = ref(database, "infusdata/");
    onValue(dataRef, (snapshot) => {
      const val = snapshot.val();
      console.log("Data dari Firebase:", val); // menampilkan data di console log
      if (val) {
        const list = Object.entries(val)
          .map(([id, entry]) => ({
            id,
            ...entry,
            timeLabel: new Date(entry.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }))
          .sort((a, b) => a.timestamp - b.timestamp);
        setData(list);
      }
    });
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-6xl mx-auto mt-10">
      {/* Patient info */}
      <div className="overflow-x-auto">
        <div className="flex md:grid md:grid-cols-3 gap-4 mb-6 min-w-[600px] md:min-w-0">
          <div className="bg-gray-200 rounded-lg p-3 w-48 flex-shrink-0 text-center text-sm">
            <h2 className="font-medium">Nama Pasien</h2>
            <p className="font-semibold text-base">Lebron James</p>
          </div>
          <div className="bg-gray-200 rounded-lg p-3 w-48 flex-shrink-0 text-center text-sm">
            <h2 className="font-medium">Tanggal Masuk</h2>
            <p className="font-semibold text-base">16 April 2025</p>
          </div>
          <div className="bg-gray-200 rounded-lg p-3 w-48 flex-shrink-0 text-center text-sm">
            <h2 className="font-medium">Diagnosis</h2>
            <p className="font-semibold text-base">Cancer</p>
          </div>
        </div>
      </div>
      {/* Data Realtime */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Berat Infus Real-Time</h2>
          <table className="w-full text-left border text-sm">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2 border">Tanggal</th>
                <th className="p-2 border">Waktu</th>
                <th className="p-2 border">Volume</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => {
                const date = new Date(entry.timestamp);
                return (
                  <tr key={entry.id}>
                    <td className="p-2 border">{date.toLocaleDateString()}</td>
                    <td className="p-2 border">{entry.timeLabel}</td>
                    <td className="p-2 border">{entry.volume} ml</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Grafik Konsumsi Infus */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-center">
            Grafik Konsumsi Infus
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeLabel" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InfusionData;
