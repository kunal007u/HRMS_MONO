import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import DialogForm from './DialogForm';
import TaskTable from '../../Page/Dashboard/TaskTable';

const CustomPieChart = (props) => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedTask, setSelectedTask] = React.useState('');
    const chartDiv = useRef(null);
    let myChart: null | echarts.EChartsType = null;


    useEffect(() => {
        myChart = echarts.init(chartDiv.current);
        myChart.setOption({
            title: {
                text: 'Task Statistics',
                subtext: 'Weekly Overview',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} ({d}%)'
            },
            legend: {
                bottom: 10,
                left: 'center',
                data: props.data
            },
            series: [
                {
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data: props.data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });

        myChart.on('click', function (params) {
            if (params.componentType === 'series') {
                setOpenDialog(true);
                setSelectedTask(params.name);
            }
        });

        return () => {
            myChart?.dispose();
        };
    }, []);

    return (
        <>
            <div ref={chartDiv} style={{ width: '100%', height: '400px' }}></div>
            <DialogForm
                scroll="body"
                maxWidth="lg"
                className="dialog-form-task-statistic"
                title={`Task Statistics - ${selectedTask}`}
                openDialog={openDialog}
                handleDialogClose={() => setOpenDialog(false)}
                bodyContent={<TaskTable selectedTask={selectedTask} />}
            />
        </>

    );
};

export default CustomPieChart;