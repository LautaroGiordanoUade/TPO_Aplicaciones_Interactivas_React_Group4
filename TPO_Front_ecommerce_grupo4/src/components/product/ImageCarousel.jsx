import Carousel from 'react-bootstrap/Carousel';

const ImageCarousel = ({images}) => {
  return (
    <Carousel data-bs-theme="dark">
        {images.map((image, index) => (
            <Carousel.Item key={index}>
                <img width="300" key={index} src={image? image.imageBase64
              : placeholderImage} />
            </Carousel.Item>
            ))
        }
    </Carousel>
  );
};

export default ImageCarousel;