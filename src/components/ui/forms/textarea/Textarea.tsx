import { type ChangeEvent, forwardRef, useState } from "react";
import FormControl from "@/components/ui/forms/FormControl";
import FormLabel from "@/components/ui/forms/FormLabel";

export type TextareaProps =
	React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
		label: string;
		labelHelpText?: string;
		formControlClassName?: string;
		formLabelClassName?: string;
		id: string;
		errorMessage?: string;
		showError?: boolean;
	};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(props, ref) => {
		const {
			label,
			labelHelpText = "",
			id,
			onChange,
			formControlClassName = "",
			formLabelClassName = "",
			errorMessage = "Este campo es requerido",
			showError = false,
			...inputProps
		} = props;

		const [currentLength, setCurrentLength] = useState(0);

		const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
			if (onChange) {
				onChange(e);
			}

			if (inputProps.maxLength) {
				setCurrentLength(e.target.value.length);
			}
		};

		const { required } = inputProps;

		return (
			<FormControl className={formControlClassName}>
				{label && (
					<FormLabel
						id={id}
						isRequired={required}
						label={label}
						labelHelpText={labelHelpText}
						className={formLabelClassName}
					/>
				)}
				<textarea
					{...inputProps}
					onChange={handleChange}
					ref={ref}
					id={id}
					className="form-field"
				/>
				<div className="flex justify-between">
					{showError && <span className="form-error">{errorMessage}</span>}
					{inputProps.maxLength && (
						<span className="text-sm text-muted-foreground text-right ml-auto">
							{currentLength}/{inputProps.maxLength}
						</span>
					)}
				</div>
			</FormControl>
		);
	},
);

export default Textarea;
