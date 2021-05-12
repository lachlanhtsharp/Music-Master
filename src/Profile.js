
import React from 'react';
import './App.css';


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {
        let artist = {
            name: '',
            followers: {
                total: ''
            },
            images: [{url: ''}],
            genres: []
        };

        artist = this.props.artist !== null ? this.props.artist : artist

        return (
            <div className="profile">
                <img alt="Profile"
                className='profile-img'
                src={artist.images[0].url} />
                <div className='profile-info'>
                    <div className='profile-name'>
                        Artist: {artist.name}
                    </div>
                    <div className='profile-followers'>
                        Followers: {artist.followers.total}
                    </div>
                    <div className='profile-genres'>
                        {
                            artist.genres.map((genre, index) => {
                                genre = genre !== artist.genres[artist.genres.length-1] ? ` ${genre},` : ` ${genre}`
                                return (
                                <span key={index}>{genre} </span> )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;