"use client"

import MenuBar from '@/components/TextEditor/MenuBar'
import { Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

export type EditorJson = Record<string, any>

export type TextEditorProps = {
  handleUpdate: (editorJson: EditorJson) => void;
}

const TextEditor = (props: TextEditorProps) => {
  const { handleUpdate } = props;
  const editorRef = useRef<HTMLDivElement | null>(null)
  const editorDebounceRef = useRef(null)
  const [editor, setEditor] = useState<Editor>(null)

  const handleUpdateDebounce = useCallback((editorJson: EditorJson) => {
    if(editorDebounceRef.current) {
      clearTimeout(editorDebounceRef.current)
    }

    const editorDebounce = setTimeout(() => {
      handleUpdate(editorJson)
    }, 250)
    editorDebounceRef.current = editorDebounce; 
  }, [handleUpdate, editorDebounceRef])

  useEffect(() => {
    if (editorRef.current && !editor) {
      const instance = new Editor({
        element: editorRef.current,
        onUpdate: (data) => handleUpdateDebounce(data.editor.getJSON()),
        extensions: [,
          StarterKit,
          Placeholder.configure({
            placeholder: "Escribe aquí...",
            includeChildren: true,
          })
        ],
        editorProps: {
          attributes: {
            class: 'h-full p-4 focus:outline-primary',
          },
        },
      })
      setEditor(instance)
    }
  }, [editorRef, editor, handleUpdateDebounce])

  return (
    <div className='h-full flex flex-col'>
      {editor && <MenuBar editor={editor} />}
      <div className="grow-1 mt-4">
        <div id="editor" ref={editorRef} className='h-full rounded overflow-y-auto'></div>
      </div>
    </div>
  )
}

export default TextEditor;