import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true
});

const DEFAULT_ERROR_MESSAGE = "I'm here to help! What would you like to know about the calculator or insurance metrics?";

export const MASTER_PROMPT = `You are an expert insurance advisor and ROI consultant specializing in helping insurance carriers optimize their operations through data-driven insights and industry expertise.

Core Responsibilities:
1. Insurance Focus
   - Provide guidance specific to the selected Line of Business
   - Ground advice in calculator data and industry benchmarks
   - Maintain expertise focus on the specific LOB context
   - Decline non-insurance queries professionally

2. Line of Business Expertise
   - Commercial Property: Focus on property values, catastrophe exposure, and risk engineering
   - General Liability: Emphasize liability trends, claims severity, and risk management
   - Commercial Auto: Address fleet safety, claims frequency, and loss prevention
   - Workers Compensation: Focus on workplace safety, return-to-work programs, and loss control
   - Professional Liability: Discuss professional standards, risk mitigation, and claims trends
   - Surety: Address contractor qualification, financial analysis, and project management

3. Results Analysis
   When analyzing calculator results:
   - Compare metrics to LOB-specific industry standards
   - Highlight areas of strength and opportunities
   - Provide actionable recommendations based on LOB
   - Quantify potential financial improvements
   - Consider market conditions for each LOB
   - Focus on both operational and financial metrics
   - Suggest LOB-specific process improvements`;

export async function getChatCompletion(messages: Array<{ role: 'user' | 'assistant' | 'system', content: string }>) {
  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      console.warn('OpenAI API key not found. Using fallback responses.');
      return getFallbackResponse(messages[messages.length - 1]?.content);
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: MASTER_PROMPT },
        ...messages
      ],
      model: 'gpt-4-turbo-preview',
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content || DEFAULT_ERROR_MESSAGE;
  } catch (error) {
    console.error('Error getting chat completion:', error);
    return getFallbackResponse(messages[messages.length - 1]?.content);
  }
}

export async function getResultsAnalysis(lob: string, results: any) {
  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      return getDefaultAnalysis(lob);
    }

    const prompt = `As an insurance expert, analyze these results for ${lob}:
    - Combined Ratio: ${results.combinedRatio}% → ${results.combinedRatioImproved}%
    - Expense Ratio: ${results.expenseRatio}% → ${results.expenseRatioImproved}%
    - Loss Ratio: ${results.lossRatio}% → ${results.lossRatioImproved}%
    - Net Improvement: $${results.netImprovement.toLocaleString()}
    
    Provide a concise, ${lob}-specific analysis focusing on:
    1. How these metrics compare to industry standards
    2. Key opportunities for improvement
    3. Specific recommendations for this line of business`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: MASTER_PROMPT },
        { role: 'user', content: prompt }
      ],
      model: 'gpt-4-turbo-preview',
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0].message.content || getDefaultAnalysis(lob);
  } catch (error) {
    console.error('Error getting results analysis:', error);
    return getDefaultAnalysis(lob);
  }
}

function getDefaultAnalysis(lob: string): string {
  const analyses: Record<string, string> = {
    'Commercial Property': "Based on your Commercial Property results, there's potential for improvement in risk engineering and catastrophe exposure management. Consider enhancing property valuation processes and implementing more robust risk control measures.",
    'General Liability': "Your General Liability metrics suggest opportunities in claims management and risk assessment. Focus on strengthening underwriting guidelines and implementing proactive risk management programs.",
    'Commercial Auto': "The Commercial Auto results indicate areas for enhancement in fleet safety and claims frequency. Consider implementing telematics and strengthening loss prevention programs.",
    'Workers Compensation': "Your Workers Compensation metrics show potential for improvement through enhanced workplace safety programs and more efficient return-to-work processes.",
    'Professional Liability': "The Professional Liability results suggest opportunities in risk mitigation and claims handling. Consider strengthening underwriting guidelines and professional standards reviews.",
    'Surety': "Your Surety metrics indicate areas for enhancement in contractor qualification and project risk assessment. Focus on strengthening financial analysis processes."
  };

  return analyses[lob] || "Based on your results, there are opportunities for improvement in both operational efficiency and risk management. Consider implementing more robust underwriting processes and risk control measures.";
}

function getFallbackResponse(lastMessage?: string): string {
  if (!lastMessage) return DEFAULT_ERROR_MESSAGE;

  if (lastMessage.toLowerCase().includes('commercial property')) {
    return "For Commercial Property insurance, key factors include property values, catastrophe exposure, and risk engineering practices. How can I help you understand these aspects?";
  }

  if (lastMessage.toLowerCase().includes('general liability')) {
    return "In General Liability insurance, we focus on liability trends, claims severity, and risk management strategies. What specific aspects would you like to explore?";
  }

  if (lastMessage.toLowerCase().includes('commercial auto')) {
    return "Commercial Auto insurance involves fleet safety, claims frequency, and loss prevention strategies. How can I help you optimize these areas?";
  }

  if (lastMessage.toLowerCase().includes('workers compensation')) {
    return "For Workers Compensation, key considerations include workplace safety, return-to-work programs, and loss control measures. What would you like to know more about?";
  }

  if (lastMessage.toLowerCase().includes('professional liability')) {
    return "Professional Liability insurance focuses on professional standards, risk mitigation, and claims trends. How can I help you understand these elements?";
  }

  if (lastMessage.toLowerCase().includes('surety')) {
    return "In Surety, we analyze contractor qualification, financial strength, and project management capabilities. What aspects would you like to explore?";
  }

  return DEFAULT_ERROR_MESSAGE;
}