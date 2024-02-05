'use client';
/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from 'react';
// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Text,
    Textarea,
    useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { FaChevronLeft } from 'react-icons/fa';
import { fetchLogic } from 'utils/fetchData';
import { useParams, useRouter } from 'next/navigation';
import { getNameCookie } from 'utils/cookie';
import { backIP } from 'utils/ipDomain';
import Swal from 'sweetalert2';
import { userSwal } from 'components/swal/customSwal';

export default function SignIn() {
    // Chakra color mode
    const textColor = useColorModeValue('navy.700', 'white');
    const textColorSecondary = 'gray.400';
    const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
    const textColorBrand = useColorModeValue('brand.500', 'white');
    const brandStars = useColorModeValue('brand.500', 'brand.400');
    const [show, setShow] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [passwd, setPasswd] = React.useState('');
    const [passwdChk, setPasswdChk] = React.useState('');
    const [grade, setGrade] = React.useState('');
    const [mngRange, setMngRange] = React.useState('');
    const [oldName, setOldName] = React.useState('');
    const [cookieName, setCookieName] = React.useState('');
    const [cookieGrade, setCookieGrade] = React.useState();
    const [cookieRange, setCookieRange] = React.useState('');
    const [freq, setFreq] = React.useState();
    const router = useRouter();
    React.useEffect(() => {

        // URL에서 query parameter를 추출
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());

        // params에서 원하는 값을 추출
        const name = params.name;
        const fetchUser = async () => {
            try {
                const response = await fetch(`${backIP}/user/modify/` + name);
                const result = await response.json();
                setUsername(result[0].username);
                setOldName(result[0].username);
                setPasswd(result[0].passwd);
                setGrade(result[0].grade);
                setMngRange(result[0].mng_ip_ranges);
            } catch (error) {
                console.log(' error 발생 : ' + error);
            }
        }
        if (name) {
            fetchUser();
            fetchGradeAndRange();
        }
    }, [cookieName])
    const fetchGradeAndRange = async () => {
        const username = await getNameCookie();
        setCookieName(username);
        try {
            const response = await fetch(`${backIP}/user/check?username=` + cookieName);
            console.log("respose : ", response);
            const result = await response.json();
            console.log("result : ", result);
            setCookieGrade(result[0].grade);
            setCookieRange(result[0].mng_ip_ranges);
        } catch (error) {
            console.log('error 발생 : ' + error);
        }
    }
    const handleClick = () => setShow(!show);

    const handleUsernameChange = (e: any) => {
        const nameValue = e.target.value;
        setUsername(nameValue);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value;
        setPasswd(passwordValue);
    };


    const handlePasswdChkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pwdChkValue = e.target.value;
        //비밀번호 확인을 state에 저장시키기
        setPasswdChk(pwdChkValue);

    };

    const handleMngRangeChange = (e: any) => {
        const mngValue = e.target.value;
        setMngRange(mngValue);
    }

    const handleGradeChange = (event: any) => {
        const selectedGrade = event.target.value;
        // 선택한 등급에 대한 처리 로직을 여기에 추가합니다.
        setGrade(selectedGrade); // 예를 들어 state에 저장하거나 다른 작업을 수행할 수 있습니다.
    };

    const handleFreqChange = (event: any) => {
        const selectedFreq = event.target.value;
        // 선택한 등급에 대한 처리 로직을 여기에 추가합니다.
        setFreq(selectedFreq); // 예를 들어 state에 저장하거나 다른 작업을 수행할 수 있습니다.
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        // 폼 제출 시 사용자 계정명과 비밀번호의 길이를 다시 확인
        if (username.length < 5 || username.length > 15) {
            userSwal(1,'modify');
            event.preventDefault();
        } else if (!passwordRegex.test(passwd)) {
            userSwal(2,'modify');
            event.preventDefault();
        } else if (passwd !== passwdChk) {
            //비밀번호와 비밀번호 확인을 비교하여 같으면 통과
            userSwal(3,'modify');
            event.preventDefault();
        } else {
            try {
                const response = await fetch(`${backIP}/user/update/${oldName}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        passwd: passwd,
                        grade: grade,
                        mngRange: mngRange,
                        cookie: cookieName
                    })
                })

                if (response.ok) {
                    router.push('/users/control');
                } else {
                    const result: any = await response.json();
                    userSwal(5,'modify','#d33',result.error);
                }
            } catch (error) {
                alert("에러 확인 : " + error);
            }
        }
    };

    return (
        <DefaultAuthLayout illustrationBackground={'/img/auth/auth.png'} >
            <Flex
                w="100%"
                mx={{ base: 'auto', lg: '0px' }}
                me="auto"
                h="100%"
                alignContent="center"
                alignItems="center"
                justifyContent="center"
                mb={{ base: '30px', md: '60px' }}
                px={{ base: '25px', md: '0px' }}
                mt={{ base: '40px', md: '14vh' }}
                flexDirection="column"
            >
                <Box>
                    <Heading color={textColor} fontSize="36px" mb="40px">
                        사용자 계정 수정
                    </Heading>
                </Box>
                <Flex
                    zIndex="2"
                    direction="column"
                    w={{ base: '100%', md: '420px' }}
                    maxW="100%"
                    background="transparent"
                    borderRadius="15px"
                    mx={{ base: 'auto', lg: 'unset' }}
                    me="auto"
                    mb={{ base: '20px', md: 'auto' }}
                >
                    <form method='post' action={`${backIP}/user/update/${oldName}`}
                        onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel
                                display="flex"
                                ms="4px"
                                fontSize="sm"
                                fontWeight="500"
                                color={textColor}
                                mb="8px"
                            >
                                사용자 계정명<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                id='username'
                                name='username'
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                type="text"
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                                onChange={handleUsernameChange}
                                value={username}
                            />
                            <FormLabel
                                ms="4px"
                                fontSize="sm"
                                fontWeight="500"
                                color={textColor}
                                display="flex"
                            >
                                비밀번호<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <InputGroup size="md">
                                <Input
                                    id='passwd'
                                    name='passwd'
                                    isRequired={true}
                                    fontSize="sm"
                                    placeholder="비밀번호는 8자리 이상"
                                    mb="24px"
                                    size="lg"
                                    type={show ? 'text' : 'password'}
                                    variant="auth"
                                    onChange={handlePasswordChange}
                                    value={passwd}
                                />
                                <InputRightElement display="flex" alignItems="center" mt="4px">
                                    <Icon
                                        color={textColorSecondary}
                                        _hover={{ cursor: 'pointer' }}
                                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                        onClick={handleClick}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <FormLabel
                                ms="4px"
                                fontSize="sm"
                                fontWeight="500"
                                color={textColor}
                                display="flex"
                            >
                                비밀번호 확인<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <InputGroup size="md">
                                <Input
                                    id='passwdChk'
                                    name='passwdChk'
                                    isRequired={true}
                                    fontSize="sm"
                                    placeholder="비밀번호를 다시 한번 입력해주세요"
                                    mb="24px"
                                    size="lg"
                                    type={show ? 'text' : 'password'}
                                    variant="auth"
                                    onChange={handlePasswdChkChange}
                                />
                                <InputRightElement display="flex" alignItems="center" mt="4px">
                                    <Icon
                                        color={textColorSecondary}
                                        _hover={{ cursor: 'pointer' }}
                                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                        onClick={handleClick}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <FormLabel
                                display="flex"
                                ms="4px"
                                fontSize="sm"
                                fontWeight="500"
                                color={textColor}
                                mb="8px"
                            >
                                사용자 권한<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Select
                                id="grade"
                                name="grade"
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                                value={grade}
                                onChange={(event) => handleGradeChange(event)}
                            >
                                {/* 여기에 옵션을 추가합니다 */}
                                <option value="1" style={cookieGrade !== 1 ? { display: 'none' } : {}}>관리자</option>
                                <option value="2" style={cookieGrade !== 1 ? { display: 'none' } : {}}>영역별 관리자</option>
                                <option value="3">모니터</option>
                            </Select>
                            <FormLabel
                                display="flex"
                                ms="4px"
                                fontSize="sm"
                                fontWeight="500"
                                color={textColor}
                                mb="8px"
                            >
                                관리 대역 설정<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Textarea
                                name='mng_ip_ranges'
                                id='mng_ip_ranges'
                                w='100%'
                                h='130px'
                                resize='none'
                                mb='20px'
                                value={mngRange}
                                placeholder={cookieRange}
                                onChange={handleMngRangeChange}
                            >
                            </Textarea>
                            <FormLabel
                                display={cookieGrade === 1 ? "flex" : 'none'}
                                ms="4px"
                                fontSize="sm"
                                fontWeight="500"
                                color={textColor}
                                mb="8px"
                            >
                                날짜 변경 기한<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Select
                                id="pwd_change_freq"
                                name="pwd_change_freq"
                                isRequired={true}
                                variant="auth"
                                fontSize="sm"
                                ms={{ base: '0px', md: '0px' }}
                                mb="24px"
                                fontWeight="500"
                                size="lg"
                                value={freq}
                                onChange={(event) => handleFreqChange(event)}
                                display={cookieGrade !== 1 ? "none" : ""}
                            >
                                {/* 여기에 옵션을 추가합니다 */}
                                <option value="1">1개월</option>
                                <option value="2">3개월</option>
                                <option value="3">6개월</option>
                            </Select>
                            <Button
                                type='submit'
                                fontSize="sm"
                                variant="brand"
                                fontWeight="500"
                                w="45%"
                                h="50"
                                mb="24px"
                                mt="15px"
                                mr='20px'

                            >
                                수정하기
                            </Button>
                            <Link
                                href='/users/control'>
                                <Button
                                    type='button'
                                    fontSize="sm"
                                    variant="brand"
                                    fontWeight="500"
                                    w="45%"
                                    h="50"
                                    mb="24px"
                                    mt="15px"
                                >
                                    취소
                                </Button>
                            </Link>
                        </FormControl>
                    </form>
                </Flex>
            </Flex>
        </DefaultAuthLayout>
    );
}
