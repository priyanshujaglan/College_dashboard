'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassCard } from "./ClassCard";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/firebaseDb";

export const UpcomingClasses = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true); // for clarity

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 Fetching data from Firestore...");
        console.log("✅ Firestore object:", db);
        const q = query(
          collection(db, "timetables"),
          where("status", "==", "today") // ✅ make sure your field name is correct
        );

        const querySnapshot = await getDocs(q);

        console.log("📄 Query snapshot size:", querySnapshot.size);

        if (querySnapshot.empty) {
          console.warn("⚠️ No matching documents found.");
        }

        const data = querySnapshot.docs.map((doc) => {
          console.log("✅ Document found:", doc.id, doc.data());
          return { id: doc.id, ...doc.data() };
        });

        setTimetable(data);
      } catch (error) {
        console.error("❌ Error fetching timetable:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <CardTitle className="text-2xl">Today's Classes</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {timetable.length > 0 ? (
            timetable.map((classItem, idx) => (
              <ClassCard key={classItem.id} {...classItem} isUpcoming={idx === 0} />
            ))
          ) : (
            <p>⚠️ No classes found for today.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
