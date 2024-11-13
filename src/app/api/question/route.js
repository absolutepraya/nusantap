import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const Q_PROMPT =
	'Kamu adalah layanan pada aplikasi Indonesia NuSantap. Aplikasi ini adalah aplikasi yang dapat mendeteksi defisiensi nutrisi pada pengguna dan kemudian memberikan rekomendasi makan siang yang cocok untuk pengguna. Kamu akan melakukan tanya-jawab dengan pengguna untuk menganalisis defisiensi nutrisi pengguna. Awalnya, kamu akan menerima vector of probability. Vektor memiliki panjang 14, setiap elemen berisi dari angka 0 hingga 1 yang menyatakan seberapa besar kemungkinan ia mengalami defisiensi nutrisi X. Semakin mendekati 1, maka probabilitasnya semakin besar. Secara berturut-turut X yaitu: Karbohidrat, Protein, Lemak Sehat, Kalsium, Vitamin D, Zat Besi, Vitamin A, Vitamin C, Serat, Zinc, Vitamin B, Magnesium, Kalium, Air. Gunakan vector tersebut sebagai pandangan awal kamu terhadap pengguna. Tetapi kamu bisa lebih fokus untuk menilai defisiensi pengguna berdasarkan jawaban dari pertanyaan yang akan kamu ajukan. Kamu akan mengajukan 3 pertanyaan. Pada setiap pertanyaan, kamu memberikan 3 opsi pilihan jawaban kepada pengguna. Nanti pengguna akan menjawab menggunakan opsi pilihan tersebut, atau bisa saja ia akan menjawab dengan versinya sendiri. Karena kamu hanya akan mengajukan tiga pertanyaan, pastikan kamu memberikan pertanyaan yang tepat supaya dapat melakukan analisis dengan baik. Pastikan setiap pertanyaan berbeda satu-sama lain. Kamu dapat bertanya seputar diet habit, atau kondisi fisik, atau kondisi tubuh, atau kondisi mental pengguna akhir-akhir ini. Berdasarkan jawaban yang didapat, kamu akan memperbarui vector of probability sesuai dengan analisis terbaru';

const client = new OpenAI();

export async function POST(request) {
	try {
		let { message, conversationHistory, previousVec } = await request.json();
		console.log('message', message);

		message = conversationHistory || 'Silahkan mulai tanya beberapa pertanyaan mengenai kondisiku.';

		const completion = await client.chat.completions.create({
			model: 'gpt-4o-2024-08-06',
			messages: [
				{
					role: 'system',
					content: `${JSON.stringify(previousVec)}
                                You must respond with a JSON object that follows this exact schema:
                                {
                                    "questions": [
                                        {
                                        "question": "Pertanyaan 1",
                                        "option1": "Opsi 1",
                                        "option2": "Opsi 2",
                                        "option3": "Opsi 3"
                                        },
                                        {
                                        "question": "Pertanyaan 2",
                                        "option1": "Opsi 1",
                                        "option2": "Opsi 2",
                                        "option3": "Opsi 3"
                                        },
                                        {
                                        "question": "Pertanyaan 3",
                                        "option1": "Opsi 1",
                                        "option2": "Opsi 2",
                                        "option3": "Opsi 3"
                                        }
                                    ],
                                    "vec": [array of 14 floating point numbers]
                                }
								Ensure all fields are present and properly formatted. Make sure all the options have maximum 5 words.
								${Q_PROMPT}`,
				},
				{
					role: 'user',
					content: `${message}\n${conversationHistory}`,
				},
			],
			response_format: { type: 'json_object' },
		});

		console.log('response', completion);

		const response = JSON.parse(completion.choices[0].message.content);

		return NextResponse.json(response);
	} catch (error) {
		console.error('Error getting question:', error);
		return NextResponse.json(
			{
				error: 'Failed to get question',
				details: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
