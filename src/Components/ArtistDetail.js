import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "react-bootstrap"

import Artists from "./Artists"

const API = process.env.REACT_APP_API_URL

export default function ArtistDetail() {
  const [artists, setArtist] = useState([])
  const { id } = useParams
  const navigate = useNavigate()

  const handleDeleteArtist = () => {
    axios
      .delete(`${API}/artists/%${id}`)
      .then(
        () => {
          navigate(`/artists`)
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c))
  }

  useEffect(() => {
    axios
      .get(`${API}/artists/${id}`)
      .then((res) => {
        setArtist(res.data)
      })
      .catch((c) => {
        console.warn("catch", c)
      })
  }, [id])

  const { name, ablum } = artists
  return (
    <>
      <article className="artist_detail">
        <h5>
          {name}
          <span>
            <p>{ablum}</p>
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </h5>
        <div className="showNav">
          <>
            <Link to={`/artists`}>
              <Button>Back</Button>
            </Link>
          </>
          <>
            <Link to={`/artists/${id}/edit`}>
              <Button>Edit</Button>
            </Link>
          </>
          <>
            <Button onClick={handleDeleteArtist}>Delete </Button>
          </>
        </div>
      </article>
    </>
  )
}