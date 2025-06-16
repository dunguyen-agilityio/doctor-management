import { act, renderHook } from '@utils-test'

import { RefObject } from 'react'

import { ModalRef } from '@/types'

import { useModal } from '../use-modal'

describe('useModal Hook', () => {
  // Test initial state
  it('should initialize with open set to false', () => {
    const { result } = renderHook(() => useModal())
    const [open] = result.current

    expect(open).toBe(false)
  })

  // Test setOpen functionality
  it('should update open state when setOpen is called', () => {
    const { result } = renderHook(() => useModal())
    const [, setOpen] = result.current

    act(() => {
      setOpen(true)
    })

    expect(result.current[0]).toBe(true)

    act(() => {
      setOpen(false)
    })

    expect(result.current[0]).toBe(false)
  })

  // Test imperative handle methods
  it('should call open and close methods via ref', () => {
    const ref: RefObject<ModalRef> = {
      current: null,
    }
    const { result } = renderHook(() => useModal(ref))

    // Initially, ref.current should have open and close methods
    expect(ref.current).toHaveProperty('open')
    expect(ref.current).toHaveProperty('close')

    // Test open method
    act(() => {
      ref.current?.open()
    })
    expect(result.current[0]).toBe(true)

    // Test close method
    act(() => {
      ref.current?.close()
    })
    expect(result.current[0]).toBe(false)
  })

  // Test when ref is not provided
  it('should work without a ref', () => {
    const { result } = renderHook(() => useModal())
    const [open, setOpen] = result.current

    expect(open).toBe(false)

    act(() => {
      setOpen(true)
    })
    expect(result.current[0]).toBe(true)
  })
})
