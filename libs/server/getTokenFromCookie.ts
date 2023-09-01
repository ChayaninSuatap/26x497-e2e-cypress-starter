import { cookies } from "next/headers";

export function getTokenFromCookie() {
  const cookieData = cookies().get("CYPRESS497");
  if (!cookieData) return null;
  return cookieData.value;
}
