import React from "react";
import { View } from "react-native";
import SearchSongs from "./SearchBar";
import NavBar from "./NavBar";
import EllipsisHiddenPage from "./Ellipsis";

interface NavSearchProps {
  handleSearchSong: (text: string) => void;
  toggleSearch: () => void;
  openSearch: boolean;
}

interface NavSearchState {
  openSearch: boolean;
  isPopupVisible: boolean;
}

export default class NavSearch extends React.Component<NavSearchProps, NavSearchState> {
  state: NavSearchState = {
    openSearch: false,
    isPopupVisible: false,
  };

  togglePopup = () => {
    this.setState((prevState) => ({
      isPopupVisible: !prevState.isPopupVisible,
    }));
  };

  handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  render() {
    const { isPopupVisible } = this.state;
    const {handleSearchSong, toggleSearch, openSearch} = this.props;
    return (
      <View>
        <EllipsisHiddenPage isPopupVisible={isPopupVisible} onClosePopup={this.togglePopup} />
        {openSearch ? (
          <SearchSongs
            onPressBack={toggleSearch}
            onPressEllipsis={this.togglePopup}
            onSearch={handleSearchSong}
          />
        ) : (
          <NavBar
            onpressSearch={toggleSearch}
            onPressEllipsis={this.togglePopup} // Use the togglePopup function here
          />
        )}
      </View>
    );
  }
}
