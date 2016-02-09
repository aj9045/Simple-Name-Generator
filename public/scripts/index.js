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



ReactDOM.render(
  <App />,
  document.getElementById("content")
);
