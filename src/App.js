import React from 'react';
import './App.css';
import Profile from './Profile';
import Gallery from './Gallery';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }


    search() {
        console.log('this.state', this.state);
        const BASE_URL ='https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = `https://api.spotify.com/v1/artists/`;
        console.log('FETCH_URL', FETCH_URL);
        fetch(FETCH_URL, {
        method:'GET',
        headers: {
        'Authorization': 'Bearer BQDkQWYqwrVhgEFTtOj0fAwm3In9iHMlap5w02_WzvUusJCzwYi5ynA5viSu4kmbCkfrDoCpRlYniCvfHpr-FDzNAzjHIM42987DpMvKtjJuIk6JeQH6z_g2-wGkr4wceVSsGYhnuQ'
        },
        })
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            console.log('artist', artist);
            this.setState({artist: artist});

            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
            fetch(FETCH_URL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer BQDkQWYqwrVhgEFTtOj0fAwm3In9iHMlap5w02_WzvUusJCzwYi5ynA5viSu4kmbCkfrDoCpRlYniCvfHpr-FDzNAzjHIM42987DpMvKtjJuIk6JeQH6z_g2-wGkr4wceVSsGYhnuQ',
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log('artist\'s top tracks:', json);
                const { tracks } = json;
                this.setState({tracks: tracks});
            })
        });
    }

    render() {
        return (
        <div className="App">
            <div className="App-title">Music Master</div>
            <div>
                <input 
                className="Input-Searchbar" 
                placeholder="Search for an artist..." 
                value={this.state.query}
                onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        this.search()
                    }
                }}
                />
                <button 
                className="Search-Button"
                onClick={() => {
                    this.search()
                }}
                >Search</button>
            </div>
            {
                this.state.artist !== null 
            ? <div>
                <Profile 
                artist={this.state.artist}
            />
            <Gallery 
            tracks={this.state.tracks} />
            </div>
            : <div></div>
        }
        </div>
        )
    }
}

export default App;