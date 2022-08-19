import { getSpotifyTopTracks } from '../../../lib/Spotify';

export default async (req, res) => {
  const response = await getSpotifyTopTracks();
  const { items } = await response.json();

  console.log(items);

  // const tracks = items.slice(0, 10).map((track) => ({
  //   artist: track.artists.map((_artist) => _artist.name).join(', '),
  //   songUrl: track.external_urls.spotify,
  //   title: track.name
  // }));

  // return res.status(200).json({ tracks });
};