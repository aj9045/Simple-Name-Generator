class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstArray: [],
      lastArray: [],
      savedNames: [],
      firstName: "",
      lastName: "",
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
    this.setState({
      firstName: first,
      lastName: last,
    });
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
    var name = this.state.firstName + " " + this.state.lastName;
    if (name !== "") {
      var savedNames = this.state.savedNames;
      savedNames.push(name);
      this.setState({savedNames: savedNames});
    }
    this.generateFullName();
  }

  onDelete(index) {
    var savedNames = this.state.savedNames;
    savedNames.splice(index, 1);
    this.setState({savedNames: savedNames});
  }

  clearAll() {
    this.setState({savedNames: []});
  }

  holdFirst() {
    console.log("holdFirst");
  }

  holdLast() {
    console.log("holdLast");
  }

  render() {
    return (
      <div className="app">
        <h1>Name Generator</h1>
        <GeneratorBox generateFullName={this.generateFullName.bind(this)} firstName={this.state.firstName} lastName={this.state.lastName} saveName={this.saveName.bind(this)} holdFirst={this.holdFirst.bind(this)} holdLast={this.holdLast.bind(this)} />
        <SavedList savedNames={this.state.savedNames} onDelete={this.onDelete.bind(this)} clearAll={this.clearAll.bind(this)} />
      </div>
    );
  }
}

class GeneratorBox extends React.Component {
  render() {
    return (
      <div className="generatorBox">
        <Name firstName={this.props.firstName} lastName={this.props.lastName} holdFirst={this.props.holdFirst} holdLast={this.props.holdLast} />
        <GeneratorButtonBox generateFullName={this.props.generateFullName} saveName={this.props.saveName} />
      </div>
    );
  }
}

class Name extends React.Component {
  render() {
    if (this.props.firstName === "" || this.props.lastName === "") {
      var nameDisplay = <p className="noName">Click "generate" to conjure up a name</p>;
    }
    else {
      var nameDisplay = (
        <p className="fullName">
          <span className="firstName" onClick={this.props.holdFirst}>{this.props.firstName}</span> <span className="lastName" onClick={this.props.holdLast}>{this.props.lastName}</span>
        </p>
      );
    }
    return (
      <div>
        {nameDisplay}
      </div>
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
    var names = this.props.savedNames.length === 0 ? <p className="noSavedNames">No saved names yet!</p> : this.props.savedNames.map(function(name, index){
      var onDelete = this.props.onDelete.bind(null, index);
      return (
        <SavedName key={index} name={name} index={index} onDelete={onDelete} />
      );
    }.bind(this))
    return (
      <div className="savedList">
        <h2>Saved Names <ClearAllButton clearAll={this.props.clearAll} /></h2>
        <ol>
          {names}
        </ol>
      </div>
    );
  }
}

class SavedName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  showDeleteButton() {
    this.setState({hover: !this.state.hover});
  }

  render() {
    if (this.state.hover) {
      var deleteButton = <DeleteNameButton index={this.props.index} onDelete={this.props.onDelete} />
    }
    else {
      var deleteButton;
    }
    return (
       <li className="savedName"><span onMouseEnter={this.showDeleteButton.bind(this)} onMouseLeave={this.showDeleteButton.bind(this)}>{this.props.name} {deleteButton}</span></li>
    );
  }
}

class DeleteNameButton extends React.Component {
  render() {
    return (
      <button type="button" onClick={this.props.onDelete} className="deleteButton button"><img src="../assets/deleteButton.png" className="deleteImage" value={this.props.index} /></button>
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
