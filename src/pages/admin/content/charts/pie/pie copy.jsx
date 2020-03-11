import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import {getProductdata} from '../../../../../api/charts'
export default class Pie extends Component {
  echartsReact = React.createRef()

  state = {
    total: '',
    cate: [],
    status: []
  }
  componentDidMount () {
    getProductdata().then(res=>{
      console.log(res)
      if(res.status===0) {
        this.setState({
          total: res.data.total[0],
          cate:res.data.Cate,
          status: res.data.Status
        })
      }
    })
  }

  getOption = () => {
    return {
      title: {
        text: '商品统计情况'
      },
      tooltip: {
        trigger: 'axis',
        formatter: 
          "{b} <br/>在售:35 (20%) 已停售:85 (50%)"
      },
      legend: {},
      dataset: {
        source: [
            ['product', '2016', '2017', '2018', '2019', '2020'],
            ['电视', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ['手机', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['家居', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['女装', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
        ]
      },
      xAxis: {type: 'category'},
      yAxis: {gridIndex: 0},
      grid: {top: '55%'},
      series: [
          {type: 'line', smooth: true, seriesLayoutBy: 'row'},
          {type: 'line', smooth: true, seriesLayoutBy: 'row'},
          {type: 'line', smooth: true, seriesLayoutBy: 'row'},
          {type: 'line', smooth: true, seriesLayoutBy: 'row'},
          {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              label: {
                  formatter: 
                    '{b}: {@2016} ({d}%)'
              },
              encode: {
                  itemName: 'product',
                  value: '2016',
                  tooltip: '2016'
              }
          }
      ]
    }
  }
  onChartClick(param,echarts){
    console.log(param)
}
  updateAxisPointer = (event) => {
    let xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        var dimension = xAxisInfo.value + 1;
        let series = {
          id: 'pie',
          label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
          },
          encode: {
              value: dimension,
              tooltip: dimension
          }
        }
        this.echartsReact.props.option.series[4] = series
        this.echartsReact.getEchartsInstance().setOption(this.echartsReact.props.option)
      }
    }
  render() {
    const onEvents = {
      'click': this.onChartClick.bind(this),
      'updateAxisPointer': this.updateAxisPointer.bind(this)
  }
    return (
      <div>
        <ReactEcharts
          ref={(e) => { this.echartsReact = e}}
          option={this.getOption()}
          notMerge={true}
          lazyUpdate={true}
          onEvents={onEvents}
          theme={"theme_name"}
          style={{marginTop:30, padding: 20 ,height: 500}}
        />
      </div>
    )
  }
}
