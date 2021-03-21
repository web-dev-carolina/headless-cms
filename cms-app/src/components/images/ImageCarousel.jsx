import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import axios from "axios";
import ImageCard from './ImageCard.jsx';
const ImageCarousel = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      let { data } = await axios.get(process.env.REACT_APP_API_URL + "/images");
      setImages(data.images);
    } catch (error) {
      console.error(error);
    }
    console.log(images);
  };

  return (
    <Container>
      {images
        ? images.map((image) => {
            return (
               <ImageCard></ImageCard>
            );
          })
        : null}
    </Container>
  );
};

export default ImageCarousel;