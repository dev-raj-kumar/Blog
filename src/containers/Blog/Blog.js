import React, { Component } from 'react';


import './Blog.css';
import axios from 'axios';

class Blog extends Component {
  state = {
     posts : [] ,
     selectedPostId : null,
     error : false
  };

    componentDidMount(){
       axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response =>{
              // console.log(response);
              const posts = response.data.slice(0,4);
              const updatedPosts = posts.map(post => {
                return {
                  ...post,
                  author : "Dev"
                }
              });
              this.setState({
                posts : updatedPosts
              });
            })
            .catch(error => {
               this.setState({
                 error : true
               });
            });
    }

    postSelectedHandler = (id) => {
       this.setState({
          selectedPostId : id
       });
    };
    render () {
      let postsArray = <p style={{textAlign : "center"}}>OOpppss !! There an error !!</p>;
        if(! this.state.error)
       postsArray = this.state.posts.map(post => {
         return <Post key = {post.id}
            title = {post.title}
            author = {post.author}
             clicked = {()=> this.postSelectedHandler(post.id)}/>
         });
        return (
            <div className="Blog">
                <header>
                   <nav>
                     <ul>
                       <li><a href = "/">Home</a> </li>
                       <li><a href = "/new-post">New Post</a></li>
                     </ul>
                   </nav>
                </header>
                <section className="Posts">
                    {postsArray}
                </section>

            </div>
        );
    }
}

export default Blog;
