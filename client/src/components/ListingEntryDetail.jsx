import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BookingWindow from './BookingWindow.jsx';
import GMap from './GMap.jsx';

class ListingEntryDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listingId: this.props.match.params.id,
      // should be this format {lat: 42.2828747, lng: -71.13467840000001}
      latLong: null,
      listing: null,
      mapVis: true, // to prevent map from rendering if no latLong
      address: ''
    }
    this.getAllDetails = this.getAllDetails.bind(this);
  }

  componentWillMount() {
    this.getAllDetails(this.props.match.params.id);
  }

  getAllDetails(listingId) {
    //gets listing info from DB and latLong from Google Geocode API
    var context = this;
    axios
    .get('/listings-iris', { params: {listingId: listingId} })
    .then((response) => {
      console.log(response.data);
      context.setState(
        {
          listing: response.data.listing,
          latLong: response.data.latLong, 
          address: response.data.address
        })
      })
    // TO DO: render something else when there is an error
    // MAYBE A MODAL??
    .catch((err) => console.log('received error', err));
  }

  // TO DO: if no latLong returned from the GET request, this.state.mapVis needs to be false

  render() {
    return (
      <div>
        <Link to={"/"}> Go back </Link>

        <div className="ListingName">
          <h3> {this.state.name} </h3>
        </div>

        <img src={this.state.pic_url} />

        <div className="ListingDescription">
          <p>{this.state.description}</p>
        </div>
        {
          // <BookingWindow maxGuests={this.state.listing.num_guests} price={this.state.listing.nightly_price} listingId={this.state.listingId} />
        }
        <GMap latLong={this.state.latLong} />
      </div>
    );
  }
}

export default ListingEntryDetail;
