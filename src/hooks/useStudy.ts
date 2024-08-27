import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client';
import { useParams } from 'next/navigation';

export function getStudy(studyId: string | string[]) {
  const [study, setStudy] = useState(null);

  useEffect(() => {
    const getStudy = async (id: string | string[]) => {
      const { data, error } = await supabase
        .from('study')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error loading data', error);
      } else {
        setStudy(data);
      }
    };

    getStudy(studyId);
  }, [studyId]);

  return study;
}

export function getacceptedApplyUser() {
  const [acceptedNum, setAcceptedNum] = useState(0);
  const params = useParams();

  useEffect(() => {
    async function getApply() {
      const { data, error } = await supabase
        .from('study_apply')
        .select('*')
        .eq('studyId', params.studyId)
        .eq('status', 'accepted');

      setAcceptedNum(data);
    }

    getApply();
  }, []);

  return acceptedNum;
}
