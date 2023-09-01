"use server";
import { DB } from "@/libs/server/DB";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function login$(username: string, password: string) {
  //search user in db
  const user = DB.read().users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) return { ok: false, message: "Invalid username or password" };

  //sign token
  const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
    expiresIn: "8h",
  });

  //write cookie
  cookies().set({
    name: "CYPRESS497",
    value: token,
    httpOnly: true,
    path: "/",
    //secure: true  (only turn this on in production)
  });

  return { ok: true, username };
}
