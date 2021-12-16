export default function writeDogBreed(breedName: string): string {
  const resultString: string[] = [];
  breedName.split("-").forEach((el) =>
    resultString.push(
      el.split("")[0].toUpperCase() +
        el
          .split("")
          .splice(1, el.split("").length - 1)
          .join("")
    )
  );

  return resultString.reverse().join(" ");
}
