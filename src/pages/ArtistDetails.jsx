import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery, useGetSongRelatedQuery } from '../redux/serveces/Core';
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const ArtistDetails = () => {
  const { id: artistId } = useParams(); 
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
  const { data, isFetching: isFetchinRelatedSongs,  } = useGetSongRelatedQuery(artistId);
  const handlePauseClick = () =>{
    dispatch(playPause(false))
  }
  const handlePlayClick = (song,i) => {
    dispatch(setActiveSong({song,data,i}))
    dispatch(playPause(true))
  }
  if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;
  if (isFetchinRelatedSongs) return <Loader title="Loading artist relatedSongs..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
       <DetailsHeader
        artistId={artistId}
        artistData={artistData?.data[0].attributes}
      />

<RelatedSongs data={data.data} artistId isPlaying={isPlaying}  activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick}/>

    </div>
  );
};

export default ArtistDetails;