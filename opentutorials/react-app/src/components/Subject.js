import React, { Component } from 'react';

class Subject extends Component {
  render() {
    return (
        <header>
            <h1><a href="/" onClick={function(e){   // "e" = "event" object
                e.preventDefault();   // Without this, page is reloaded whenever the link is clicked.
                this.props.onChangePage();
            }.bind(this)}>{this.props.title}</a></h1>
            {this.props.sub}
        </header>
    );
  }
}

export default Subject;
