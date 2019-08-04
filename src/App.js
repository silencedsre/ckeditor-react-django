import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import axios from 'axios';

class App extends Component {

    state = {
        contents: [],
        post: ``
    };

    onButtonSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.post);
        axios.defaults.xsrfHeaderName = "X-CSRFToken";
        axios.post('https://ckeditor-react-django.herokuapp.com/post/',
            {content: this.state.post},
            {headers:
                    {'Authorization': 'Token 9fed17335075119580fce6fb341e7c476dfcbc12'}
            });
    };

    componentDidMount() {
        axios.get('https://ckeditor-react-django.herokuapp.com/post/',
            {headers: {
                    'Authorization': 'Token 9fed17335075119580fce6fb341e7c476dfcbc12'
                }
            })
            .then(response => {
                console.log(response);
                this.setState({
                    contents: response.data
                })
            });
    }

    createMarkup = (markup) => {
        return{__html:markup}
    }


    render(){

        const ckeditorList = this.state.contents.map(content => {
            return (
                <div key={content.id}>
                    <div dangerouslySetInnerHTML={this.createMarkup(content.content)}></div>
                    <hr />
                </div>
            )
        })

        return (
            <div className="App">
                {ckeditorList}
                <h2>Hello from CKeditor</h2>

                <CKEditor
                    editor={ ClassicEditor }
                    onChange={ ( event, editor ) => {
                        this.setState({post: editor.getData()});
                    }}
                />
                <button onClick={this.onButtonSubmit}>Submit</button>
            </div>
        );
    }
}

export default App;
