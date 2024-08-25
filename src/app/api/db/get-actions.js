'use server'
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from 'uuid';

export async function getUserData(userId = null) {
  try {
    if (userId == null) {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')

      return error ? error : data;
    } else {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)

      return error ? error : data;
    }

  } catch (e) {
    console.error(e);
  }
}

export async function getEventDetails(eventId, params = null) {
  try {
    if (params === null) {
      const { data, error } = await supabase
        .from('events')
        .select('*, participants:events_user_profiles_bridge(*, user_profiles(*))')
        .eq('event_id', eventId)
        .single()

      return error ? error : data;
    } else {
      const selects = params.join(', ');

      const { data, error } = await supabase
        .from('events')
        .select(`${selects}, participants:events_user_profiles_bridge(*, user_profiles(*))`)
        .eq('event_id', eventId)
        .single()

      return error ? error : data;
    }
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

    return error ? error : data;
  } catch (e) {
    console.error(e);
  }
}

export async function getApplications({ eventId = null, userId = null } = {}) {
  try {
    if (userId === null && eventId === null) {
      const { data, error } = await supabase
        .from('event_applications')
        .select('*')

      return error ? error : data;
    } else if (userId === null) {
      const { data, error } = await supabase
        .from('event_applications')
        .select('*')
        .eq('event_id', eventId);

      return error ? error : data;
    } else if (eventId === null) {
      const { data, error } = await supabase
        .from('event_applications')
        .select('*')
        .eq('user_id', userId)

      return error ? error : data;
    } else {
      const { data, error } = await supabase
        .from('event_applications')
        .select('*')
        .eq('user_id', userId)
        .eq('event_id', eventId)

      return error ? error : data;
    }

  } catch (e) {
    console.error(e);
  }
}
