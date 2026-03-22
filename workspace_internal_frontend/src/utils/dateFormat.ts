import moment from 'moment';

export const DateUTCToLocalDateTimeString = (date: Date | string) => moment(new Date(date)).format('DD/MM/yyyy hh:mm a'); // 01-Jan-2021 12:00 AM
export const DateUTCToLocalDateWithTimeString = (date: Date | string) => moment(new Date(date)).format('DD/MM/yyyy hh:mm A'); // 01/01/2021 12:00 AM
export const DateUTCToLocalDateTimeWithSecondString = (date: Date | string) => moment(new Date(date)).format('DD/MM/yyyy hh:mm:ss a'); // 01-Jan-2021 12:00:00 AM
export const TimeToTimeString = (time: string) => moment(time, 'hh:mm').format('hh:mm A'); // 12:00 AM
export const DateTimeToDateString = (date: Date | string) => moment(date).format('DD/MM/YYYY'); // 01/01/2021
export const DateToLocalTimeString = (date: Date | string) => moment.utc(date).format('hh:mm A') // 12:00 AM
export const DateToLocalDayString = (date: Date | string) => moment(new Date(date)).format('dddd') // Monday
export const DateToDateStringWithDay = (date: Date | string) => moment(date).format('DD/MM/yyyy (dddd)'); // 01/01/2021(Monday)
export const DateTimeToDateStringWithDay = (date: Date | string) => moment(date).format('DD/MM/yyyy (dddd) hh:mm A'); // 01-Jan-2021(Monday) 12:00 AM

export const DateTimeToDate_String = (date: Date | string) => moment(date).format('YYYY-MM-DD'); // 01/01/2021
export const DateTimeToMonthYear_String = (date: Date | string) => moment(date).format('MMM, YYYY'); // July, 2024
export const DateTimeToMonthYear_Test = (date: Date | string) => moment(new Date(date)).format('DD/MM/yyyy'); // July, 2024
