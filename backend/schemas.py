from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel

# Base Schemas
class BlogPostBase(BaseModel):
    title: str
    slug: str
    summary: str
    content: str
    category: str
    read_time: str
    status: Optional[str] = "published"

class BlogPostCreate(BlogPostBase):
    pass

class BlogPost(BlogPostBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Case Study Schemas
class CaseStudyBase(BaseModel):
    title: str
    client_industry: str
    outcome: str
    challenge: str
    solution: str

class CaseStudyCreate(CaseStudyBase):
    pass

class CaseStudy(CaseStudyBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Contact Submission Schemas
class ContactSubmissionBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str

class ContactSubmissionCreate(ContactSubmissionBase):
    pass

class ContactSubmission(ContactSubmissionBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Appointment Request Schemas
class AppointmentRequestBase(BaseModel):
    client_name: str
    email: str
    phone: str
    date: str
    time_slot: str
    details: Optional[str] = None

class AppointmentRequestCreate(AppointmentRequestBase):
    pass

class AppointmentRequest(AppointmentRequestBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Admin Log In / Simple Verification Schema
class AdminLogin(BaseModel):
    password: str
