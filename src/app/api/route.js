import { db } from '@/utils/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET() {
	const response = await getDocs(collection(db, 'tes'));

	return NextResponse.json(response.docs.map((doc) => doc.data()));
}
