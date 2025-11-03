"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClassCard } from "@/components/ClassCard";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseDb";


export default function ClassListPage({ classes }: { classes: any[] }) {
  const [selectedClass, setSelectedClass] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass.id) return;
    setLoading(true);
    try {
      const ref = doc(db, "classes", selectedClass.id);
      await updateDoc(ref, {
        subject: selectedClass.subject,
        time: selectedClass.time,
        duration: selectedClass.duration,
        faculity: selectedClass.faculity,
        location: selectedClass.location,
      });
      alert("Class updated successfully ✅");
      setSelectedClass(null);
    } catch (err) {
      console.error(err);
      alert("Error updating class ❌");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <ClassCard key={cls.id} {...cls} onClick={(data) => setSelectedClass(data)} />
        ))}
      </div>

      {/* 🪟 Update Form Modal */}
      <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Class</DialogTitle>
          </DialogHeader>

          {selectedClass && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <Input
                value={selectedClass.subject}
                onChange={(e) =>
                  setSelectedClass({ ...selectedClass, subject: e.target.value })
                }
                placeholder="Subject"
              />
              <Input
                value={selectedClass.faculity}
                onChange={(e) =>
                  setSelectedClass({ ...selectedClass, faculity: e.target.value })
                }
                placeholder="Faculty"
              />
              <Input
                value={selectedClass.time}
                onChange={(e) =>
                  setSelectedClass({ ...selectedClass, time: e.target.value })
                }
                placeholder="Time"
              />
              <Input
                value={selectedClass.location}
                onChange={(e) =>
                  setSelectedClass({ ...selectedClass, location: e.target.value })
                }
                placeholder="Location"
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Class"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
