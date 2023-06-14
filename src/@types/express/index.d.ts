declare global {
  namespace Express {
    interface Request {
      email: email;
      id: string;
    }
  }
}

export {};
