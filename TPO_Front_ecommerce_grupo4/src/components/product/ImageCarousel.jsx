import Carousel from 'react-bootstrap/Carousel';

const ImageCarousel = ({images}) => {
  return (
    <Carousel data-bs-theme="dark">
        {images.map((image, index) => (
            <Carousel.Item key={index}>
                <img key={index} src={image.imageBase64} />
            </Carousel.Item>
            ))
        }
    </Carousel>
  );
};

export default ImageCarousel;