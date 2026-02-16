export function formatDate(rowData: any)  {  // Functions takes in variable of type any
	const date = new Date(rowData.date); //took in paramater and converted into a date
	return date.toLocaleDateString("en-UK", { //converts date to local time
		year: "numeric",                      // returns object types
		month: "short",
		day: "numeric",
	});
}




// ============================================================ format amount function ======================================
export function formatAmount(rowData: any) {
	const amount = Math.abs(rowData.amount);
	const isNegative = rowData.amount < 0;
	const color = isNegative ? "red" : "green";
	return <span style={{ color }}>£{amount.toFixed(2)}</span>;
}
//================================================================================================================       





export function getSpendingData(categories: string[], transactions: Object[]) { // function takes in 2 parameters
	const expenseCategoryNames = categories.filter((cat: string) => cat !== 'Income'); // filters all catergories that arent income

	const spendingMap: any = {};
	expenseCategoryNames.forEach((name: string) => {
		spendingMap[name] = 0;
	});

	transactions.forEach((transaction: any) => {
		if (transaction.amount < 0) {
			spendingMap[transaction.category] += Math.abs(transaction.amount); // foreach catergory amount make the number absolute 
		}
	});

	const dataValues = expenseCategoryNames.map((name: string) => spendingMap[name] || 0);

	return dataValues
}
