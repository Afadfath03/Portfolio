export function checkImageUrl(url: string): Promise<boolean> {
  if (!url) return Promise.resolve(true);
  try {
    new URL(url);
  } catch {
    return Promise.resolve(false);
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
