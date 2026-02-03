import { useState } from 'react'
import Tipper from './components/editor/Tipper'
import SidePanel from './components/layout/SidePanel'
import axios from 'axios'
import './App.css'

// Define types locally for now or move to shared types
interface ParsedDocument {
  filename: string
  paragraphs: any[]
  metadata: any
}

function App() {
  const [document, setDocument] = useState<ParsedDocument | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError(null)
    setDocument(null)
    setSelectedId(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      // Assuming backend is at localhost:8000 based on docker-compose
      // We might need to handle CORS or proxy in Vite
      const response = await axios.post('http://localhost:8000/documents/parse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setDocument(response.data)
    } catch (err) {
      console.error(err)
      setError('Failed to parse document. Ensure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl flex gap-6">
      <div className="flex-1">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sync Orchestrator</h1>
          <p className="text-gray-600">Upload a .docx file to parse and render.</p>
        </header>

        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <input
            type="file"
            accept=".docx"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {loading && <p className="mt-2 text-blue-600">Parsing document...</p>}
          {error && <p className="mt-2 text-red-600">{error}</p>}
        </div>

        <div className="editor-container">
          <Tipper document={document} onSelectionUpdate={setSelectedId} />
        </div>
      </div>

      <SidePanel document={document} selectedId={selectedId} />
    </div>
  )
}

export default App
