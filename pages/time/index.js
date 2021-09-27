import Layout from '../../components/layout';

export const getStaticProps = async () => {
  const res = await fetch('https://billnonbill.fishhook.us/api/freshbooks/time-entries');
  const data = await res.json();

  return {
    props: { entries: data },
  };
};

const Entries = ({ entries }) => {
  return (
    <Layout>
      {entries.map((entry) => (
        <li key={entry.id}>{entry.title}</li>
      ))}
    </Layout>
  );
};

export default Entries;
