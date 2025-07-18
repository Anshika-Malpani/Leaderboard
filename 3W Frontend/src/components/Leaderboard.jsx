import React from 'react';

const Leaderboard = ({ users }) => {
  const topThree = users.slice(0, 3);
  const others = users.slice(3);
  return (
    <div className="max-w-3xl mx-auto py-2 mt-4 px-4 h-[70%] ">
      <h2 className="text-center text-xl font-bold mb-2 text-orange-500">🏆 Weekly Contribution Ranking</h2>

      {/* Top 3 podium */}
      <div className="flex justify-center gap-4 items-end mb-4">
        {topThree[1] && (
          <div className="flex flex-col items-center">
            <img src="https://i.pravatar.cc/80?img=2" alt="" className="w-16 h-16 rounded-full border-4 border-silver" />
            <p className="text-sm mt-1 text-gray-700 font-medium">{topThree[1].name}</p>
            <p className="text-yellow-500 font-bold">{topThree[1].totalPoints}</p>
            <div className="mt-1 text-xl">🥈</div>
          </div>
        )}
        {topThree[0] && (
          <div className="flex flex-col items-center">
            <img src="https://i.pravatar.cc/80?img=1" alt="" className="w-20 h-20 rounded-full border-4 border-gold" />
            <p className="text-sm mt-1 text-gray-900 font-semibold">{topThree[0].name}</p>
            <p className="text-yellow-600 font-bold">{topThree[0].totalPoints}</p>
            <div className="mt-1 text-2xl">🥇</div>
          </div>
        )}
        {topThree[2] && (
          <div className="flex flex-col items-center">
            <img src="https://i.pravatar.cc/80?img=3" alt="" className="w-16 h-16 rounded-full border-4 border-bronze" />
            <p className="text-sm mt-1 text-gray-700 font-medium">{topThree[2].name}</p>
            <p className="text-yellow-500 font-bold">{topThree[2].totalPoints}</p>
            <div className="mt-1 text-xl">🥉</div>
          </div>
      )}
      </div>

      {/* Other ranks  */}
      <div className="bg-white   h-[50%] overflow-y-auto divide-y leaderboard">
        {others.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm text-gray-700 w-6">{index + 4}</span>
              <img src={`https://i.pravatar.cc/40?img=${index + 4}`} alt="" className="w-8 h-8 rounded-full" />
              <span className="font-medium text-sm">{user.name}</span>
            </div>
            <div className="text-yellow-600 font-semibold">
              🏅 {user.totalPoints}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
