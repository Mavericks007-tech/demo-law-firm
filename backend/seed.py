import os
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from database import SessionLocal, Base, engine
import models

def seed_db():
    print("Initializing database tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if database already has blogs
    if db.query(models.BlogPost).first() is not None:
        print("Database already contains data. Skipping seeding.")
        db.close()
        return

    print("Seeding blog posts...")
    blogs = [
        models.BlogPost(
            title="Understanding Corporate Compliance under the Companies Act 1994",
            slug="understanding-corporate-compliance-companies-act-1994",
            summary="A comprehensive guide to annual filings, share transfer procedures, and director compliance obligations for corporate entities operating in Bangladesh.",
            content="""<p>Operating a corporation in Bangladesh requires meticulous attention to the compliance guidelines set out in the <strong>Companies Act 1994</strong>. For startups and multinational companies alike, remaining in good standing with the Registrar of Joint Stock Companies and Firms (RJSC) is vital to avoiding steep fines, legal disputes, or involuntary dissolution.</p>
<h3>1. Annual General Meeting (AGM) & Filings</h3>
<p>Every company registered under the Act must hold its AGM within 18 months of incorporation, and subsequently every calendar year (not exceeding 15 months since the last AGM). The audited accounts, along with Schedule X (List of Shareholders and Directors), must be submitted to the RJSC within 30 days of the AGM.</p>
<h3>2. Transfer of Shares and Changes in Board Composition</h3>
<p>Any changes to the company board or transferring shares between existing or new investors require filing Form 117 (Transfer of Shares) and Form XII (Particulars of Directors) respectively. Failing to record these with the RJSC leads to disputes concerning corporate ownership and rights.</p>
<h3>3. Corporate Governance and Transparency</h3>
<p>Modern businesses must maintain structured books of accounts and minutes of board meetings. Advocate Munzur Morshed offers comprehensive legal advisory services to structure board resolutions, draft joint-venture agreements, and perform regulatory audits to keep your enterprise secure and fully compliant.</p>""",
            category="Corporate Law",
            read_time="5 min read",
            status="published",
            created_at=datetime.utcnow() - timedelta(days=5)
        ),
        models.BlogPost(
            title="Writ Jurisdiction: Seeking Remedies from the High Court Division",
            slug="writ-jurisdiction-high-court-division-remedies",
            summary="An analysis of the types of writs available under Article 102 of the Constitution of Bangladesh and when citizens can file them for administrative violations.",
            content="""<p>Article 102 of the Constitution of Bangladesh empowers the High Court Division to issue directives, orders, and writs to enforce fundamental rights and ensure public authorities stay within their legal boundaries. For individuals facing arbitrary administrative actions, writs are an essential shield.</p>
<h3>Types of Writs Available</h3>
<ul>
  <li><strong>Habeas Corpus:</strong> Securing the release of an individual detained unlawfully.</li>
  <li><strong>Mandamus:</strong> Compelling a public authority to perform a duty they are legally obligated to complete.</li>
  <li><strong>Prohibition:</strong> Restraining a tribunal or court from exceeding its legal jurisdiction.</li>
  <li><strong>Certiorari:</strong> Quashing an illegal order passed by an administrative body or lower court.</li>
  <li><strong>Quo Warranto:</strong> Challenging the legal authority of any person holding a public office.</li>
</ul>
<p>Filing a writ petition requires proving that there is no alternative, equally efficacious remedy available under standard laws, and showing direct infringement of legal or fundamental rights. Advocate Munzur Morshed has represented numerous corporate bodies and private citizens in the High Court, securing vital injunctions and orders against arbitrary administrative actions.</p>""",
            category="Constitutional Law",
            read_time="7 min read",
            status="published",
            created_at=datetime.utcnow() - timedelta(days=12)
        ),
        models.BlogPost(
            title="Navigating Commercial Arbitration and Dispute Resolution in Dhaka",
            slug="commercial-arbitration-dispute-resolution-dhaka",
            summary="How the Arbitration Act 2001 operates, from drafting enforceable arbitration clauses to executing local and foreign arbitral awards.",
            content="""<p>Commercial litigation in the traditional courts can sometimes span several years due to backlog. For businesses, commercial arbitration is the preferred mechanism for resolving disputes swiftly, confidentially, and with expert arbitrators.</p>
<h3>Drafting an Enforceable Arbitration Clause</h3>
<p>To ensure disputes bypass traditional court backlogs, contracts should contain an explicit arbitration clause defining the seat of arbitration, the applicable laws, and the number of arbitrators. A poorly drafted clause can itself lead to extensive litigation regarding its validity.</p>
<h3>Enforcement of Awards</h3>
<p>The Arbitration Act 2001 governs local arbitrations and provides a framework for enforcing both domestic and foreign arbitral awards in Bangladesh. Partnering with a skilled litigator like Advocate Munzur Morshed ensures your business interests are shielded, and awards are executed effectively through judicial intervention when required.</p>""",
            category="Dispute Resolution",
            read_time="6 min read",
            status="published",
            created_at=datetime.utcnow() - timedelta(days=20)
        )
    ]
    
    for b in blogs:
        db.add(b)
        
    print("Seeding case studies...")
    cases = [
        models.CaseStudy(
            title="Favorable Writ Judgment Against Arbitrary Tax Assessment",
            client_industry="Manufacturing / Industrial Sector",
            challenge="A leading industrial manufacturer faced an arbitrary and inflated tax assessment from the revenue authority, exceeding their actual liability by millions. Standard administrative appeals were stuck in procedural delays, threatening to freeze their operations.",
            solution="Advocate Munzur Morshed filed a Writ Petition under Article 102 in the High Court Division, demonstrating a clear violation of natural justice and procedural rules. A stay order was secured on the recovery notice, followed by a final judgment directing the authority to reassess standard liabilities.",
            outcome="The arbitrary tax demand was successfully quashed, saving the client over 12 million BDT and preventing disruption to manufacturing lines.",
            created_at=datetime.utcnow() - timedelta(days=15)
        ),
        models.CaseStudy(
            title="Successful Restructuring & RJSC Dispute Resolution",
            client_industry="Technology Services & FinTech",
            challenge="Two co-founders of an expanding FinTech startup were locked in a board control dispute. Unauthorized share allocations had occurred, and filings at the RJSC were blocked due to active objections.",
            solution="We initiated a company petition before the High Court Division under Section 233 of the Companies Act 1994 for protection against oppression and mismanagement. Concurrent mediation was conducted to negotiate a structured buyout of the minority stakeholder.",
            outcome="The dispute was resolved within 6 months. The startup completed its seed investment round with clean company books, and the board restructured harmoniously.",
            created_at=datetime.utcnow() - timedelta(days=30)
        )
    ]
    
    for c in cases:
        db.add(c)
        
    print("Seeding contact submissions and appointments...")
    submissions = [
        models.ContactSubmission(
            name="Rahat Kabir",
            email="rahat.kabir@example.com",
            phone="+8801711223344",
            subject="Company Registration and Joint Venture Drafting",
            message="We are setting up a joint venture with a logistics firm from Singapore and need assistance in drafting the shareholder agreement and getting approvals from BIDA and RJSC. Let us know when Advocate Morshed is available.",
            status="unread",
            created_at=datetime.utcnow() - timedelta(hours=5)
        ),
        models.ContactSubmission(
            name="Tasnim Jahan",
            email="tasnim.j@example.com",
            phone="+8801822334455",
            subject="Land Title Dispute in Gulshan",
            message="My family is facing a land mutation dispute due to conflicting records in the land office. We have the registry deeds from 1985. We would like a legal consultation.",
            status="read",
            created_at=datetime.utcnow() - timedelta(days=2)
        )
    ]
    
    for s in submissions:
        db.add(s)
        
    appointments = [
        models.AppointmentRequest(
            client_name="Asif Rahman",
            email="asif@techbangla.net",
            phone="+8801555223344",
            date=(datetime.utcnow() + timedelta(days=2)).strftime("%Y-%m-%d"),
            time_slot="10:30 AM",
            details="Discuss corporate restructure and IP protection for our proprietary software suite.",
            status="pending",
            created_at=datetime.utcnow() - timedelta(hours=12)
        ),
        models.AppointmentRequest(
            client_name="Nusrat Jahan",
            email="nusrat@example.com",
            phone="+8801999887766",
            date=(datetime.utcnow() + timedelta(days=3)).strftime("%Y-%m-%d"),
            time_slot="03:00 PM",
            details="Reviewing family trust documentation and deeds of agreement.",
            status="confirmed",
            created_at=datetime.utcnow() - timedelta(days=1)
        )
    ]
    
    for a in appointments:
        db.add(a)
        
    db.commit()
    db.close()
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_db()
