"use client";

import type { EditorButtonConfiguration } from "@/components/TextEditor/types";

export type MenuBarProps = {
	buttonConfigurations: EditorButtonConfiguration[];
};

export default function MenuBar(props: MenuBarProps) {
	const { buttonConfigurations } = props;

	return (
		<div className="rounded p-4 sticky bg-input border border-border rounded-bl-none rounded-br-none top-0 z-999">
			<div className="flex flex-wrap gap-3">
				{buttonConfigurations.map(
					({ id, label, command, isActive, canRun = true }) => (
						<button
							type="button"
							key={id}
							onClick={command}
							disabled={!canRun}
							className={`btn py-1 px-1 border-0 h-8 w-8 flex justify-center items-center focus-visible:border-border focus-visible:ring-border focus-visible:ring-[3px] ${isActive ? "bg-gray-900/25" : ""}`}
						>
							{label}
						</button>
					),
				)}
			</div>
		</div>
	);
}
