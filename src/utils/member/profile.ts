export const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file);

  const uploadResponse = await fetch('/api/profile/storage', {
    method: 'POST',
    body: formData,
  });

  if (!uploadResponse.ok) {
    alert('파일 업로드 실패');
    return null;
  }

  const uploadData = await uploadResponse.json();
  console.log('Upload Data:', uploadData); // 업로드된 데이터 확인
  return uploadData.url;
};

export const saveImageUrl = async (imageUrl: string) => {
  const response = await fetch('/api/profile/images', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: imageUrl }),
  });

  if (!response.ok) {
    alert('이미지 URL 저장 실패');
    return null;
  }

  // return response.json();
  const imageData = await response.json();
  console.log('Image ID:', imageData[0].id);
  return imageData[0].id; // 반환된 이미지 ID
};

export const addProfile = async (profileData: any, imageId: any) => {
  try {
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...profileData, image_id: imageId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '프로필 업데이트 중 오류 발생');
    }

    const result = await response.json();
    console.log('Profile update result:', result); // Add this for debugging
    return result;
  } catch (error) {
    console.error('프로필 추가 또는 업데이트 오류:', error);
    throw error;
  }
};
