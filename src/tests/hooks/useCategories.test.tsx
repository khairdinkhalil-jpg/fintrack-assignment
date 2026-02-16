import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCategories } from '../../api/mockApi';
import { useCategories } from '../../hooks/useCategories';

// Mock the API module
vi.mock('../../api/mockApi', () => ({
  getCategories: vi.fn(),
}));

describe('useCategories Hook', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ==========================================
  // Test: Initial State & Success
  // ==========================================
  it('should fetch categories successfully', async () => {
    const mockData = ['Food', 'Transport', 'Entertainment'];
    // Tell the mock to resolve with our data
    (getCategories as any).mockResolvedValue(mockData);

    const { result } = renderHook(() => useCategories());

    // Check initial loading state
    expect(result.current.loading).toBe(true);
    expect(result.current.categories).toEqual([]);

    // Wait for the useEffect/Promise to finish
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.categories).toEqual(mockData);
    expect(result.current.error).toBe('');
  });

  // ==========================================
  // Test: Error State
  // ==========================================
  it('should handle API errors correctly', async () => {
    const errorMessage = 'Network Error';
    (getCategories as any).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCategories());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.categories).toEqual([]);
  });

  // ==========================================
  // Test: Manual Refetch
  // ==========================================
  it('should refetch data when the refetch function is called', async () => {
    (getCategories as any).mockResolvedValue(['Initial']);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => expect(result.current.loading).toBe(false));
    
    // Update the mock for the second call
    (getCategories as any).mockResolvedValue(['Updated']);

    // Trigger manual refetch
    await waitFor(() => {
        result.current.refetch();
    });

    await waitFor(() => expect(result.current.categories).toEqual(['Updated']));
    // Check that the API was called twice total
    expect(getCategories).toHaveBeenCalledTimes(2);
  });
});