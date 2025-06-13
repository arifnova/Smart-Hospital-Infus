import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../../firebase";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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
  const [infusCount, setInfusCount] = useState(0);
  const [latestKantong, setLatestKantong] = useState("");
  const [latestTanggal, setLatestTanggal] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    const dataRef = ref(database, "DATA_SENSOR/");
    onValue(dataRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const allDatesSet = new Set();
        let latestKantongKey = "";
        let latestTanggalKey = "";

        const allData = [];

        Object.entries(val).forEach(([kantong, tanggalObj]) => {
          Object.entries(tanggalObj).forEach(([tanggal, timeObj]) => {
            allDatesSet.add(tanggal);
            Object.entries(timeObj).forEach(([time, { BERAT }]) => {
              allData.push({
                kantong,
                date: tanggal,
                time,
                volume: BERAT,
                timestamp: new Date(`${tanggal}T${time}`).getTime(),
              });
            });
          });
        });

        // Tentukan kantong dan tanggal terakhir untuk ditampilkan di bagian atas
        const latestEntry = allData.sort(
          (a, b) => b.timestamp - a.timestamp
        )[0];
        if (latestEntry) {
          latestKantongKey = latestEntry.kantong;
          latestTanggalKey = latestEntry.date;
        }

        setInfusCount(Object.keys(val).length);
        setLatestKantong(latestKantongKey);
        setLatestTanggal(latestTanggalKey);
        setData(
          allData
            .filter((entry) => entry.date === latestTanggalKey)
            .sort((a, b) => a.timestamp - b.timestamp)
        );
        setAvailableDates(Array.from(allDatesSet).sort());
      }
    });
  }, []);

  const handleDateChange = (e) => {
  const date = e.target.value;
  setSelectedDate(date);

  const dateRef = ref(database, "DATA_SENSOR/");
  onValue(dateRef, (snapshot) => {
    const val = snapshot.val();
    const entries = [];

    if (val) {
      Object.entries(val).forEach(([kantong, tanggalData]) => {
        const jamData = tanggalData[date];
        if (jamData) {
          Object.entries(jamData).forEach(([time, { BERAT }]) => {
            entries.push({
              kantong,
              date,
              time,
              volume: BERAT,
              timestamp: new Date(`${date}T${time}`).getTime(),
            });
          });
        }
      });
    }

    setSelectedData(entries.sort((a, b) => a.timestamp - b.timestamp));
  });
};


  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Data Infus - ${selectedDate}`, 14, 16);
    const rows = selectedData.map((entry) => [
      entry.kantong,
      entry.date,
      entry.time,
      `${entry.volume} gram`,
    ]);
    doc.autoTable({
      head: [["Kantong", "Tanggal", "Waktu", "Berat"]],
      body: rows,
      startY: 20,
    });
    doc.save(`infus_${selectedDate}.pdf`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-6xl mx-auto mt-10">
      {/* Info Pasien */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 min-w-[600px] md:min-w-0">
          <div className="bg-gray-200 rounded-lg p-3 text-center text-sm">
            <h2 className="font-medium">Nama Pasien</h2>
            <p className="font-semibold text-base">Lebron James</p>
          </div>
          <div className="bg-gray-200 rounded-lg p-3 text-center text-sm">
            <h2 className="font-medium">Tanggal Masuk</h2>
            <p className="font-semibold text-base">16 April 2025</p>
          </div>
          <div className="bg-gray-200 rounded-lg p-3 text-center text-sm">
            <h2 className="font-medium">Diagnosis</h2>
            <p className="font-semibold text-base">Cancer</p>
          </div>
          <div className="bg-gray-200 rounded-lg p-3 text-center text-sm">
            <h2 className="font-medium">Jumlah Kantong Infus</h2>
            <p className="font-semibold text-base">{infusCount}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-2">
          Menampilkan data dari <b>{latestKantong}</b> pada{" "}
          <b>{latestTanggal}</b>
        </div>
      </div>

      {/* Data Realtime */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="overflow-auto max-h-[400px] border rounded-md">
          <h2 className="text-lg font-semibold mb-4">Berat Infus Real-Time</h2>
          <div className="min-w-[800px]">
            <table className="w-full text-left border text-sm">
              <thead>
                <tr className="bg-blue-100 sticky top-0">
                  <th className="p-2 border">Kantong</th>
                  <th className="p-2 border">Tanggal</th>
                  <th className="p-2 border">Waktu</th>
                  <th className="p-2 border">Berat</th>
                </tr>
              </thead>
              <tbody>
                {[...data].reverse().map((entry, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">{entry.kantong}</td>
                    <td className="p-2 border">{entry.date}</td>
                    <td className="p-2 border">{entry.time}</td>
                    <td className="p-2 border">{entry.volume} gram</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grafik */}
        <div className="overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Grafik Berat Infus
          </h2>
          <div className="min-w-[600px] h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
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

      {/* Tabel berdasarkan tanggal */}
      <div className="mt-10 border rounded-md p-4">
        <h2 className="text-lg font-semibold mb-4">Riwayat Data per Tanggal</h2>
        <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
          <select
            className="border p-2 rounded-md"
            value={selectedDate}
            onChange={handleDateChange}
          >
            <option value="">Pilih Tanggal</option>
            {availableDates.map((tgl) => (
              <option key={tgl} value={tgl}>
                {tgl}
              </option>
            ))}
          </select>
          <button
            onClick={downloadPDF}
            disabled={selectedData.length === 0}
            className="bg-blue-500 text-white p-2 rounded-md mt-2 md:mt-0 disabled:bg-gray-300"
          >
            Download PDF
          </button>
        </div>
        {selectedData.length > 0 && (
          <div className="w-full overflow-x-auto">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full text-left border text-sm min-w-[800px]">
                <thead>
                  <tr className="bg-blue-100 sticky top-0">
                    <th className="p-2 border">Kantong</th>
                    <th className="p-2 border">Tanggal</th>
                    <th className="p-2 border">Waktu</th>
                    <th className="p-2 border">Berat</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedData.map((entry, idx) => (
                    <tr key={idx}>
                      <td className="p-2 border">{entry.kantong}</td>
                      <td className="p-2 border">{entry.date}</td>
                      <td className="p-2 border">{entry.time}</td>
                      <td className="p-2 border">{entry.volume} gram</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfusionData;
