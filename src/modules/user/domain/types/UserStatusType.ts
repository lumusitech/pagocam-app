import { CommonStatusType } from '@shared/domain/types/CommonStatusType'
import { UserSpecificStatusType } from './UserSpecificStatusType'
export type UserStatusType = CommonStatusType | UserSpecificStatusType
