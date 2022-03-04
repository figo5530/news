import React, { useEffect } from 'react'
import * as Echarts from 'echarts'
import axios from 'axios'
import _ from 'lodash'

function Charts() {

    useEffect(() => {

        axios.get("http://localhost:5000/news?publishState=2&_expand=category").then(res => {
            const dataObj = _.groupBy(res.data, item => item.category.title)
            renderBar(dataObj)
        })
        
    }, [])

    const renderBar = (dataObj) => {
        var myChart = Echarts.init(document.getElementById('main'))
        var option = {
            title: {
                text: 'News Category Bar Chart'
            },
            tooltip: {},
            legend: {
                data: ['Quantity']
            },
            xAxis: {
                data: Object.keys(dataObj)
            },
            yAxis: {},
            series: [
                {
                    name: 'Quantity',
                    type: 'bar',
                    data: Object.values(dataObj).map(item => item.length)
                }
            ]
        };
        myChart.setOption(option)
    }

    return (
        <div id='main' style={{
            width: "100%",
            height: "400px",
            marginTop: "30px"
        }}></div>
    )
}

export default Charts