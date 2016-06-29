export default class Model {
  constructor() {
    this.currentPage = 1;
    this.pageSize = 20;
    this.items = [];
    this.pages = {};
    this.isFetching = false;
  }
  fetch() {
    if (this.pages[this.currentPage]) {
      this.items = this.pages[this.currentPage];
      return Promise.resolve(this.items);
    }
    this.isFetching = true;
    const pageToFetch = this.currentPage;
    const promise = fetch(`https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=${this.pageSize}&page=${this.currentPage}`);

    promise.then(() => {
      this.isFetching = false;
    });

    return promise.then(res => {
      if (res.ok) {
        return res.json().then(json => {
          this.pages[pageToFetch] = json.items;
          this.items = json.items;
          return this.items;
        });
      } else {
        this.items = [];
        return this.items;
      }
    });
  }
  nextPage() {
    this.currentPage++;
    return this.fetch();
  }
  previousPage() {
    this.currentPage--;
    return this.fetch();
  }
}

