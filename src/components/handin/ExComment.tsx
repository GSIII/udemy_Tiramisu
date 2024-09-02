// 'use client';

// import { useState } from 'react';

// import data from '@emoji-mart/data';
// import EmojiPicker from '@emoji-mart/react';

// import ProfileImg from '../common/ProfileImg';
// import AddReaction from '../icons/AddReaction';
// import ToggleMenu from './ToggleMenu';

// function Comment({
//   comment,
//   reactions,
//   setModalType,
// }: {
//   comment: object;
//   reactions: [];
//   setModalType: () => void;
// }) {
//   const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
//   const [reactionList, setReactionList] = useState(
//     reactions ? reactions.reactions : null,
//   );
//   const handleClick = () => {
//     setOpenEmojiPicker(!openEmojiPicker);
//   };
//   const updateEmojis = (newEmoji: object) => {
//     const existingEmoji = reactionList.find(
//       (e: object) => e.id === newEmoji.id,
//     );
//     let newReactionList = [];

//     if (existingEmoji) {
//       newReactionList = reactionList.map((item: any) => {
//         if (item.id === newEmoji.id) {
//           item.count += 1;
//         }
//         return item;
//       });
//     } else {
//       newReactionList = reactionList;
//       newReactionList.push(newEmoji);
//     }
//     return newReactionList;
//   };

//   const handleEmojiSelect = (e: any) => {
//     const sym: any = `0x${e.unified}`;
//     const emoji = String.fromCodePoint(sym);
//     const newReaction = { id: e.id, count: 1, emoji };
//     const newReactionList = updateEmojis(newReaction);
//     saveReaction(newReactionList);
//     setOpenEmojiPicker(!openEmojiPicker);
//   };

//   const onReactionClick = (emoji: any) => {
//     // TODO 숫자 업데이트 안 되는 현상
//     const newReactionList = updateEmojis(emoji);
//     saveReaction(newReactionList);
//   };

//   const saveReaction = async (newReactionList: any) => {
//     const response = await fetch('/api/handin/reactions', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         target_id: comment.id,
//         user_id: 'afbf8da9-baf2-4c34-ba94-49fa57b3c813',
//         reactions: newReactionList,
//       }),
//     });

//     const res = await response.json();
//     console.log(res);
//   };

//   const handleCommentChange = (e: any) => {
//     // setCommentText(e.target.value);
//   };

//   return (
//     <div className="gap-x-2 border-b border-t border-[#efefef] bg-[#fdfdfd]">
//       <div className="grid grid-cols-[1fr_5fr_1fr] grid-rows-[2fr_1fr]">
//         <div className="">
//           <ProfileImg />
//         </div>
//         <div>
//           <p>{comment.user.name}</p>
//           <p>{comment.comment}</p>
//           <p>{comment.date}</p>
//         </div>
//         <div>
//           <ToggleMenu
//             menus={[
//               { icon: 'edit', label: '수정하기' },
//               { icon: 'delete', label: '삭제하기' },
//             ]}
//             onClick={(item: string) => {
//               setModalType(item);
//             }}
//           />
//         </div>
//         <div className="col-start-2">
//           {reactionList &&
//             reactionList.map((item: any) => {
//               return (
//                 <button
//                   key={`${item.id}`}
//                   className="mr-[8px] rounded-lg border-2 border-middle-gray bg-light-gray p-[8px]"
//                   onClick={() => onReactionClick(item)}
//                 >
//                   <span className="pr-[8px]">{item.emoji}</span>
//                   <span>{item.count}</span>
//                 </button>
//               );
//             })}
//           <button
//             className="rounded-lg border-2 border-middle-gray bg-light-gray p-[8px]"
//             onClick={handleClick}
//           >
//             <AddReaction className="" />
//           </button>
//         </div>
//       </div>
//       <div className={`${openEmojiPicker ? '' : 'hidden'}`}>
//         <EmojiPicker
//           data={data}
//           locale="ko"
//           onEmojiSelect={handleEmojiSelect}
//         />
//       </div>
//     </div>
//   );
// }
// export default Comment;
