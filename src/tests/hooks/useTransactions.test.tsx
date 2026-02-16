import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getTransactions } from '../../api/mockApi';
import { useTransactions } from '../../hooks/useTransactions';

// Mock the API module
vi.mock('../../api/mockApi', () => ({
  getTransactions: vi.fn(),
}));

describe('useTransactions Hook', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ==========================================
  // Test: Initial State & Successful Fetch
  // ==========================================
  it('should fetch transactions and update state on success', async () => {
    const mockData = [
      { id: 1, merchant: 'Amazon', amount: -45.99, category: 'Shopping' },
      { id: 2, merchant: 'Employer', amount: 3000, category: 'Income' }
    ];
    
    (getTransactions as any).mockResolvedValue(mockData);

    const { result } = renderHook(() => useTransactions());

    // Verify initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.transactions).toEqual([]);

    // Wait for the async operation to complete
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.transactions).toEqual(mockData);
    expect(result.current.error).toBe('');
  });

  // ==========================================
  // Test: API Error Handling
  // ==========================================
  it('should capture error message when the API fails', async () => {
    const failureMessage = 'Internal Server Error';
    (getTransactions as any).mockRejectedValue(new Error(failureMessage));

    const { result } = renderHook(() => useTransactions());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(failureMessage);
    expect(result.current.transactions).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  // ==========================================
  // Test: Refetch Logic
  // ==========================================
  it('should trigger a new API call when refetch is invoked', async () => {
    (getTransactions as any).mockResolvedValue([{ id: 1, amount: 10 }]);

    const { result } = renderHook(() => useTransactions());

    // Wait for first load
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(getTransactions).toHaveBeenCalledTimes(1);

    // Setup second mock response
    const newData = [{ id: 1, amount: 10 }, { id: 2, amount: 20 }];
    (getTransactions as any).mockResolvedValue(newData);

    // Act: Call refetch
    await waitFor(() => {
        result.current.refetch();
    });

    await waitFor(() => expect(result.current.transactions).toEqual(newData));
    expect(getTransactions).toHaveBeenCalledTimes(2);
  });
});