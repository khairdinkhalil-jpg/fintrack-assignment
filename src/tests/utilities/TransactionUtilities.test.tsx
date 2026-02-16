import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { formatDate, formatAmount, getSpendingData } from '../../utilities/TranscationUtilities';

describe('Utility Functions', () => {

  // ==========================================
  // formatDate Tests
  // ==========================================
  describe('formatDate', () => {
    it('should format a valid date string correctly for en-UK', () => {
      const rowData = { date: '2024-12-25' };
      const result = formatDate(rowData);
      // Expected: "25 Dec 2024" (Note: en-UK uses day month year)
      expect(result).toContain('25');
      expect(result).toContain('Dec');
      expect(result).toContain('2024');
    });

    it('should handle ISO date strings', () => {
      const rowData = { date: '2026-02-15T14:30:00Z' };
      expect(formatDate(rowData)).toBe('15 Feb 2026');
    });
  });

  // ==========================================
  // formatAmount Tests
  // ==========================================
  describe('formatAmount', () => {
    it('should render green text for positive amounts', () => {
      const rowData = { amount: 150 };
      render(formatAmount(rowData));
      const element = screen.getByText('£150');
      
      expect(element).toBeDefined();
      expect(element.style.color).toBe('green');
    });

    it('should render red text and absolute value for negative amounts', () => {
      const rowData = { amount: -50 };
      render(formatAmount(rowData));
      const element = screen.getByText('£50'); // Should not show the minus sign
      
      expect(element).toBeDefined();
      expect(element.style.color).toBe('red');
    });

    it('should treat zero as green', () => {
      render(formatAmount({ amount: 0 }));
      expect(screen.getByText('£0').style.color).toBe('green');
    });
  });

  // ==========================================
  // getSpendingData Tests
  // ==========================================
  describe('getSpendingData', () => {
    const mockCategories = ['Food', 'Transport', 'Income', 'Entertainment'];
    const mockTransactions = [
      { category: 'Food', amount: -20 },
      { category: 'Food', amount: -10 },
      { category: 'Transport', amount: -50 },
      { category: 'Income', amount: 2000 }, // Should be ignored
      { category: 'Entertainment', amount: 5 }, // Positive expense? Should be ignored per logic
    ];

    it('should aggregate negative transactions by category and exclude Income', () => {
      const result = getSpendingData(mockCategories, mockTransactions);
      
      // Expected logic:
      // Food: |-20| + |-10| = 30
      // Transport: |-50| = 50
      // Entertainment: 0 (the +5 is ignored because it's > 0)
      // Result order based on categories (minus Income): [Food, Transport, Entertainment]
      
      expect(result).toEqual([30, 50, 0]);
    });

    it('should return zeros if no transactions match categories', () => {
      const categories = ['Travel'];
      const transactions = [{ category: 'Food', amount: -10 }];
      const result = getSpendingData(categories, transactions);
      
      expect(result).toEqual([0]);
    });
  });
});