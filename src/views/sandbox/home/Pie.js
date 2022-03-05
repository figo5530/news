import React, { useEffect } from 'react'
import * as Echarts from 'echarts'
import axios from 'axios'
import _ from 'lodash'

function Pie(props) {
    const { username } = props
    useEffect(() => {

        axios.get("http://localhost:5000/news?publishState=2&_expand=category").then(res => {
            const currentUserNewsList = res.data.filter(item => item.author === username)
            const dataObj = _.groupBy(currentUserNewsList, item => item.category.title)
            renderPie(dataObj)
        })
    }, [username])

    const renderPie = (dataObj) => {
        var myChart = Echarts.init(document.getElementById('pie'))
        var list = []
        for (var i in dataObj) {
            list.push({
                name: i,
                value: dataObj[i].length
            })
        }
        var option = {
            title: {
                text: 'Category Pie Chart',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: '85%'
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    data: list,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option)
    }

    return (
        <div id='pie' style={{
            width: "100%",
            height: "400px",
            marginTop: "30px"
        }}></div>
    )

}

export default Pie