import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import {getProductdata} from '../../../../../api/charts'
export default class Pie extends Component {
  echartsReact = React.createRef()

  state = {
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
      
        console.log(res.data.Cate)
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
        
        console.log(this.state)
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
        formatte : value =>{
          console.log(value)
        }
      },
      legend: {},
      dataset: {
        source: [
            // {product: '2016', '电视': 41 , '手机':30, '家居':65, '女鞋':53, '家具': 98},
            // {product: '2017', '电视': 86 , '手机':92, '家居':44, '女鞋':73, '家具': 98},
            // {product: '2018', '电视': 24 , '手机':67, '家居':79, '女鞋':53, '家具': 82},
            // {product: '2019', '电视': 41 , '手机':30, '家居':69, '女鞋':65, '家具': 52},
            // {product: '2020', '电视': 55 , '手机':67, '家居':82, '女鞋':44, '家具': 39},
            ['product', '2016', '2017', '2018', '2019', '2020'],
            ['电视', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ['手机', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['家居', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['家具', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1],
            ['女鞋', 24.1, 33.2, 79.5, 77, 66, 82.5]
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
          {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              label: {
                formatter: (value) =>{
                  console.log(value)
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
    console.log(event)
    let xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        var dimension = xAxisInfo.value + 1;
        let series = {
          id: 'pie',
          label: {
            formatter: (value) =>{
              console.log(value)
              return `${value.data[0]}: ${value.data[dimension]} (${value.percent}%)`
            } 
          },
          encode: {
              value: dimension,
              tooltip: dimension
          }
        }
        this.echartsReact.props.option.series[5] = series
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
