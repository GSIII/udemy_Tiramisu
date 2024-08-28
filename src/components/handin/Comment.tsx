'use client';
import { useState, useEffect } from 'react';
import ProfileImg from '../common/ProfileImg';
import AddReaction from '../icons/AddReaction';
import MoreCircles from './MoreCircles';
import EmojiPicker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const Comment = ({ comment }: any) => {
    const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
    const [reactionList, setReactionList] = useState(comment.reactions);
    const handleClick = () => {
        setOpenEmojiPicker(!openEmojiPicker);
    };

    const handleEmojiSelect = (e: any) => {
        const sym: any = '0x' + e.unified;
        let emoji = String.fromCodePoint(sym);
        const newReaction = { id: e.id, count: 1, emoji: emoji };
        const newReactionList = updateEmojis(newReaction);
        saveReaction(newReactionList);
        setOpenEmojiPicker(!openEmojiPicker);
    };

    const updateEmojis = (newEmoji: any) => {
        const existingEmoji = reactionList.find((e) => e.id === newEmoji.id);
        let newReactionList = [];

        if (existingEmoji) {
        newReactionList = reactionList.map((item) => {
            if (item.id === newEmoji.id) {
            item.count += 1;
            }
            return item;
        });
        } else {
        newReactionList = reactionList;
        newReactionList.push(newEmoji);
        }
        return newReactionList;
    };

    const onReactionClick = (emoji: any) => { // TODO 숫자 업데이트 안 되는 현상
        const newReactionList = updateEmojis(emoji);
        saveReaction(newReactionList);
    };

    const saveReaction = async (newReactionList: any) => {
        const response = await fetch('/api/studyRoom/handin/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            target_id: comment.id,
            user_id: 'afbf8da9-baf2-4c34-ba94-49fa57b3c813',
            reactions: newReactionList,
        }),
        });

        const res = await response.json();
        console.log(res);
    };

  return (
    <div className="gap-x-2 border-b border-t border-[#efefef] bg-[#fdfdfd]">
      <div className="grid grid-cols-[1fr_5fr_1fr] grid-rows-[2fr_1fr]">
        <div className="">
          <ProfileImg />
        </div>
        <div>
          <p>{comment.userName}</p>
          <p>{comment.comment}</p>
          <p>{comment.date}</p>
        </div>
        <div>
          <MoreCircles />
        </div>
        <div className="col-start-2">
          {reactionList.map((item, idx) => {
            return (
              <button
                key={`${item.id}_${idx}`}
                className="mr-[8px] rounded-lg border-2 border-middle-gray bg-light-gray p-[8px]"
                onClick={() => onReactionClick(item)}
              >
                <span className="pr-[8px]">{item.emoji}</span>
                <span>{item.count}</span>
              </button>
            );
          })}
          <button
            className="rounded-lg border-2 border-middle-gray bg-light-gray p-[8px]"
            onClick={handleClick}
          >
            <AddReaction className="" />
          </button>
        </div>
      </div>
      <div className={`${openEmojiPicker ? '' : 'hidden'}`}>
        <EmojiPicker
          data={data}
          locale={'ko'}
          onEmojiSelect={handleEmojiSelect}
        />
      </div>
    </div>
  );
};
export default Comment;
