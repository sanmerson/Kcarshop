export function fileValidation(str: string) {
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  if (!allowedExtensions.exec(str)) {
    return false;
  }
  return true;
}
