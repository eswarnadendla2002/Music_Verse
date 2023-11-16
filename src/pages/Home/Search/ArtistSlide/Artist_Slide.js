import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useContext } from "react";
import { Context } from "../../../../context";
import { useLocation, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { BeatLoader } from "react-spinners";

const ArtistSlide = () => {
  const ids = useParams();
  const id = ids.id;
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const accessToken = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;

  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  const handlePlayClick = async (users) => {
    setLoading(true); // Set loading to true when Play button is clicked

    try {
      // Perform the necessary actions for Play button click
      // For example, navigate to the next page
      await navigate(`/new/${users.id}`, {
        state: { username },
      });

      // Reset loading state once the response is received
      setLoading(false);
    } catch (error) {
      console.error("Error navigating to the next page:", error);
      setLoading(false); // Reset loading state in case of an error
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetch(`https://api.spotify.com/v1/albums?ids=${ids.id}`, parameters)
        .then((res) => res.json())
        .then((data) => setTracks(data.albums))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [accessToken, ids.id]);

  return (
    <div>
      <div className=" align-items-center backg">
        <h2>{tracks[0]?.name} Songs</h2>

        <div className="w-90 bg-white rounded p-3 text-align-center boxShadow">
          {loading && (
            <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
          )}

          {!loading && (
            <table className="table back">
              <tbody>
                {tracks &&
                  tracks.length > 0 &&
                  tracks.map((users, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <p>Track No:- </p> <h5>{index + 1}</h5>
                        </td>
                        <td>
                          <p>Track Name :- </p>{" "}
                          <h5>{users.tracks.items[0].name}</h5>
                        </td>
                        <td>
                          <p>Artist:- </p> <h5>{users.artists[0]?.name}</h5>
                        </td>
                        <td className="td">
                          <button
                            className="btn btn-success"
                            onClick={() => handlePlayClick(users)}
                          >
                            Play
                          </button>{" "}
                          <button className="btn btn-danger">
                            <Link
                              to={""}
                              onClick={() => {
                                console.log(users.id);
                              }}
                              className="text-decoration-none text-white"
                            >
                              Add To Favourites
                            </Link>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistSlide;
