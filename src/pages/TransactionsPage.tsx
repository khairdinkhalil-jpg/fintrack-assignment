import React from "react";
import TransactionHeader from "../components/TransactionHeader/TransactionsHeader";
import TranscationTable from "../components/TransactionTable/TransactionTable";

function TransactionsPage() {
    return (
        <div>
            <TransactionHeader />
            <TranscationTable />
        </div>
    )
}

export default TransactionsPage;