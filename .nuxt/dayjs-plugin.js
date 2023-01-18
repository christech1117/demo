import dayjs from 'dayjs'

import 'dayjs/locale/en'
import 'dayjs/locale/zh-tw'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.locale('zh-tw')

dayjs.tz.setDefault('Asia/Taipei')

export default (context, inject) => {
  context.$dayjs = dayjs
  inject('dayjs', dayjs)
}
