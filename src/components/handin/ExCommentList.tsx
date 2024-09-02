// 'use client';

// import { useEffect, useState } from 'react';

// import { NewModal } from '@/hooks/hooks';
// import Button from '../common/Button';
// import Comment from './ExComment';
// import NewComment from './Comment';


// function CommentList({ data, onDelete }: { data: []; onDelete: Function }) {
//   const [modalType, setModalType] = useState(null);
//   const [selectedComment, setSelectedComment] = useState();

//   useEffect(() => {
//     if (modalType) {
//       open();
//     } else {
//       close();
//     }
//   }, [modalType]);

//   const handleConfirm = () => {
//     if (modalType === 'edit') {
//       onEdit();
//     }
//     if (modalType === 'delete') {
//       onDelete(selectedComment);
//     }
//     setModalType(null);
//   };
//   const handleCancel = () => {
//     console.log('handleCancel');
//     setModalType(null);
//   };

//   const onEdit = () => {
//     console.log('on Edit');
//   };

//   const { open, close, Modal } = NewModal();

//   return (
//     <div>
//       {data.map((comment: any) => (
//           <NewComment key={comment.id}/>

//         // <Comment
//         //   key={comment.id}
//         //   comment={comment}
//         //   reactions={comment.reactions}
//         //   setModalType={(item) => {
//         //     setModalType(item);
//         //     setSelectedComment(comment);
//         //   }}
//         // />
//       ))}
//       <Modal>
//         <div className="bg-white">
//           {modalType === 'edit' ? (
//             <>
//               <h1>수정 {modalType}</h1>
//               <span>수정하시겠습니까?</span>
//             </>
//           ) : (
//             <>
//               <h1>삭제 {modalType}</h1>
//               <span>삭제하시겠습니까?</span>
//             </>
//           )}
//           <div className="flex">
//             <Button label="확인" onClick={handleConfirm} />
//             <Button label="취소" onClick={handleCancel} />
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }
// export default CommentList;
