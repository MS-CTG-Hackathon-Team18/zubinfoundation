'use server'
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from 'uuid';

export async function getUserDetails(userId = null) {
  try {
    let query = supabase.from('user_profiles').select('*');

    if (userId !== null)
      query = query.eq('user_id', userId);

    const { data, error } = await query;

    return error ? { success: false, error: error } : { success: true, data: data };
  } catch (e) {
    console.error(e);
  }
}

export async function getEventDetails({ eventId = null, params = null } = {}) {
  try {
    let query = supabase.from('events').select('*, participants:events_user_profiles_bridge(*, user_profiles(*))');

    if (params !== null) {
      const selects = params.join(', ');
      query = query.select(`${selects}, participants:events_user_profiles_bridge(*, user_profiles(*))`)
    }

    if (eventId !== null)
      query = query.eq('event_id', eventId).single();

    const { data, error } = await query;

    return error ? { success: false, error: error } : { success: true, data: data }
  } catch (e) {
    console.log(e);
  }
}

export async function getUserEvents(userId) {
  try {
    const { data, error } = await supabase
      .from('events_user_profiles_bridge')
      .select(`user_type, user_events:events(*)`)
      .eq('user_id', userId)

    return error ? { success: false, error: error } : { success: true, data: data };
  } catch (e) {
    console.error(e);
  }
}

export async function getApplications({ eventId = null, userId = null } = {}) {
  try {
    let query = supabase.from('event_applications').select('*')

    if (eventId !== null) {
      query = query.eq('event_id', eventId)
    }

    if (userId !== null) {
      query = query.eq('user_id', userId)
    }

    const { data, error } = await query

    return error ? { success: false, error: error } : { success: true, data: data };
  } catch (e) {
    console.error(e);
  }
}
