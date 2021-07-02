import { Client } from '@freshbooks/api';
import { SearchQueryBuilder } from '@freshbooks/api/dist/models/builders/SearchQueryBuilder';
//import { SearchQueryBuilder } from '@freshbooks/api';

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
  searchQueryBuilder = new SearchQueryBuilder().equals('start_from', '2021-07-01');

  try {
    // Get the current user
    const { data } = await client.timeEntries.list(businessId, [searchQueryBuilder]);
    res.send(JSON.stringify(data, null, 2));
    //res.send(`Hello, Employee ${data.id}`);
  } catch ({ code, message }) {
    // Handle error if API call failed
    console.error(`Error fetching user: ${code} - ${message}`);
  }
};
