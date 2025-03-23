from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict
import os
from ..database import get_db
from ..models import MentalAssessment
from ..schemas import WeeklyAssessmentRequest,ChatInput

from langchain_groq import ChatGroq
from langchain.schema import HumanMessage, SystemMessage

router = APIRouter()

# Initialize Groq LLM with API Key (ideally, store the key in an environment variable)


groq_llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    groq_api_key="",
)


class Conversation:
    def __init__(self):
        # Start with a system message to prime the chatbot
        self.messages: List[Dict[str, str]] = [
            {"role": "system", "content": "You are a helpful AI assistant."}
        ]
        self.active: bool = True

# A simple in-memory store of conversations (in production, you might want a persistent store)
conversations: Dict[str, Conversation] = {}

def get_or_create_conversation(conversation_id: str) -> Conversation:
    if conversation_id not in conversations:
        conversations[conversation_id] = Conversation()
    return conversations[conversation_id]

def query_groq_chat_api(conversation: Conversation) -> str:
    """
    This function constructs the prompt using the conversation messages and then calls the Groq API.
    Here, we use the ChatGroq LLM from langchain_groq as an example.
    """
    try:
        # Create a list of messages in the format expected by ChatGroq.
        # Depending on your ChatGroq integration, you might need to map your conversation messages.
        messages = []
        for msg in conversation.messages:
            if msg["role"] == "system":
                messages.append(SystemMessage(content=msg["content"]))
            else:
                messages.append(HumanMessage(content=msg["content"]))
                
        # Call the Groq chat completion API (synchronously in this example)
        response = groq_llm.invoke(messages)
        return response.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error with Groq API: {str(e)}")

@router.post("/chat/")
def chat(input: ChatInput):
    # Retrieve or create a conversation by its ID
    conversation = get_or_create_conversation(input.conversation_id)
    if not conversation.active:
        raise HTTPException(
            status_code=400,
            detail="The chat session has ended. Please start a new session."
        )
    
    # Append the user's message to the conversation
    conversation.messages.append({
        "role": input.role,
        "content": input.message
    })
    
    # Query the Groq chat API with the updated conversation history
    response_text = query_groq_chat_api(conversation)
    
    # Append the assistant's response
    conversation.messages.append({
        "role": "assistant",
        "content": response_text
    })
    
    # (Optional) Save the chat message in the database if needed
    # For example, using ChatMessage model:
    # chat_message = ChatMessage(conversation_id=input.conversation_id, role="assistant", content=response_text)
    # db.add(chat_message)
    # db.commit()
    
    return {
        "conversation_id": input.conversation_id,
        "response": response_text
    }   

@router.post("/weekly-assessment/")
def process_assessment(
    request: WeeklyAssessmentRequest, db: Session = Depends(get_db)
):
    # Extract request fields
    user_id = request.user_id
    coping_strategies = request.coping_strategies
    appetite = request.appetite
    relationships = request.relationships
    energy = request.energy
    sleep = request.sleep
    mood_description = request.mood_description

    print(f"Received User ID: {user_id}")
    print(f"Scores: Coping {coping_strategies}, Appetite {appetite}, Relationships {relationships}, Energy {energy}, Sleep {sleep}")
    print(f"Mood Description: {mood_description}")

    # Calculate overall score
    overall_score = (coping_strategies + appetite + relationships + energy + sleep) / 5

    # Generate improvement suggestion using Groq
    prompt = f"""
    The user took a mental health assessment and got these scores:
    - Coping Strategies: {coping_strategies}
    - Appetite: {appetite}
    - Relationships: {relationships}
    - Energy: {energy}
    - Sleep: {sleep}
    - Mood Description: {mood_description}
    - Overall Score: {overall_score}/100

    Based on these scores, give a SHORT, practical improvement strategy in a friendly tone.
    """
    improvement_suggestion = groq_llm.invoke(prompt).content

    # Save results in the database
    assessment = MentalAssessment(
        user_id=user_id,
        coping_strategies=coping_strategies,
        appetite=appetite,
        relationships=relationships,
        energy=energy,
        sleep=sleep,
        mood=mood_description,
        sentiment="Neutral",
        overall_score=overall_score,
        improvement_suggestion=improvement_suggestion,
    )
    db.add(assessment)
    db.commit()
    db.refresh(assessment)  # Refresh to load created_at

    return {
        "coping_strategies": coping_strategies,
        "appetite": appetite,
        "relationships": relationships,
        "energy": energy,
        "sleep": sleep,
        "mood": mood_description,
        "overall_score": overall_score,
        "improvement_suggestion": improvement_suggestion,
        "created_at": assessment.created_at.isoformat(),
    }

@router.get("/weekly-report/")
def get_weekly_report(user_id: str, db: Session = Depends(get_db)):
    assessments = (
        db.query(MentalAssessment).filter(MentalAssessment.user_id == user_id).all()
    )
    return [
        {
            "coping_strategies": a.coping_strategies,
            "appetite": a.appetite,
            "relationships": a.relationships,
            "energy": a.energy,
            "sleep": a.sleep,
            "mood": a.mood,
            "overall_score": a.overall_score,
            "improvement_suggestion": a.improvement_suggestion,
            "created_at": a.created_at.isoformat() if a.created_at else None,
        }
        for a in assessments
    ]



