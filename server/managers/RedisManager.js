var redis = require('redis');
var url = require('url');
var _ = require('underscore');
var Q = require('q');
var fs = require('fs');
var EventManager = require('./EventManager');
var apiManager = require('./APIManager');
var CacheManager = require('./CacheManager');
var config = require('../config/');

function RedisManager() {
    if (RedisManager.caller != RedisManager.getInstance) {
        throw new Error("This object cannot be instanciated");
    }
};

RedisManager.prototype.init = function(params) {
    var deferred = Q.defer();
    var self = this;

    var redisOptions = {
        return_buffers: false,
    };

    if (params.isDeployed) {
        // this.redisClient = redis.createClient();
        var redisCloudUrl = url.parse(params.url);
        this.redisClient = redis.createClient(redisCloudUrl.port, redisCloudUrl.hostname, redisOptions);
        // this.redisClient.auth(params.password);
    } else {
        var redisCloudUrl = url.parse(params.url);
        this.redisClient = redis.createClient(redisCloudUrl.port, redisCloudUrl.hostname, redisOptions);
        // this.redisClient.auth(params.password);
    }

    this.redisClient.on("error", function(err) {
        console.log('Pub/sub client error :' + err);
    });

    this.redisClient.on("connect", function() {
        console.log('Pub/sub connection...OK');
        deferred.resolve();
    });

    return deferred.promise;
};

RedisManager.prototype.subscribeToChannels = function(callback) {
    var self = this;
    var sep = ":";
    // console.log("REDIS subscribeToChannels FUNCTION!");
    apiManager.getPlatforms(function(platforms) {
        console.log("GET PLATFORMS API AMNAGER REDIS", platforms);
        _.each(platforms, function(platform) {
            _.each(platform.pairs, function(pair) {
                _.each(config.measures, function(measure) {
                    var item = pair.split(';')[0];
                    var currency = pair.split(';')[1];
                    var channel = platform.platformname + sep + item + sep + currency + sep + measure.key;
                    console.log("Subscribe to :", channel);
                    self.redisClient.psubscribe(channel);
                });
            });
        });
        
        self.redisClient.on("pmessage", function(pattern, channel, message) {
            message = self.parseMessage(channel, message);
            CacheManager.set(channel, message);
            EventManager.emit(channel, message);
        });

        if (callback) {
            callback();
        }
    });
};

RedisManager.prototype.parseMessage = function(channel, message) {
    var jsonMessage;
    try {
        jsonMessage = JSON.parse(message);
    } catch (e) {
        console.log('Problem parsing message', e);
    }
    return jsonMessage;
};

RedisManager.prototype.getClient = function() {
    return this.redisClient;
};

RedisManager.instance = null;

RedisManager.getInstance = function() {
    if (this.instance === null) {
        this.instance = new RedisManager();
    }
    return this.instance;
};

module.exports = RedisManager.getInstance();