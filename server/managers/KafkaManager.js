var Q = require('q');
var kafkaConfig = require('../config/').db.kafka;
var EventManager = require('./EventManager');

var kafka = require('kafka-node'),
    HighLevelConsumer = kafka.HighLevelConsumer,
    client = new kafka.Client(kafkaConfig.url, kafkaConfig.groupId);

function KafkaManager() {
    if (KafkaManager.caller != KafkaManager.getInstance) {
        throw new Error("This object cannot be instanciated");
    }
    console.log("Kafka topic : " + kafkaConfig.tradeTopic);

    this.consumer = new HighLevelConsumer(
        client, [{
            topic: kafkaConfig.tradeTopic
        }], {
            groupId: kafkaConfig.groupId,
            autoCommit: true,
            fromBeginning: false
        }
    );

    this.consumer.on('error', function(err) {
        console.log('Connection to kafka  :', err);
    });
};

KafkaManager.prototype.init = function(params) {
    var deferred = Q.defer();
    var self = this;
    this.consumer.on('message', function(message) {
        EventManager.emit("BITSTAMP:BTC:USD:TRD", message.value);
    });
    deferred.resolve();
    return deferred.promise;
};

KafkaManager.instance = null;

KafkaManager.getInstance = function() {
    if (this.instance === null) {
        this.instance = new KafkaManager();
    }
    return this.instance;
};

module.exports = KafkaManager.getInstance();