import React from "react";
import TransactionHeader from "../components/TransactionHeader/TransactionsHeader";
import TranscationTable from "../components/TransactionTable/TransactionTable";
import TransactionChart from "../components/TransactionChart/TransactionChart";

function TransactionsPage() {
    return (
        <div>   
            <TransactionHeader />
            <div className="container">
                <TranscationTable />
                <TransactionChart />
            </div>
        </div>
    )
}

export default TransactionsPage;