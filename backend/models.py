from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    summary = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    read_time = Column(String, nullable=False)
    status = Column(String, default="published")  # draft, published
    created_at = Column(DateTime, default=datetime.utcnow)

class CaseStudy(Base):
    __tablename__ = "case_studies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    client_industry = Column(String, nullable=False)
    outcome = Column(Text, nullable=False)
    challenge = Column(Text, nullable=False)
    solution = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    subject = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String, default="unread")  # unread, read, replied
    created_at = Column(DateTime, default=datetime.utcnow)

class AppointmentRequest(Base):
    __tablename__ = "appointment_requests"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    date = Column(String, nullable=False)  # YYYY-MM-DD
    time_slot = Column(String, nullable=False)  # HH:MM AM/PM
    details = Column(Text, nullable=True)
    status = Column(String, default="pending")  # pending, confirmed, cancelled
    created_at = Column(DateTime, default=datetime.utcnow)
