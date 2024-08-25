'use server'
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from 'uuid';

export async function uploadEvent(data, imageFile, imageExtension, videoFile = null, videoExtension = null) {
  const imageBuffer = Buffer.from(imageFile);
  const imageFileName = uuidv4() + '.' + imageExtension;

  try {
    const { imageUploadData, error: imageUploadError } = await supabase
      .storage
      .from('event_images')
      .upload(imageFileName, imageBuffer, {
        cacheControl: '3600',
        upsert: false
      })

    if (imageUploadError) return imageUploadError;


    const { data: { publicUrl: imageUrl } } = supabase
      .storage
      .from('event_images')
      .getPublicUrl(imageFileName)


    data.image_url = imageUrl;

    const { error: uploadEventError } = await supabase
      .from('events')
      .insert([data])
      .select()

    return uploadEventError ? { success: false, error: uploadEventError } : { success: true };
  } catch (e) {
    console.error(e);
  }
}

export async function enrollUserToEvent(eventId, userId, userType) {
  try {
    const { error } = await supabase
      .from('events_user_profiles_bridge')
      .insert([{ event_id: eventId, user_id: userId, user_type: userType }])
      .select()

    return error ? { success: false, error } : { success: true }
  } catch (e) {
    console.error(e);
  }
}

export async function submitApplication(data) {
  try {
    const { error } = await supabase
      .from('event_applications')
      .insert([data])
      .select()

    return error ? { success: false, error } : { success: true }
  } catch (e) {
    console.error(e);
  }
}

export async function uploadVideo(videoFile, videoExtension) {
  const videoBuffer = Buffer.from(videoFile);
  const videoFileName = uuidv4() + '.' + videoExtension;

  const { videoUploadData, error: videoUploadError } = await supabase
    .storage
    .from('event_videos')
    .upload(videoFileName, videoBuffer, {
      cacheControl: '3600',
      upsert: false
    })

  if (videoUploadError) console.error(videoUploadError);

  const { data: { publicUrl: videoUrl } } = supabase
    .storage
    .from('event_videos')
    .getPublicUrl(videoFileName)

  data.training_url = videoUrl;
}

