import { supabase } from "@/lib/supabase";

export async function getUserData(id = null) {
  try {
    if (id == null) {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')

      return error ? error : data;
    } else {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', id)

      return error ? error : data;
    }

  } catch (e) {
    console.error(e);
  }
}

export async function getEventDetails(event_id, params = null) {
  try {
    if (params === null) {
      const { data, error } = await supabase
        .from('events')
        .select(`*, participants:events_user_profiles_bridge(*, user_profiles(*))`)
        .eq('event_id', event_id)
        .single()

      return error ? error : data;
    } else {
      selects = params.join(', ');

      const { data, error } = await supabase
        .from('events')
        .select(selects)
        .eq('event_id', event_id)

      return error ? error : data;
    }
  } catch (e) {
    console.log(e);
  }
}
