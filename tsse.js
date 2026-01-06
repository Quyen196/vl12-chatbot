import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

/* 🔴 1. DÁN API KEY OPENAI */
const client = new OpenAI({
  apiKey: "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"
});

/* 🔴 2. TÊN MÔN / LỚP */
const SUBJECT = "Vật lí 12";

/* 🔴 3. KIẾN THỨC BÀI DẠY (BẠN THAY PHẦN NÀY) */
const KNOWLEDGE = `
BÀI: DAO ĐỘNG ĐIỀU HÒA

- Dao động điều hòa là dao động mà li độ x là hàm cos hoặc sin của thời gian.
- Phương trình: x = A cos(ωt + φ)
- A là biên độ, ω là tần số góc.
- Chu kì: T = 2π / ω
- Tần số: f = 1 / T

LƯU Ý SƯ PHẠM:
- Nhấn mạnh ý nghĩa vật lí, không suy luận vượt chương trình THPT.
`;

/* 🔴 4. PHONG CÁCH CHATBOT (CÓ THỂ SỬA NHẸ) */
const SYSTEM_PROMPT = `
Bạn là trợ lý ôn tập ${SUBJECT}.
Trả lời ngắn gọn, đúng chương trình phổ thông.
Nếu là câu hỏi trắc nghiệm:
- Phân tích ngắn
- Chỉ ra đáp án
- Giải thích vì sao
Không bịa kiến thức ngoài nội dung đã cho.
`;

/* ====================== */

app.post("/chat", async (req, res) => {
  const question = req.body.question;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Dựa vào nội dung sau:\n${KNOWLEDGE}\n\nCâu hỏi: ${question}`
      }
    ]
  });

  res.json({
    answer: completion.choices[0].message.content
  });
});

app.listen(3000, () => {
  console.log("Chatbot server running...");
});
