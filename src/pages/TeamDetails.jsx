import { useParams } from "react-router-dom";

export default function TeamDetails() {
  const {teamId} = useParams()
  return(
    <h1>{teamId}</h1>
  )
}

