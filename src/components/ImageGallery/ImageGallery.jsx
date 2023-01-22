import PropTypes from 'prop-types';
import { ImageGaleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import {
  ImageGalleryStyle,
  ImageGalleryStyleItem,
} from './ImageGallery.styled';

export const ImageGallery = ({ gallery, onClick }) => {
  return (
    <ImageGalleryStyle className="gallery">
      {gallery.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryStyleItem key={id}>
          <ImageGaleryItem
            url={webformatURL}
            tags={tags}
            onClick={() => onClick(largeImageURL)}
          />
        </ImageGalleryStyleItem>
      ))}
    </ImageGalleryStyle>
  );
};
ImageGallery.prototype = {
  gallery: PropTypes.array,
  onClick: PropTypes.func,
  id: PropTypes.number.isRequired,
};
