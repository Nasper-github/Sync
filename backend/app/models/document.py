from typing import List, Dict, Optional, Any
from pydantic import BaseModel

class FormatAttributes(BaseModel):
    bold: bool = False
    italic: bool = False
    underline: bool = False
    strike: bool = False
    # Add other formatting attributes as needed

class RunNode(BaseModel):
    id: str  # XPath-like identifier e.g., /document/body/p[1]/r[2]
    text: str
    formatting: FormatAttributes

class ParagraphNode(BaseModel):
    id: str # XPath-like identifier e.g., /document/body/p[1]
    style: Optional[str] = None
    runs: List[RunNode] = []

class ParsedDocument(BaseModel):
    filename: str
    paragraphs: List[ParagraphNode] = []
    metadata: Dict[str, Any] = {}
