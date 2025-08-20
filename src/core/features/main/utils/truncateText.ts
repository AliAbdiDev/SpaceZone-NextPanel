/**
 * Function to truncate text to a specified maximum length.
 * If the text length exceeds the maximum length, it truncates the text to the maximum length and appends an ellipsis.
 * Otherwise, it returns the original text.
 * @param {string} text - The original text to be truncated.
 * @param {number} maxLength - The maximum allowed length for the truncated text.
 * @returns {string} The truncated text or the original text if no truncation is needed.
 */
export const truncateText = (text, maxLength) => {
  const convertedText = String(text);
  if (convertedText.length > maxLength) {
    return `${convertedText.slice(0, maxLength)}...`;
  }
  return convertedText;
};
