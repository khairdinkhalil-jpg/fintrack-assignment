import React from "react";
import TransactionHeader from "../components/TransactionHeader/TransactionsHeader";
import TranscationTable from "../components/TransactionTable/TransactionTable";
import TransactionChart from "../components/TransactionChart/TransactionChart";

function TransactionsPage() {
    return (
        <div>
            <TransactionHeader />
            <TranscationTable />
            <TransactionChart />
        </div>
    )
}

export default TransactionsPage;