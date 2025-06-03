import { UserSpecificStatus } from '../constants/UserSpecificStatus'
export type UserSpecificStatusType = (typeof UserSpecificStatus)[keyof typeof UserSpecificStatus]
