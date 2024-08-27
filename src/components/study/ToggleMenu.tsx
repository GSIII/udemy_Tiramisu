import { useParams, useRouter } from 'next/navigation';
import CopyIcon from '../icons/CopyIcon';
import DeleteIcon from '../icons/DeleteIcon';
import EditIcon from '../icons/EditIcon';
import { deleteStudy } from '@/app/(study)/study/[studyId]/studyAction';

type ToggleMenuProps = {
  toggleMenu: boolean;
  onClose: () => void;
};

export default function ToggleMenu({ toggleMenu, onClose }: ToggleMenuProps) {
  const router = useRouter();
  const params = useParams();
  const { studyId } = params;

  const handleDeleteStudy = async () => {
    if (confirm('스터디를 삭제하시겠습니까?')) {
      try {
        await deleteStudy(studyId);
        router.back();
      } catch (error) {
        console.error('스터디 삭제 중 에러가 발생했습니다:', error);
      }
    }
  };
  return (
    <>
      <div className="absolute right-0 mr-0 w-[114px] rounded-lg border border-[#eee] bg-white text-sm">
        <ul>
          <li
            className="border-b-1 flex items-center border-b-[1px] border-[#eee]"
            onClick={onClose}
          >
            <button className="flex w-full items-center px-4 py-[10px] text-[#555]">
              <CopyIcon className="mr-[10px]" /> 공유하기
            </button>
          </li>
          <li
            className="flex items-center border-b-[1px] border-[#eee]"
            onClick={onClose}
          >
            <button className="flex w-full items-center px-4 py-[10px] text-[#555]">
              <EditIcon className="mr-[10px]" /> 수정하기
            </button>
          </li>
          <li
            className="flex items-center border-b-[1px] border-[#eee]"
            onClick={onClose}
          >
            <button
              className="flex w-full items-center px-4 py-[10px] text-[#555]"
              onClick={handleDeleteStudy}
            >
              <DeleteIcon className="mr-[10px]" /> 삭제하기
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
