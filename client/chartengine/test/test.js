var ChartEngine = require('ChartEngine');
var DatasetFactory = require('DatasetFactory');

var chartParams = {
	anchorId: "#test",
	chartType: "DoubleMarimekkoChart",
	// chartType: "MarimekkoChart",
	size: 'auto'
};

var chart = ChartEngine.create(chartParams);

// var dataset = DatasetFactory.generateDataset('marimekko', 3, 2);

// var dataset = {
// 	lines: [{
// 		id: "Email",
// 		name: "Email",
// 		points: [{
// 			id: "nl1409",
// 			value: 8,
// 			x: "nl1409",
// 			name: "nl1409"
// 		}]
// 	}, {
// 		id: "Social",
// 		name: "Social",
// 		points: [{
// 			id: "redirect_disqus_com",
// 			value: 6,
// 			x: "redirect.disqus.com",
// 			name: "redirect.disqus.com"
// 		}, {
// 			id: "facebook_com",
// 			value: 11,
// 			x: "facebook.com",
// 			name: "facebook.com"
// 		}, {
// 			id: "reddit_com",
// 			value: 6,
// 			x: "reddit.com",
// 			name: "reddit.com",
// 			classes: ['highlight']
// 		}, {
// 			id: "l_facebook_com",
// 			value: 4,
// 			x: "l.facebook.com",
// 			name: "l.facebook.com"
// 		}]
// 	}, {
// 		id: "Referral",
// 		name: "Referral",
// 		points: [{
// 			id: "moodle_bucknell_edu",
// 			value: 50,
// 			x: "moodle.bucknell.edu",
// 			name: "moodle.bucknell.edu"
// 		}, {
// 			id: "google_de",
// 			value: 10,
// 			x: "google.de",
// 			name: "google.de"
// 		}, {
// 			id: "google_fr",
// 			value: 5,
// 			x: "google.fr",
// 			name: "google.fr"
// 		}]
// 	}, {
// 		id: "Direct",
// 		name: "Direct",
// 		points: [{
// 			id: "direct traffic",
// 			value: 98,
// 			x: "direct traffic",
// 			name: "direct traffic"
// 		}]
// 	}]
// };

