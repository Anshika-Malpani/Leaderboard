import React, { useEffect, useRef, useState } from 'react';
import { fetchUsers, fetchLeaderboard, claimPoints } from './api';
import AddUserForm from './components/AddUserForm';
import UserSelector from './components/UserSelector';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';
import Confetti from 'react-confetti';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [lastPoints, setLastPoints] = useState(null);
  const mainDivRef = useRef(null);
  const [confettiSize, setConfettiSize] = useState({ width: 0, height: 0 });
  const [leaderboardAnimationKey, setLeaderboardAnimationKey] = useState(0);
  const [showHistory, setShowHistory] = useState(false);

  const loadUsers = async () => {
    const res = await fetchUsers();
    setUsers(res.data);
  };

  const loadLeaderboard = async () => {
    const res = await fetchLeaderboard();
    setLeaderboard(res.data);
    setLeaderboardAnimationKey((prev) => prev + 1);
  };

  useEffect(() => {
    loadUsers();
    loadLeaderboard();
  }, []);

  useEffect(() => {
    if (lastPoints !== null) {
      const timer = setTimeout(() => setLastPoints(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [lastPoints]);

  useEffect(() => {
    if (mainDivRef.current) {
      const { width, height } = mainDivRef.current.getBoundingClientRect();
      setConfettiSize({ width, height });
    }
  }, [lastPoints]);

  const handleClaim = async () => {
    if (!selectedUserId) return alert('Select a user');
    const res = await claimPoints(selectedUserId);
    setLastPoints(res.data.points);
    loadUsers();
    loadLeaderboard();
    setSelectedUserId('');
  };

  return (
    <div className="max-h-fit w-full bg-gray-100 flex items-center justify-center px-4 ">
      <div
        ref={mainDivRef}
        className="w-full max-w-fit h-screen bg-white py-4   shadow-lg   relative overflow-hidden"
      >
       

        {/* Selector + Claim Button */}
        <div className="flex flex-col  items-center justify-center gap-4 h-[12%]">
        <h2 className="text-center text-2xl sm:text-3xl font-bold  text-orange-500">
          Leaderboard System
        </h2>
          <div className='w-full flex items-center justify-center gap-2 px-2'>
          <UserSelector users={users} selectedUserId={selectedUserId} onChange={setSelectedUserId} />
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition w-full sm:w-auto"
            onClick={handleClaim}
          >
            Claim
          </button>
          </div>
        </div>

        {/* Confetti and Popup */}
        {lastPoints && (
          <>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                width: confettiSize.width,
                height: confettiSize.height,
                zIndex: 10,
              }}
            >
              <Confetti width={confettiSize.width} height={confettiSize.height} numberOfPieces={200} />
            </div>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[1.9rem] font-bold text-orange-600 animate-popIn z-20 w-full">
              Points Awarded: {lastPoints}
            </p>
          </>
        )}

        {/* Leaderboard / History Toggle */}
        {showHistory && <ClaimHistory /> } 
        <Leaderboard users={leaderboard} animationKey={leaderboardAnimationKey} />

        {/* Add User Form */}
        <AddUserForm onUserAdded={() => {
          loadUsers();
          loadLeaderboard();
        }} />

        {/* Bottom Buttons (Leaderboard / History Toggle) */}
        <div className="flex items-center justify-center gap-1  w-full h-[9%]">
          <div
            className="w-1/2 flex items-center justify-center bg-orange-400 py-3 cursor-pointer hover:bg-orange-500 transition"
            onClick={() => setShowHistory(false)}
          >
            <img className="w-8 h-8 sm:w-9 sm:h-9" src="https://cdn-icons-png.flaticon.com/512/3150/3150115.png" alt="Leaderboard" />
          </div>
          <div
            className="w-1/2 flex items-center justify-center bg-orange-400 py-3 cursor-pointer hover:bg-orange-500 transition"
            onClick={() => setShowHistory(true)}
          >
            <img className="w-8 h-8 sm:w-9 sm:h-9" src="https://png.pngtree.com/png-clipart/20221230/original/pngtree-history-symbol-icon-png-image_8831663.png" alt="History" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
