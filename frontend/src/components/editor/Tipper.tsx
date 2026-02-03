import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { useEffect } from 'react'
import { TextId } from './extensions/TextId'

// Types mirroring backend models
interface FormatAttributes {
    bold: boolean
    italic: boolean
    underline: boolean
    strike: boolean
}

interface RunNode {
    id: string
    text: string
    formatting: FormatAttributes
}

interface ParagraphNode {
    id: string
    style?: string
    runs: RunNode[]
}

interface ParsedDocument {
    filename: string
    paragraphs: ParagraphNode[]
    metadata: any
}

interface TipperProps {
    document: ParsedDocument | null
    onSelectionUpdate?: (id: string | null) => void
}

const Tipper = ({ document, onSelectionUpdate }: TipperProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            TextId,
        ],
        content: '<p>Upload a document to see content here...</p>',
        editable: false,
        onSelectionUpdate: ({ editor }) => {
            if (!onSelectionUpdate) return

            const { from } = editor.state.selection
            // DOM resolution hack to find the data-id
            // TipTap coordsAtPos gives us context, but we need the specific node.

            // Approach: Use view.domAtPos(from)
            const domInfo = editor.view.domAtPos(from)
            const node = domInfo.node as HTMLElement

            // Traverse up to find data-id
            let current: HTMLElement | null = node.nodeType === 3 ? node.parentElement : node
            let foundId: string | null = null

            while (current && !foundId && current !== editor.view.dom) {
                if (current.getAttribute && current.getAttribute('data-id')) {
                    foundId = current.getAttribute('data-id')
                }
                current = current.parentElement
            }

            onSelectionUpdate(foundId)
        }
    })

    useEffect(() => {
        if (editor && document) {
            // Convert ParsedDocument to TipTap JSONContent or HTML
            // Simple HTML construction for now
            let htmlContent = ''

            document.paragraphs.forEach(p => {
                let paragraphHtml = '<p>'
                p.runs.forEach(r => {
                    let text = r.text
                    // Apply formatting wrappers
                    // Note: Order matters or nesting. Ideally use marks.
                    // Simple string concatenation for HTML
                    if (r.formatting.bold) text = `<strong>${text}</strong>`
                    if (r.formatting.italic) text = `<em>${text}</em>`
                    if (r.formatting.underline) text = `<u>${text}</u>`
                    if (r.formatting.strike) text = `<s>${text}</s>`

                    // Add data-id for future reference
                    paragraphHtml += `<span data-id="${r.id}">${text}</span>`
                })
                paragraphHtml += '</p>'
                htmlContent += paragraphHtml
            })

            editor.commands.setContent(htmlContent)
        }
    }, [document, editor])

    if (!editor) {
        return null
    }

    return (
        <div className="border rounded-lg p-4 min-h-[500px] bg-white shadow-sm">
            <div className="prose prose-sm w-full max-w-none">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default Tipper
