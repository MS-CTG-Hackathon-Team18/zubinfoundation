'use client'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { uploadEvent } from "@/app/api/db/post-actions";

export default function Page() {
  const [formData, setFormData] = useState({
    event_name: "Autumn Charity Run",
    event_date: "2024-10-15T08:00:00+00:00",
    location: "Central Park, New York City",
    category: "Sports",
    budget: "$15000",
    end_time: "2024-10-15T12:00:00+00:00",
    quota: 500
  });

  let imgFile, buffer, imgExtension;

  const handleImgUpload = async (e) => {
    imgFile = e.target.files?.[0];
    const maxSize = 5 * 1024 * 1024;

    if (imgFile) {
      imgExtension = imgFile.type.replace(/(.*)\//g, '');

      if (imgFile.size > maxSize) {
        alert("Maximum file size: 5 MB");
        imgFile.value = undefined;
      }

      if ((imgExtension !== "webp") && (imgExtension !== "jpeg") && (imgExtension !== "jpg") && (imgExtension !== "png")) {
        alert("Invalid file type");
        imgFile.value = undefined;
      }

      const bytes = await imgFile.arrayBuffer();
      buffer = (Buffer.from(bytes));
    }
  }

  const handleSubmit = async () => {
    const result = await uploadEvent(formData, buffer, imgExtension);
    console.log(result);
  }

  return (
    <div className="items-center justify-center w-full">
      <Label htmlFor="imageFile">Image File</Label>
      <Input
        id="imageFile"
        type="file"
        onChange={handleImgUpload}
        name="imageFile"
        className="w-full p-2 bg-skin-card-primary border-none rounded-lg"
      />
      <Button
        type="submit"
        onClick={() => handleSubmit()}
      >Upload Event </Button>
    </div>
  );
}
