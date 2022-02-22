export function blobToImage(blob: any): string{
  return 'data:image/jpeg;base64,' + blob;
}

export function ConvertToLocaleDate(date: Date): string {
  const d = new Date(date);
  return d.toLocaleDateString();
}
