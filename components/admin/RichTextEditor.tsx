"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: JSONContent | null;
  onChange: (doc: JSONContent) => void;
  dir?: "ltr" | "rtl";
}

const toolbarButton = "rounded-lg px-2.5 py-1.5 text-xs font-semibold text-brand-ink-soft hover:bg-white/60 hover:text-brand-ink";

/**
 * The article body editor — produces Tiptap's JSON document format (stored
 * directly in articles.content_en / content_ar), never raw HTML, so the
 * frontend can render it safely without dangerouslySetInnerHTML.
 */
export function RichTextEditor({ value, onChange, dir = "ltr" }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Write the article…" }),
    ],
    content: value ?? "",
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorProps: {
      attributes: {
        class: "prose-admin min-h-[220px] px-4 py-3 text-sm text-brand-ink outline-none",
        dir,
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="glass-panel overflow-hidden rounded-xl">
      <div className="flex flex-wrap gap-1 border-b border-brand-line/60 p-2">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={cn(toolbarButton, editor.isActive("bold") && "bg-white/70")}>
          Bold
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={cn(toolbarButton, editor.isActive("italic") && "bg-white/70")}>
          Italic
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={cn(toolbarButton, editor.isActive("heading", { level: 2 }) && "bg-white/70")}>
          Heading
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={cn(toolbarButton, editor.isActive("bulletList") && "bg-white/70")}>
          List
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={cn(toolbarButton, editor.isActive("blockquote") && "bg-white/70")}>
          Quote
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={cn(toolbarButton, editor.isActive("link") && "bg-white/70")}
        >
          Link
        </button>
        <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className={toolbarButton}>
          Clear
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
