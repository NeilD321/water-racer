import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const userID = url.searchParams.get('userID');

        if(!userID) {
            return NextResponse.json({ error: 'Missing userID parameter' }, {status: 400});
        }

        const apiKey = process.env.API_KEY;
        const apiSecret = process.env.SECRET_KEY;

        if(!apiKey ||!apiSecret) {
            return NextResponse.json({ error: 'Missing API_KEY or API_SECRET environment variables' }, {status: 401});
        }

        const serverClient = new StreamChat(apiKey, apiSecret);
        const token = serverClient.createToken(userID);

        return NextResponse.json({ token, apiKey }, {status: 200});

    } catch (error) {
        console.error('Error generating token: ', error);
        return NextResponse.json({ error: 'Failed to generate token' }, {status: 500});
    }
}