define('bignumber', ['config', 'FormatUtils', 'd3', 'moment'], function(config, FormatUtils, d3) {

    function BigNumber(el) {
        var self = this;
        this.el = el;

        this.width = $(this.el).width();
        this.height = $(this.el).height();

        this.addLoader();
    };

    BigNumber.prototype.render = function(params) {
        var self = this;

        if (!this.validate(params.value)) {
            this.addLoader();
            return;
        }

        this.initValue = this.value || 0;
        this.trend = params.trend || false;
        this.reset = params.reset || false;
        this.value = params.value;
        this.unit = params.unit || this.unit;
        this.delay = params.delay || 0;
        this.duration = params.duration || 0;
        this.type = params.type || this.type;
        this.fontSize = params.fontSize || this.fontSize || "20px";

        this.removeLoader();
        d3.select(this.el).transition()
            .delay(self.delay)
            .duration(self.duration)
            .attr('opacity', 1)
            .attr('font-size', self.fontSize)
            .tween("text", function(d) {
                var i = d3.interpolate(self.initValue, self.value);
                return function(t) {
                    this.textContent = self.valueToLabel(i(t));
                };
            });
        if (this.trend) {
            this.addTrend();
        }
    };

    BigNumber.prototype.validate = function(value) {
        return _.isNumber(value) && !_.isNaN(value);
    };

    BigNumber.prototype.addTrend = function() {
        var self = this;
        var delay = this.delay + this.duration;
        var fadeInfadeOutDuration = 600;
    };

    BigNumber.prototype.valueToLabel = function(raw) {
        var formattedlabel = raw;
        switch (this.type) {
            case "price":
                formattedlabel = FormatUtils.formatPrice(raw, this.unit);
                break;
            case "short":
                formattedlabel = FormatUtils.formatValueShort(raw);
                break;
            case "volume":
                formattedlabel = FormatUtils.formatItem(raw, this.unit);
                break;
            case "timestamp":
                formattedlabel = FormatUtils.formatTime(raw, 'timestamp');
                break;
            case "second":
                formattedlabel = FormatUtils.formatTime(raw, 'second');
                break;
            case "ago":
                formattedlabel = "(" + FormatUtils.formatAgo(raw, this.unit) + ")";
                break;
            case "percent":
                formattedlabel = FormatUtils.formatPercent(raw);
                break;
            default:
                formattedlabel = FormatUtils.formatValue(raw, 2);
        }

        return formattedlabel;
    };

    BigNumber.prototype.addLoader = function() {
        $(this.el).addClass('icon-spin4');
    };

    BigNumber.prototype.removeLoader = function() {
        $(this.el).removeClass('icon-spin4');
    };

    return BigNumber;

});