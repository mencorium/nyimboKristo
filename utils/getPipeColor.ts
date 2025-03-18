const getPipeColor = (input: string): string => {
    // Define an array of acceptable colors
    const colors = [
      "#FF5733", // Red-Orange
      "#FF8D1A", // Orange
      "#FFC300", // Yellow
      "#DAF7A6", // Light Green
      "#33FF57", // Green
      "#33FFF6", // Aqua
      "#3375FF", // Blue
      "#8A33FF", // Purple
      "#FF33A6", // Pink
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
  