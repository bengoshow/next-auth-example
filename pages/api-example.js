import Layout from '../components/layout';
import Link from 'next/link';

export default function Page() {
  return (
    <Layout>
      <h1>API Example</h1>
      <p>The examples below show responses from the example API endpoints.</p>
      <p>
        <em>You must be signed in to see responses.</em>
      </p>
      <h2>Session</h2>
      <p>
        <Link href="/api/examples/session">
          <a>/api/examples/session</a>
        </Link>
      </p>
      <iframe src="/api/examples/session" />
      <h2>JSON Web Token</h2>
      <p>
        <Link href="/api/examples/jwt">
          <a>/api/examples/jwt</a>
        </Link>
      </p>
      <iframe src="/api/examples/jwt" />
      <h2>Freshbooks API</h2>
      <p>
        <Link href="/api/examples/freshbooks-client">
          <a>/api/examples/freshbooks-client</a>
        </Link>
      </p>
      <iframe src="/api/examples/freshbooks-client" />
    </Layout>
  );
}
