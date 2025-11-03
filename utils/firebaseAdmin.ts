import admin from "firebase-admin";

// This file is server-side only!
// Do not import it into client-side components.

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        // We use require() here because import() is async
        // and this file is often imported synchronously.
        require("../firebase-admin-sdk.json")
      ),
    });
  } catch (error) {
    console.error("Firebase admin initialization error", error);
  }
}

export default admin;