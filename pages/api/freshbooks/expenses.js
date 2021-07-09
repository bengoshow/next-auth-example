import { Client } from '@freshbooks/api';
import { SearchQueryBuilder } from '@freshbooks/api/dist/models/builders/SearchQueryBuilder';
import { IncludesQueryBuilder } from '@freshbooks/api/dist/models/builders/IncludesQueryBuilder';

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

  const accountId = 'MNyZK';
  const searchQueryBuilder = new SearchQueryBuilder().between('date', { min: new Date('2021-07-01'), max: new Date('2021-07-09') });
  //const includesQueryBuilder = new IncludesQueryBuilder().includes(['expense_profile']);

  try {
    // Get the current user
    const { data } = await client.expenses.list(accountId, [searchQueryBuilder]);
    res.send(JSON.stringify(data, null, 2));
    //res.send(`Hello, Employee ${data.id}`);
  } catch ({ code, message }) {
    // Handle error if API call failed
    console.error(`Error fetching user: ${code} - ${message}`);
  }
};
