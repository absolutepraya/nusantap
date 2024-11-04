import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const IMG_PROMPT =
	'Kamu adalah layanan pada aplikasi Indonesia NuSantap. Aplikasi ini adalah aplikasi yang dapat mendeteksi defisiensi nutrisi pada pengguna dan kemudian memberikan rekomendasi makan siang yang cocok untuk pengguna. Kamu akan menerima gambar manusia, selanjutnya kamu menganalisis defisiensi nutrisi manusia pada gambar. Analisis defisiensi nutrisi dilakukan dengan melihat kondisi fisik keseluruhan, adapun indikatornya adalah sebagaimana berikut, dengan tanda kurung berarti defisiensi gizi yang terindikasi oleh indikator. Kamu juga dapat menggunakan ilmu yang kamu miliki dan jurnal yang ada untuk memperkuat analisis. 1.	Warna Kulit Wajah (Zat Besi, Vitamin B12, Vitamin C) 2.	Kelembapan Kulit (Lemak Sehat, Air) 3.	Kesehatan Bibir (Vitamin B-kompleks, Air) 4.	Kondisi Rambut (Protein, Zinc, Vitamin A, Vitamin E) 5.	Kesehatan Kuku (Protein, Zat Besi, Zinc) 6.	Lingkaran di Bawah Mata (Kantung Mata) (Zat Besi, Air) 7.	Penglihatan di Tempat Redup (Vitamin A) 8.	Tekstur Kulit (Jerawat atau Ruam) (Zinc, Vitamin A, Vitamin C) 9.	Warna dan Kekuatan Gusi (Vitamin C, Zat Besi) 10.	Kehadiran Bintik Putih pada Kuku (Zinc) Analisis akan dilaporkan dalam bentuk vector of probability. Vektor memiliki panjang 14, setiap elemen berisi dari angka 0 hingga 1 yang menyatakan seberapa besar kemungkinan ia mengalami defisiensi nutrisi X. Semakin mendekati 1, maka probabilitasnya semakin besar. Secara berturut-turut X yaitu: Karbohidrat, Protein, Lemak Sehat, Kalsium, Vitamin D, Zat Besi, Vitamin A, Vitamin C, Serat, Zinc, Vitamin B, Magnesium, Kalium, Air.';

const client = new OpenAI();

export async function POST(request) {
	try {
		const { image_url } = await request.json();

		console.log('image_url', image_url);

		const completion = await client.chat.completions.create({
			model: 'gpt-4o-2024-08-06',
			messages: [
				{
					role: 'system',
					content: `You must respond with a JSON object that follows this exact schema:
                    {
                      "vec": [array of floating point numbers]
                    }
                    Ensure all fields are present and properly formatted.
                    ${IMG_PROMPT}`,
				},
				{
					role: 'user',
					content: [
						{
							type: 'image_url',
							image_url: {
								url: image_url,
							},
						},
					],
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
