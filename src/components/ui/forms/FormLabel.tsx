export type FormLabelProps = {
	className?: string;
	id: string;
	isRequired: boolean;
	label: string;
	labelHelpText?: string;
};

export default function FormLabel(props: FormLabelProps) {
	const { className, id, isRequired, labelHelpText, label } = props;
	return (
		<label htmlFor={id} className={`form-label ${className}`}>
			{label} <span className="ml-1">{isRequired ? "*" : "(opcional)"}</span>
			{labelHelpText && (
				<span className="text-sm text-muted-foreground font-normal ml-2">
					{labelHelpText}
				</span>
			)}
		</label>
	);
}
