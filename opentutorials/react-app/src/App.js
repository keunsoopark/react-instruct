import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

class App extends Component {
  constructor(props) {  // constructor: executed first (before render) to load state
    super(props);
    // max_content_id does not need to be in this.state, because it does not affect to UI at all. As including, it could results in unnecessary rendering
    this.max_content_id = 3;  
    this.state = {
      mode:'create',
      selected_content_id:1,
      subject:{title:'WEB', sub:'World wide web!'},
      welcome:{title:'welcome', desc: 'Hello, React!!'},
      contents:[
        {id:1, title: 'HTML', desc: 'HTML is for information.'},
        {id:2, title: 'CSS', desc: 'CSS is for design.'},
        {id:3, title: 'JavaScript', desc: 'JavaScript is for interactive.'}
      ]
    }
  }

  getReadContent() {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          return data;
        }
        i = i + 1;
      }
  }

  getContent() {
    var _title, _desc, _article, _content = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id += 1;
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );  // "push" changes the original array, while "concat" does not change the original array.
        
        // As updating state, do not use "push". Use "concat" (due to performance-wise)
        // var _contents = this.state.contents.concat(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );

        // Better version:
        var _contents = Array.from(this.state.contents);
        _contents.push(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({
          mode:'read',
          selected_content_id:this.max_content_id,
          contents:_contents
        });
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while (i < _contents.length) {
            if(_contents[i].id === _id) {
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i += 1;
          }
          this.setState({
            mode:'read',
            contents:_contents
          });
        }.bind(this)}></UpdateContent> 
    } 
    
    return _article;
  }

  render() {  // values for props or state are changed, render() is recalled.
    return (
      <div className='App'>
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){   // onChangePage is an event you made.
            // this.set.mode = "welcome"  <- If you do this, React does not know if you change the state
            this.setState({     // So, you must use .setState() to change to value of state.
              mode:'welcome'
            });
          }.bind(this)}>
        </Subject>
        <TOC 
          onChangePage = {function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}>
        </TOC>
        <Control
          onChangeMode={function(_mode){
            if(_mode === 'delete'){
              if(window.confirm("REALLY??")){
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < this.state.contents.length) {
                  if(_contents[i].id === this.state.selected_content_id){
                    _contents.splice(i, 1);
                    break;
                  }
                  i += 1;
                }
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted!');
            } else {
              this.setState({
                mode:_mode,
              });
            }
          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
