import { Client } from '@freshbooks/api';
import jwt from 'next-auth/jwt';

const secret = process.env.SECRET,
  clientId = process.env.FRESHBOOKS_CLIENT_ID;

export default async (req, res) => {
  const token = await jwt.getToken({ req, secret });
  //res.send(JSON.stringify(token, null, 2));
  //res.send(token.accessToken);

  const accessToken = token.accessToken;
  // Instantiate new FreshBooks API client
  const client = new Client(accessToken, {
    clientId: clientId,
  });

  try {
    // Get the current user
    const accessToken = client.token;
    res.send(accessToken);
    //res.send(`Hello, Employee ${data.id}`);
  } catch ({ code, message }) {
    // Handle error if API call failed
    console.error(`Error fetching user: ${code} - ${message}`);
  }
};
