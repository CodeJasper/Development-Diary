"use client"

import MenuBar from '@/components/TextEditor/MenuBar'
import { Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useRef, useState } from 'react'

const extensions = [StarterKit]

export default () => {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [editor, setEditor] = useState<Editor>(null)

  useEffect(() => {
    if (editorRef.current && !editor) {
      const instance = new Editor({
        element: editorRef.current,
        extensions,
        content: '',
        editorProps: {
          attributes: {
            class: 'prose max-w-full h-full focus:outline-none',
          },
        },
      })
      setEditor(instance)
    }
  }, [editorRef, editor])

  return (
    <div className='h-full flex flex-col'>
      {editor && <MenuBar editor={editor} />}
      <div id="editor" ref={editorRef} className='grow-1 bg-white p-4 rounded mt-4 overflow-y-auto h-[calc(100svh-56px-48px-24px-66px-16px)] '></div>
    </div>
  )
}
