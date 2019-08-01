    import React, { Component } from 'react';
    import CKEditor from '@ckeditor/ckeditor5-react';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    import axios from 'axios';

    class App extends Component {

        state = {
            contents: []
        }

        componentDidMount() {
            axios.get('https://ckeditor-react-django.herokuapp.com/post/')
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
                        data="<p>Hello from CKEditor 5!</p>"
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                            axios.post('https://ckeditor-react-django.herokuapp.com/post/',{
                                content: data
                            })
                        } }
                        onBlur={ editor => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ editor => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </div>
            );
        }
    }

    export default App;
