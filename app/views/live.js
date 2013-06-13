
function TopicController($scope) {

    $scope.topics = [ {id:0, title:'Home'} ];

    $scope.add_topic  = function() {
        $scope.topics.push( {id:$scope.topics.length, title:$scope.name} );
        $scope.name = ''
    }

    $scope.contents = 'links: http://shrinking-world.org';

}

 
