export function isMatchMin(){

    const query=`(min:width: 576px )`;

    return window.matchMedia(query).matches;
}