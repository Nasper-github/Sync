import { Mark, mergeAttributes } from '@tiptap/core'

export interface TextIdOptions {
    HTMLAttributes: Record<string, any>
}

export const TextId = Mark.create<TextIdOptions>({
    name: 'textId',

    addOptions() {
        return {
            HTMLAttributes: {},
        }
    },

    parseHTML() {
        return [
            {
                tag: 'span[data-id]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    },

    addAttributes() {
        return {
            'data-id': {
                default: null,
                parseHTML: element => element.getAttribute('data-id'),
                renderHTML: attributes => {
                    if (!attributes['data-id']) {
                        return {}
                    }

                    return {
                        'data-id': attributes['data-id'],
                    }
                },
            },
        }
    },
})
