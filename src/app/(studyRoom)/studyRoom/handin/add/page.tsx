'use client';
import { MouseEventHandler, useEffect, useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuid} from 'uuid';
import supabase from '@/utils/supabase/client';

const page = () => {
    const [previewImg, setPreviewImg] = useState<string>();
    const [imgUrl, setImgUrl] = useState<string>();
    // const { register, handleSubmit } = useForm<any>();

    // const onSubmit: SubmitHandler<any> = async (data) => {
    //     // 1. 이미지스토리지 업로드 -> 이미지 public url 가져오기
    //     // 2. 이미지 테이블에 업로드 -> image id
    //     // 3. 과제 인증 테이블에 업로드 -> image_id

    //     // undo 처리는 어떻게?
    //     uploadImgStorage(data.image[0]);
    //     if (imgUrl) {
    //         const imgId = await uploadImg(imgUrl);
    //         if (imgId) {
    //             data.imgId = imgId;
    //             uploadHandin(data);
    //         }
    //     }
    // }

    // 가장 마지막에 핸드아웃 인서트를 하고 그 전에 캐치하여 에러 발생하면 지우는 방식으로 진행, 한 함수 내에서 여러 번 부르기

    const uploadImgStorage = async (file: File) => {
        const bucket = 'images';
        const newFileName = 'handinImg_' + uuid();
        
        try {
            const { data, error } = await supabase.storage.from(bucket).upload(`handin/${newFileName}`, file);

            if (error) {
              console.log('파일이 업로드 되지 않습니다.', error);
              return;
            }

            const res = supabase.storage.from('images').getPublicUrl(data.path).data.publicUrl;
            if (!res) throw error;
            setImgUrl(res);

        } catch (error) {
            console.error('알 수 없는 문제가 발생했습니다. 다시 시도해 주십시오.', error);
        }
    };

    const uploadImg = async (imgUrl: string) => {
        try {
            const { data, error } = await supabase.from('images').insert({ url: imgUrl}).select();

            if (error) {
                console.log('업로드 에러', error);
                return;
            }

            const imgId = data[0].id;
            return imgId;
            
        } catch (error) {
            console.error('업로드 에러2', error);
        }
    }

    const uploadHandin = async (data: any) => {
        debugger;
        // 과제 인증 업로드 실패한 경우 이미지 테이블, 이미지 스토리지 전부 rollback 해야 함...
        try {
            const { error } = await supabase.from('handin')
                .insert({homework_id: '3', user_id: 'afbf8da9-baf2-4c34-ba94-49fa57b3c813', text: data.text, images: data.imgId});

            if (error) {
                console.log('error', error);
                return;
            }

            console.log('업로드 성공');
            
        } catch (error) {
            console.log('error2', error);
        }
    }

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) return;
        setPreviewImg(URL.createObjectURL(file));
    }

  return (
    <div>
      <header className="border-b-2 pb-2 mt-8">
        <div className="flex justify-between mx-8">
          <span>화살표 이미지</span>
          <span>과제 인증</span>
          <span>캘린더 이미지</span>
        </div>
      </header>
      <section className='flex flex-col items-center'>
        <span className='px-5 py-2 border-border-purple border-2 bg-light-purple rounded-md'>우리는 이렇게 인증해요!</span>
        <form className='flex flex-col items-center'>
            <div>
                <span>14일차 과제</span>
                <span>진행중</span>
            </div>
            <label htmlFor="handinId">과제 아이디</label>
            <input type='text' id='handinId' className='border-2'/>
            <label htmlFor="handinImg">과제 인증 사진</label>
            <input type="file" accept='image/*' onChange={handelChange}/>
            <label htmlFor="handinText">과제 인증 기록</label>
            <textarea className='border-2'/>
            <input type="submit" value='인증하기'/>
        </form>
        <div>
            <img src={previewImg} />
        </div>
      </section>
    </div>
  );
};
export default page;
