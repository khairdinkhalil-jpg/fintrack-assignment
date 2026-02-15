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
