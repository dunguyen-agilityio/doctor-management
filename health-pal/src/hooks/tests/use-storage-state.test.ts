import { act, renderHook, waitFor } from '@utils-test'

// Adjust path
import * as SecureStore from 'expo-secure-store'

import { MOCK_USER } from '@app/mocks/user'
import { Session } from '@app/models/user'

import { setStorageItemAsync, useAsyncState, useStorageState } from '../use-storage-state'

// Mock dependencies
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn().mockResolvedValue(null),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}))

describe('useAsyncState', () => {
  it('initializes with default state and updates via reducer', () => {
    const { result } = renderHook(() => useAsyncState<string>())

    // Initial state: [true, null]
    expect(result.current[0]).toEqual([true, null])

    // Update state
    act(() => {
      result.current[1]('test')
    })

    // New state: [false, 'test']
    expect(result.current[0]).toEqual([false, 'test'])
  })

  it('initializes with custom initial value', () => {
    const { result } = renderHook(() => useAsyncState<string>([false, 'initial']))

    // Initial state: [false, 'initial']
    expect(result.current[0]).toEqual([false, 'initial'])
  })

  it('sets state to null', () => {
    const { result } = renderHook(() => useAsyncState<string>())

    act(() => {
      result.current[1]('test')
    })
    expect(result.current[0]).toEqual([false, 'test'])

    act(() => {
      result.current[1](null)
    })
    expect(result.current[0]).toEqual([false, null])
  })
})

describe('useStorageState', () => {
  const mockSession: Session = { jwt: 'abc123', user: MOCK_USER }
  const key = 'session'

  const sessionStorage = {
    jwt: 'abc123',
    user: { ...MOCK_USER, dateOfBirth: MOCK_USER.dateOfBirth.toISOString() },
  }
  beforeEach(() => {
    jest.clearAllMocks()
    ;(SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null)
  })

  it('initializes with loading state and null session', async () => {
    const { result } = renderHook(() => useStorageState(key))

    expect(result.current[0]).toEqual([true, null])

    await waitFor(() => {
      expect(result.current[0]).toEqual([false, null])
    })
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith(key)
  })

  it('retrieves session from SecureStore', async () => {
    ;(SecureStore.getItemAsync as jest.Mock).mockResolvedValue(JSON.stringify(mockSession))

    const { result } = renderHook(() => useStorageState(key))

    await waitFor(() => {
      expect(result.current[0]).toEqual([false, sessionStorage])
    })
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith(key)
  })

  it('sets new session and updates SecureStore', async () => {
    const { result } = renderHook(() => useStorageState(key))

    await waitFor(() => {
      expect(result.current[0]).toEqual([false, null])
    })

    act(() => {
      result.current[1](mockSession)
    })

    expect(result.current[0]).toEqual([false, mockSession])

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(key, JSON.stringify(mockSession))
  })

  it.skip('clears session and deletes from SecureStore', async () => {
    ;(SecureStore.getItemAsync as jest.Mock).mockResolvedValue(JSON.stringify(mockSession))
    ;(SecureStore.deleteItemAsync as jest.Mock).mockResolvedValue(undefined)

    const { result } = renderHook(() => useStorageState(key))

    await waitFor(() => {
      expect(result.current[0]).toEqual([false, sessionStorage])
    })

    act(() => {
      result.current[1](null)
    })

    await waitFor(() => {
      expect(result.current[0]).toEqual([false, null])
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(key)
    })
  })

  it('updates on key change', async () => {
    const newKey = 'new-session'
    ;(SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(null)

    const { result, rerender } = renderHook(({ key }) => useStorageState(key), {
      initialProps: { key },
    })

    await waitFor(() => {
      expect(result.current[0]).toEqual([false, null])
    })
    ;(SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(JSON.stringify(mockSession))

    rerender({ key: newKey })

    await waitFor(() => {
      expect(result.current[0]).toEqual([false, sessionStorage])
    })
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith(newKey)
  })
})

describe('setStorageItemAsync', () => {
  const key = 'test-key'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets item in SecureStore when value is provided', async () => {
    await setStorageItemAsync(key, 'test-value')

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(key, 'test-value')
    expect(SecureStore.deleteItemAsync).not.toHaveBeenCalled()
  })

  it('deletes item from SecureStore when value is null', async () => {
    await setStorageItemAsync(key, null)

    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(key)
    expect(SecureStore.setItemAsync).not.toHaveBeenCalled()
  })
})
