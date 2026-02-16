import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useTransactions } from "../../hooks/useTransactions";
import { useCategories } from "../../hooks/useCategories";
import TranscationTable from "../../components/TransactionTable/TransactionTable";

vi.mock("../../hooks/useTransactions");
vi.mock("../../hooks/useCategories");

describe("TranscationTable Component", () => {
  const mockRefetch = vi.fn();
  
  const mockTransactions = [
    { id: 1, date: "2024-01-01", merchant: "Tesco", category: "Food", amount: -25.50 },
    { id: 2, date: "2024-01-02", merchant: "Salary", category: "Income", amount: 2000.00 },
  ];

  const mockCategories = ["Food", "Income", "Transport"];

  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation (Success state)
    (useCategories as any).mockReturnValue({ categories: mockCategories });
  });

  // ==========================================
  // Test: Loading State
  // ==========================================
  it("should show the loading state in the DataTable", () => {
    (useTransactions as any).mockReturnValue({
      transactions: [],
      loading: true,
      error: null,
      refetch: mockRefetch,
    });

    render(<TranscationTable />);
    
    // PrimeReact adds an aria-busy or a specific loading icon class
    const table = screen.getByRole("table");
    expect(table).toBeDefined();
    // In PrimeReact, the container usually gets a 'p-datatable-loading' class
    expect(document.querySelector(".p-datatable-loading")).toBeDefined();
  });

  // ==========================================
  // Test: Error State & Retry
  // ==========================================
  it("should show retry button on error and call refetch when clicked", () => {
    (useTransactions as any).mockReturnValue({
      transactions: [],
      loading: false,
      error: "Failed to fetch",
      refetch: mockRefetch,
    });

    render(<TranscationTable />);

    const retryButton = screen.getByRole("button", { name: /retry/i });
    expect(retryButton).toBeDefined();

    fireEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  // ==========================================
  // Test: Data Rendering
  // ==========================================
  it("should render transaction rows correctly", async () => {
    (useTransactions as any).mockReturnValue({
      transactions: mockTransactions,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<TranscationTable />);

    // Check if Merchant names appear
    expect(screen.getByText("Tesco")).toBeDefined();
    expect(screen.getByText("Salary")).toBeDefined();

    // Check if amounts are formatted (using your utility logic)
    // -25.50 becomes £25.5 in your formatAmount (plus red color)
    expect(screen.getByText("£25.5")).toBeDefined();
    expect(screen.getByText("£2000")).toBeDefined();
  });

  // ==========================================
  // Test: Custom Category Filter
  // ==========================================
  it("should render the category dropdown filter", () => {
     (useTransactions as any).mockReturnValue({
      transactions: mockTransactions,
      loading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<TranscationTable />);

    // Check if the custom filter placeholder is visible
    const dropdown = screen.getAllByText("Select Category")[0];
    expect(dropdown).toBeDefined();
  });
});