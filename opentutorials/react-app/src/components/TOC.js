import React, { Component } from 'react';

class TOC extends Component {
  // Without this, TOC is updated whenever any item in props is changed even though its contents is not updated.
  shouldComponentUpdate(newProps, newState){
    return newProps.data !== this.props.data;
  }
  render() {
    console.log("TOC render");
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while(i < data.length) {
        lists.push(
          <li key={data[i].id}>
            <a 
              href={'/content/'+data[i].id}
              data-id={data[i].id}
              onClick={function(e){
                e.preventDefault();
                this.props.onChangePage(e.target.dataset.id);   // "id" comes from "data-id" (by name convection in Raact)
              }.bind(this)}
              // OR you can pass data-id without making a variable as follows:
              // onClick={function(id, e){
              //   e.preventDefault();
              //   this.props.onChangePage(id);   // "id" comes from "data-id" (by name convection in Raact)
              // }.bind(this, data[i].id)
            >{data[i].title}</a>
          </li>);
        i = i + 1;
    }
    return (
        <nav>
            <ul>
                {lists}
            </ul>
        </nav>
    );
  }
}

export default TOC;
