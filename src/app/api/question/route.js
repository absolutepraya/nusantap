import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const Q_PROMPT =
	'Kamu adalah layanan pada aplikasi Indonesia NuSantap. Aplikasi ini adalah aplikasi yang dapat mendeteksi defisiensi nutrisi pada pengguna dan kemudian memberikan rekomendasi makan siang yang cocok untuk pengguna. Kamu akan melakukan tanya-jawab dengan pengguna untuk menganalisis defisiensi nutrisi pengguna. Awalnya, kamu akan menerima vector of probability. Vektor memiliki panjang 14, setiap elemen berisi dari angka 0 hingga 1 yang menyatakan seberapa besar kemungkinan ia mengalami defisiensi nutrisi X. Semakin mendekati 1, maka probabilitasnya semakin besar. Secara berturut-turut X yaitu: Karbohidrat, Protein, Lemak Sehat, Kalsium, Vitamin D, Zat Besi, Vitamin A, Vitamin C, Serat, Zinc, Vitamin B, Magnesium, Kalium, Air. Gunakan vector tersebut sebagai pandangan awal kamu terhadap pengguna. Tetapi kamu bisa lebih fokus untuk menilai defisiensi pengguna berdasarkan jawaban dari pertanyaan yang akan kamu ajukan. Kamu akan mengajukan 3 pertanyaan. Pada setiap pertanyaan, kamu memberikan 3 opsi pilihan jawaban kepada pengguna. Nanti pengguna akan menjawab menggunakan opsi pilihan tersebut, atau bisa saja ia akan menjawab dengan versinya sendiri. Karena kamu hanya akan mengajukan tiga pertanyaan, pastikan kamu memberikan pertanyaan yang tepat supaya dapat melakukan analisis dengan baik. Kamu dapat memfokuskan pada kecenderungan defisiensi nutrisi pengguna (bisa dari data sebelumnya). Kamu juga dapat mempelajari jawaban pengguna dari pertanyaan sebelumnya. Setiap setelah jawaban didapat, kamu akan memperbarui vector of probability sesuai dengan analisis terbaru. Di bawah ini merupakan pertanyaan dan jawaban dari tanya-jawabmu dengan pengguna:';

const client = new OpenAI();

export async function POST(request) {
	try {
		const { message, conversationHistory, previousVec } = await request.json();
		console.log('message', message);

		const history = conversationHistory || 'Silahkan mulai tanya beberapa pertanyaan mengenai kondisiku.';

		const completion = await client.chat.completions.create({
			model: 'gpt-4o-2024-08-06',
			messages: [
				{
					role: 'system',
					content: `${JSON.stringify(previousVec)}
								You must respond with a JSON object that follows this exact schema:
								{
									"question": "string containing the multiple choice question",
									"option1": "string containing the first option",
									"option2": "string containing the second option",
									"option3": "string containing the third option",
									"vec": [array of floating point numbers]
								}
								
								Ensure all fields are present and properly formatted.
								${Q_PROMPT}`,
				},
				{
					role: 'user',
					content: `${message}\n${history}`,
				},
			],
			response_format: { type: 'json_object' },
		});

		console.log('response', completion);

		const response = JSON.parse(completion.choices[0].message.content);
		// const response = completion.choices[0].message.content;

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