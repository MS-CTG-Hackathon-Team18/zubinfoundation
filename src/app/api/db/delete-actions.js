import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function deleteEvent(eventId) {
  const _cookies = cookies();

  try {
    const { data, error } = await supabase
      .from('events')
      .delete()
      .eq('event_id', eventId)
      .select()

    return error ? { success: false, error: error } : { success: true, data: data }
  } catch (e) {
    console.error("Error deleting event", e);
    return { success: false, error: e }
  }
}
