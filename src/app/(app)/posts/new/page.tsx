"use client"

import TextEditor, { EditorJson } from '@/components/TextEditor/TextEditor'
import { useRef } from 'react';

export default function Page() {
  const contentEditorJsonRef = useRef<EditorJson | null>(null);
  const titleEditorJsonRef = useRef<EditorJson | null>(null);

  const handleUpdateContentEditorJson = (editorJson: EditorJson) => {
    contentEditorJsonRef.current = editorJson;
  }

  const handleUpdateTitleEditorJson = (editorJson: EditorJson) => {
    titleEditorJsonRef.current = editorJson;
  }

  return (
    <div className="card h-full">
      <div className="card-body h-full">
        <div className="h-full flex flex-col gap-4">
          <div>
            <p className="text-lg">Nombre</p>
            <div>
              <TextEditor handleUpdate={handleUpdateTitleEditorJson} />
            </div>
          </div>
          <hr className="border-gray-400" />
          <div className="grow-1 flex flex-col">
            <p className="text-lg">Contenido</p>
            <div className="grow-1">
              <TextEditor handleUpdate={handleUpdateContentEditorJson} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
