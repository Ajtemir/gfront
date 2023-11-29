export async function base64ToFile(base64WithoutPrefix: string, fileName: string = 'defaultImageName', type: string = 'image/jpeg') {
  const base64 = `data:image/jpeg;base64,${base64WithoutPrefix}`
  const response = await fetch(base64);
  const blob = await response.blob()
  return new File([blob], fileName, { type: type })
}
