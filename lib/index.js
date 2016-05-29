const React = require('react');
const ReactDOM = require('react-dom');
const store = require('./data-store');

require('./reset.css');
require('./style.scss');

class GrudgeBin extends React.Component {
  constructor() {
    super();
    this.state = {
      grudges: store.all(),
    };
  }

  componentDidMount() {
    store.on('change', grudges => {
      this.setState({ grudges });
    });
  }

  render() {
    const activeGrudge = this.state.grudges.find(grudge => grudge.active);

    return (
      <div className="GrudgeBin">
        <section className="sidebar">
          <header>
            <h1>{this.props.person}</h1>
            <CreateGrudge/>
            <GrudgesList grudges={this.state.grudges}/>
          </header>
        </section>
        <section className="main-content">
          <ActiveGrudge grudge={activeGrudge}/>
        </section>
      </div>
    );
  }
}

class CreateGrudge extends React.Component {
  constructor() {
    super();
    this.state = {
      person: '',
      offense: '',
    };
  }

  updateProperties(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  createGrudge(e) {
    e.preventDefault();
    store.create(this.state);
    this.setState({ person: '', offense: '' });
  }

  render() {
    return (
      <div className="CreateGrudge">
        <input className="CreateGrudge-person"
          name="person"
          placeholder="Name of Offender"
          value={this.state.person}
          onChange={(e) => this.updateProperties(e)}
          />
          <textarea className="CreateGrudge-offense"
          name="offense"
          placeholder="Offense"
          value={this.state.offense}
          onChange={(e) => this.updateProperties(e)}
          />
          <input className="CreateGrudge-submit"
            type="submit"
            onClick={(e) => this.createGrudge(e)}
          />
      </div>
    );
  }
}

const GrudgesList = ({ grudges }) => {
  return (
    <div className="GrudgesList">
      { grudges.map(grudge => <GrudgesListItem {...grudge} key={grudge.id}/>)}
    </div>
  );
};

const GrudgesListItem = ({ id, person, offense, active }) => {
  return (
    <div className={active ? 'GrudgesListItem is-active' : 'GrudgesListItem'}>
      <h3 className="GrudgesListItem-person">{person}</h3>
      <div className="GrudgesListItem-offense">{offense}</div>
      <div className="GrudgesListItem-buttons">
        <button onClick={() => store.select(id)}>Select</button>
        <button onClick={() => store.destroy(id)}>Destroy</button>
      </div>
    </div>
  );
};

const ActiveGrudge = ({ grudge }) => {
  if (!grudge) { return <p className="ActiveGrudge">Please select a grudge.</p>; }

  const updateGrudge = (e) => {
    const { name, value } = e.target;
    store.update(grudge.id, Object.assign(grudge, { [name]: value }));
  };

  return (
    <div className="ActiveGrudge">
      <input className="ActiveGrudge-person"
        name="person"
        value={grudge.person}
        onChange={updateGrudge}
      />
      <textarea className="ActiveGrudge-offense"
        name="offense"
        value={grudge.offense}
        onChange={updateGrudge}
      />
    </div>
  )
}

ReactDOM.render(<GrudgeBin title="Grudge Bin"/>, document.querySelector('.application'));
