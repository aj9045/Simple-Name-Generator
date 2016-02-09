class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstArray: [],
      lastArray: [],
      fullName: "Click the 'generate' button to conjure a name",
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

  generateFullName() {
    var first = this.generateFirst();
    var last = this.generateLast();
    var fullName = first +  " " + last;
    this.setState({fullName: fullName});
  }

   generateFirst() {
    var firstNames = this.state.firstArray;
    var index = Math.floor(Math.random() * (firstNames.length - 1)) + 1;
    return firstNames[index];
  }

  generateLast() {
    var lastNames = this.state.lastArray;
    var index = Math.floor(Math.random() * (lastNames.length - 1)) + 1;
    return lastNames[index];
  }

  render() {
    return (
      <div>
        <h1>Name Generator</h1>
        <GeneratorBox generateFullName={this.generateFullName.bind(this)}/>
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
        <GeneratorButtonBox generateFullName={this.props.generateFullName}/>
      </div>
    );
  }
}

class Name extends React.Component {
  render() {
    return (
      <p>A name goes here</p>
    );
  }
}

class GeneratorButtonBox extends React.Component {
  render() {
    return (
      <div>
        <button type="button" onClick={this.props.generateFullName}>Generate</button>
        <button type="button">Save</button>
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
