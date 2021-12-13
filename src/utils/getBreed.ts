export function getBreed(url: string): string {
  const arr = url.split("/");
  // console.log(arr[4]);
  return arr[4];
}
