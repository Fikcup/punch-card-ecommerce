// ext dependencies
import * as jwt from "jsonwebtoken";

const secret = process.env.TOKEN_SECRET;

interface DecodedToken {
  userId: number;
  email: string;
}

export const generateToken = (userId: number, email: string): string => {
  // Define jwt payload with userId and email
  const payload = {
    userId: userId,
    email: email,
  };

  // Sign the token with the payload and secret key
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  return token;
};

export const getUserIdFromJWT = (
  token: string,
  secret: string
): number | null => {
  try {
    const decodedToken = jwt.verify(token, secret) as DecodedToken;
    return decodedToken.userId;
  } catch (error) {
    // Token is not valid or has expired
    console.error("Error decoding JWT:", error.message);
    return null;
  }
};

export const verifyToken = (
  token: string
): { valid: boolean; decoded?: DecodedToken } => {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, secret) as DecodedToken;

    // If verification is successful, return the decoded payload
    return { valid: true, decoded };
  } catch (error) {
    // If token is invalid, return false
    return { valid: false };
  }
};
