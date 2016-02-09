class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstArray: [],
      lastArray: [],
    };
  }

  componentWillMount() {
    this.serverRequest = $.get("../first_names.csv", function (result) {
      var first = result.split(",");
      this.setState({firstArray: first});
    }.bind(this));
    this.serverRequest = $.get("../last_names.csv", function (result) {
      var last = result.split(",");
      this.setState({lastArray: last});
    }.bind(this));
  }

  render() {
    return (
      <div>
        <h1>Name Generator</h1>
        <GeneratorBox />
        <SavedList  />
      </div>
    );
  }
}

class GeneratorBox extends React.Component {
  render() {
    return (
      <div>
        <Name />
        <GeneratorButtonBox />
      </div>
    );
  }
}

class SavedList extends React.Component {
  render() {
    return (
      <div>
        Saved List
      </div>
    );
  }
}



ReactDOM.render(
  <App />,
  document.getElementById("content")
);
