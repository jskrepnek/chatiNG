
angular.module('chatiNG').factory('chat', ['pubNub', 'guid', function (pubNub, guid) {

    return {
        say: function (s) {

            s.message.id = guid.newGuid();
            
            pubNub.publish({
                channel: s.roomName,
                message: s.message
            });
        },
        join: function (j) {
            pubNub.subscribe({
                channel: j.roomName,
                callback: j.callback
            });
        },
        leave: function (l) {
            pubNub.unsubscribe({
                channel: l.roomName
            });
        }
    };

} ]);