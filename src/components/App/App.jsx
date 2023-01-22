import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { fetchGallery } from 'components/servises/API';

import { Circles } from 'react-loader-spinner';
import { AppBox, Button } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    isLoading: false,
    error: null,
    largeImageUrl: null,
    page: 1,
    per_page: 12,
    showButton: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isLoading: true, error: null });
        const gallery = await fetchGallery(searchQuery, page);
        this.setState({ gallery: gallery.hits });

        if (page <= gallery.totalHits / this.state.per_page) {
          console.log(page);
          console.log(gallery.totalHits / this.state.per_page);

          this.setState({ showButton: true });
        } else {
          this.setState({ showButton: false });
        }
        if (gallery.hits.length === 0) {
          this.setState({
            error: 'Not found. Try another value',
          });
        }
      } catch (error) {
        this.setState({
          error: 'Error 😒. Please reload page 👍',
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  onSearch = searchValue => {
    this.setState({
      searchQuery: searchValue,
      page: 1,
      gallery: [],
    });
  };
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onImgClick = url => {
    this.setState({
      largeImageUrl: url,
    });
  };
  onModalClose = () => {
    this.setState({
      largeImageUrl: null,
    });
  };

  render() {
    const { isLoading, error, largeImageUrl, searchQuery, showButton } =
      this.state;

    return (
      <AppBox className="App">
        <Searchbar onSubmit={this.onSearch} />
        {error && <p>{error}</p>}
        {isLoading && (
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
        <ImageGallery gallery={this.state.gallery} onClick={this.onImgClick} />
        {showButton && (
          <Button type="button" onClick={this.onLoadMore}>
            Load more
          </Button>
        )}
        {largeImageUrl && (
          <Modal onClose={this.onModalClose}>
            <img src={largeImageUrl} alt={searchQuery} width="600" />
          </Modal>
        )}
      </AppBox>
    );
  }
}
