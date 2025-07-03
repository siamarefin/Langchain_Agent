from fastapi import APIRouter
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model

router = APIRouter()

# Load environment variables
load_dotenv()

# Set up Gemini API key from .env
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY", "")

# Set up Gemini chat model (no tools)
model = init_chat_model("gemini-2.0-flash", model_provider="google_genai")

class ChatRequest(BaseModel):
    message: str

@router.post("/chat/")
async def chat_endpoint(request: ChatRequest):
    try:
        user_message = request.message.strip()
        prompt = f"Answer me my question : {user_message}"
        response = model.invoke([{"role": "user", "content": prompt}])
        response_text = response.text()
        print(f"💬 gemini: {response_text}")
        return {"response": response_text}
    except Exception as e:
        print(f"❌ Server error: {e}")
        return {"error": str(e)}