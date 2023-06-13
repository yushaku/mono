export const IconMenu = ({ color = "#ffffff" }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="18"
      fill="none"
      viewBox="0 0 20 18"
    >
      <rect width="20" height="2" fill={color} rx="1"></rect>
      <rect width="20" height="2" y="8" fill={color} rx="1"></rect>
      <rect width="20" height="2" y="16" fill={color} rx="1"></rect>
    </svg>
  );
};
