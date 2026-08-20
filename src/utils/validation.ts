export function isValidEmail(email: string): boolean {
  // A standard, robust regex for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
