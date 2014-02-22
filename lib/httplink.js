/*
 * httplink
 * Restfull Link HTTP header.
 * https://github.com/thanpolas/kansas
 *
 * Copyright (c) 2014 Thanasis Polychronakis
 * Licensed under the MIT license.
 */

/**
 * Restfull Link HTTP header.
 *
 * @constructor
 */
var Link = module.exports = function() {
  this.link = '<';
  this.paginatorData = {};

  this.parts = {
    rel: null,
    protocol: null,
    host: null,
    port: null,
    path: null,
    show: null,
  };
};

/** @enum {string} Available Rel modes */
Link.Rel = {
  CURRENT: 'current',
  PREVIOUS: 'previous',
  NEXT: 'next',
  FIRST: 'first',
  LAST: 'last',
};

/**
 * Set the pagination data.
 *
 * @param {Object} data result object from paginator module.
 * @return {self} chain.
 * @see https://github.com/vanng822/pagination
 */
Link.prototype.data = function(data) {
  this.paginatorData = data;
  return this;
};


/**
 * Set the protocol.
 *
 * @param {string} protocol http/https.
 * @return {self} chain.
 */
Link.prototype.protocol = function(protocol) {
  this.link += protocol + '://';
  this.parts.protocol = protocol;
  return this;
};

/**
 * Set the host.
 *
 * @param {string} host webserver hostname.
 * @return {self} chain.
 */
Link.prototype.host = function(host) {
  this.link += host;
  this.parts.host = host;
  return this;
};

/**
 * Set the port.
 *
 * @param {string=} port The webserver's port.
 * @return {self} chain.
 */
Link.prototype.port = function(port) {
  if (['80', '443'].indexOf(port + '') === -1) {
    this.link += ':' + port;
  }
  this.parts.port = port;
  return this;
};

/**
 * Set the path.
 *
 * @param {string} path the path without the query.
 * @return {self} chain.
 */
Link.prototype.path = function(path) {
  this.link += path;
  this.parts.path = path;
  return this;
};

/**
 * Set the rel field. 'rel' can be one of Link.Rel enum.
 *
 * @param {Link.Rel} path http/https.
 * @return {self} chain.
 */
Link.prototype.rel = function(rel) {
  if (this.parts.rel) {
    // been here before, construct another link
    this.link += ', <';
    this.protocol(this.parts.protocol);
    this.host(this.parts.host);
    this.port(this.parts.port);
    this.path(this.parts.path);
  }

  this.link += '?page=';
  this.link += this.paginatorData[rel];

  if (this.parts.rel) {
    this.show(this.parts.show);
  }

  this.parts.rel = rel;

  return this;
};


/**
 * Set how many items to show, can be omitted.
 *
 * @param {number} show How many items to show.
 * @return {self} chain.
 */
Link.prototype.show = function(queryShow) {
  if (queryShow) {
    this.link += '&show=' + queryShow;
  }
  this.parts.show = queryShow;
  return this;
};

/**
 * Indicate an end to a link, alias for end().
 *
 * @return {self} chain.
 */
Link.prototype.next = Link.prototype.end = function() {
  this.link += '>; rel="' + this.parts.rel + '"';
  return this;
};

/**
 * Get the constructed string.
 *
 * @return {string} The constructing link.
 */
Link.prototype.get = function() {
  return this.link;
};
