import React, { useState } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { formatAmount, formatDate } from "../../utilities/TranscationUtilities";
import { useTransactions } from "../../hooks/useTransactions";
import { FilterMatchMode } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { useCategories } from "../../hooks/useCategories";
import type { DataTableFilterMeta } from 'primereact/datatable';


function TranscationTable() {

	const [filters, setFilters] = useState<DataTableFilterMeta>({
		date: { value: null, matchMode: FilterMatchMode.CONTAINS },
		merchant: { value: null, matchMode: FilterMatchMode.CONTAINS },
		category: { value: null, matchMode: FilterMatchMode.EQUALS },
		amount: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	const {
		transactions,
		loading,
		error,
		refetch: fetchTransactions
	} = useTransactions()

	const { categories } = useCategories()

	const categoryRowFilterTemplate = (options: any) => {
		return (
			<Dropdown
				value={options.value}
				options={categories}
				onChange={(e) => options.filterApplyCallback(e.value)}
				placeholder="Select Category"
				className="p-column-filter"
				showClear
				style={{ minWidth: '12rem' }}
			/>
		);
	};

	return (
		<div>
			{
				error ?
					<Button label="Retry" onClick={fetchTransactions} severity="danger" />
					:
					<DataTable
						value={transactions}
						tableStyle={{ minWidth: '50rem' }}
						loading={loading}
						filters={filters}
						onFilter={(e) => setFilters(e.filters)}
						filterDisplay="row"
					>
						<Column
							field="date"
							header="Date"
							body={formatDate}
							filter
							filterPlaceholder="Date"
							sortable
						></Column>
						<Column
							field="merchant"
							header="Merchant"
							filter
							filterPlaceholder="Marchant"
							sortable
						></Column>
						<Column
							field="category"
							header="Category"
							filter
							filterPlaceholder="All Categories"
							filterElement={categoryRowFilterTemplate}
							showFilterMenu={false}
							sortable
						></Column>
						<Column
							field="amount"
							header="Amount"
							body={formatAmount}
							filter
							filterPlaceholder="Amount"
							sortable
						></Column>
					</DataTable>
			}
		</div>
	)
}

export default TranscationTable;