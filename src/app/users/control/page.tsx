'use client';
import { Box, Button, Grid } from '@chakra-ui/react';
import AdminLayout from 'layouts/admin';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getNameCookie } from 'utils/cookie';
import { backIP, frontIP } from 'utils/ipDomain';
import CheckTable from 'views/admin/profile/components/CheckTable';

export default function ProfileOverview() {
  const [data, setData] = useState<[]>([]);
  //User List Data
  const [loading, setLoading] = React.useState(true);
  //검색 카테고리(ex : 사용자명, 등급)
  const [category, setCategory] = React.useState('username');
  //검색 단어
  const [searchWord, setSearchWord] = React.useState('');
  //버튼을 동작 시키기 위한 State
  const [searchButton, setSearchButton] = React.useState<boolean>(false);
  const [rows, setRows] = React.useState(10);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    //비동기 처리를 위한 사용
    const fetchGradeAndData = async () => {
      //현재 로그인 중인 사용자의 이름이 저장된 Cookie를 가져오는 function (비동기)
      const userNameCookie = await getNameCookie();
      if (userNameCookie) {
        //fetch 함수로 백엔드에 username, category, searchWord를 query param으로 전달 (비동기)
        try {
          const response = await fetch(`${backIP}/user/all?username=` + userNameCookie +
            "&category=" + category + "&searchWord=" + searchWord);
          //전달 받은 response를 json으로 변환하여 Data에 저장한다.
          const data = await response.json();
          if (data !== undefined && data !== null) {
            setData(data);
          }
        } catch (error) {
          Swal.fire({
            title: '사용자 관리 페이지 오류',
            text: '당신은 모니터 계정이라 접속이 불가능합니다.',
            icon: 'warning',
            confirmButtonText: '닫기',
            confirmButtonColor: 'orange',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `${frontIP}/dashboard/default`;
            }
          });
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchGradeAndData()
      .then(() => { setLoading(false); }); // 함수 호출
    // data.length가 변경될 때만 실행되도록 두 번째 인자로 전달
  }, [category, searchButton, searchWord, rows, page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <CheckTable
        tableData={data} setTableData={setData} name={'사용자 계정 관리'}
        category={category} setCategory={setCategory}
        searchWord={searchWord} setSearchWord={setSearchWord}
        searchButton={searchButton} setSearchButton={setSearchButton}
        rows={rows} setRows={setRows} page={page} setPage={setPage}
      />
    </Box>
  );
}
