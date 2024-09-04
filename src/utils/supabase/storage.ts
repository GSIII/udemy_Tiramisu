export function getImgUrl(path) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${path}`;
}
export function getBadgeImgUrl(name) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/admin/badge/${name}`;
}
