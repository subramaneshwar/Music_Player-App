import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {DetailsHeader,Error,Loader,RelatedSongs} from '../components';
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetRecommendedSongsQuery, useGetSongDetailQuery, useGetSongRelatedQuery } from "../redux/serveces/Core";
const SongDetails = () => {
    
    const { songid, id: artistId } = useParams();
    const dispatch = useDispatch()
    const {activeSong,isPlaying} = useSelector((state)=>state.player)
    // console.log(songid);
    const {data:songData,isFetching:isFetchingSongDetails}=useGetSongDetailQuery({songid})
    const {data,isFetching:isFetchingRelatedSongs,error}=useGetRecommendedSongsQuery("267429991")

    // console.log(data)
    const handlePauseClick = () =>{
        dispatch(playPause(false))
      }
      const handlePlayClick = (song,i) => {
        dispatch(setActiveSong({song,data,i}))
        dispatch(playPause(true))
      }
    if(isFetchingRelatedSongs || isFetchingSongDetails ) return <Loader title='Searching song details' />
    if(error) return <Error/>
    return( 
    <div className="flex flex-col ">
        <DetailsHeader artistId={artistId} songData={songData} />
        <div className="mb-10 ">
            <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
            <div className="mt-5">
            {
                songData?.sections[1].type==='LYRICS'? songData?.sections[1].text.map((line,i)=>(<p className="text-gray-400 text-base my-1">{line}</p>)) :<p className="text-gray-400 text-base my-1">Sorry, no lyrics Found!</p>
            }
            </div>
        </div>
        <RelatedSongs data={data?.tracks} artistId={artistId} isPlaying={isPlaying} title="Suggested Songs"  activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick}/>
    </div>
    )};

export default SongDetails;
