from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGODB_CONNECTION_URI: str
    DB_NAME: str
    version: str = "1.0"
    cors_origins: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
