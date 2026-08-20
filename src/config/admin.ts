// Emails allowed to see the admin dashboard after signing in. This list is a
// UX convenience only — it is NOT the security boundary. The real boundary is
// the Firestore Security Rules on `neurax3/hackathon`, which must restrict
// writes to these same accounts (see firestore.rules at the repo root).
export const ADMIN_EMAILS = ["staykaro26@gmail.com", "admin@neurax.dev"];
