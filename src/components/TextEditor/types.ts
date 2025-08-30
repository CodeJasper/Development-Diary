import { Editor, EditorStateSnapshot } from "@tiptap/react";
import { ReactNode } from "react";
import { Node } from "@tiptap/react";

export type EditorButtonConfiguration = {
  id: number | string,
  label: string | ReactNode,
  command: () => boolean,
  isActive?: boolean,
  canRun?: boolean,  
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingState = {
  heading1?: boolean;
  heading2?: boolean;
  heading3?: boolean;
  heading4?: boolean;
  heading5?: boolean;
  heading6?: boolean;
}

export type EditorButtonName = 
  "paragraph" | 
  "bold" | 
  "underline" | 
  "italic" | 
  "strike" | 
  "code" | 
  "heading1" | 
  "heading2" | 
  "heading3" | 
  "heading3" | 
  "heading4" | 
  "heading5" | 
  "heading6" | 
  "bulletList" | 
  "orderedList" | 
  "codeBlock" | 
  "blockquote" | 
  "undo" | 
  "redo" |
  "horizontalRule"

export type ExtensionConfigurations = {
  extensions: Node[],
  handleExtensionStates: (ctx: EditorStateSnapshot<Editor>) => Record<string, boolean>
}