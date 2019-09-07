export default class CachedSearch {
  constructor(getData, resultsHandler) {
    this.getData = getData;
    this.resultsHandler = resultsHandler;

    this.query = '';
    this.cache = {};
    this.cacheLimit = 5;
    this.cacheHistory = [];
  }

  updateCacheHistory(query) {
    if (this.cacheHistory.length === this.cacheLimit) {
      delete this.cache[this.cacheHistory.shift()];
    }
    this.cacheHistory.push(query);
  }

  async getSearchResults(query) {
    if (this.cache[query]) {
      this.resultsHandler(this.cache[query]);
    } else {
      const data = await this.getData(query);
      if (query) {
        this.updateCacheHistory(query);
        this.cache[query] = data;
      }
      this.resultsHandler(data);
    }
  }
}
