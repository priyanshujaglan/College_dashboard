"use client";
import { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseDb";

export default function AdminTimetablePage() {
  const [form, setForm] = useState({
    subject: "",
    code: "",
    faculty: "",
    time: "",
    duration: "",
    location: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "timetables"), form);
    alert("Timetable entry added!");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Timetable Entry</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={(form as any)[key]}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
}
