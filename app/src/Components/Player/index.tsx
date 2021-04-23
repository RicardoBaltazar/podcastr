import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext'
import styles from './styled.module.scss'

export default function Player(){

    const { episodeList, currentEpisodeIndex} = useContext(PlayerContext);
    const episode = episodeList[currentEpisodeIndex];

    return(
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="tocando agora"/>
                <strong>Tocando Agora {episode?.title}</strong>
            </header>

            { episode ? (
                <div className={styles.currentEpisode}>
                    
                </div>
            ) : (
            
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>

            )}


            <footer className={styles.empty}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        <div className={styles.emptySlider}></div>
                    </div>
                    <span>00:00</span>
                </div>

                <div className={styles.buttons}>
                    <button>
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>
                    <button>
                        <img src="/play-previous.svg" alt="tocar anterior"/>
                    </button>
                    <button className={styles.playButton}>
                        <img src="/play.svg" alt="tocar"/>
                    </button>
                    <button>
                        <img src="/play-next.svg" alt="tocar próxima"/>
                    </button>
                    <button>
                        <img src="/repeat.svg" alt="repetir"/>
                    </button>
                </div>
            </footer>
        </div>
    )
}