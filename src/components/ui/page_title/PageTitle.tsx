export type PageTitleProps = {
	title: string;
};

export default function PageTitle(props: PageTitleProps) {
	const { title } = props;

	return <h1 className="text-2xl font-bold mb-4">{title}</h1>;
}
