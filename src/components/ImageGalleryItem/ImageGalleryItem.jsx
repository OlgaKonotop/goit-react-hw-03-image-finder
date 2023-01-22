import PropTypes from 'prop-types';
import { ImageGalleryItemImg } from './ImageGalleryItem.styled';

export const ImageGaleryItem = ({ url, largeUrl, tags, onClick }) => {
  return (
    <ImageGalleryItemImg
      src={url}
      alt={tags}
      width="45"
      onClick={() => onClick(largeUrl)}
    />
  );
};
ImageGaleryItem.prototype = {
  url: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};
