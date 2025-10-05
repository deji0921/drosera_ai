// app/api/ai-chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Comprehensive Drosera Network knowledge base for AI context
const DROSERA_CONTEXT = `
You are an expert AI assistant specialized in Drosera Network, the world's first decentralized incident response protocol.

CORE KNOWLEDGE ABOUT DROSERA NETWORK:

## What is Drosera Network?
- First and only decentralized incident response protocol
- Uses hidden security intents called "Traps" to contain and mitigate exploits
- Automation protocol that simplifies creating monitoring systems for dApps
- Built on Ethereum with EVM compatibility
- Raised $1.55 million in funding for Web3 security model

## Key Features:
- **Trustless Operation**: No backdoors, no centralized control
- **Protocol Sovereignty**: Users maintain full control of their assets
- **Automated Response**: Real-time threat detection and mitigation
- **Hidden Security**: Traps operate covertly until needed
- **Decentralized**: Multiple operators validate responses

## How Traps Work:
- Smart contracts that monitor on-chain data 24/7
- Trigger automated responses when suspicious patterns detected
- Can pause contracts, block addresses, or send alerts
- Customizable for each protocol's specific security needs
- Hidden from potential attackers until activated

## Security Capabilities:
- Flash loan attack prevention
- Reentrancy exploit detection
- Unusual withdrawal pattern monitoring
- Governance attack protection
- Price manipulation detection
- Multi-step exploit chain interruption

## Integration Process:
1. Define security rules and patterns to monitor
2. Deploy Traps (smart contracts) to monitor your protocol
3. Configure automated response actions
4. Connect to the decentralized operator network
5. No changes to core protocol logic required

## Technical Architecture:
- Built on Ethereum blockchain
- Smart contract-based monitoring system
- Event-driven response mechanisms
- Gas-efficient operations
- Upgradeable proxy patterns supported

## Business Model:
- Minimal setup costs (just gas for deployment)
- Pay-per-use for triggered responses
- No recurring subscription fees
- Much cheaper than hiring security teams
- Shared infrastructure reduces costs

## Developer Resources:
- Comprehensive documentation at drosera.io
- Active GitHub repository with examples
- SDK for popular frameworks
- Community support channels
- Open source components

INSTRUCTIONS:
- Provide detailed, accurate responses about Drosera Network
- Use technical depth when appropriate
- Explain complex concepts clearly
- Include practical examples when helpful
- Maintain professional but approachable tone
- If unsure about specific details, acknowledge uncertainty
- Focus on Drosera's unique value propositions
- Emphasize trustless and decentralized nature
`;

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Combine custom context with Drosera knowledge
    const fullContext = `${DROSERA_CONTEXT}\n\n${context || ""}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Use latest GPT-4 model
      messages: [
        {
          role: "system",
          content: fullContext,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("No response generated");
    }

    // Calculate confidence based on response characteristics
    const confidence = calculateConfidence(message, response);

    return NextResponse.json({
      response,
      confidence,
      sources: ["OpenAI GPT-4", "Drosera Network Knowledge Base"],
      usage: {
        promptTokens: completion.usage?.prompt_tokens,
        completionTokens: completion.usage?.completion_tokens,
        totalTokens: completion.usage?.total_tokens,
      },
    });
  } catch (error) {
    console.error("AI chat error:", error);

    // Provide specific error handling
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        return NextResponse.json(
          { error: "AI service configuration error" },
          { status: 500 }
        );
      }
      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          { error: "Too many requests. Please try again in a moment." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to generate AI response" },
      { status: 500 }
    );
  }
}

// Calculate confidence score based on various factors
function calculateConfidence(question: string, response: string): number {
  let confidence = 0.8; // Base confidence

  const questionLower = question.toLowerCase();
  const responseLower = response.toLowerCase();

  // Higher confidence for direct Drosera-related questions
  const droseraKeywords = [
    "drosera",
    "trap",
    "traps",
    "incident response",
    "decentralized security",
  ];
  const hasdroseraKeywords = droseraKeywords.some((keyword) =>
    questionLower.includes(keyword)
  );

  if (hasdroseraKeywords) {
    confidence += 0.1;
  }

  // Check if response contains specific Drosera terminology
  const responseKeywords = [
    "trap",
    "drosera",
    "incident response",
    "trustless",
    "automation",
  ];
  const responseHasKeywords = responseKeywords.some((keyword) =>
    responseLower.includes(keyword)
  );

  if (responseHasKeywords) {
    confidence += 0.05;
  }

  // Lower confidence for very short responses
  if (response.length < 100) {
    confidence -= 0.2;
  }

  // Higher confidence for detailed responses
  if (response.length > 300) {
    confidence += 0.05;
  }

  // Check for uncertainty phrases
  const uncertaintyPhrases = [
    "i'm not sure",
    "i don't know",
    "might be",
    "possibly",
  ];
  const hasUncertainty = uncertaintyPhrases.some((phrase) =>
    responseLower.includes(phrase)
  );

  if (hasUncertainty) {
    confidence -= 0.2;
  }

  // Ensure confidence is between 0 and 1
  return Math.max(0.3, Math.min(1.0, confidence));
}

// Alternative API route using Anthropic Claude (if you prefer)
// Uncomment and use this instead if you have Claude API access

/*
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    const fullContext = `${DROSERA_CONTEXT}\n\n${context || ''}`;

    const completion = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 800,
      messages: [
        {
          role: "user",
          content: `${fullContext}\n\nUser Question: ${message}`
        }
      ]
    });

    const response = completion.content[0]?.text;
    
    if (!response) {
      throw new Error('No response generated');
    }

    const confidence = calculateConfidence(message, response);

    return NextResponse.json({
      response,
      confidence,
      sources: ['Anthropic Claude', 'Drosera Network Knowledge Base'],
    });

  } catch (error) {
    console.error('Claude API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}
*/
