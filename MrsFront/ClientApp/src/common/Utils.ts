const backendUrl = "http://localhost:4000";

function fetchBackend(path: string, options?: RequestInit) {
    const url = backendUrl + path;
    return fetch(url, options);
}

function createOnNavigationClick(history: any, path: string) {
    return () => {
        history.push(path);
    };
}

const DEFAULT_MOVIE_IMAGE = "https://i.imgur.com/Z2MYNbj.png/large_movie_poster.png";

export const Utils = {
    fetchBackend,
    createOnNavigationClick,
    DEFAULT_MOVIE_IMAGE
}