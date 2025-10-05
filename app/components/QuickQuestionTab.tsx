import { quickQuestions } from "../data/questions";

const QuickQuestionTab = ({ handleQuickQuestion }) => {
  return (
    <div className="">
      <div className="flex gap-3 overflow-x-auto hide-scrollbar">
        {quickQuestions.map((question, index) => (
          <small
            key={index}
            onClick={() => handleQuickQuestion(question)}
            className="
              flex-shrink-0
              min-w-max 
              px-4 py-2 
              bg-white 
              text-gray-700 
              rounded-full 
              border-2 border-gray-200 
              text-sm font-medium 
              shadow-sm
              cursor-pointer 
              transition-all duration-200 
              hover:border-[#ff6900] 
              hover:text-[#ff6900]
              focus:outline-none 
              focus:ring-2 focus:ring-[#ff6900]/50 
              focus:ring-offset-2
            "
          >
            {question}
          </small>
        ))}
      </div>
      
    </div>
  );
};

export default QuickQuestionTab;
