import React, { useState } from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatAmount, formatDate } from "../../utilities/TranscationUtilities";


function TranscationTable() {
	const [transctions, setTransactions] = useState<any[]>([
		{
			"id": 8,
			"date": "2026-01-25",
			"merchant": "British Gas",
			"category": "Utilities",
			"amount": -110.20
		}
	]);

	return (
		<div>
			<DataTable value={transctions} tableStyle={{ minWidth: '50rem' }}>
				<Column field="date" header="Date" body={formatDate}></Column>
				<Column field="merchant" header="Merchant"></Column>
				<Column field="category" header="Category"></Column>
				<Column field="amount" header="Amount" body={formatAmount}></Column>
			</DataTable>
		</div>
	)
}

export default TranscationTable;