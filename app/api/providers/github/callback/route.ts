import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI!;
const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Authorization code missing' }, { status: 400 });
    }

    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      },
      { headers: { Accept: 'application/json' } }
    );

    const { access_token } = tokenResponse.data;

    // Fetch user info
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const emailsResponse = await axios.get('https://api.github.com/user/emails', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const primaryEmail = emailsResponse.data.find((e: any) => e.primary)?.email;

    const user = {
      id: userResponse.data.id,
      login: userResponse.data.login,
      name: userResponse.data.name,
      email: primaryEmail,
      avatar_url: userResponse.data.avatar_url,
    };


    // Issue JWT
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

    // Redirect user to front-end with token
    return NextResponse.redirect(`http://localhost:3000/profile?token=${token}`);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({ error: 'GitHub login failed' }, { status: 500 });
  }
}
