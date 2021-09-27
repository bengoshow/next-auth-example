'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.QueryBuilder = void 0;
const helpers_1 = require('@freshbooks/api/dist/models/helpers');
/**
 * Builder to build AxiosRequestConfig params
 * for API endpoints
 */
class QueryBuilder {
  constructor() {
    this.queryParams = {};
  }
  static handleDate(date) {
    const year = date.getFullYear();
    const month = date.toLocaleDateString(undefined, { month: '2-digit' });
    const day = date.toLocaleDateString(undefined, { day: '2-digit' });
    return `${year}-${month}-${day}`;
  }
  static handleDateTime(date) {
    const year = date.getFullYear();
    const month = date.toLocaleDateString(undefined, { month: '2-digit' });
    const day = date.toLocaleDateString(undefined, { day: '2-digit' });
    const hour = date.toLocaleTimeString(undefined, { hour: '2-digit' });
    const minute = date.toLocaleTimeString(undefined, { minute: '2-digit' });
    const second = date.toLocaleTimeString(undefined, { second: '2-digit' });
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  in(key, values) {
    this.queryParams = Object.assign(Object.assign({}, this.queryParams), { [`${key}[]`]: values });
    return this;
  }
  equals(key, value) {
    this.queryParams = Object.assign(Object.assign({}, this.queryParams), { [`${key}`]: value });
    return this;
  }
  like(key, value) {
    this.queryParams = Object.assign(Object.assign({}, this.queryParams), { [`${key}`]: value });
    return this;
  }
  betweenDate(key, { min, max }) {
    if (min) {
      const value = min instanceof Date ? QueryBuilder.handleDate(min) : min;
      this.queryParams = Object.assign(Object.assign({}, this.queryParams), { [`${key}`]: value });
    }
    if (max) {
      const value = max instanceof Date ? QueryBuilder.handleDate(max) : max;
      this.queryParams = Object.assign(Object.assign({}, this.queryParams), { [`${key}`]: value });
    }
    return this;
  }
  betweenDateTime(key, { min, max }) {
    if (min) {
      const value = min instanceof Date ? QueryBuilder.handleDateTime(min) : min;
      this.queryParams = Object.assign(Object.assign({}, this.queryParams), { [`${key}`]: value });
    }
    if (max) {
      const value = max instanceof Date ? QueryBuilder.handleDateTime(max) : max;
      this.queryParams = Object.assign(Object.assign({}, this.queryParams), { [`${key}`]: value });
    }
    return this;
  }
  build() {
    return helpers_1.buildQueryString(this.queryParams);
  }
}
exports.QueryBuilder = QueryBuilder;
