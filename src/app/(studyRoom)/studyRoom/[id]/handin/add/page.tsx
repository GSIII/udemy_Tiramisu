'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import HandinHeader from '@/components/handin/HandinHeader';
import HandinForm from '@/components/handin/HandinForm';
import NoticeBox from '@/components/common/NoticeBox';

type HandinForm = {
    image: File,
    text: string,
}

const page = ({ params }: { params: { id: string }}) => {
    const [homeworkList, setHomeworkList] = useState<[]>();
    const router = useRouter();

    const fetchData = async () => {
        const studyRoomId = params.id;
        const response = await fetch(`/api/homework?id=${studyRoomId}`);
        const data = await response.json();
        setHomeworkList(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const addHandin = async (data: any) => {
        console.log(data);

        const formData = new FormData();
        data.images = Array.from(data.images);
        data.images.map((image: File) => {formData.append('files', image)});
        formData.append('data', JSON.stringify({
            homework_id: data.homework_id,
            text: data.text,
        }));

        const response = await fetch('/api/handin', {
            method: 'POST',
            body: formData,
        });
        const res = await response;
        const json = await res.json();
        if (res.ok) {
            console.log('success');
            router.push('./complete');
        } else {
            console.log('error');
            console.log(json);
        }
    }

    return (
        <>
        <HandinHeader title="과제 인증" />
        <section className="flex flex-col items-center">
            <div className="my-[16px] mb-[35px] mt-[18px] w-full">
            <NoticeBox />
            </div>
            {
                homeworkList && <HandinForm type='add' homeworkList={homeworkList} onSubmitHandler={addHandin} />
            }
        </section>
        </>
    );
};
export default page;