// authService.js

"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getUser = async () => {
  const accessToken = cookies().get("refreshToken")?.value;
  let getDecodedToken = null;

  if (accessToken) {
    try {
      getDecodedToken = jwtDecode(accessToken); // Decode synchronously
      console.log("Decoded Token:", getDecodedToken); // Debugging line
      return getDecodedToken; // Make sure this returns the entire user object including the role
    } catch (error) {
      console.log("Invalid token", error);
      throw new Error("Invalid token");
    }
  }
  return null; // Return null if no token is found
};

export const removeCookies = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};
