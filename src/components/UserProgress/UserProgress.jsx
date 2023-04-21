import React, { useState, useEffect } from 'react';
import { getUserProgress, assignSkill, updateResourceCompletion } from './utils/userProgressAPI';

const UserProgress = ({ userId }) => {
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserProgress(userId);
        setProgressData(res.data);
      } catch (error) {
        console.error('Error fetching user progress data:', error);
      }
    })();
  }, [userId]);

  const handleAssignSkill = async (skillId) => {
    try {
      const res = await assignSkill(userId, skillId);
      setProgressData(res.data);
    } catch (error) {
      console.error('Error assigning skill:', error);
    }
  };

  const handleResourceCompletion = async (subSkillId, resourceId, complete) => {
    try {
      const res = await updateResourceCompletion(userId, subSkillId, resourceId, complete);
      setProgressData(res.data);
    } catch (error) {
      console.error('Error updating resource completion:', error);
    }
  };

  if (!progressData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Progress</h1>
      {/* Render progress data */}
    </div>
  );
};

export default UserProgress;
