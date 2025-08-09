
interface TooltipProps {
  text: string;
}

export const Tooltip = ({ text }: TooltipProps) => {
  return (
    <div className="relative inline-block group">
      {/* Info Icon */}
      <svg
        className="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-help"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Information"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
      
      {/* Tooltip Bubble */}
      <div className="absolute z-10 invisible group-hover:visible group-focus-within:visible opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded-panel whitespace-nowrap max-w-xs">
        {text}
        {/* Arrow pointing down */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
          <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900 dark:border-t-gray-700"></div>
        </div>
      </div>
    </div>
  );
};
