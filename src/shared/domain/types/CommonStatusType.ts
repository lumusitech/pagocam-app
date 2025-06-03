import { CommonStatus } from '../constants/CommonStatus'
export type CommonStatusType = (typeof CommonStatus)[keyof typeof CommonStatus]
