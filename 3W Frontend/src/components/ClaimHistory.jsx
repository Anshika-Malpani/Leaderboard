import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../api';
import dayjs from 'dayjs';

const ITEMS_PER_PAGE = 14;

const ClaimHistory = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadHistory = async () => {
      const res = await fetchHistory();
      setHistory(res.data);
    };
    loadHistory();
  }, []);

  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = history.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="h-[92%] w-full absolute top-0 left-0 flex flex-col items-center  bg-gray-100   my-2  overflow-hidden ">
      <h3 className="text-xl font-semibold text-orange-600 mb-4">📜 Points History</h3>

      <div className="overflow-x-auto w-full ">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left text-base lg:text-lg">User</th>
              <th className="px-4 py-2 text-left text-base lg:text-lg">Points</th>
              <th className="px-4 py-2 text-left text-base lg:text-lg">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentData.map((entry) => (
              <tr key={entry._id}>
                <td className="px-4 py-2">{entry.userId?.name}</td>
                <td className="px-4 py-2 text-yellow-600 font-medium">+{entry.points}</td>
                <td className="px-4 py-2 text-gray-500">
                  {dayjs(entry.createdAt).format('DD MMM YYYY, hh:mm A')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 gap-4 absolute bottom-0 left-0 w-full">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClaimHistory;
