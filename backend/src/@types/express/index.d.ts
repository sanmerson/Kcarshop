declare global {
  namespace Express {
    interface Request {
      user: {
        id: number | any;
        type: string;
      };
    }
  }
}

export {};
