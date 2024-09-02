type CommnetInputProps = {
  preValue?: string;
};

function CommentInput({ preValue }: CommnetInputProps) {
  return (
    <input
      defaultValue={preValue}
      required
      type="text"
      name="comment"
      placeholder="스터디원에게 응원의 메세지 보내기"
      className={`w-full rounded-lg bg-[#f3f3f3] py-[11.5px] border border-[#E9E9E9] text-sm placeholder-gray-purple focus:outline-none ${preValue ? 'px-[14px] pb-[23px]' : 'pl-[14px] pr-[46px]'}`}
    />
  );
}