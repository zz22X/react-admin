import { CATE_LIST } from '../action_types'
import { GetallCate } from '../../api/admin'

export const getCateList = (value) => {
  return {
    type: CATE_LIST,
    data: value
  }
}
export const getCateListAsync = () => {
  return async(dispatch) => {
    let result = await GetallCate()
    const { status, data } = result
    if( status === 0) {
      data.map(item => item.key = item._id)
      data.reverse()
      dispatch(getCateList(data))
    }
  }
}