from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

router = APIRouter()

# Configure Gemini API key
load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Load Gemini model
model = genai.GenerativeModel("models/gemini-1.5-pro-latest")

class ChatRequest(BaseModel):
    message: str

@router.post("/chat/")
async def chat_endpoint(request: ChatRequest):
    try:
        medicine_name = request.message.strip()
        prompt = f"Tell me about this medicine: {medicine_name}"
        response = model.generate_content(prompt)

        response_text = response.text.strip()
        print(f"💬 gemini: {response_text}")

        return {"response": response_text}
    except Exception as e:
        print(f"❌ Server error: {e}")
        return {"error": str(e)}