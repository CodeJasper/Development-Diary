import { Upload } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import Button from "@/components/ui/button/Button";
import { ButtonSizes } from "@/components/ui/button/types";
import FormControl from "@/components/ui/forms/FormControl";
import FormLabel from "@/components/ui/forms/FormLabel";

export type InputFileProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	labelHelpText?: string;
	formControlClassName?: string;
	formLabelClassName?: string;
	formFieldClassName?: string;
	id: string;
	errorMessage?: string;
	showError?: boolean;
	showButton?: boolean;
	textButton?: string;
	maxSizeMB?: number;
};

export default function InputFile(props: InputFileProps) {
	const {
		label,
		labelHelpText = "",
		id,
		formControlClassName = "",
		formLabelClassName = "",
		formFieldClassName = "",
		errorMessage = "Este campo es requerido",
		showError = false,
		showButton = false,
		textButton = "Subír imagen",
		onChange,
		maxSizeMB,
		...inputProps
	} = props;

	const inputRef = useRef(null);
	const { required } = inputProps;
	const [showMaxSizeError, setShowMaxSizeError] = useState(false);

	const handleClickButton = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];

		if (!selectedFile) return;

		if (selectedFile.size > maxSizeMB * 1024 * 1024) {
			e.target.value = "";
			setShowMaxSizeError(true);
			return;
		}
		setShowMaxSizeError(false);

		if (onChange) {
			onChange(e);
		}
	};

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
			{showButton && (
				<Button
					onClick={handleClickButton}
					className="flex w-fit gap-2 items-center"
					size={ButtonSizes.sm}
				>
					<Upload size={16} />
					{textButton}
				</Button>
			)}

			<input
				{...inputProps}
				onChange={handleChange}
				type="file"
				ref={inputRef}
				id={id}
				className={`form-field ${formFieldClassName}`}
			/>
			{showError && <span className="form-error">{errorMessage}</span>}
			{showMaxSizeError && (
				<span className="form-error">
					El archivo supera el tamaño máximo de {maxSizeMB} MB
				</span>
			)}
		</FormControl>
	);
}