var dataset = {
	lines: [{
		id: "Email",
		name: "Email",
		points: [{
			id: "netvibesfr",
			value: 73,
			x: "netvibesfr",
			name: "netvibesfr"
		}, {
			id: "netvibesen",
			value: 35,
			x: "netvibesen",
			name: "netvibesen"
		}, {
			id: "UKHF mailing list",
			value: 5,
			x: "UKHF mailing list",
			name: "UKHF mailing list"
		}, {
			id: "other:ga:source",
			value: 108,
			x: "other:ga:source",
			name: "other:ga:source"
		}]
	}, {
		id: "(Other)",
		name: "(Other)",
		points: [{
			id: "other:ga:source",
			value: 15851,
			x: "other:ga:source",
			name: "other:ga:source"
		}, {
			id: "http:__www_netvibes_com_privatepage_1",
			value: 6516,
			x: "http://www.netvibes.com/privatepage/1",
			name: "http://www.netvibes.com/privatepage/1"
		}, {
			id: "http:__www_netvibes_com_privatepage_2",
			value: 1120,
			x: "http://www.netvibes.com/privatepage/2",
			name: "http://www.netvibes.com/privatepage/2"
		}, {
			id: "http:__www_netvibes_com_privatepage_1?utm_source=http%3A%2F%2Fwww_netvibes_com%2Fprivatepage%2F1&utm_medium=web&utm_campaign=framebusting",
			value: 859,
			x: "http://www.netvibes.com/privatepage/1?utm_source=http%3A%2F%2Fwww.netvibes.com%2Fprivatepage%2F1&utm_medium=web&utm_campaign=framebusting",
			name: "http://www.netvibes.com/privatepage/1?utm_source=http%3A%2F%2Fwww.netvibes.com%2Fprivatepage%2F1&utm_medium=web&utm_campaign=framebusting"
		}, {
			id: "http:__www_netvibes_com_",
			value: 561,
			x: "http://www.netvibes.com/",
			name: "http://www.netvibes.com/"
		}, {
			id: "http:__www_01net_com_services-en-ligne_netvibes-108037_utiliser_",
			value: 282,
			x: "http://www.01net.com/services-en-ligne/netvibes-108037/utiliser/",
			name: "http://www.01net.com/services-en-ligne/netvibes-108037/utiliser/"
		}, {
			id: "http:__uwa_netvibes_com_apps_Samples_Controls_Web_index_xhtml",
			value: 220,
			x: "http://uwa.netvibes.com/apps/Samples/Controls/Web/index.xhtml",
			name: "http://uwa.netvibes.com/apps/Samples/Controls/Web/index.xhtml"
		}, {
			id: "http:__www_netvibes_com_signin?from=home",
			value: 207,
			x: "http://www.netvibes.com/signin?from=home",
			name: "http://www.netvibes.com/signin?from=home"
		}, {
			id: "http:__www_netvibes_com_privatepage_1?utm_source=http%3A%2F%2Fwww_netvibes_com%2Fprivatepage%2F1%3Futm_source%3Dhttp%253A%252F%252Fwww_netvibes_com%252Fprivatepage%252F1%253Futm_source%253Dhttp%25253A%25252F%25252Fwww_netvibes_com%25252Fprivatepage%25252F1%2526utm_medium%253Dweb%2526utm_campaign%253Dframebusting%26utm_medium%3Dweb%26utm_campaign%3Dframebusting&utm_medium=web&utm_campaign=framebusting",
			value: 187,
			x: "http://www.netvibes.com/privatepage/1?utm_source=http%3A%2F%2Fwww.netvibes.com%2Fprivatepage%2F1%3Futm_source%3Dhttp%253A%252F%252Fwww.netvibes.com%252Fprivatepage%252F1%253Futm_source%253Dhttp%25253A%25252F%25252Fwww.netvibes.com%25252Fprivatepage%25252F1%2526utm_medium%253Dweb%2526utm_campaign%253Dframebusting%26utm_medium%3Dweb%26utm_campaign%3Dframebusting&utm_medium=web&utm_campaign=framebusting",
			name: "http://www.netvibes.com/privatepage/1?utm_source=http%3A%2F%2Fwww.netvibes.com%2Fprivatepage%2F1%3Futm_source%3Dhttp%253A%252F%252Fwww.netvibes.com%252Fprivatepage%252F1%253Futm_source%253Dhttp%25253A%25252F%25252Fwww.netvibes.com%25252Fprivatepage%25252F1%2526utm_medium%253Dweb%2526utm_campaign%253Dframebusting%26utm_medium%3Dweb%26utm_campaign%3Dframebusting&utm_medium=web&utm_campaign=framebusting"
		}]
	}, {
		id: "Social",
		name: "Social",
		points: [{
			id: "other:ga:source",
			value: 35792,
			x: "other:ga:source",
			name: "other:ga:source"
		}, {
			id: "blog_netvibes_com",
			value: 3953,
			x: "blog.netvibes.com",
			name: "blog.netvibes.com"
		}, {
			id: "eco_netvibes_com",
			value: 3242,
			x: "eco.netvibes.com",
			name: "eco.netvibes.com"
		}, {
			id: "faq_netvibes_com",
			value: 2824,
			x: "faq.netvibes.com",
			name: "faq.netvibes.com"
		}, {
			id: "mobile_netvibes_com",
			value: 1966,
			x: "mobile.netvibes.com",
			name: "mobile.netvibes.com"
		}, {
			id: "twitter",
			value: 1876,
			x: "twitter",
			name: "twitter"
		}, {
			id: "vip_netvibes_com",
			value: 1866,
			x: "vip.netvibes.com",
			name: "vip.netvibes.com"
		}, {
			id: "relais_weebly_com",
			value: 1467,
			x: "relais.weebly.com",
			name: "relais.weebly.com"
		}, {
			id: "matome_naver_jp",
			value: 1403,
			x: "matome.naver.jp",
			name: "matome.naver.jp"
		}]
	}, {
		id: "Referral",
		name: "Referral",
		points: [{
			id: "other:ga:source",
			value: 141824,
			x: "other:ga:source",
			name: "other:ga:source"
		}, {
			id: "feeds_feedburner_com",
			value: 20382,
			x: "feeds.feedburner.com",
			name: "feeds.feedburner.com"
		}, {
			id: "1_1_1_1",
			value: 4213,
			x: "1.1.1.1",
			name: "1.1.1.1"
		}, {
			id: "techsupportalert_com",
			value: 2387,
			x: "techsupportalert.com",
			name: "techsupportalert.com"
		}, {
			id: "kobayashi_dk",
			value: 2106,
			x: "kobayashi.dk",
			name: "kobayashi.dk"
		}, {
			id: "m_sp_sm_cn",
			value: 2083,
			x: "m.sp.sm.cn",
			name: "m.sp.sm.cn"
		}, {
			id: "192_168_33_1",
			value: 2034,
			x: "192.168.33.1",
			name: "192.168.33.1"
		}, {
			id: "trk-5_net",
			value: 1854,
			x: "trk-5.net",
			name: "trk-5.net"
		}, {
			id: "franceculture_fr",
			value: 1295,
			x: "franceculture.fr",
			name: "franceculture.fr"
		}]
	}]
}

chart.draw(dataset);