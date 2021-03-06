// load the events module, part of the Node.js core.
const EventEmitter = require('events');

// create a store object that can emit events.
const store = new EventEmitter();

// empty array to store grudges.
let grudges = [];

// check localStorage for saved grudges
const storedGrudges = localStorage.getItem('grudges');

if (storedGrudges) {
  grudges = JSON.parse(storedGrudges);
}

store.all = () => grudges.concat([]);

store.create = ({ person, offense }) => {
  grudges = grudges.concat({ person, offense, active: false, id: Date.now(), forgiven: false });
  store.emit('change', grudges);
};

store.update = (id, data) => {
  grudges = grudges.map(grudge => {
    if (grudge.id !== id) { return grudge; }
    return Object.assign(grudge, data);
  });
  store.emit('change', grudges);
};

store.select = (id) => {
  grudges = grudges.map(grudge => Object.assign(grudge, { active: grudge.id === id }));
  store.emit('change', grudges);
};

store.deselect = () => {
  grudges = grudges.map(grudge => Object.assign(grudge, { active: false }));
  store.emit('change', grudges);
};

store.forgive = (id) => {
  grudges = grudges.map(grudge => {
    if (grudge.id !== id) { return grudge; }
    return Object.assign(grudge, { forgiven: true });
  });
  store.emit('change', grudges);
}

store.condemn = (id) => {
  grudges = grudges.map(grudge => {
    if (grudge.id !== id) {
      return grudge;
    }
    return Object.assign(grudge, { forgiven: false });
  });
  store.emit('change', grudges);
}

store.on('change', () => {
  localStorage.setItem('grudges', JSON.stringify(grudges));
});

module.exports = store;
