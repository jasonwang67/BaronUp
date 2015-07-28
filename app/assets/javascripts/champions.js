angular.module('Champion', []).controller('ChampionCtrl', function($scope, $http){
	var key = "40c0236b-48f3-4f53-93e5-4966062c87e7"; 
	var api_version = "1.2";
	var region = "na";
	var url = "https://global.api.pvp.net/api/lol/static-data/"+region+"/v"+api_version+"/champion?champData=all&api_key="+key;
	var dd_version = "5.14.1";
	$http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/versions?api_key=40c0236b-48f3-4f53-93e5-4966062c87e7").success(function(data){
		dd_version = data[0];
	});
	$scope.champions = [];
	$http.get(url).success(function(data){
		for (var i in data["data"]) {
			data["data"][i]["image_url"] = "http://ddragon.leagueoflegends.com/cdn/"+dd_version+"/img/champion/" + data["data"][i]["image"]["full"];
			data["data"][i]["profile_image_url"] = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+i+"_"+data["data"][i]["skins"][0]["num"]+".jpg";
			$scope.champions.push(data["data"][i]);
		};	
	});
	$scope.attackChampion = null;
	$scope.setAttackChampion = function(champion) {
		$scope.attackChampion = champion;
	};
	$scope.defendChampion = null;
	$scope.setDefendChampion = function(champion) {
		$scope.defendChampion = champion;
	};

	$scope.tagFilter = function (champion) {
		for (var i in $scope.checked_tags) {
			for (var j in champion.tags) {
				if (i === j) {
					return true;
				}
			}	
		}
    	return false;
	};
});