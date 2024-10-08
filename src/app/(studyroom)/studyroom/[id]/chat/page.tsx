'use client';

import { getChatMembers, getUser } from '@/actions/chatActions';
import { useChatPresenceStore, useChatUserStore } from '@/stores/chatStore';
import Person from '@/components/chat/Person';
import Navigator from '@/components/common/Navigator';
import Header from '@/components/handin/Header';
import Plus from '@/components/icons/Header/Plus';
import SelectBox from '@/components/studyRoom/SelectBox';
import TabMenu from '@/components/studyRoom/TabMenu';
import useBottomSheet from '@/hooks/use-bottomsheet';
import supabase from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import StudyroomHeader from '@/components/studyRoom/Header';

export default function page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const studyId = params.id;
  const { BottomSheet, open, close } = useBottomSheet();
  const { setSelectedUserId } = useChatUserStore();
  const { presence, setPresence } = useChatPresenceStore();

  const getUserQuery = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const data = await getUser();
      return data;
    },
  });

  const getMemberList = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const data = await getChatMembers(studyId);
      return data;
    },
  });

  const handleClick = (member: { id: string; participantId: string }) => {
    setSelectedUserId(member.participantId);
    router.push(`./chat/${member.id}`);
  };

  useEffect(() => {
    const channel = supabase.channel('online_users', {
      config: {
        presence: {
          key: getUserQuery.data?.id,
        },
      },
    });

    channel.on('presence', { event: 'sync' }, () => {
      const newState = channel.presenceState();
      const newStateObj = JSON.parse(JSON.stringify(newState));
      setPresence(newStateObj);
    });

    channel.subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') {
        return;
      }

      const newPresenceStatus = await channel.track({
        onlinedAt: new Date().toISOString(),
      });
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <>
      {/* 헤더 영역 */}
      <StudyroomHeader studyId={params.id} />
      <div className="flex-grow">
        <div className="flex flex-col gap-1 border-b px-4 py-7">
          <p className="text-lg font-bold">🗣️ 팀원과의 대화</p>
          <span className="text-sm text-muted-foreground">
            스터디원들과 대화를 나눠보세요!
          </span>
        </div>
        <div className="py-4">
          {getMemberList.data?.map((member) => (
            <Person
              key={member.id}
              name={member.user.name}
              onlinedAt={presence?.[member.participantId]?.[0].onlinedAt}
              onClick={() => handleClick(member)}
            />
          ))}
        </div>
      </div>
      <Navigator />
    </>
  );
}
