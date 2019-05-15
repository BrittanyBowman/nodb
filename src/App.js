import React, { Component } from "react";
import "./App.css";
import Todos from "./Todos"
import Header from "./Layout/Header";
import AddToDo from "./AddToDo";
import uuid from "uuid";
import axios from "axios";
import Search from "../src/Search";

import Header2 from "./Header/Header2";
import Favorites from "./Favorites/Favorites";
import Footer from "./Footer/Footer";

const baseUrl = "https://api.github.com/users";

class App extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: [],
      randomCountry: null,
      favoritesList: [],
      name: "",
      avatar: "",
      company: "",
      email: "",
      location: "",
      bio: "",
      query: "",
      searchArray: [],
      todos: [
        {
          id: uuid.v4(),
          title: "BryanSmith33",
          completed: false
        },
        {
          id: uuid.v4(),
          title: "Dmust32",
          completed: false
        },
        {
          id: uuid.v4(),
          title: "cwadrupldijjit",
          completed: false
        }
      ]
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(text) {
    //console.log("clicked")
    axios.get(`${baseUrl}/${text}`)
    .then(response =>
      this.setState({
        name: response.data.name,
        avatar: response.data.avatar_url,
        company: response.data.company,
        email: response.data.email,
        location: response.data.location,
        bio: response.data.bio
      })
    );
  }
  //Toggle Complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };
  //Delete Todo
  delTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  //Add Todo
  addTodo = title => {
    const newTodo = {
      id: uuid.v4(),
      title,
      completed: false
    };
    this.setState({ todos: [...this.state.todos, newTodo] });
  };

  deleteFavorite = id => {
    axios
      .delete(`http://localhost:3002/api/faves/${id}`)
      .then(response => this.setState({ favoritesList: response.data }));
  };
  getFavorites = () => {
    axios
      .get("http://localhost:3002/api/faves")
      .then(response => this.setState({ favoritesList: response.data }));
  };

  componentDidMount() {
    axios.get("http://restcountries.eu/rest/v2/all").then(response => {
      this.setState({
        allCountries: response.data
      });
    });
  }

  addToFavorites = () => {
    axios.post("http://localhost:3002/api/faves", {
        country: this.state.randomCountry
      })
      .then(response => {
        console.log(".then", response.data);
        this.setState({
          favoritesList: response.data
        });
      });
  };

  getRandom = () => {
    let i = Math.floor(
      Math.random() * Math.floor(this.state.allCountries.length)
    );
    this.setState({ randomCountry: this.state.allCountries[i] });
  };

  render() {
    let country = this.state.randomCountry;
    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddToDo addTodo={this.addTodo} />
          <Todos
            todos={this.state.todos}
            markComplete={this.markComplete}
            delTodo={this.delTodo}
          />
          <div className="wrapper">
            <div className="button__container">
              <Search searchFN={this.handleClick} />
              <p>{this.state.name}</p>
              <p>
                <img src={this.state.avatar} alt="" />
              </p>
              <p>{this.state.company}</p>
              <p>{this.state.email}</p>
              <p>{this.state.location}</p>
              <p>{this.state.bio}</p>
              <Header2 getRandomCountry={this.getRandom} />

              {this.state.randomCountry ? (
                <div>
                  <div className="country-card" key={country.id}>
                    {country.name}
                    <button type="button" onClick={() => this.addToFavorites()}>
                      Add Me!
                    </button>
                  </div>
                </div>
              ) : null}

              <Favorites
                faves={this.state.favoritesList}
                getFavorites={() => this.getFavorites()}
                deleteFavorite={() => this.deleteFavorite()}
              />

              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;