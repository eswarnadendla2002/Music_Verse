import React, { useEffect, useState, useContext } from "react";
import "./Artists.css";
import { Context } from "../../../context";
import { Link } from "react-router-dom";

const Artists = () => {
  const [data, setData] = useState([]);
  const accessToken = useContext(Context);
  console.log(accessToken);
  const id = "5sSzCxHtgL82pYDvx2QyEU,4zCH9qm4R2DADamUHMCa6O";

  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    if (accessToken) {
      fetch(
        `https://api.spotify.com/v1/artists?ids=4zCH9qm4R2DADamUHMCa6O%2C2FgHPfRprDaylrSRVf1UlN%2C5sSzCxHtgL82pYDvx2QyEU%2C1mYsTxnqsietFxj1OgoGbG%2C12l1SqSNsg2mI2IcXpPWjR%2C2q1LRGJHpFxovU8Tz6OgRn`,
        parameters
      )
        .then((res) => res.json())
        .then((data) => setData(data.artists))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [accessToken]); // Run the effect whenever accessToken changes

  console.log(data);
  return (
    <>
      <div>
        <h1 className="artist-header">Artists</h1>

        <div class="container">
          <ul class="cards">
            {data &&
              data.length > 0 &&
              data.map((items) => {
                return (
                  <>
                    <div>
                      <Link
                        to={`/artist/${items.name.split(" ")[0]}/${items.id}`}
                      >
                        {" "}
                        <li class="card-artist radius">
                          <img src={items.images[0].url} alt=""></img>
                        </li>
                      </Link>
                      <h1 className="artist-name">{items.name}</h1>
                    </div>
                  </>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Artists;
