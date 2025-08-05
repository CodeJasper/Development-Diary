'use client'

import { useEditorState, type Editor } from '@tiptap/react'
import { ReactNode } from 'react';

type ButtonPropsType = {
  id: number | string,
  label: string | ReactNode,
  command: () => boolean,
  isActive?: boolean,
  canRun?: boolean,
}

type Level = 1 | 2 | 3 | 4 | 5 | 6;


export default function MenuBar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isUnderline: ctx.editor.isActive('underline') ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  })

  const buttons:ButtonPropsType[] = [
    {
      id: 1,
      label: <i className='bx bx-bold block'></i>,
      command: () => editor.chain().focus().toggleBold().run(),
      isActive: editorState.isBold,
      canRun: editorState.canBold,
    },
    {
      id: 2,
      label: <i className='bx bx-italic block'></i>,
      command: () => editor.chain().focus().toggleItalic().run(),
      isActive: editorState.isItalic,
      canRun: editorState.canItalic,
    },
    {
      id: 3,
      label: <i className='bx bx-underline block'></i>,
      command: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editorState.isUnderline,
      canRun: editorState.canUnderline,
    },
    {
      id: 4,
      label: <i className='bx bx-strikethrough block'></i>,
      command: () => editor.chain().focus().toggleStrike().run(),
      isActive: editorState.isStrike,
      canRun: editorState.canStrike,
    },
    {
      id: 5,
      label: <i className='bx bx-code block'></i>,
      command: () => editor.chain().focus().toggleCode().run(),
      isActive: editorState.isCode,
      canRun: editorState.canCode,
    },
    {
      id: 6,
      label: <i className='bx bx-paragraph block'></i>,
      command: () => editor.chain().focus().setParagraph().run(),
      isActive: editorState.isParagraph,
    },
    ...[1, 2, 3, 4, 5, 6].map((level: Level) => ({
      id: `heading ${level}`,
      label: `H${level}`,
      command: () => editor.chain().focus().toggleHeading({ level }).run(),
      isActive: editorState[`isHeading${level}` as keyof typeof editorState],
    })),
    {
      id: 8,
      label: <i className='bx bx-list-ul block'></i>,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editorState.isBulletList,
    },
    {
      id: 9,
      label: <i className='bx bx-list-ol block'></i>,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editorState.isOrderedList,
    },
    {
      id: 10,
      label: <i className='bx bx-code-alt block'></i>,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editorState.isCodeBlock,
    },
    {
      id: 11,
      label: <i className='bx bx-blockquote block'></i>,
      command: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editorState.isBlockquote,
    },
    {
      id: 12,
      label: <i className='bx bx-move-horizontal block'></i>,
      command: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      id: 13,
      label: <i className='bx bx-undo block'></i>,
      command: () => editor.chain().focus().undo().run(),
      canRun: editorState.canUndo,
    },
    {
      id: 14,
      label: <i className='bx bx-redo block'></i>,
      command: () => editor.chain().focus().redo().run(),
      canRun: editorState.canRedo,
    },
  ]

  return (
    <div className="bg-white p-4 rounded">
      <div className="flex flex-wrap gap-3">
        {buttons.map(({ id, label, command, isActive, canRun = true }) => (
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