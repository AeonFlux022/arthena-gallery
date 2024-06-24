import { createContext } from "react";

async function CreateArtwork({ url, id }) {
  return await axios.post(
    `http://localhost:3005/${url}/${id}`,
    formDataWithImage
  );

  console.log(response.data);
}

export const FuncContext = createContext({ CreateArtwork, Alert });
