'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { submitApplication } from "@/app/api/db/post-actions";

export default function Page() {
  const [formData, setFormData] = useState({
    event_id: 1,  // Assuming this event exists in your events table
    user_id: 'c1e2f3bf-f5f4-486a-8537-aabd69d0e876',  // Assuming this user exists in your user_profiles table
    application_type: 'volunteer',
    status: 'pending',  // Usually set to 'pending' when first submitted
    ethnic_background: 'Indian',
    gender: 'Female',
    age: 28,
    languages_spoken: ['Hindi', 'English', 'Cantonese'],
    occupation: 'Software Engineer',
    previous_experience: 'Volunteered for local food bank for 2 years, organized coding workshops for underprivileged youth.',
    motivation_statement: 'I am passionate about using my skills to empower ethnic minority youth in Hong Kong through technology education.',
    specific_skills: 'Python programming, web development, public speaking, event organization',
    availability: 'Weekends and Thursday evenings',
    emergency_contact_name: 'Rahul Sharma',
    emergency_contact_phone: '85291234567',
    preferred_area_of_work: 'Economic Opportunity',
    needs_accommodation: false,
    accommodation_details: null,
    heard_about_event: 'Through company CSR program'
  });

  const handleSubmit = async () => {
    const result = await submitApplication(formData);
    console.log(result);
  }

  return (
    <div className="w-full flex-col items-center justify-center">
      <Button
        type="submit"
        onClick={() => handleSubmit()}
      >Submit Application</Button>
    </div>
  );
}
