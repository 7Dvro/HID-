import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app, strict env check. 
// Note: Since this is a generated demo, we assume the key might be missing and handle gracefully in UI.

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateIslamicGuidance = async (question: string, language: 'ar' | 'en'): Promise<string> => {
  if (!ai) {
    return language === 'ar' 
      ? "عذراً، خدمة الذكاء الاصطناعي غير مفعلة حالياً (مفتاح API مفقود)." 
      : "Sorry, AI service is currently unavailable (API Key missing).";
  }

  try {
    const systemPrompt = language === 'ar'
      ? "أنت مساعد ذكي متخصص في الثقافة الإسلامية العامة. أجب عن أسئلة المستخدم بأسلوب مهذب ومعتدل، مع التنويه دائماً أن إجابتك ليست فتوى شرعية رسمية وإنما معلومات عامة. استشهد بالقرآن والسنة حيثما أمكن."
      : "You are an AI assistant specialized in general Islamic culture. Answer user questions politely and moderately. Always clarify that your answer is general information and not a formal Fatwa. Cite Quran and Sunnah where possible.";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    return response.text || (language === 'ar' ? "لم يتم إنشاء إجابة." : "No response generated.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'ar' 
      ? "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة لاحقاً." 
      : "An error occurred while processing your request. Please try again later.";
  }
};