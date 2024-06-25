import { createContext } from "react";
import axios from "axios";

async function CreateArtwork(url, id, formDataWithImage) {
  // const [alert, setAlert] = useState(null);

  const response = await axios.post(
    `http://localhost:3005/${url}/${id}`,
    formDataWithImage
  );

  return response;
}

export const FuncContext = createContext({ CreateArtwork });
