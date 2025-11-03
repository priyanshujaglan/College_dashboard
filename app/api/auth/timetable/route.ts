
import { db } from "@/utils/firebaseDb";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

export async function GET() {
  const snapshot = await getDocs(collection(db, "timetables"));
  const timetables = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return Response.json(timetables);
}

export async function POST(req: Request) {
  const data = await req.json();
  const docRef = await addDoc(collection(db, "timetables"), data);
  return Response.json({ id: docRef.id });
}

export async function PUT(req: Request) {
  const data = await req.json();
  const docRef = doc(db, "timetables", data.id);
  await updateDoc(docRef, data);
  return Response.json({ message: "Updated" });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await deleteDoc(doc(db, "timetables", id));
  return Response.json({ message: "Deleted" });
}
