import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts';

const CustomBarChart = (props) => {
    const chartDiv = useRef(null);
    let myChart = null;
    const average = 8;


    useEffect(() => {
        myChart = echarts.init(chartDiv.current);
        myChart.setOption({
            title: {
                text: props.text,
                subtext: props.subtext,
                padding: [0, 0, 10, 0]

            },
            dataZoom: [
                {
                    type: 'slider',
                    start: 0,
                    end: 100
                },
                {
                    type: 'inside',
                    start: 0,
                    end: 30
                }
            ],
            tooltip: {
                trigger: 'axis',
                // formatter: function (params) {
                //     console.log("file: CustomBarChart.tsx:34 ~ useEffect ~ params:", params)
                //     const data = params[0].data;
                //     const additionalData = props.additionalData[params[0].dataIndex];
                //     console.log("file: CustomBarChart.tsx:38 ~ useEffect ~ additionalData:", additionalData)
                //     return `
                //     <div style="color: #b30000; padding: 10px;">
                //     <h4 style="margin: 0;">${params[0].name}</h4>
                //     <p style="margin: 5px 0;">Value: ${data}</p>
                //     <p style="margin: 5px 0;">Additional data: ${additionalData}</p>
                //   </div>
                //     `;
                // }
            },

            toolbox: {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    // prettier-ignore
                    // data: ['krunal', 'Renish', 'Hemal', 'deep', 'darshit', 'arun', 'roshan', 'parth', 'kaushal', 'yash', 'darshit', 'manshi', 'jevin', 'hemal.s', 'jinnal']
                    data: props.names
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Average',
                    type: 'bar',
                    // data: [
                    //     7.5, 6.5, 7.0, 8.2, 5.6, 9.7, 4.6, 10.2, 12.6, 6.0, 5.4, 11.3, 12.3, 12, 12
                    // ],
                    data: props.data,
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' }
                        ]
                    },
                    markLine: {
                        data: [{ yAxis: average, name: 'Average' }]
                    },
                    itemStyle: {
                        color: function (params) {
                            return params.data < average ? '#c23531' : '#1abc9c';
                        }
                    }
                },

            ]
        });
    }, [])

    return (
        <div ref={chartDiv} style={{ width: '100%', height: '400px' }}></div>
    )
}

export default CustomBarChart