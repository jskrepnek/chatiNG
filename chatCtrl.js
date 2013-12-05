
angular.module('chatiNG').controller('chatCtrl', ['$scope', 'rooms', 'chat', '$window', function ($scope, rooms, chat, $window) {

    $scope.rooms = [];
    $scope.activeRoom = undefined;

    function roomCallback(msg, room) {
        if (!msg.name) {
            msg.name = "Anonymous";
        }
        room.messages.push(msg);
    }

    rooms.get()
        .success(function (data) {

            var i;

            $scope.rooms = data.results;

            for (i = 0; i < $scope.rooms.length; i++) {

                $scope.rooms[i].messages = [];

                (function (ii) {
                    chat.join({
                        roomName: $scope.rooms[ii].name,
                        callback: function (m) {
                            roomCallback(m, $scope.rooms[ii]);
                        }
                    });
                })(i);

            }

            if ($scope.rooms.length > 0) {
                $scope.activeRoom = $scope.rooms[0];
            }

        })
        .error(function () {
            alert('error');
        });

    $scope.say = function () {

        if (!$scope.toSay || !$scope.activeRoom) {
            return;
        }

        chat.say({
            roomName: $scope.activeRoom.name,
            message: {
                name: $scope.name,
                text: $scope.toSay
            }
        });

        $scope.toSay = '';

    };

    $scope.changeRoom = function (room) {
        $scope.activeRoom = room;
    };

    $scope.addRoom = function () {

        var roomName = $window.prompt('Enter a room name');

        if (roomName) {
            rooms.open(roomName)
                .success(function (room) {
                    room.name = roomName;
                    room.messages = [];
                    $scope.rooms.push(room);
                    chat.join({
                        roomName: room.name,
                        callback: function (m) {
                            roomCallback(m, room);
                        }
                    });
                }).error(function () {

                });
        }

    };

} ]);