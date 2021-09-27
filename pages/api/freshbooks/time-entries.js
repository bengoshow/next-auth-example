import { Client } from '@freshbooks/api';
import { QueryBuilder } from '../../../lib/QueryBuilder';

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
    const { me } = await client.users.me();
    //res.send(JSON.stringify(data, null, 2));
    //res.send(`Hello, Employee ${data.id}`);
  } catch ({ code, message }) {
    // Handle error if API call failed
    console.error(`Error fetching user: ${code} - ${message}`);
  }

  const businessId = '623564';
  const queryBuilder = new QueryBuilder().equals('started_from', '2021-07-01 00:00:00').equals('started_to', '2021-07-07 00:00:00');

  try {
    // Get the current user
    const { data } = await client.timeEntries.list(businessId, [queryBuilder]);
    res.send(JSON.stringify(data, null, 2));
    //res.send(`Hello, Employee ${data.id}`);
  } catch ({ code, message }) {
    // Handle error if API call failed
    res.send(`Error: ${code} - ${message}`);
    console.error(`Error: ${code} - ${message}`);
  }
};
