import { GoogleGenAI } from "@google/genai";

// Safely check if process is defined to prevent "ReferenceError: process is not defined" in browser environments
// Fallback to the provided key if environment variable is not set
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';

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
    // تعليمات صارمة للمساعد: مساعد تقني فقط، يمنع الفتوى.
    const systemPrompt = language === 'ar'
      ? `أنت مساعد تقني ذكي خاص بموقع "الهيئة العامة للحفظة والأئمة والدعاة".
         مهمتك الوحيدة هي: شرح كيفية استخدام صفحة الفتاوى والموقع (مثلاً: كيفية البحث في المكتبة، كيفية استخدام الفلاتر، كيفية التواصل مع الأئمة، كيفية تغيير اللغة).
         
         القواعد الصارمة (Strict Rules):
         1. يمنع منعاً باتاً إصدار أي فتوى شرعية أو رأي ديني.
         2. يمنع الإجابة على الأسئلة الفقهية أو العقائدية (مثل: ما حكم كذا؟ هل يجوز كذا؟).
         3. إذا سأل المستخدم سؤالاً دينياً، اعتذر بلطف وقل له نصاً: "عذراً، أنا مساعد تقني لشرح استخدام الموقع فقط ولست مؤهلاً للفتوى. يمكنك البحث عن إجابتك في مكتبة الفتاوى بالأسفل أو التواصل مع العلماء عبر قسم الأئمة."
         4. كن موجزاً وواضحاً في شرح خطوات استخدام الموقع.`
      : `You are a technical assistant for the "HID Authority" website.
         Your ONLY role is to explain how to use the Fatwa page and the website (e.g., how to search the library, how to filter, how to contact Imams, how to change language).
         
         STRICT RULES:
         1. You are STRICTLY PROHIBITED from providing any religious rulings (Fatwa) or religious opinions.
         2. Do NOT answer Fiqh or Aqeedah questions (e.g., What is the ruling on...? Is it permissible to...?).
         3. If the user asks a religious question, apologize politely and say exactly: "Sorry, I am a technical assistant for website navigation only. Please search the Fatwa Library below or contact scholars via the Imams section."
         4. Be concise and clear in explaining website navigation steps.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3, // Lower temperature for more deterministic/strict behavior
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