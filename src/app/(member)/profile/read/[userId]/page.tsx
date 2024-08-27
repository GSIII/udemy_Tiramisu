'use client';
import { useEffect, useState } from 'react';
import { getSpecificColumns } from './actions';

export default function UserProfile() {
  const [profileData, setProfileData] = useState<any>(null); // 상태를 선언하여 데이터를 저장
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const userId = ''; // 하드코딩된 userId를 사용, 실제로는 다이나믹하게 설정

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 데이터 로딩 시작
        const data = await getSpecificColumns(userId);
        setProfileData(data); // 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to load profile data'); // 에러 상태 설정
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };

    fetchData(); // 데이터 가져오기
  }, [userId]);

  // 로딩 중일 때
  if (loading) {
    return <p>Loading...</p>;
  }

  // 에러 발생 시
  if (error) {
    return <p>{error}</p>;
  }

  // 데이터가 없을 때
  if (!profileData) {
    return <p>No profile data available</p>;
  }

  return (
    <>
      <h1>ProfileSuccess</h1>
      <div>
        <h2>User Profile</h2>
        <p>
          <strong>Job:</strong>{' '}
          {profileData.job || 'No job information available'}
        </p>
        <p>
          <strong>Purpose:</strong>
          {Array.isArray(profileData.purpose) ? (
            profileData.purpose.length > 0 ? (
              <ul>
                {profileData.purpose.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <span>No purposes available</span>
            )
          ) : (
            <span>
              {profileData.purpose || 'No purpose information available'}
            </span>
          )}
        </p>
      </div>
    </>
  );
}
