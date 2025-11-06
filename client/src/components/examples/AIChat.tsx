import AIChat from '../AIChat';

export default function AIChatExample() {
  const prompts = [
    "Can I take leave for 3 days medical?",
    "I have 68% attendance, can I write exams?",
    "What is the attendance condonation policy?",
  ];

  return <AIChat suggestedPrompts={prompts} />;
}
