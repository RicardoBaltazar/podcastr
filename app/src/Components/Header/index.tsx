import styles from './styled.module.scss'

export default function Header(){


    return(
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Podcastr"/>
            <p>O melhor para você ouvir, sempre</p>
            <span>Ter, 20 Abril</span>
        </header>
    )
}