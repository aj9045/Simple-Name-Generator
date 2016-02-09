class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstArray: [],
      lastArray: [],
    };
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
        Generator Box
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
