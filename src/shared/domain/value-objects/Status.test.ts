import { describe, expect, it } from 'vitest'
import { Status } from './Status'

describe('Status Value Object', () => {
  it('should create a Status with value "active"', () => {
    const statusProps = { value: 'active' }
    const status = new Status(statusProps)
    expect(status.getValue()).toBe('active')
    expect(status.isActive()).toBe(true)
    expect(status.isInactive()).toBe(false)
    expect(status.toString()).toBe('active')
  })

  it('should create a Status with value "inactive"', () => {
    const statusProps = { value: 'inactive' }
    const status = new Status(statusProps)
    expect(status.getValue()).toBe('inactive')
    expect(status.isActive()).toBe(false)
    expect(status.isInactive()).toBe(true)
    expect(status.toString()).toBe('inactive')
  })

  it('should create a Status with value "suspended"', () => {
    const statusProps = { value: 'suspended' }
    const status = new Status(statusProps)
    expect(status.isActive()).toBe(false)
    expect(status.isInactive()).toBe(false)
    expect(status.isSuspended()).toBe(true)
    expect(status.toString()).toBe('suspended')
  })

  it('should compare equality of two Status objects with same value', () => {
    const statusProps = { value: 'active' }
    const status1 = new Status(statusProps)
    const status2 = new Status(statusProps)
    expect(status1.equals(status2)).toBe(true)
  })

  it('should compare inequality of two Status objects with different values', () => {
    const statusProps1 = { value: 'active' }
    const statusProps2 = { value: 'inactive' }
    const status1 = new Status(statusProps1)
    const status2 = new Status(statusProps2)
    expect(status1.equals(status2)).toBe(false)
  })

  it('should compare and return false with undefined value', () => {
    const status = new Status({ value: 'active' })
    expect(status.equals(undefined)).toBe(false)
  })
})
