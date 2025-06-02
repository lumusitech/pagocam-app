import { describe, expect, it } from 'vitest'
import { Status } from './Status'

describe('Status Value Object', () => {
  it('should create a Status with value "active"', () => {
    const status = Status.create('active')
    expect(status.getValue()).toBe('active')
    expect(status.isActive()).toBe(true)
    expect(status.isInactive()).toBe(false)
    expect(status.toString()).toBe('active')
  })

  it('should create a Status with value "inactive"', () => {
    const status = Status.create('inactive')
    expect(status.getValue()).toBe('inactive')
    expect(status.isActive()).toBe(false)
    expect(status.isInactive()).toBe(true)
    expect(status.toString()).toBe('inactive')
  })

  it('should compare equality of two Status objects with same value', () => {
    const status1 = Status.create('active')
    const status2 = Status.create('active')
    expect(status1.equals(status2)).toBe(true)
  })

  it('should compare inequality of two Status objects with different values', () => {
    const status1 = Status.create('active')
    const status2 = Status.create('inactive')
    expect(status1.equals(status2)).toBe(false)
  })
})
