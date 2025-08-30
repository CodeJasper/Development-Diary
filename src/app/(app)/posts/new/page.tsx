"use client"

import TextEditor, { EditorJson } from '@/components/TextEditor/TextEditor'
import { EditorButtonName } from '@/components/TextEditor/types';
import { extensionConfigurationsPostContent, extensionConfigurationsPostTilte } from '@/components/TextEditor/utils';
import { useRef } from 'react';

const CONTENT_BUTTON_NAMES: EditorButtonName[] = [
  'blockquote',
  'bold',
  'bulletList',
  'code',
  'codeBlock',
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'heading5',
  'heading6',
  'horizontalRule',
  'italic',
  'orderedList',
  'paragraph',
  'redo',
  'strike',
  'underline',
  'undo'
]

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
    <>
      <h1 className='text-2xl'>Crear Post</h1>
      <div className="card h-full">
        <div className="card-body h-full">
          <div className="h-full flex flex-col gap-4">
            <div>
              <TextEditor
                extensionConfigurations={extensionConfigurationsPostTilte}
                handleUpdate={handleUpdateTitleEditorJson}
                placeholderText='Escribe el titulo del post aquí...'
              />
            </div>
            <hr className="border-gray-400" />
            <div className="grow-1 flex flex-col">
              <div className="grow-1">
                <TextEditor
                  placeholderText='Escribe el contenido del post aquí...'
                  extensionConfigurations={extensionConfigurationsPostContent}
                  buttonNames={CONTENT_BUTTON_NAMES}
                  handleUpdate={handleUpdateContentEditorJson}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
