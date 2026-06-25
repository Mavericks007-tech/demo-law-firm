import os
from typing import List
from fastapi import FastAPI, Depends, HTTPException, Header, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db, Base
import models
import schemas

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Advocate Munzur Morshed - Law Firm API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "MorshedAdmin2026")
ADMIN_TOKEN = "morshed-secure-session-token-2026"

def verify_admin(x_admin_token: str = Header(None)):
    if x_admin_token != ADMIN_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing admin session token",
        )
    return True

@app.post("/api/admin/verify")
def verify_admin_password(payload: schemas.AdminLogin):
    if payload.password == ADMIN_PASSWORD:
        return {"status": "success", "token": ADMIN_TOKEN}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect password",
    )

# --- Blog Endpoints ---

@app.get("/api/blogs", response_model=List[schemas.BlogPost])
def get_blogs(db: Session = Depends(get_db)):
    return db.query(models.BlogPost).order_by(models.BlogPost.created_at.desc()).all()

@app.get("/api/blogs/{slug}", response_model=schemas.BlogPost)
def get_blog(slug: str, db: Session = Depends(get_db)):
    post = db.query(models.BlogPost).filter(models.BlogPost.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post

@app.post("/api/blogs", response_model=schemas.BlogPost)
def create_blog(
    blog: schemas.BlogPostCreate,
    db: Session = Depends(get_db),
    is_admin: bool = Depends(verify_admin)
):
    # Check if slug is unique
    existing = db.query(models.BlogPost).filter(models.BlogPost.slug == blog.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    
    db_blog = models.BlogPost(**blog.model_dump())
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog

@app.delete("/api/blogs/{id}")
def delete_blog(
    id: int,
    db: Session = Depends(get_db),
    is_admin: bool = Depends(verify_admin)
):
    post = db.query(models.BlogPost).filter(models.BlogPost.id == id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    db.delete(post)
    db.commit()
    return {"status": "success", "message": "Blog post deleted"}


# --- Case Study Endpoints ---

@app.get("/api/cases", response_model=List[schemas.CaseStudy])
def get_cases(db: Session = Depends(get_db)):
    return db.query(models.CaseStudy).order_by(models.CaseStudy.created_at.desc()).all()

@app.post("/api/cases", response_model=schemas.CaseStudy)
def create_case(
    case: schemas.CaseStudyCreate,
    db: Session = Depends(get_db),
    is_admin: bool = Depends(verify_admin)
):
    db_case = models.CaseStudy(**case.model_dump())
    db.add(db_case)
    db.commit()
    db.refresh(db_case)
    return db_case

@app.delete("/api/cases/{id}")
def delete_case(
    id: int,
    db: Session = Depends(get_db),
    is_admin: bool = Depends(verify_admin)
):
    case = db.query(models.CaseStudy).filter(models.CaseStudy.id == id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case study not found")
    db.delete(case)
    db.commit()
    return {"status": "success", "message": "Case study deleted"}


# --- Contact Form Endpoints ---

@app.post("/api/contact", response_model=schemas.ContactSubmission)
def submit_contact(submission: schemas.ContactSubmissionCreate, db: Session = Depends(get_db)):
    db_submission = models.ContactSubmission(**submission.model_dump())
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission

@app.get("/api/contact", response_model=List[schemas.ContactSubmission])
def get_contact_submissions(
    db: Session = Depends(get_db),
    is_admin: bool = Depends(verify_admin)
):
    return db.query(models.ContactSubmission).order_by(models.ContactSubmission.created_at.desc()).all()

@app.post("/api/contact/{id}/read")
def mark_contact_as_read(
    id: int,
    db: Session = Depends(get_db),
    is_admin: bool = Depends(verify_admin)
):
    sub = db.query(models.ContactSubmission).filter(models.ContactSubmission.id == id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Submission not found")
    sub.status = "read"
    db.commit()
    return {"status": "success", "message": "Marked contact submission as read"}


# --- Appointment Booking Endpoints ---

@app.post("/api/appointments", response_model=schemas.AppointmentRequest)
def book_appointment(appointment: schemas.AppointmentRequestCreate, db: Session = Depends(get_db)):
    # Basic check to avoid double-booking same date + time_slot
    existing = db.query(models.AppointmentRequest).filter(
        models.AppointmentRequest.date == appointment.date,
        models.AppointmentRequest.time_slot == appointment.time_slot,
        models.AppointmentRequest.status == "confirmed"
    ).first()
    if existing:
        raise HTTPException(
            status_code=400,
            detail="This slot is already booked and confirmed. Please select another slot.",
        )
    
    db_appointment = models.AppointmentRequest(**appointment.model_dump())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@app.get("/api/appointments", response_model=List[schemas.AppointmentRequest])
def get_appointments(
    db: Session = Depends(get_db),
    is_admin: bool = Depends(verify_admin)
):
    return db.query(models.AppointmentRequest).order_by(models.AppointmentRequest.created_at.desc()).all()

@app.post("/api/appointments/{id}/status")
def update_appointment_status(
    id: int,
    status_update: str,  # confirmed, cancelled
    db: Session = Depends(get_db),
    is_admin: bool = Depends(verify_admin)
):
    appt = db.query(models.AppointmentRequest).filter(models.AppointmentRequest.id == id).first()
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if status_update not in ["confirmed", "cancelled", "pending"]:
        raise HTTPException(status_code=400, detail="Invalid status")
        
    appt.status = status_update
    db.commit()
    return {"status": "success", "message": f"Appointment status updated to {status_update}"}
