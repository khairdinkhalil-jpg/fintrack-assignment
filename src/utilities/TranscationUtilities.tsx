export function formatDate(rowData: any) {
	const date = new Date(rowData.date);
	return date.toLocaleDateString("en-UK", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export function formatAmount(rowData: any) {
	const amount = Math.abs(rowData.amount);
	const isNegative = rowData.amount < 0;
	const color = isNegative ? "red" : "green";
	return <span style={{ color }}>£{amount}</span>;
}

export function getSpendingData(categories: any, transactions: any) {
	const expenseCategoryNames = categories.filter((cat: any) => cat !== 'Income');

	const spendingMap: Record<string, number> = {};
	expenseCategoryNames.forEach((name: any) => {
		spendingMap[name] = 0;
	});

	transactions.forEach((transaction: any) => {
		if (transaction.amount < 0) {
			spendingMap[transaction.category] += Math.abs(transaction.amount);
		}
	});

	const dataValues = expenseCategoryNames.map((name: any) => spendingMap[name] || 0);

	return dataValues
}

export function calculateExpenses(transactions: any, spendingTotals: any) {
	transactions.forEach((transaction: any) => {
		const isNegative = transaction.amount < 0;
		if (isNegative) {
			spendingTotals[transaction.category] += Math.abs(transaction.amount);
		}
	});
}