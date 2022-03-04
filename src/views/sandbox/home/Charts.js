import React, { useEffect } from 'react'
import * as Echarts from 'echarts'

function Charts() {

    useEffect(() => {
        var myChart = Echarts.init(document.getElementById('main'))
        var option = {
            title: {
                text: 'ECharts Getting Started Example'
            },
            tooltip: {},
            legend: {
                data: ['sales']
            },
            xAxis: {
                data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
            },
            yAxis: {},
            series: [
                {
                    name: 'sales',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        };
        myChart.setOption(option)
    }, [])

    return (
        <div id='main' style={{
            width: "100%",
            height: "400px",
            marginTop: "30px"
        }}></div>
    )
}

export default Charts