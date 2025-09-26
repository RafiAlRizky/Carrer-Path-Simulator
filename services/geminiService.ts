import { GoogleGenAI, Type } from "@google/genai";
import type { CareerPath, ComparisonSummary } from '../types';

let ai: GoogleGenAI;

export const initializeGemini = (apiKey: string) => {
  ai = new GoogleGenAI({ apiKey });
};

const careerPathSchema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING, description: "Ringkasan singkat jalur karir (2-3 kalimat)." },
    skills: {
      type: Type.OBJECT,
      properties: {
        fundamental: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5 skill paling dasar." },
        intermediate: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5 skill tingkat menengah." },
        advanced: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5 skill tingkat lanjut." },
      },
      required: ["fundamental", "intermediate", "advanced"]
    },
    timeline: {
      type: Type.ARRAY,
      description: "Timeline 3-4 tahap dari junior ke senior.",
      items: {
        type: Type.OBJECT,
        properties: {
          duration: { type: Type.STRING, description: "Estimasi durasi tahap ini (e.g., '0-2 tahun')." },
          role: { type: Type.STRING, description: "Nama peran/jabatan di tahap ini (e.g., 'Junior Developer')." },
          description: { type: Type.STRING, description: "Deskripsi singkat fokus dan tanggung jawab." },
        },
        required: ["duration", "role", "description"]
      }
    },
    prospects: {
      type: Type.OBJECT,
      properties: {
        indonesia: { type: Type.STRING, description: "Estimasi rentang gaji di Indonesia (misal: 'IDR 8jt - 15jt/bulan')." },
        global: { type: Type.STRING, description: "Estimasi rentang gaji global (misal: 'USD 60k - 90k/tahun')." },
        demand: { type: Type.STRING, description: "Tingkat permintaan saat ini (e.g., 'Tinggi', 'Sedang', 'Rendah')." },
      },
      required: ["indonesia", "global", "demand"]
    },
    alternatives: {
      type: Type.ARRAY,
      description: "3-4 jalur karir alternatif yang relevan.",
      items: { type: Type.STRING }
    },
    tips: {
      type: Type.ARRAY,
      description: "3-4 tips praktis atau rekomendasi untuk memulai.",
      items: { type: Type.STRING }
    },
  },
  required: ["summary", "skills", "timeline", "prospects", "alternatives", "tips"]
};

const createPrompt = (query: string) => {
  return `
    Anda adalah seorang konselor karir ahli dan analis industri teknologi. 
    Tugas Anda adalah membuat simulasi jalur karir yang komprehensif, realistis, dan informatif berdasarkan input pengguna.
    Fokus pada data dan tren di Indonesia, namun berikan juga perspektif global.
    Input Pengguna: "${query}"

    Buatlah simulasi jalur karir yang detail berdasarkan input tersebut. Pastikan output Anda *hanya* dalam format JSON yang valid sesuai dengan skema yang diberikan.
    - Untuk gaji, berikan rentang yang realistis.
    - Untuk skill, sebutkan teknologi atau tools spesifik.
    - Untuk timeline, tunjukkan progresi yang logis.
    - Untuk tips, berikan saran yang bisa langsung diterapkan.
    JANGAN tambahkan formatting markdown (seperti \`\`\`json).
  `;
};

export const generateCareerPath = async (query: string): Promise<CareerPath> => {
  if (!ai) {
    throw new Error("Gemini AI client not initialized.");
  }

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: createPrompt(query),
        config: {
            responseMimeType: "application/json",
            responseSchema: careerPathSchema,
        },
    });

    const text = response.text;
    if (!text) {
        throw new Error("API response is empty.");
    }
    
    return JSON.parse(text) as CareerPath;

  } catch (error) {
    console.error("Error generating career path:", error);
    if (error instanceof Error && error.message.includes('SAFETY')) {
        throw new Error("Permintaan Anda diblokir karena alasan keamanan. Coba gunakan kata-kata yang lebih umum.");
    }
    throw new Error("Gagal menghasilkan simulasi karir. Silakan coba lagi.");
  }
};

const comparisonSchema = {
    type: Type.OBJECT,
    properties: {
        career1: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                pros: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 poin kelebihan utama karir pertama." }
            },
            required: ["title", "pros"]
        },
        career2: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                pros: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 poin kelebihan utama karir kedua." }
            },
            required: ["title", "pros"]
        },
        verdict: { type: Type.STRING, description: "Satu paragraf singkat (2-3 kalimat) sebagai kesimpulan atau rekomendasi akhir." }
    },
    required: ["career1", "career2", "verdict"]
};

export const compareCareerPaths = async (path1: { query: string; data: CareerPath }, path2: { query: string; data: CareerPath }): Promise<ComparisonSummary> => {
    if (!ai) {
      throw new Error("Gemini AI client not initialized.");
    }
  
    const prompt = `
    Anda adalah seorang analis karir senior yang objektif. Tugas Anda adalah membandingkan dua jalur karir berikut dan memberikan ringkasan perbandingan yang ringkas dan jelas dalam format JSON.

    Jalur Karir 1: "${path1.query}"
    - Gaji di Indonesia: ${path1.data.prospects.indonesia}
    - Permintaan: ${path1.data.prospects.demand}
    - Skill Kunci: ${[...path1.data.skills.fundamental, ...path1.data.skills.intermediate].slice(0, 5).join(', ')}

    Jalur Karir 2: "${path2.query}"
    - Gaji di Indonesia: ${path2.data.prospects.indonesia}
    - Permintaan: ${path2.data.prospects.demand}
    - Skill Kunci: ${[...path2.data.skills.fundamental, ...path2.data.skills.intermediate].slice(0, 5).join(', ')}

    Tolong analisis dan hasilkan output JSON yang valid sesuai skema. Fokus pada poin-poin kelebihan yang paling signifikan untuk masing-masing karir. Buat 'verdict' yang netral dan membantu pengguna mempertimbangkan pilihan berdasarkan kemungkinan profil mereka (misal, "Jika Anda lebih suka X, maka karir A lebih cocok.").
    JANGAN tambahkan formatting markdown.
    `;
  
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: comparisonSchema,
        }
      });
  
      const text = response.text;
      if (!text) {
        throw new Error("API response is empty for comparison.");
      }
      return JSON.parse(text) as ComparisonSummary;

    } catch (error) {
      console.error("Error comparing career paths:", error);
      throw new Error("Gagal membandingkan jalur karir. Silakan coba lagi.");
    }
  };