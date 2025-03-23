from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    username: str
    email: str | None = None

class UserInDB(UserResponse):
    hashed_password: str

class WeeklyAssessmentRequest(BaseModel):
    user_id: str
    coping_strategies: float
    appetite: float
    relationships: float
    energy: float
    sleep: float
    mood_description: str

# Optional: You can also define a response schema
class WeeklyAssessmentResponse(BaseModel):
    coping_strategies: float
    appetite: float
    relationships: float
    energy: float
    sleep: float
    mood: str
    overall_score: float
    improvement_suggestion: str
    created_at: str  # ISO formatted datetime string


# Pydantic model for chat input
class ChatInput(BaseModel):
    conversation_id: str
    message: str
    role: str = "user"