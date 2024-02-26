export function firstLetterToName(name: string) {
  const str = name.toLowerCase().split(" ");

  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase();
  }
  return str.join("");
}
