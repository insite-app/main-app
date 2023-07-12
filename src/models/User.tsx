export interface User {
  id: number;
  user_type: string;
  userAuth: {
    username: string;
  };
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}
