import React from 'react';

export default class Search extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchTextValue: '',
        };
    }

    handleChange = event => {
        // console.log(event.target.value);
        this.setState({searchTextValue: event.target.value});
    }

    handleSearch = event => {
        event.preventDefault();
        this.props.onSearch(this.state.searchTextValue);
        this.setState({ searchTextValue: '' });
    }

    render() {
        return(
            <div className="message-board-comment-list">
                <nav>
                    <form onSubmit={this.handleSearch}>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search"
                            value={this.state.searchTextValue}
                            onChange={this.handleChange}
                        />
                        <button type="submit">Search</button>
                    </form>
                </nav>
            </div>
        );
    }
}