// utils/supabase/auth.js
export async function getUser(supabase) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    
    if (session) {
      return session.user;
    }
  
    return null;
}