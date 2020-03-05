import { CATE_LIST } from '../action_types'

let initState = []
export default function (preState = initState, action) {
  const {
    type,
    data
  } = action
  let newState
  switch (type) {
    case CATE_LIST:
      newState = [...data]
      return newState;
    default:
      return preState;
  }
}