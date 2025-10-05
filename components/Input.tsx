import { Send } from "lucide-react";
import React from "react"; // Import React for forwardRef

// Destructure props with a clean object structure for clarity
const Input = ({ input, setInput, handleKeyPress, handleSubmit, isTyping }) => {
  // Determine if the submit button should be disabled
  const isDisabled = !input.trim() || isTyping;

  return (
    // Outer container for padding and relative positioning
    <div className="py-3 relative w-full">
      <div className="flex items-center space-x-3 w-full">
        {/* Input Field */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // Use onKeyDown or onKeyUp for more reliable key handling,
          // but sticking to original prop for now
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about Drosera Network..."
          // Tailwind classes consolidated and refined
          className="
            flex-1 
            w-full 
            px-5 lg:pl-6 
            py-4 
            pr-12 md:pr-14 
            bg-white 
            border-2 border-gray-200 
            rounded-2xl 
            text-gray-800 
            placeholder-gray-500 
            focus:outline-none 
            focus:border-[#ff6900] 
            focus:ring-2 focus:ring-[#ff6900]/30 
            transition-all 
            text-base md:text-lg 
            shadow-sm
          "
          aria-label="Input field for chat message"
        />

        {/* Send Button positioned absolutely inside the input's flex container, 
            but relative to the main 'py-3 relative' div. 
            Adjusting position to be over the input's right edge for better UX. */}
        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          aria-label="Send message"
          // Refined button styling for an icon-only button
          className="
            absolute 
            right-5 top-1/2 
            transform -translate-y-1/2 
            p-2 
            bg-[#ff6900] 
            rounded-xl 
            text-white 
            hover:bg-[#e55a00] 
            disabled:opacity-40 disabled:cursor-not-allowed 
            transition-all 
            duration-200 
            hover:scale-[1.02] 
            shadow-md 
            focus:outline-none 
            focus:ring-2 focus:ring-[#ff6900]/50
          "
        >
          {/* Using a consistent size for the icon */}
          <Send className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
};

// Optionally use React.memo for performance optimization
export default React.memo(Input);
