
export default function Home(props) {
  console.log(props.episodes);
  return (
    <>
      
    </>
  )
}


// getStaticProps -> STATIC SIDE GENERATOR
export async function getStaticProps() {
  const response = await fetch('http://localhost:8000/episodes');
  const data = await response.json();

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}

// getServerSideProps -> SERVER SIDE RENDERING SSR
// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:8000/episodes');
//   const data = await response.json();

//   return {
//     props: {
//       episodes: data,
//     }
//   }
// }


