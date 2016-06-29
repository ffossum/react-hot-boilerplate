import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Model from './model';

const model = new Model();

function nextPage() {
  model.nextPage().then(() => {
    render();
  });
  render();
}

function previousPage() {
  model.previousPage().then(() => {
    render();
  });
  render();
}

function render() {
  ReactDOM.render(
    <App
      nextPage={nextPage}
      previousPage={previousPage}
      items={model.items}
      currentPage={model.currentPage}
      isFetching={model.isFetching}
    />,
    document.getElementById('root')
  );
}

model.fetch().then(render);
render();
