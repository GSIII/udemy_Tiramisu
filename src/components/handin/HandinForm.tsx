import Mark from '../common/Mark';
import SelectBox from '../studyRoom/SelectBox';
import PlusIcon from '../icons/PlusIcon';
import Button from '../common/Button';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';

const MAX_LENGTH = 500;
type THanindForm = {
    type: string;
    homeworkList: [];
    preloadedValues?: [];
    onSubmitHandler: Function;
}

const HandinForm = ({ type, homeworkList, preloadedValues, onSubmitHandler}: THanindForm) => {
    const [text, setText] = useState<string | undefined>(preloadedValues ? preloadedValues.text : '');
    const [image, setImage] = useState<string | undefined>(preloadedValues ? preloadedValues.images.url : '');
    const [homework, setHomework] = useState(preloadedValues ? preloadedValues.homework : homeworkList[0]);
    const imgInputRef = useRef<HTMLInputElement | null>(null);

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: preloadedValues
    });
    const { ref, ...rest } = register('images');

    const handleClick = () => {
        if (imgInputRef.current) {
            imgInputRef.current.onchange = (e) => {
                const newImage = URL.createObjectURL(e.target.files[0]);
                setImage(newImage);
            }
            imgInputRef.current.click();
        }
    }
    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    useEffect(() => {
        setValue('homework_id', homework.id);
    }, [homework])

    return (
        <form className="w-full">
            <div className="pb-[25px]">
                <SelectBox list={homeworkList} selectedItem={homework} setSelectedItem={setHomework} />
                <input type="text" {...register('homework_id')} className='hidden'/>
            </div>
            <div
                className="mb-[40px] flex aspect-video justify-center overflow-hidden rounded-md border-2 border-light-gray bg-[#f9f9f9] hover:cursor-pointer"
                onClick={handleClick}
            >
                <div className={`items-center justify-center ${image ? 'hidden' : 'flex flex-col'}`}>
                    <span className="mb-[8px] rounded-full bg-[#eaeaea] p-1">
                        <PlusIcon className="h-5 w-5 fill-[#a9a9a9] stroke-[#a9a9a9]" />
                    </span>
                    <span className="text-[#a9a9a9]">인증 구역</span>
                    <input
                        {...rest}
                        type="file"
                        name='images'
                        ref={e => {
                            ref(e);
                            imgInputRef.current = e;
                        }}
                        accept="image/*"
                        className='hidden'
                    />
                </div>
                {image && (
                    <div className={`relative w-full overflow-hidden`}>
                        <Image
                            src={image}
                            fill={true}
                            alt='image'
                            priority
                            className='object-cover'
                        />
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="handinText" className="font-medium">기록</label>
                <input 
                    type="text" 
                    placeholder='과제를 하며 나누고 싶은 생각을 적어보세요.' 
                    className='w-full border-2 p-4 rounded-lg border-[#e9e9e9] bg-[#f9f9f9]'
                    {...register('text')}
                    onChange={handleTextChange}
                />
                <p className="mt-1 text-end text-xs text-[#9d9d9d]">{`${text.length} / ${MAX_LENGTH}`}</p>
            </div>
            <div className="mt-[100px]">
                <Button
                type="primary"
                label={type === 'add' ? '인증하기' : '수정하기'}
                size="large"
                onClick={() => handleSubmit(onSubmitHandler)()}
                />
            </div>
        </form>
    );
};
export default HandinForm;
