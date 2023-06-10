export const createShortenedLink = () => {
  let newShortenedLink = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.";

  for (let i = 0; i < 5; i++) {
    newShortenedLink += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return newShortenedLink;
};
