import jsonp from 'jsonp'
import { message } from 'antd';
import { WEATHER_URL, WEATHER_AK, WEATHER_CITY } from "../config"

export const getWeather = () => {
  return new Promise((reslove, reject) => {
    jsonp(`${WEATHER_URL}?location=${WEATHER_CITY}&output=json&ak=${WEATHER_AK}`,(err, data) => {
      if(!err) {
        reslove(data.results[0].weather_data[0])
      } else {
          message.warning('请求天气接口失败，抱歉')
      }
    })
  })
}
