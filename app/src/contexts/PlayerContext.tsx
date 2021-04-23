import { createContext } from 'react';

type Episode = {
    title: String;
    members: String;
    thumbnail: String;
    duration: number;
    url: String;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    play: (episode: Episode) => void;
}

export const PlayerContext = createContext({} as PlayerContextData)