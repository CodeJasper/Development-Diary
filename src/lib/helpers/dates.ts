export default function formatLongDate(date: Date) {
	const formatted = new Intl.DateTimeFormat("es-ES", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(date);

	return formatted;
}
