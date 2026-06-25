const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function fetchAPI(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `API request failed with status ${res.status}`);
  }

  return res.json();
}

// Blog functions
export async function getBlogs() {
  return fetchAPI("/api/blogs");
}

export async function getBlogBySlug(slug: string) {
  return fetchAPI(`/api/blogs/${slug}`);
}

export async function createBlogPost(blogData: any, token: string) {
  return fetchAPI("/api/blogs", {
    method: "POST",
    headers: { "X-Admin-Token": token },
    body: JSON.stringify(blogData),
  });
}

export async function deleteBlogPost(id: number, token: string) {
  return fetchAPI(`/api/blogs/${id}`, {
    method: "DELETE",
    headers: { "X-Admin-Token": token },
  });
}

// Case Studies functions
export async function getCases() {
  return fetchAPI("/api/cases");
}

export async function createCaseStudy(caseData: any, token: string) {
  return fetchAPI("/api/cases", {
    method: "POST",
    headers: { "X-Admin-Token": token },
    body: JSON.stringify(caseData),
  });
}

export async function deleteCaseStudy(id: number, token: string) {
  return fetchAPI(`/api/cases/${id}`, {
    method: "DELETE",
    headers: { "X-Admin-Token": token },
  });
}

// Submissions functions
export async function submitContactForm(formData: any) {
  return fetchAPI("/api/contact", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}

export async function getContactSubmissions(token: string) {
  return fetchAPI("/api/contact", {
    headers: { "X-Admin-Token": token },
  });
}

export async function markContactAsRead(id: number, token: string) {
  return fetchAPI(`/api/contact/${id}/read`, {
    method: "POST",
    headers: { "X-Admin-Token": token },
  });
}

// Appointment functions
export async function bookAppointment(appointmentData: any) {
  return fetchAPI("/api/appointments", {
    method: "POST",
    body: JSON.stringify(appointmentData),
  });
}

export async function getAppointments(token: string) {
  return fetchAPI("/api/appointments", {
    headers: { "X-Admin-Token": token },
  });
}

export async function updateAppointmentStatus(id: number, status: string, token: string) {
  return fetchAPI(`/api/appointments/${id}/status?status_update=${status}`, {
    method: "POST",
    headers: { "X-Admin-Token": token },
  });
}

// Auth functions
export async function verifyAdminPassword(password: string) {
  return fetchAPI("/api/admin/verify", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}
