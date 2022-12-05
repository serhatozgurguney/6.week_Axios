import React, { Component } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { ListGroup, ListGroupItem } from "reactstrap";

const Loading = () => (
  <ReactLoading />
);



export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://jsonplaceholder.typicode.com/users")
      .then((result) => {
        setTimeout(() => {
          this.setState({ users: result.data, isLoading: false });
        }, 1000);
      })
      .catch((e) => {
        this.setState({ error: e, isLoading: false });
      });
  }
  render() {
    const { error, isLoading, users } = this.state;
    if (error) {
      return <div> Error :{error.message}</div>;
    } else if (isLoading) {
      return (
        <div>
          loading...
        </div>
      );
    } else {
      return (
        <ListGroup >
          {users.map((user) => (
            <ListGroupItem key={user.id}>
              {user.username}:                   {user.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      );
    }
  }
}

export default App;
