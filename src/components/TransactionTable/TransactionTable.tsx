import React, { useState } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { formatAmount, formatDate } from "../../utilities/TranscationUtilities";
import { useTransactions } from "../../hooks/useTransactions";


function TranscationTable() {
	const {
		transactions,
		loading,
		error,
		refetch: fetchTransactions
	} = useTransactions()

	return (
		<div>
			{
				error ? 
					<Button label="Retry" onClick={fetchTransactions} severity="danger" />
					:
					<DataTable value={transactions} tableStyle={{ minWidth: '50rem' }} loading={loading}>
						<Column field="date" header="Date" body={formatDate}></Column>
						<Column field="merchant" header="Merchant"></Column>
						<Column field="category" header="Category"></Column>
						<Column field="amount" header="Amount" body={formatAmount}></Column>
					</DataTable>
			}
		</div>
	)
}

export default TranscationTable;