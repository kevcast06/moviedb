export const api_key="21d48dd94eb2105951a273ec15768f0a";
export const url = "https://api.themoviedb.org/3/"
export const api_token="https://api.themoviedb.org/3/authentication/token/new?api_key=21d48dd94eb2105951a273ec15768f0a"
export const api_auth="https://api.themoviedb.org/3/authentication/session/new?api_key=21d48dd94eb2105951a273ec15768f0a"
export const api_rated = `${url}movie/top_rated?api_key=${api_key}&language=en-US&page=1`;
export const api_series_rated =`${url}tv/top_rated?api_key=${api_key}&language=en-US&page=1`;
export const api_gen_mv = `${url}genre/movie/list?api_key=${api_key}&language=en-US&page=1`;
export const api_gen_sr =`${url}genre/tv/list?api_key=${api_key}&language=en-US&page=1`;
