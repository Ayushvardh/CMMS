const PROFILE_KEY = "cms_profile";

export function getProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function updateProfile(patch) {
  const current = getProfile();
  const next = { ...current, ...patch };
  saveProfile(next);
  return next;
}