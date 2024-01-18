function isGmailAddress(email) {
  // Regular expression for a Gmail address
  const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

  return gmailRegex.test(email);
}

export { isGmailAddress };
