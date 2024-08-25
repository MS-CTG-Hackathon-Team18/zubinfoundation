'use server'
import { supabase } from "@/lib/supabase";

export async function updateApplicationStatus(applicationId, newStatus) {
  try {
    const validStatuses = ['pending', 'approved', 'rejected', 'waitlisted'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error('Invalid status. Must be one of: ' + validStatuses.join(', '));
    }

    const { data, error } = await supabase
      .from('event_applications')
      .update({ status: newStatus })
      .eq('application_id', applicationId)
      .select()

    return error ? { success: false, error } : { success: true }
  } catch (error) {
    console.error('Error updating application status:', error.message)
    return null
  }
}

export async function updateEvent(eventId, updatedData) {
  try {
    const { data, error } = await supabase
      .from('events')
      .update(updatedData)
      .eq('event_id', eventId)
      .select()

    return error ? { success: false, error } : { success: true }
  } catch (error) {
    console.error('Error updating application status:', error.message)
    return null
  }
}
