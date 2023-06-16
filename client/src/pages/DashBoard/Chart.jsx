import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ChartComponent = ({ chartData }) => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      const myChart = echarts.init(chartRef.current);
      const option = {
        xAxis: {
          type: 'category',
          data: chartData.labels // Use the labels from the previous code
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: chartData.data, // Use the data from the previous code
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };
      myChart.setOption(option);
  
      // Clean up the chart instance when component unmounts
      return () => {
        myChart.dispose();
      };
    }, [chartData]);
  
    return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
  };
  
  export default ChartComponent;
  