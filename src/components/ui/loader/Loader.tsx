import { Loader2 } from "lucide-react";

export type LoaderProps = {
	text?: string;
};

export default function Loader(props: LoaderProps) {
	const { text } = props;
	return (
		<div className="flex items-center justify-center">
			<div className="text-center">
				<Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
				{text && <p className="text-muted-foreground text-lg">{text}</p>}
			</div>
		</div>
	);
}
