'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import HandinForm from '@/components/handin/HandinForm';
import Header from '@/components/handin/Header';

type HandinForm = {
    image: File,
    text: string,
}

const page = ({ params }: { params: { id: string }}) => {
    const [homeworkList, setHomeworkList] = useState<[]>();
    const router = useRouter();

    // const fetchData = async () => {
    //     const studyRoomId = params.id;
    //     const response = await fetch(`/api/homework?id=${studyRoomId}`);
    //     const data = await response.json();
    //     setHomeworkList(data);
    // }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const addHandin = async (data: any) => {
    //     console.log(data);

    //     const formData = new FormData();
    //     data.images = Array.from(data.images);
    //     data.images.map((image: File) => {formData.append('files', image)});
    //     formData.append('data', JSON.stringify({
    //         homework_id: data.homework_id,
    //         text: data.text,
    //     }));

    //     const response = await fetch('/api/handin', {
    //         method: 'POST',
    //         body: formData,
    //     });
    //     const res = await response;
    //     const json = await res.json();
    //     if (res.ok) {
    //         console.log('success');
    //         router.push('./complete');
    //     } else {
    //         console.log('error');
    //         console.log(json);
    //     }
    // }

    return (
        <>
        <Header label='과제 인증'/>
        <HandinForm />
        </>
    );
};
export default page;