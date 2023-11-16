import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context";
import "./Favourites.css";
const Favourites = () => {
  const [users, setUsers] = useState([]);
  const accessToken = useContext(Context);
  const [favSongs, setFavSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://music-backend-kinl.onrender.com/Fav?username=Chethu3464")
      .then((result) => setUsers(result.data))
      .catch((err) => console.error(err));
  }, []);

  const fetchDataForUser = async (user) => {
    try {
      let response;

      if (user.type === "album") {
        response = await fetch(
          `https://api.spotify.com/v1/albums?ids=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        );
      } else {
        response = await fetch(
          `https://api.spotify.com/v1/tracks?ids=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        );
      }

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDataForAllUsers = async () => {
      try {
        const dataPromises = users.map((user) => fetchDataForUser(user));
        const data = await Promise.all(dataPromises);

        // Filter out null values (failed fetch requests)
        const validData = data.filter((item) => item !== null);
        setFavSongs(validData);
        console.log(validData);
        console.log(validData[0].albums[0].tracks.items[0].name);
      } catch (error) {
        console.error("Error fetching data for all users:", error);
      }
    };

    // Check if users exist
    if (users.length > 0) {
      fetchDataForAllUsers();
    }
  }, [users, accessToken]);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5550/delete/" + id)
      .then((res) => {
        console.log(res);
        // Assuming you want to navigate after deleting, use navigate here
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="big-container">
      <div className="next-container">
        <table className="table">
          <tbody>
            {favSongs.map((data, index) => {
              const user = users[index];
              return (
                <div className="table-parent">
                  {user.type === "album" ? (
                    // Rendering logic for album type

                    <>
                      <tr key={index}>
                        <td className="td-table">{index + 1}</td>
                        <td>
                          {
                            <img
                              src={favSongs[index].albums[0].images[2].url}
                              alt=""
                            />
                          }
                        </td>
                        <td className="td-table">
                          <h3 className="h3">
                            {" "}
                            {favSongs[index].albums[0].tracks.items[0].name}
                          </h3>
                        </td>
                        {/* <td>{user.username}</td>
                  <td>{user.type}</td>  */}
                        <td className="buttons td-table">
                          <button className="btn btn-success btn-css">
                            <Link
                              to={`/artist/new/${favSongs[index].albums[0].id}`}
                              className="text-decoration-none btn-success text-white "
                            >
                              Play
                            </Link>
                          </button>{" "}
                          <button
                            className="btn btn-danger btn-css"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ) : (
                    // Rendering logic for track type
                    <>
                      <tr key={index}>
                        <td className="td-table">{index + 1}</td>
                        <td className="td-table">
                          {
                            <img
                              src={
                                favSongs[index]?.tracks[0].album.images[2].url
                              }
                              alt=""
                            />
                          }
                        </td>
                        <td className="td-table">
                          <h3 className="h3">{data.tracks[0]?.name}</h3>
                        </td>
                        {/* <td>{user.username}</td>
                  <td>{user.type}</td>  */}
                        <td className="buttons td-table">
                          <button className="btn btn-success btn-css">
                            <Link
                              to={`/track/${favSongs[index]?.tracks[0].id}`}
                              className="text-decoration-none btn-success text-white "
                            >
                              Play
                            </Link>
                          </button>{" "}
                          <button
                            className="btn btn-danger btn-css"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  )}
                </div>
                // </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Favourites;

// import React, { useEffect, useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Context } from "../../context";
// import "./Favourites.css";

// const Favourites = () => {
//   const [users, setUsers] = useState([]);
//   const accessToken = useContext(Context);
//   const [favSongs, setFavSongs] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("https://music-backend-kinl.onrender.com/Fav?username=Chethu3464")
//       .then((result) => setUsers(result.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const fetchDataForUser = async (user) => {
//     try {
//       let response;

//       if (user.type === "album") {
//         response = await fetch(
//           `https://api.spotify.com/v1/albums?ids=${user.id}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + accessToken,
//             },
//           }
//         );
//       } else {
//         response = await fetch(
//           `https://api.spotify.com/v1/tracks?ids=${user.id}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + accessToken,
//             },
//           }
//         );
//       }

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const fetchDataForAllUsers = async () => {
//       try {
//         const dataPromises = users.map((user) => fetchDataForUser(user));
//         const data = await Promise.all(dataPromises);

//         // Filter out null values (failed fetch requests)
//         const validData = data.filter((item) => item !== null);
//         setFavSongs(validData);
//         console.log(validData);
//         console.log(validData[0].albums[0].tracks.items[0].name);
//       } catch (error) {
//         console.error("Error fetching data for all users:", error);
//       }
//     };

//     // Check if users exist
//     if (users.length > 0) {
//       fetchDataForAllUsers();
//     }
//   }, [users, accessToken]);

//   const handleDelete = (id) => {
//     axios
//       .delete("http://localhost:5550/delete/" + id)
//       .then((res) => {
//         console.log(res);
//         // Assuming you want to navigate after deleting, use navigate here
//         navigate("/", { replace: true });
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="d-flex vh-100 d-flex flex-direction-row justify-content-center align-items-center backg">
//       <div className="w-50 bg-white rounded p-3 boxShadow">
//         <table className="table">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Image</th>
//               <th>Song/Album Name</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {favSongs.map((data, index) => {
//               const user = users[index];
//               return (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>
//                     <img
//                       src={
//                         user.type === "album"
//                           ? favSongs[index]?.albums[0]?.images[2]?.url
//                           : favSongs[index]?.tracks[0]?.album?.images[2]?.url
//                       }
//                       alt=""
//                     />
//                   </td>
//                   <td>
//                     {user.type === "album"
//                       ? favSongs[index]?.albums[0]?.tracks?.items[0]?.name
//                       : favSongs[index]?.tracks[0]?.name}
//                   </td>
//                   <td>
//                     <button className="btn btn-success">
//                       <Link
//                         to={`/artist/new/${favSongs[index].id}`}
//                         className="text-decoration-none btn-success text-white"
//                       >
//                         Play
//                       </Link>
//                     </button>{" "}
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleDelete(user._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Favourites;
