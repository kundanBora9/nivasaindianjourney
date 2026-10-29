export interface EnquiryPayload {
  source: 'enquiry-modal' | 'contact-page';
  fullName: string;
  phone: string;
  email?: string;
  destination?: string;
  travelDate?: string;
  travellers?: string;
  hotelCategory?: string;
  message?: string;
  /** honeypot: must stay empty. Bots fill it in. */
  website?: string;
}

/** Sends the enquiry to /api/enquiry (which emails it via Gmail SMTP). Throws an Error with a visitor-friendly message. */
export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    let data: { ok?: boolean; error?: string } = {};
    try {
      data = await res.json();
    } catch {
      /* non-JSON response */
    }
    if (!res.ok || !data.ok) {
      throw new Error(data.error || 'Something went wrong. Please call or WhatsApp us on +91 8126716179.');
    }
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      throw new Error('The request timed out. Please try again or call us on +91 8126716179.');
    }
    if (err instanceof TypeError) {
      throw new Error('Network error. Please check your connection or call us on +91 8126716179.');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
