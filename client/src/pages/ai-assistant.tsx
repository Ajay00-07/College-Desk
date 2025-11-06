import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm the College Desk AI Compliance Assistant. I can help you with attendance policies, leave regulations, project approvals, and examination rules. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    "Can I take leave for 3 days medical?",
    "I have 68% attendance, can I write exams?",
    "What is the project approval workflow?",
    "Can attendance below 65% be condoned?",
    "Generate condonation letter for medical leave",
    "What are the examination eligibility criteria?",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Based on Attendance Rule 4.2, students with medical certificates can apply for condonation. The request should be routed through Faculty → HOD → Principal for approval. Would you like me to generate a condonation request letter?",
        "According to the examination eligibility policy, students must maintain minimum 75% attendance. However, if you have 68% attendance, you may apply for condonation citing valid reasons. The HOD can approve up to 10% shortage in special circumstances.",
        "The project approval workflow follows these stages:\n1. Student submits proposal to Faculty Advisor\n2. Faculty reviews and forwards to HOD\n3. HOD evaluates feasibility and resources\n4. Principal gives final approval\n\nTypical approval time: 3-5 working days.",
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2" data-testid="text-page-title">
          <Sparkles className="w-8 h-8 text-primary" />
          AI Compliance Assistant
        </h1>
        <p className="text-muted-foreground mt-1">
          Ask questions about policies, generate documents, and get compliance guidance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Chat Assistant</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Powered by OpenAI GPT - Trained on academic policies
              </p>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex flex-col gap-2",
                      message.role === "user" ? "items-end" : "items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-4",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                      data-testid={`message-${message.role}`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <span className="text-xs text-muted-foreground px-2">
                      {message.timestamp}
                    </span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask a question about policies or request document generation..."
                  data-testid="input-chat"
                />
                <Button onClick={handleSend} data-testid="button-send">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Suggested Prompts</h3>
            <div className="space-y-2">
              {suggestedPrompts.map((prompt, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover-elevate w-full justify-start p-3 text-xs h-auto whitespace-normal"
                  onClick={() => handlePromptClick(prompt)}
                  data-testid={`prompt-${index}`}
                >
                  {prompt}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2">Capabilities</h3>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li>• Answer policy questions with rule citations</li>
              <li>• Generate official documents</li>
              <li>• Provide compliance guidance</li>
              <li>• Explain approval workflows</li>
              <li>• Calculate attendance eligibility</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
