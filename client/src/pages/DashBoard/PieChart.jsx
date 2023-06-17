/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as echarts from 'echarts';

const EChartComponent = ({ data }) => {
  useEffect(() => {
    // Initialize the chart once the component mounts
    const chart = echarts.init(document.getElementById('chart-container'));

    // Define the chart options
    const options = {
      // ... (copy the option object from the original code)
      
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: data
        }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    };

    // Set the options and render the chart
    chart.setOption(options);

    // Clean up the chart when the component unmounts
    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div id="chart-container" style={{ width: '100%', height: '400px' }} />;
};

EChartComponent.propTypes = {
  data: PropTypes.array
};

export default EChartComponent;
