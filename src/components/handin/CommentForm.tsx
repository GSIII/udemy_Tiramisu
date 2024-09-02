import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { createComment } from '@/lib/actions/createComment';
import SendIcon from '../icons/SendIcon';


const initialState = {
  success: false,
};

type CommentFormProps = {
  preValue: string;
  showEdit: boolean;
  setShowEdit: (arg: boolean) => void;
};

export default function CommentForm({
  preValue,
  showEdit,
  setShowEdit,
}: CommentFormProps) {
  const [state, formAction] = useFormState(createComment, initialState);
  const targetId = 2;
  const formRef = useRef<HTMLFormElement>(null);

  if (formRef.current && state.success) {
    formRef.current.reset();
  }

  return (
    <form action={formAction} className="relative" ref={formRef}>
      <input
        type="text"
        name="targetId"
        className="hidden"
        defaultValue={targetId}
        required
      />
      {!showEdit ? (
        <>
          <CommentInput />
          <button
            type="submit"
            className="absolute bottom-[8px] right-[14px] top-[8px]"
            aria-label="send"
          >
            <SendIcon />
          </button>
        </>
      ) : (
        <div className="rounded-lg bg-[#f3f3f3]">
          <CommentInput preValue={preValue} />
          <div className="flex justify-end gap-[8px] border-t border-[#dfdfdf] p-1">
            <button
              type="button"
              className="rounded-lg border border-middle-gray px-3 py-2 text-xs"
              onClick={() => setShowEdit(false)}
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-lg bg-main-purple px-3 py-2 text-xs text-white"
            >
              저장
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
