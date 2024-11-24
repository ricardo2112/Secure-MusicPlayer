import { openDB } from "idb";

export const openDatabase = async () => {
  return await openDB("authDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("tokens")) {
        db.createObjectStore("tokens", { keyPath: "id" });
      }
    },
  });
};

export const storeTokens = async (accessToken, refreshToken) => {
  const createdAt = new Date().getTime();
  const tokens = { id: 1, accessToken, refreshToken, createdAt };
  const db = await openDatabase();
  await db.put("tokens", tokens);
};

export const getTokens = async () => {
  const db = await openDatabase();
  return await db.get("tokens", 1);
};

export const clearTokens = async () => {
  const db = await openDatabase();
  await db.delete("tokens", 1);
};
