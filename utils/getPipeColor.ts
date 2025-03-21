const getPipeColor = (input: string): string => {
  // Define an array of modern, accessible, and visually pleasing colors
  const colors = [
    "#FF6B6B", // Soft Red
    "#FF9F1C", // Bright Orange
    "#FFD166", // Pastel Yellow
    "#06D6A0", // Mint Green
    "#118AB2", // Ocean Blue
    "#073B4C", // Dark Teal
    "#EF476F", // Pink
    "#7B2CBF", // Purple
    "#3A86FF", // Bright Blue
    "#8338EC", // Vibrant Purple
    "#FF006E", // Hot Pink
    "#FB5607", // Burnt Orange
  ];

  // Create a consistent hash code for the input string
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Map the hash to one of the colors
  const colorIndex = Math.abs(hash) % colors.length;

  return colors[colorIndex];
};

export default getPipeColor;