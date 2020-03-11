import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import {getProductdata} from '../../../../../api/charts'
export default class Pie extends Component {
  echartsReact = React.createRef()

  state = {
    loadingChart:true,
    total: '',
    cate: [],
    status: [],
    data1:[],
    data2:[],
    data3:[],
    data4:[],
    data5:[],
    data6:[],

  }
  componentDidMount () {
    getProductdata().then(res=>{
      if(res.status===0) {
        this.setState({
          total: res.data.total[0],
          cate:res.data.Cate,
          status: res.data.Status
        })
        this.state.data1.push(res.data.Cate[0]._id,res.data.Cate[0].count,30, 65, 53, 83, 98)
        this.state.data2.push(res.data.Cate[1]._id,res.data.Cate[1].count,9, 27, 40, 27, 55)
        this.state.data3.push(res.data.Cate[2]._id,res.data.Cate[2].count,15, 25, 33, 43, 58)
        this.state.data4.push(res.data.Cate[3]._id,res.data.Cate[3].count,20, 35, 43, 48, 57)
        this.state.data5.push(res.data.Cate[4]._id,res.data.Cate[4].count,30, 55, 53, 63, 37)
        this.state.data6.push(res.data.Cate[5]._id,res.data.Cate[5].count,10, 24, 23, 28, 22)
        this.setState({ loadingChart:false })
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
        formatte : {}
      },
      legend: {},
      dataset: {
        source: [
            ['product', '2016', '2017', '2018', '2019', '2020'],
            this.state.data1,
            this.state.data2,
            this.state.data3,
            this.state.data4,
            this.state.data5,
            this.state.data6
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
          {type: 'line', smooth: true, seriesLayoutBy: 'row'},
          {type: 'line', smooth: true, seriesLayoutBy: 'row'},
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '30%'],
            label: {
              formatter: (value) =>{
                return `${value.data[0]}: ${value.data[1]} (${value.percent}%)`
              } 
                  
            },
            encode: {
                itemName: 'poduct',
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
    console.log(this.echartsReact)
    let xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        var dimension = xAxisInfo.value + 1;
        let series = {
          id: 'pie',
          label: {
            formatter: (value) =>{
              return `${value.data[0]}: ${value.data[dimension]} (${value.percent}%)`
            } 
          },
          encode: {
              value: dimension,
              tooltip: dimension
          }
        }
        this.echartsReact.props.option.series[this.echartsReact.props.option.series.length - 1] = series
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
          style={{marginTop:30, paddingLeft: 20 ,height: 550}}
          showLoading={this.state.loadingChart}
        />
      </div>
    )
  }
}
