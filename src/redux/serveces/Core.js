import {createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const coreApi= createApi({
    reducerPath:'coreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com/',
        prepareHeaders:(headers)=>{
            headers.set('X-RapidAPI-Key','7c3c2ec4e3msh62d360dc7fc5c03p1e33b8jsn77d438fb5fe6')
            return headers
        }
    }),
    endpoints :(bulider)=>({
        getTopCharts: bulider.query({query:() => '/charts/track'}),
        getSongsByGenere: bulider.query({query:(songid)=>`/charts/track?locale=en-US&listId=genre-global-chart-${songid}`}),
        getSongDetail: bulider.query({query:({songid})=>`/songs/get-details?key=${songid}`}),
        getSongRelated: bulider.query({query:(songid)=>`/artists/get-top-songs?id=${songid}`}),
        getRecommendedSongs: bulider.query({query:(songid)=>`https://shazam.p.rapidapi.com/songs/list-recommendations?key=${songid}`}),
        
        getArtistDetails: bulider.query({query:(songid)=>`/artists/get-details?id=${songid}`}),
        getSongsByCountry: bulider.query({query:(countrycode)=>`/charts/track?locale=en-US&listId=ip-country-chart-${countrycode}&pageSize=40&startFrom=0`}),
        getSongsBySearch: bulider.query({query:(searchId)=>`/search?term=${searchId}`}),
    })
})
export const {
    useGetTopChartsQuery,
    useGetSongsByGenereQuery,
    useGetSongDetailQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery,
    useGetRecommendedSongsQuery
}=coreApi;
