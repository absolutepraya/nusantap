import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { stringify } from 'postcss';

const LUNCH_PROMPT = 'Kamu adalah layanan pada aplikasi Indonesia NuSantap. Aplikasi ini adalah aplikasi yang dapat mendeteksi defisiensi nutrisi pada pengguna dan kemudian memberikan rekomendasi makan siang yang cocok untuk pengguna. Kamu akan menerima vector of probability. Vektor memiliki panjang 14, setiap elemen berisi dari angka 0 hingga 1 yang menyatakan seberapa besar kemungkinan ia mengalami defisiensi nutrisi X. Semakin mendekati 1, maka probabilitasnya semakin besar. Secara berturut-turut X yaitu: Karbohidrat, Protein, Lemak Sehat, Kalsium, Vitamin D, Zat Besi, Vitamin A, Vitamin C, Serat, Zinc, Vitamin B, Magnesium, Kalium, Air. Berdasarkan vector tersebut, tentukan menu makanan siang yang paling tepat untuk pengguna dari pilihan berikut:';

const MENU = 'Menu A: Nasi Ayam Kecap Menu B: Nasi Ayam Tumis Wortel Menu C: Sop Ikan, Bayam, & Kentang';

const client = new OpenAI();

export async function POST(request) {
	try {
		const { vec } = await request.json();

		console.log('vec', JSON.stringify(vec));

		const completion = await client.chat.completions.create({
			model: 'gpt-4o',
			messages: [
				{
					role: 'system',
					content: `${LUNCH_PROMPT} ${MENU}
                                You must respond with a JSON object that follows this exact schema:
								{
									"menu": "one of the menu options index (0 for A, 1 for B, 2 for C) in integer"
								}
								
								Ensure all fields are present and properly formatted.
                    `,
				},
				{
					role: 'user',
					content: JSON.stringify(vec),
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
