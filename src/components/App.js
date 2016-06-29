import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class App extends Component {
  render() {
    const { nextPage, previousPage, items, currentPage, isFetching } = this.props;
    return (
      <section className={'repositories'}>
        <h1>Github repositories</h1>
        <table className={isFetching ? 'table--fetching' : ''}>
          <thead>
            <tr>
              <th className="table--head"></th>
              <th className="table--head table--head--text">Repository name</th>
              <th className="table--head table--head--numeric">Stars</th>
              <th className="table--head table--head--numeric">Forks</th>
              <th className="table--head table--head--numeric">Open issues</th>
              <th className="table--head table--head--text">Latest push</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map(item => (
                <tr key={item.id}>
                  <td>
                      <img className="repo--image" src={`${item.owner.avatar_url}&size=24`} width="24" height="24"/>
                  </td>
                  <td className="table--body--text"><a href={item.html_url}>{item.full_name}</a></td>
                  <td className="table--body--numeric">{item.stargazers_count}</td>
                  <td className="table--body--numeric">{item.forks}</td>
                  <td className="table--body--numeric">{item.open_issues}</td>
                  <td className="table--body--text">{moment(item.pushed_at).fromNow()}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div>
          <button className="button" onClick={previousPage} disabled={currentPage <= 1 || isFetching}>Previous</button>
          <div className="current-page">{currentPage}</div>
          <button className="button" onClick={nextPage} disabled={isFetching}>Next</button>
        </div>
      </section>
    );
  }
}

App.propTypes = {
  items: PropTypes.array.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
};