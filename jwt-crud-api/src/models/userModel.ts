interface User {
  id: number;
  email: string;
  password: string; // In real apps, you'd hash this!
}

export const users: User[] = [];
