class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstArray: [],
      lastArray: [],
      savedNames: [],
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

  saveName() {
    var name = this.state.fullName;
    if (/generate/.test(name)) {
      return false;
    }
    else {
      var savedNames = this.state.savedNames;
      savedNames.push(name);
      this.setState({savedNames: savedNames});
    }
    this.generateFullName();
  }

  onDelete(event) {
    var index = event.target.value;
    var savedNames = this.state.savedNames;
    savedNames.splice(index, 1);
    this.setState({savedNames: savedNames});
  }

  clearAll() {
    this.setState({savedNames: []});
  }

  render() {
    return (
      <div className="app">
        <h1>Name Generator</h1>
        <GeneratorBox generateFullName={this.generateFullName.bind(this)} fullName={this.state.fullName} saveName={this.saveName.bind(this)} />
        <SavedList savedNames={this.state.savedNames} onDelete={this.onDelete.bind(this)} clearAll={this.clearAll.bind(this)} />
      </div>
    );
  }
}

class GeneratorBox extends React.Component {
  render() {
    return (
      <div className="generatorBox">
        <Name fullName={this.props.fullName} />
        <GeneratorButtonBox generateFullName={this.props.generateFullName} saveName={this.props.saveName} />
      </div>
    );
  }
}

class Name extends React.Component {
  render() {
    return (
      <p className="name">{this.props.fullName}</p>
    );
  }
}

class GeneratorButtonBox extends React.Component {
  render() {
    return (
      <div className="buttonBox">
        <button type="button" onClick={this.props.generateFullName} className="generateButton button">Generate</button>
        <button type="button" onClick={this.props.saveName} className="saveButton button">Save</button>
      </div>
    );
  }
}

class SavedList extends React.Component {
  render() {
    var names = this.props.savedNames.length === 0 ? <p>No saved names yet!</p> : this.props.savedNames.map(function(name, index){
      return (
        <SavedName key={index} name={name} index={index} onDelete={this.props.onDelete}/>
      );
    }.bind(this))
    return (
      <div className="savedList">
        <h2>Saved Names</h2>
        <ClearAllButton clearAll={this.props.clearAll} />
        <ol>
          {names}
        </ol>
      </div>
    );
  }
}

class SavedName extends React.Component {
  render() {
    return (
       <li className="savedName">{this.props.name} <DeleteNameButton index={this.props.index} onDelete={this.props.onDelete} /></li>
    );
  }
}

class DeleteNameButton extends React.Component {
  render() {
    return (
      <button type="button" value={this.props.index} onClick={this.props.onDelete} className="deleteButton button"><img src="../assets/deleteButton.png" className="deleteImage" /></button>
    );
  }
}

class ClearAllButton extends React.Component {
  render() {
    return (
      <button type="button" onClick={this.props.clearAll} className="clearButton button">Clear All</button>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById("content")
);
