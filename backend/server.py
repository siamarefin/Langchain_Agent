from fastapi import APIRouter, File, Form, UploadFile
import fitz
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from rich import _console

router = APIRouter()

# Load environment variables
load_dotenv()

# Set up Gemini API key from .env
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY", "")

# Set up Gemini chat model (no tools)
model = init_chat_model("gemini-2.0-flash", model_provider="google_genai")

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat_endpoint(
    file: UploadFile = File(None),
    message: str = Form(...),
):
    try:
        if file is not None:
            pdf_bytes = await file.read()
            pdf_document = fitz.open(stream=pdf_bytes, filetype="pdf")
            full_text = ""
            for page_num in range(pdf_document.page_count):
                page = pdf_document[page_num]
                full_text += page.get_text()
        else:
            full_text = ""


        user_message = message.strip()
        prompt = f"Based on the following document:\n{full_text}\nAnswer the question: {user_message}"

        # Prepare message list for Gemini
        messages = [{"role": "user", "content": prompt}]
        


        response = model.invoke(messages)
        response_text = response.text()
        print(f"💬 gemini PDF chat: {response_text}")
        return {"response": response_text}

    except Exception as e:
        print(f"❌ Server error: {e}")
        return {"error": str(e)}
        
    
        

        
    
        
    except Exception as e:
        print(f"❌ Server error: {e}")
        return {"error": str(e)}