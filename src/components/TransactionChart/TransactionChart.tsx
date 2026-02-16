import React, { useEffect, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { useCategories } from "../../hooks/useCategories";
import { getSpendingData } from "../../utilities/TranscationUtilities";
import { Chart } from "primereact/chart";

function TransactionChart() {
	const { transactions } = useTransactions()
	const { categories } = useCategories()

	const [chartData, setChartData] = useState({})
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		if (!transactions || !categories) return;

		const expenseCategoryNames = categories.filter(cat => cat !== 'Income');

		const data = {
			labels: expenseCategoryNames,
			datasets: [
				{
					data: getSpendingData(categories, transactions),
					backgroundColor: ['#3b82f6', '#22c55e', '#f97316'],
					hoverBackgroundColor: ['#3b82f6bb', '#22c55ebb', '#f97316bb']
				}
			]
		};

		setChartData(data);
	}, [transactions, categories]);

	return (
		<div className="card flex justify-content-center" style={{ height: '400px', width: '500px' }}>
			<Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
		</div>
	)
}

export default TransactionChart;