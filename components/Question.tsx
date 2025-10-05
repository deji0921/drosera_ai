"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Shield,
  Zap,
  Code,
  Globe,
  Sparkles,
  Brain,
} from "lucide-react";

import Logo from "../assets/drosera-logo.png";

import Image from "next/image";

import Input from "./Input";
import QuickQuestionTab from "./QuickQuestionTab";

interface Message {
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  confidence?: number;
  sources?: string[];
}

interface AIResponse {
  answer: string;
  confidence: number;
  sources?: string[];
}

const DroseraAIQA: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content:
        "Hello! I'm Drosera AI, powered by advanced language models with deep knowledge of Drosera Network. Ask me anything about decentralized incident response, Traps, security automation, or integration details!",
      timestamp: new Date(),
      confidence: 1.0,
      sources: ["AI Knowledge Base"],
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI-powered response function
  const getAIResponse = async (query: string): Promise<AIResponse> => {
    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
          context: `You are an expert AI assistant specializing in Drosera Network, a cutting-edge decentralized incident response protocol. 

Key Knowledge Areas:
- Drosera Network is the first decentralized incident response protocol
- Uses hidden security intents called "Traps" to contain and mitigate exploits
- Operates trustlessly without backdoors or centralized control
- Provides automated security responses for DeFi protocols and dApps
- Built on Ethereum with smart contract monitoring capabilities
- Raised $1.55M in funding for Web3 security automation
- Maintains protocol sovereignty while offering automated protection

Provide detailed, accurate, and helpful responses. If asked about technical implementation, integration steps, or specific features, give comprehensive answers. Always maintain a professional but approachable tone.`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          answer: data.response,
          confidence: data.confidence || 0.85,
          sources: data.sources || [
            "AI Knowledge Base",
            "Drosera Documentation",
          ],
        };
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("AI response failed:", error);
      // Fallback response with Drosera context
      return {
        answer: generateFallbackResponse(query),
        confidence: 0.7,
        sources: ["Fallback Knowledge Base"],
      };
    }
  };

  // Enhanced fallback responses with Drosera-specific context
  const generateFallbackResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (
      lowerQuery.includes("what is drosera") ||
      lowerQuery.includes("drosera network")
    ) {
      return `Drosera Network is the world's first decentralized incident response protocol that revolutionizes Web3 security. It uses hidden security intents called "Traps" to automatically contain and mitigate exploits in real-time.

Key features:
• **Trustless Operation**: No backdoors or centralized control
• **Automated Response**: Smart contracts that monitor and react instantly
• **Protocol Sovereignty**: DeFi protocols maintain full control
• **Hidden Security**: Traps operate covertly until needed

Drosera has raised $1.55M to build this innovative security infrastructure for the decentralized web.`;
    }

    if (lowerQuery.includes("trap") || lowerQuery.includes("traps")) {
      return `Traps are the core innovation of Drosera Network - they're sophisticated smart contracts that act as hidden security guardians for your protocol.

**How Traps Work:**
• **Continuous Monitoring**: Watch on-chain data 24/7 for suspicious patterns
• **Instant Response**: Execute predetermined security actions when threats are detected
• **Hidden Operation**: Remain invisible to potential attackers until activated
• **Customizable Logic**: Tailored to each protocol's specific security needs

**Example Use Cases:**
• Detect flash loan attacks and pause vulnerable functions
• Identify unusual withdrawal patterns and trigger alerts
• Monitor governance proposals for malicious changes
• Automatically blacklist suspicious addresses

Traps give protocols automated security without sacrificing decentralization.`;
    }

    if (lowerQuery.includes("security") || lowerQuery.includes("protection")) {
      return `Drosera provides comprehensive security through its decentralized incident response architecture:

**Security Guarantees:**
• **Zero Backdoors**: Complete transparency in all operations
• **Decentralized Verification**: Multiple operators validate responses
• **Protocol Sovereignty**: You maintain full control of your assets
• **Automated Defense**: Faster response than human operators

**Protection Against:**
• Flash loan exploits
• Reentrancy attacks
• Governance attacks
• Unusual withdrawal patterns
• Price manipulation attempts
• Multi-step exploit chains

The system operates trustlessly - you don't need to trust Drosera or any centralized entity to protect your protocol.`;
    }

    if (
      lowerQuery.includes("integration") ||
      lowerQuery.includes("implement") ||
      lowerQuery.includes("how to use")
    ) {
      return `Integrating Drosera into your protocol is straightforward and maintains your sovereignty:

**Integration Steps:**
1. **Define Security Rules**: Specify what patterns should trigger responses
2. **Deploy Traps**: Smart contracts that monitor your protocol
3. **Configure Responses**: Set automated actions (pause, alert, block)
4. **Connect to Network**: Join the decentralized operator network

**Technical Requirements:**
• Smart contracts deployed on Ethereum
• Event emissions for monitoring
• Upgradeable proxy patterns (recommended)
• Gas budget for automated responses

**Developer Resources:**
• Comprehensive documentation at drosera.io
• GitHub repository with examples
• SDK for popular frameworks
• Community support channels

No code changes to your core protocol logic are required - Traps operate externally while monitoring your contracts.`;
    }

    if (
      lowerQuery.includes("cost") ||
      lowerQuery.includes("price") ||
      lowerQuery.includes("fee")
    ) {
      return `Drosera's pricing model is designed to be accessible for protocols of all sizes:

**Cost Structure:**
• **Setup**: Minimal gas costs for Trap deployment
• **Monitoring**: Extremely low ongoing costs through efficient design
• **Responses**: Only pay gas when security actions are triggered
• **No Subscriptions**: No recurring fees or centralized billing

**Economic Benefits:**
• Much cheaper than hiring full-time security teams
• Prevents losses that could cost millions in exploits
• Scales automatically with your protocol's growth
• Shared security infrastructure reduces individual costs

The decentralized model means you're not paying for expensive centralized security infrastructure - just the actual computational costs of protection.`;
    }

    return `I'm here to help with questions about Drosera Network! I can provide detailed information about:

• **Core Concepts**: What Drosera is and how it works
• **Traps**: Smart contract security automation
• **Integration**: How to add Drosera to your protocol  
• **Security Features**: Trustless incident response
• **Technical Details**: Implementation and architecture
• **Business Information**: Funding, team, and roadmap

What specific aspect of Drosera Network would you like to explore? I'm powered by AI and have comprehensive knowledge about decentralized security protocols.`;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!input.trim()) return;

    const userMessage: Message = {
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(currentInput);
      const botMessage: Message = {
        type: "bot",
        content: aiResponse.answer,
        timestamp: new Date(),
        confidence: aiResponse.confidence,
        sources: aiResponse.sources,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        type: "bot",
        content:
          "I encountered an error processing your question. Please try again or rephrase your query.",
        timestamp: new Date(),
        confidence: 0.3,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleQuickQuestion = (question: string): void => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Chat Container */}
      <div className="shadow-xl overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-center mb-6">
            <Image
              src={Logo}
              alt="Drosera Logo"
              className="w-20 h-20 rounded-lg shadow-lg"
            />
          </div>

          {/* Messages */}
          <div className="h-fit overflow-y-auto p-8 space-y-6 bg-gray-50/30">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex lg:flex-row flex-col gap-2 items-start space-x-4 max-w-2xl ${
                    message.type === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`p-4 rounded-2xl shadow-md ${
                      message.type === "user"
                        ? "bg-[#ff6900] text-white"
                        : "bg-white border-2 border-gray-100"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-6 h-6 text-white" />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Bot className="w-6 h-6 text-[#ff6900]" />
                        {message.confidence && message.confidence > 0.8 && (
                          <Sparkles className="w-4 h-4 text-[#ff6900]" />
                        )}
                      </div>
                    )}
                  </div>
                  <div
                    className={`p-6 rounded-3xl shadow-lg max-w-xl ${
                      message.type === "user"
                        ? "bg-[#ff6900] text-white"
                        : "bg-white border-2 border-gray-100"
                    }`}
                  >
                    <p
                      className={`leading-relaxed whitespace-pre-line ${
                        message.type === "user" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {message.content}
                    </p>

                    {message.type === "bot" && message.confidence && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex lg:flex-row flex-col lg:items-center items-start gap-3 justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-[#ff6900] rounded-full"></div>
                            <span className="text-gray-600">
                              Confidence: {Math.round(message.confidence * 100)}
                              %
                            </span>
                          </div>
                          {message.sources && (
                            <span className="text-gray-500 text-xs">
                              Sources: {message.sources.join(", ")}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-4">
                  <div className="p-4 rounded-2xl bg-white border-2 border-gray-100 shadow-md">
                    <Bot className="w-6 h-6 text-[#ff6900]" />
                  </div>
                  <div className="p-6 rounded-3xl bg-white border-2 border-gray-100 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-[#ff6900] rounded-full animate-bounce"></div>
                        <div
                          className="w-3 h-3 bg-[#ff6900] rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-3 h-3 bg-[#ff6900] rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-gray-500 ml-2">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />

            <QuickQuestionTab handleQuickQuestion={handleQuickQuestion} />
            <Input
              input={input}
              setInput={setInput}
              handleKeyPress={handleKeyPress}
              handleSubmit={handleSubmit}
              isTyping={isTyping}
            />
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-8 text-center">
          <p className="text-gray-600 leading-relaxed">
            Powered by AI with comprehensive knowledge of Drosera Network
            <br />
            <a
              href="https://drosera.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6900] hover:text-[#e55a00] underline font-semibold transition-colors"
            >
              Visit drosera.io
            </a>{" "}
            for official documentation
          </p> 
        </div>*/}
      </div>
    </div>
  );
};

export default DroseraAIQA;
