'use client'

import { useEditorState, type Editor } from '@tiptap/react'
import { EditorButtonConfiguration, HeadingLevel, EditorButtonName } from '@/components/TextEditor/types'

export type MenuBarProps = {
  buttonConfigurations: EditorButtonConfiguration[];
}

export default function MenuBar(props: MenuBarProps) {
  const { buttonConfigurations } = props;

  return (
    <div className="rounded">
      <div className="flex flex-wrap gap-3">
        {buttonConfigurations.map(({ id, label, command, isActive, canRun = true }) => (
          <button
            key={id}
            onClick={command}
            disabled={!canRun}
            className={`btn btn-sm flex items-center ${isActive ? 'bg-gray-900/25' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}