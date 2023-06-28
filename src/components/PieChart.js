//Library
import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';

const dataBar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            data: [
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
            ],
        },
    ],
};

const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(39, 106,245, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};

const screenWidth = Dimensions.get('window').width;

export const PieChartCompo = ({ quality }) => {
    const dataPie = [
        {
            name: 'Math',
            population: quality[0],
            color: 'rgba(131, 167, 234, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Sport',
            population: quality[1],
            color: '#F00',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Music',
            population: quality[2],
            color: 'red',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Science',
            population: quality[3],
            color: 'gray',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Art',
            population: quality[4],
            color: 'rgb(0, 0, 255)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Travel',
            population: quality[5],
            color: 'green',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'History',
            population: quality[6],
            color: 'yellow',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Tech',
            population: quality[7],
            color: 'orange',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Language',
            population: quality[8],
            color: 'purple',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];

    return (
        <PieChart
            data={dataPie}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
        />
    );
};

export const BarChartCompo = ({ data }) => {
    return (
        <BarChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
        />
    );
};
