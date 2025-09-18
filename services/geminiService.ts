import { GoogleGenAI, Type } from "@google/genai";
import type { CareerPath } from '../types';

const systemInstruction = `
Anda adalah Career Path Simulator, sebuah alat yang membantu pengguna menjelajahi kemungkinan jalur karir dari berbagai latar belakang, minat, dan keterampilan.
Tugas Anda adalah memberikan jawaban dalam format JSON yang terstruktur sesuai skema yang diberikan, berdasarkan input dari pengguna.
Berikan jawaban dalam Bahasa Indonesia.

Struktur output yang harus Anda hasilkan adalah sebagai berikut:
1. Ringkasan Jalur Karir: Profesi utama yang mungkin dicapai.
2. Peta Kompetensi (Skill Map): Bagian Skill & Kompetensi yang Dibutuhkan harus dipecah menjadi Peta Kompetensi dengan tiga kategori: 'fundamental', 'intermediate', dan 'advanced' untuk membentuk peta jalan belajar yang jelas.
3. Timeline Perjalanan Karir: Perkembangan dari awal hingga senior/expert dalam beberapa tahap.
4. Perkiraan Prospek & Gaji: Perkiraan untuk pasar global dan Indonesia.
5. Alternatif Jalur: Opsi karir lain yang relevan.
6. Tips & Rekomendasi: Langkah konkret seperti kursus, portofolio, dan networking.
`;

const schema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING, description: 'Ringkasan singkat jalur karir dalam satu kalimat (Bahasa Indonesia).' },
    skills: {
      type: Type.OBJECT,
      description: 'Peta kompetensi yang dibagi menjadi 3 tahap: fundamental, intermediate, dan advanced (Bahasa Indonesia).',
      properties: {
        fundamental: {
          type: Type.ARRAY,
          description: '2-4 skill fundamental yang wajib dikuasai.',
          items: { type: Type.STRING }
        },
        intermediate: {
          type: Type.ARRAY,
          description: '2-4 skill tingkat menengah setelah fundamental dikuasai.',
          items: { type: Type.STRING }
        },
        advanced: {
          type: Type.ARRAY,
          description: '1-3 skill tingkat lanjut atau spesialisasi.',
          items: { type: Type.STRING }
        }
      },
      required: ['fundamental', 'intermediate', 'advanced']
    },
    timeline: {
      type: Type.ARRAY,
      description: 'Timeline perjalanan karir dari junior hingga senior dalam 3-5 tahap (Bahasa Indonesia).',
      items: {
        type: Type.OBJECT,
        properties: {
          duration: { type: Type.STRING, description: 'Rentang waktu, misal "0–2 tahun".' },
          role: { type: Type.STRING, description: 'Nama peran atau jabatan, misal "Junior Data Analyst".' },
          description: { type: Type.STRING, description: 'Deskripsi singkat tanggung jawab pada tahap ini.' }
        },
        required: ['duration', 'role', 'description']
      }
    },
    prospects: {
      type: Type.OBJECT,
      description: 'Informasi prospek karir dan perkiraan gaji (Bahasa Indonesia).',
      properties: {
        indonesia: { type: Type.STRING, description: 'Perkiraan gaji di Indonesia (misal "Rp 6–25 juta/bulan").' },
        global: { type: Type.STRING, description: 'Perkiraan gaji global (misal "$50,000–$120,000/tahun").' },
        demand: { type: Type.STRING, description: 'Prospek permintaan di masa depan (misal "Permintaan meningkat 20–30% tiap tahun").' }
      },
      required: ['indonesia', 'global', 'demand']
    },
    alternatives: {
      type: Type.ARRAY,
      description: '3-4 jalur karir alternatif yang relevan (Bahasa Indonesia).',
      items: { type: Type.STRING }
    },
    tips: {
      type: Type.ARRAY,
      description: '3-5 tips dan rekomendasi konkret untuk memulai dan berkembang (Bahasa Indonesia).',
      items: { type: Type.STRING }
    }
  },
  required: ['summary', 'skills', 'timeline', 'prospects', 'alternatives', 'tips']
};

export const simulateCareerPath = async (userInput: string, apiKey: string): Promise<CareerPath> => {
  if (!apiKey) {
    throw new Error("API Key tidak tersedia. Mohon konfigurasikan API Key Anda.");
  }
  
  // Initialize the client here, with the provided key.
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Simulasikan jalur karir untuk: "${userInput}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    // Validation to ensure the parsed data matches the expected structure
    if (!parsedData.summary || !parsedData.skills || !Array.isArray(parsedData.skills.fundamental)) {
      throw new Error("Menerima data yang tidak sesuai format dari API.");
    }

    return parsedData as CareerPath;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('PERMISSION_DENIED') || error.message.includes('API key'))) {
      throw new Error("Izin API ditolak. Pastikan API Key Anda valid dan Gemini API telah diaktifkan untuk proyek Anda.");
    }
    throw new Error("Gagal menyimulasikan jalur karir. AI mungkin sedang sibuk atau permintaan tidak dapat diproses. Silakan coba lagi nanti.");
  }
};
