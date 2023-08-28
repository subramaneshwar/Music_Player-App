import { Error,Loader,SongCard } from "../components";
import { genres } from '../assets/constants'
import { useGetSongsByGenereQuery } from "../redux/serveces/Core";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
    // console.log(genres)
    const dispatch = useDispatch();
    const { activeSong,isPlaying,genreListId } = useSelector((state)=> state.player)
    const {data,isFetching,error} = useGetSongsByGenereQuery(genreListId.value || '1');
    
    const genereTitle = 'Pop'
    // console.log(data);
    if(isFetching) return <Loader title='Loading songs'/>
    if(error) return <Error/>
    // console.log(genreListId);
    const genreTitle = genres.find(({ value }) => value === genreListId.title)?.title;

    return(

    <div className="flex flex-col ">
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
            <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle || "Pop"}</h2>
            <select value={genreListId.title} onChange={(e)=>dispatch(selectGenreListId({value:e.target.selectedIndex+1,title:e.target.value}))} className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-3">
            {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}

            </select>
        </div>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">

        {data?.tracks?.map((song,i)=>(
            <SongCard key={song.key} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={data}/>
        ))}
               

        </div>
    </div>
    
    )};

export default Discover;
