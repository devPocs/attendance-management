import React from "react";
import { useLocation } from "react-router-dom";

function TimeInPage() {
  const location = useLocation();
  const { timeIns, name, employeeId } = location.state;

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-4 text-3xl font-bold">Employee Time In Details</h1>
      <h2 className="mb-2 text-xl font-semibold">Name: {name}</h2>
      <h2 className="mb-2 text-xl font-semibold">Employee ID: {employeeId}</h2>

      <table className="mt-4 min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Day</th>
            <th className="border border-gray-300 px-4 py-2">Time</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {timeIns.map(([timestamp, status, remarks], index) => {
            const [day, time] = timestamp.split(" ");
            const isLate = remarks.toLowerCase() === "late";
            const timeCellStyle = isLate ? "text-red-500" : "";
            const remarksCellStyle = isLate ? "text-red-500 font-bold" : "";

            return (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border border-gray-300 px-4 py-2">{day}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${timeCellStyle}`}
                >
                  {time}
                </td>
                <td className="border border-gray-300 px-4 py-2">{status}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${remarksCellStyle}`}
                >
                  {remarks}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default TimeInPage;
