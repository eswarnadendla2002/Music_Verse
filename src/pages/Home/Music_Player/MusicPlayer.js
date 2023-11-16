// import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { Context } from "../../../context";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./MusicPlayer.css";
// import { BeatLoader } from "react-spinners";

// const LoadingSpinner = () => (
//   <div className="loading-spinner">
//     <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
//   </div>
// );

// const MusicPlayer = () => {
//   const ids = useParams();
//   const id = ids.id;
//   const search = "";
//   const [loading, setLoading] = useState(false);
//   const [songs, setSongs] = useState([]);
//   const accessToken = useContext(Context);
//   const [track, setTrack] = useState([]);

//   const parameters = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + accessToken,
//     },
//   };

//   useEffect(() => {
//     setLoading(true);

//     if (search === undefined) {
//       fetch(`https://api.spotify.com/v1/albums?ids=${ids.id}`, parameters)
//         .then((res) => res.json())
//         .then((data) => {
//           setSongs(data.albums);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching album data:", error);
//           setLoading(false);
//         });
//     } else {
//       fetch(`https://api.spotify.com/v1/tracks?ids=${ids.id}`, parameters)
//         .then((res) => res.json())
//         .then((data) => {
//           setTrack(data.tracks);
//           console.log(data.tracks);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching track data:", error);
//           setLoading(false);
//         });
//     }
//   }, [search, ids.id]);

//   return (
//     <div className="music-card">
//       {loading && <LoadingSpinner />}
//       {search === undefined
//         ? songs &&
//           songs.length > 0 &&
//           songs.map((items) => {
//             return (
//               <React.Fragment key={items.id}>
//                 <div id="rssBlock">
//                   <p className="cnnContents">
//                     <span className="marqueeStyle">
//                       &nbsp;{songs.tracks.items[0].name}{" "}
//                     </span>
//                   </p>
//                 </div>
//                 <div className="card" style={{ width: "19rem" }}>
//                   <img
//                     className="card-img-top"
//                     src={songs.images[0].url}
//                     alt="Card image cap"
//                   />
//                   <div className="card-body">
//                     <p className="card-text">
//                       <audio src={songs.tracks.items[0].preview_url} controls />
//                     </p>
//                   </div>
//                 </div>
//               </React.Fragment>
//             );
//           })
//         : search !== undefined &&
//           track &&
//           track.length > 0 && (
//             <React.Fragment key={track.id}>
//               <div id="rssBlock">
//                 <p className="cnnContents">
//                   <span className="marqueeStyle">&nbsp;{track[0].name} </span>
//                 </p>
//               </div>
//               <div className="card" style={{ width: "19rem" }}>
//                 <img
//                   className="card-img-top"
//                   src={track[0].album.images[0].url}
//                   alt="Card image cap"
//                 />
//                 <div className="card-body">
//                   <p className="card-text">
//                     <audio src={track[0].preview_url} controls />
//                   </p>
//                 </div>
//               </div>
//             </React.Fragment>
//           )}
//     </div>
//   );
// };

// export default MusicPlayer;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useContext } from "react";
// import { Context } from "../../../context";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./MusicPlayer.css";
// const MusicPlayer = () => {
//   const ids = useParams();
//   const id = ids.id;
//   console.log(id);

//   const [songs, setSongs] = useState([]);
//   const accessToken = useContext(Context);
//   console.log(accessToken);
//   // Example list of album IDs

//   const parameters = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + accessToken,
//     },
//   };

//   useEffect(() => {
//     fetch(`https://api.spotify.com/v1/albums?ids=${ids.id}`, parameters)
//       .then((res) => res.json())
//       .then((data) => console.log(data.albums));
//   }, [accessToken]);
//   console.log(songs);
//   return (
//     <div className="music-card">
//       {songs &&
//         songs.length > 0 &&
//         songs.map((items) => {
//           return (
// <>
//   <div id="rssBlock">
//     <p className="cnnContents">
//       <span className="marqueeStyle">
//         &nbsp;{songs[0].tracks.items[0].name}{" "}
//       </span>
//     </p>
//   </div>
//   <div className="card" style={{ width: "19rem" }}>
//     <img
//       className="card-img-top"
//       src={songs[0].images[0].url}
//       alt="Card image cap"
//     />
//     <div className="card-body">
//       <p className="card-text">
//         <audio
//           src={songs[0].tracks.items[0].preview_url}
//           controls
//         />
//       </p>
//     </div>
//   </div>
// </>
//           );
//         })}
//     </div>
//   );
// };

// export default MusicPlayer;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../context";
import "./MusicPlayer.css";
const MusicPlayer = () => {
  const ids = useParams();
  const id = ids.id;
  console.log(id);

  const [songs, setSongs] = useState([]);
  const accessToken = useContext(Context);
  console.log(accessToken);
  // Example list of album IDs

  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/albums?ids=${ids.id}`, parameters)
      .then((res) => res.json())
      .then((data) => setSongs(data.albums));
  }, []);
  console.log(songs);
  return (
    <div>
      {songs &&
        songs.length > 0 &&
        songs.map((items) => {
          return (
            <>
              <div id="rssBlock">
                <p className="cnnContents">
                  <span className="marqueeStyle">
                    &nbsp;{songs[0].tracks.items[0].name}{" "}
                  </span>
                </p>
              </div>
              <div
                className="card"
                style={{ marginLeft: "450px", width: "19rem" }}
              >
                <img
                  className="card-img-top"
                  src={songs[0].images[0].url}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <p className="card-text">
                    <audio
                      src={songs[0].tracks.items[0].preview_url}
                      controls
                    />
                  </p>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default MusicPlayer;
