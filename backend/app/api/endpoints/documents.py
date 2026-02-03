from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.parser import DocumentParser
from app.models.document import ParsedDocument
import shutil
import os
import tempfile

router = APIRouter()
parser = DocumentParser()

@router.post("/parse", response_model=ParsedDocument)
async def parse_document(file: UploadFile = File(...)):
    if not file.filename.endswith('.docx'):
        raise HTTPException(status_code=400, detail="Invalid file type. Only .docx supported.")
    
    # Save uploaded file to temp
    with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name
        
    try:
        parsed_doc = parser.parse(tmp_path, file.filename)
        return parsed_doc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        os.remove(tmp_path)
