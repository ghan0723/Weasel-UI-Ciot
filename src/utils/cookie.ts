export const getCookie = (cookieName: string) => {
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 document 객체가 없으므로 여기서 처리를 중단
    return null;
  }

  const cookie = document.cookie;
  console.log(cookie);
  const useCookie = cookie
    .split(';')
    .map((cookiePart) => cookiePart.trim())
    .find((cookiePart) => cookiePart.startsWith(`${cookieName}=`));

  if (useCookie) {
    const cookieValue = useCookie.split('=')[1];
    return cookieValue;
  }
};

export const deleteCookie = (cookieName: string) => {
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 document 객체가 없으므로 여기서 처리를 중단
    return;
  }

  // 현재 시간 이전으로 설정하여 쿠키를 만료시킴
  const pastDate = new Date(0);
  document.cookie = `${cookieName}=; expires=${pastDate.toUTCString()}; path=/;`;
};


export const getNameCookie = async (): Promise<string | null> => {
  try {
    const response = await fetch('http://localhost:8000/user/namecookie', {
      credentials: 'include',
    });
    const data = await response.json();
    console.log('Username: ', data.username);
    return (data.username);
  } catch (error) {
    console.error('Error fetching username:', error);
    return null; // 또는 기본값으로 적절한 값을 반환
  }
};

