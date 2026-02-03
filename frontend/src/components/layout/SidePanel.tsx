import React from 'react'

interface ParsedDocument {
    filename: string
    paragraphs: any[]
    metadata: any
}

interface SidePanelProps {
    document: ParsedDocument | null
    selectedId: string | null
}

export const SidePanel: React.FC<SidePanelProps> = ({ document, selectedId }) => {
    return (
        <div className="w-80 flex-shrink-0">
            <div className="sticky top-8 space-y-4">
                {/* Debug Panel */}
                <div className="bg-white p-4 border rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">Debug Info</h3>
                    <div className="text-sm">
                        <p className="font-medium text-gray-500">Selected ID (XPath)</p>
                        <div className="mt-1 p-2 bg-gray-100 rounded font-mono text-xs break-all min-h-[40px] flex items-center">
                            {selectedId || <span className="text-gray-400 italic">Click in editor...</span>}
                        </div>
                    </div>
                </div>

                {/* Document Stats */}
                {document && (
                    <div className="bg-white p-4 border rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Document Info</h3>
                        <div className="space-y-2 text-sm">
                            <div>
                                <p className="font-medium text-gray-500">Filename</p>
                                <p className="truncate" title={document.filename}>{document.filename}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="font-medium text-gray-500">Paragraphs</p>
                                    <p>{document.paragraphs?.length || 0}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-500">Size</p>
                                    <p>{(JSON.stringify(document).length / 1024).toFixed(1)} KB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SidePanel
