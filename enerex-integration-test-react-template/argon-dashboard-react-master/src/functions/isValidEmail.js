export function isValidEmail(email) {
    if (!email) return false; // Empty check
    email = email.trim(); // Remove leading/trailing spaces
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  