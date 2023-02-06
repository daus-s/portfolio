/*
 * substring_at_token - function that returns a substring of the input string based on the given length
 *
 * @str: input string
 * @len: desired length of substring
 *
 * The function splits the input string into an array of words and then loops through each word to find the word that
 * crosses the desired length (i.e. the index of the word is less than the desired length and the next word's index is
 * greater than the desired length). The function then calculates the difference between the desired length and the
 * current and next indices and returns the substring starting from the beginning of the string and ending at the index
 * closest to the desired length.
 */
export function substring_at_token(str, len) {
  let arr = str.split(" ");
  let prev = 0;
  let next = 0;
  let index = 0;
  if (arr.length === 1) {
    return arr[0];
  }
  let substr_length = 0;

  arr.forEach((element) => {
    prev = index;
    index += element.length + 1;
    next = index;

    if (prev <= len && next >= len) {
      let diff_prev = len - prev;
      let diff_next = next - len;
      if (diff_prev > diff_next) {
        substr_length = next;
      } else {
        substr_length = prev;
      }
    }
  });
  const result = str.substring(0, substr_length);
  //console.log(result);
  return result;
}
