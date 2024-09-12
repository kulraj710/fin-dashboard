# config.py
import os

class Config:
    """Base configuration"""
    DEBUG = False
    TESTING = False
    CORS_ALLOWED_ORIGINS = []

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "https://finance-tools-alpha.vercel.app"]  
    
    
class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    CORS_ALLOWED_ORIGINS = ["https://finance-tools-alpha.vercel.app"]


class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]



def get_config():
    env = os.getenv("FLASK_ENV", "development")
    if env == "production":
        return ProductionConfig
    elif env == "testing":
        return TestingConfig
    return DevelopmentConfig
