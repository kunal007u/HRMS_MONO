import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const CustomLineChart = ({ data, categories }) => {
    const chartDiv = useRef(null);

    useEffect(() => {
        let chartInstance = echarts.getInstanceByDom(chartDiv.current);
        if (!chartInstance) {
            chartInstance = echarts.init(chartDiv.current);
        }
        const options = {
            title: {
                text: 'Weekly Performance Overview',
            subtext: 'Percentage of tasks completed',
            },
            xAxis: {
                type: 'category',
                data: categories,
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 100,
                interval: 25,
                axisLabel: {
                    formatter: '{value}%',
                },
            },
            series: [
                {
                    data: data,
                    type: 'line',
                },
            ],
        };

        chartInstance.setOption(options);
    }, [data, categories]);

    return <div ref={chartDiv} style={{ width: '100%', height: '400px' }}></div>;
};

export default CustomLineChart;