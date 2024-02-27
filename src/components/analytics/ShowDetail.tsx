// Chakra imports
import { Box, Flex, Icon, Progress, Text, useColorModeValue } from '@chakra-ui/react';
// import KeywordsDetail from 'components/analytics/keywordsDetail';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import React from 'react';
// Assets
import { lineChartDataTotalSpent, lineChartOptionsTotalSpent } from 'variables/charts';
import KeywordsDetail from './keywordsDetail';

export default function ShowDetail(props: { used: number; total: number; detailData:any; currentPcname:any;  }) {
	const { used, total, detailData, currentPcname } = props;
	// Chakra Color Mode
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const textColorSecondary = 'gray.400';
	const box = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

	
	console.log('detailData',detailData?.result[0]);

	return (
		<Card alignItems='center' w={'48%'} m={'0 auto'}>
			<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mt='10px'>
				{ `상세분석 : ${currentPcname}` }				
			</Text>
			<Box w='100%' h={'30%'}>
				<LineChart chartData={lineChartDataTotalSpent} chartOptions={lineChartOptionsTotalSpent()}></LineChart>
			</Box>
			<Box w='100%' h={'30%'}>
				<KeywordsDetail data={detailData?.result[0]}></KeywordsDetail>
			</Box>
		</Card>
	);
}
