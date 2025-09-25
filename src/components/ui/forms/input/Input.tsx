import { forwardRef } from "react";
import FormControl from "@/components/ui/forms/FormControl";
import FormLabel from "@/components/ui/forms/FormLabel";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	labelHelpText?: string;
	formControlClassName?: string;
	formLabelClassName?: string;
	id: string;
	errorMessage?: string;
	showError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const {
		label,
		labelHelpText = "",
		id,
		formControlClassName = "",
		formLabelClassName = "",
		errorMessage = "Este campo es requerido",
		showError = false,
		...inputProps
	} = props;

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
			<input {...inputProps} ref={ref} id={id} className="form-field" />
			{showError && <span className="form-error">{errorMessage}</span>}
		</FormControl>
	);
});

export default Input;
