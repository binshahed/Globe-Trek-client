export type TUserData = {
  data: {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    photoUrl: string;
    subscriptions: "free" | "premium";
    role: string;
    address: string;
    followers: string[];
    following: string[];
  };
  iat: number;
  exp: number;
};

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
  subscriptions: "free" | "premium";
  role: string;
  address: string;
  followers: string[];
  following: string[];
};
