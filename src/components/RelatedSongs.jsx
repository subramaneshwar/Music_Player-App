import SongBar from "./SongBar";

const RelatedSongs = ({data, artistId,isPlaying,activeSong,title,handlePauseClick,handlePlayClick}) => {
  return(
  <div className="flex flex-col"> 
    <h1 className="font-bold text-xl text-white">{title || "Related Songs"}</h1>
    <div className="mt-6 w-full flex flex-col">
      {
        data?.map((song,i)=>(

          <SongBar key={`${song.key}`} song={song} i={i} 
          artistId={artistId}
            isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick}/> 
        ))
      }
    </div>
  </div>
)}
;

export default RelatedSongs;
