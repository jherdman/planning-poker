export interface Props {
	message: string;
	type: "warning" | "error" | "success" | "info";
}

/**
 * Renders an alert message with a type icon.
 * @see https://daisyui.com/components/alert/
 */
export default function Alert({ message, type }: Props) {
	const alertClass = `alert alert-${type} fixed bottom-0 left-0`;

	return (
		<div role="alert" className={alertClass}>
			{ICONS[type]}
			<span>{message}</span>
		</div>
	);
}

const ICONS: Record<Props["type"], React.ReactNode> = {
	warning: <WarningIcon />,
	error: <ErrorIcon />,
	success: <SuccessIcon />,
	info: <InfoIcon />,
} as const;

function InfoIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Info"
			fill="none"
			viewBox="0 0 24 24"
			className="h-6 w-6 shrink-0 stroke-current"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			></path>
		</svg>
	);
}

function SuccessIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Success"
			className="h-6 w-6 shrink-0 stroke-current"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	);
}

function WarningIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Warning"
			className="h-6 w-6 shrink-0 stroke-current"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
			/>
		</svg>
	);
}

function ErrorIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Error"
			className="h-6 w-6 shrink-0 stroke-current"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	);
}
