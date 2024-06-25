import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../helpers/AuthContext";
import { FuncContext } from "../helpers/FuncContext";
import "../index.css";
import Header from "../components/Header";
import AlertNotification from "../components/AlertNotification.jsx";

function AddArtwork() {
  const { CreateArtwork } = useContext(FuncContext);
  let { id } = useParams();
  const navigate = useNavigate();
  const { artworkData, setArtworkData } = useState({});
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState(null);
  const closeAlert = () => {
    setAlert(null);
  };

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: null,
    medium: "",
    dimensions: "",
    description: "",
    price: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    // Validate form fields
    if (
      !formData.title ||
      !formData.imageUrl ||
      !formData.medium ||
      !formData.dimensions ||
      !formData.description ||
      !formData.price
    ) {
      setAlert({
        type: "danger",
        message: "Please fill in all the required fields.",
      });
      return;
    }

    const formDataWithImage = new FormData();
    formDataWithImage.append("title", formData.title);
    formDataWithImage.append("imageUrl", formData.imageUrl);
    formDataWithImage.append("medium", formData.medium);
    formDataWithImage.append("dimensions", formData.dimensions);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("price", formData.price);

    try {
      // const response = await axios.post(
      //   `http://localhost:3005/artworks/${id}`,
      //   formDataWithImage
      // );
      // console.log(response.data);

      await CreateArtwork("artworks", id, formDataWithImage);
      // console.log(id);
      setAlert({ type: "success", message: "Artwork submitted successfully." });
      setTimeout(() => {
        navigate(`/artistProfile/${id}`);
      }, 2000);
    } catch (error) {
      setAlert({ type: "danger", message: "Failed to add artwork." });
      console.error(error);
    }
  }

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      const file = files[0];
      setFile(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0], // Store the file name, not the file object
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Header />
      <div className="px-4 md:px-6 lg:px-8 my-5">
        <div className="flex justify-between items-center space-y-2 mb-2">
          <h1 className="font-bold text-2xl">Artwork Details</h1>
          <button
            onClick={handleSubmit}
            className="w-32 text-white bg-primary p-2 hover:bg-primary-dark"
          >
            Submit
          </button>
        </div>
        <hr />
        <div className="pt-4">
          <AlertNotification alert={alert} closeAlert={closeAlert} />
          <form>
            <section className="flex flex-row gap-3 h-auto">
              <div className="w-1/2">
                <div className="w-full">
                  <label className="block text-sm font-medium leading-6">
                    Title
                  </label>
                  <div className="my-2">
                    <input
                      type="text"
                      name="title"
                      className="w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      placeholder="Title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium leading-6">
                    Dimensions
                  </label>
                  <div className="my-2">
                    <input
                      type="text"
                      name="dimensions"
                      className="w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      placeholder="What is the size of your artwork?"
                      value={formData.dimensions}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium leading-6">
                    Medium
                  </label>
                  <div className="my-2">
                    <input
                      type="text"
                      name="medium"
                      className="w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      placeholder="What art medium did you use?"
                      value={formData.medium}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium leading-6">
                    Price
                  </label>
                  <div className="my-2">
                    <input
                      type="number"
                      name="price"
                      className="w-full border-box p-2.5 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      placeholder="Price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium leading-6">
                    Description
                  </label>
                  <div className="my-2">
                    <textarea
                      name="description"
                      className="w-full border-box p-2.5 pr-10 placeholder:text-gray-400 placeholder:text-sm ring-1 ring-inset ring-gray-400"
                      placeholder="Provide a brief description of your artwork"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium leading-6">
                  Image
                </label>
                <div className="my-2 relative bg-gray-100">
                  <img
                    className="flex mx-auto justify-center items-center"
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://placehold.co/500x500/DDDDDD/DDDDDD"
                    }
                    alt="image-artwork"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/300x300";
                    }}
                  />
                  {!file && (
                    <div>
                      <label
                        htmlFor="imageUrl"
                        className="absolute cursor-pointer bottom-0 left-0 translate-x-72 -translate-y-52 mx-auto"
                      >
                        <FontAwesomeIcon
                          icon={faCamera}
                          className="mx-auto size-16 text-primary hover:text-primary-dark"
                        />
                      </label>
                      <input
                        id="imageUrl"
                        type="file"
                        className="hidden"
                        name="imageUrl"
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddArtwork;
