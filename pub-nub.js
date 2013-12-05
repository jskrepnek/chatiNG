
angular.module('pubNub', [])
    .factory('pubNub', ['$rootScope', function ($rootScope) {

        var pubNub,
            keys;

        if (!PUBNUB) {
            throw 'The pubnub javascript SDK must be referenced first.';
        }

        pubNub = PUBNUB;

        keys = {
            publishKey: 'pub-c-dc01811f-47bf-41cb-ba55-e9cd0359ba6f',
            subscribeKey: 'sub-c-0e5c0668-5cef-11e3-a8bd-02ee2ddab7fe'
        };

        pubNub.init(keys);

        return {            
            subscribe: function (s) {
                pubNub.subscribe({
                    channel: s.channel,
                    callback: function (m) {
                        $rootScope.$apply(function () {
                            s.callback(m);
                        });
                    }
                });
            },
            publish: function (p) {
                pubNub.publish({
                    channel: p.channel,
                    message: p.message
                });
            },
            unsubscribe: function (u) {
                pubNub.unsubscribe({
                    channel: u.channel
                });
            }
        };
    } ]);