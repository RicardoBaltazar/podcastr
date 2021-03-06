import { GetStaticProps } from 'next';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link'; //componente para rotas sem que o conteudo carregue novamente na nova página
import { api } from '../services/api';
import convertDurationToTimeString from '../Utils/ConvertionDurationToTimeString';
import Image from 'next/image';

import styles from './home.module.scss';
import { PlayerContext } from '../contexts/PlayerContext';
import { useContext } from 'react';

type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  url: string;
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { play } = useContext(PlayerContext)

  return (
    <>
      <div className={styles.homepage}>
        <section className={styles.latestEpisodes}>
          <h2>Últimos Lançamentos</h2>

          <ul>
            {latestEpisodes.map(episode => {
              return (
                //devemos colocar uma key no primeiro elemento sempre que tiver um map
                <li key={episode.id}>
                  <Image 
                    width={192} 
                    height={192} 
                    src={episode.thumbnail} 
                    alt={episode.title} 
                    objectFit="cover"
                  />

                  <div className={styles.episodeDetails}>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                    <p>{episode.members}</p>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>
                  </div>

                  <button type='button' onClick={() => play(episode)}>
                    <img src="/play-green.svg" alt="play"/>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        <section className={styles.allEpisodes}>
          <h2>Todos Episódios</h2>

          <table cellSpacing={0}>
            <thead>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </thead>
            <tbody>
              {allEpisodes.map(episode => {
                return (
                  <tr key={episode.id}>
                    <td style={{ width: 72 }}>
                    <Image 
                      className={styles.imageTable}
                      width={120} 
                      height={120} 
                      src={episode.thumbnail} 
                      alt={episode.title} 
                      objectFit="cover"
                    />
                    </td>
                    <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a href="">{episode.title}</a>
                    </Link>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{ width: 100 }}>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      <button type='button'>
                        <img src="/play-green.svg" alt="tocar episódio"/>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </div>
    </>
  )
}


// getStaticProps -> STATIC SIDE GENERATOR
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url,
    }
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
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


