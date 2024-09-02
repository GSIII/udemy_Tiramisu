import { NewModal } from '@/hooks/hooks';
import Comment from './Comment';


export default function CommentList() {
  const { open, close, Modal } = NewModal();
  const data = [
    {
      id: 1,
      name: '테리',
      content:
        '처음부터 끝까지 봤는데, 정말 꼼꼼하게 잘하셨네요! 피드백 할 부분이 없는데요! 잘 보고 가요 :>',
    },
    {
      id: 2,
      name: '테리',
      content:
        '처음부터 끝까지 봤는데, 정말 꼼꼼하게 잘하셨네요! 피드백 할 부분이 없는데요! 잘 보고 가요 :>',
    },
    {
      id: 3,
      name: '테리',
      content:
        '처음부터 끝까지 봤는데, 정말 꼼꼼하게 잘하셨네요! 피드백 할 부분이 없는데요! 잘 보고 가요 :>',
    },
  ];
  return (
    <div className="[&>*:first-child]:border-t">
      {data.map((item) => {
        return <Comment key={item.id} />;
      })}
      <Modal>
        <div>comment modal</div>
      </Modal>
    </div>
  );
}
