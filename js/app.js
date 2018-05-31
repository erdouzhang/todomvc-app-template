(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!

	var myApp = angular.module('MyTodoMvc', []);

	//注册控制器

	myApp.controller('MainController', ['$scope', '$location', function ($scope, $location) {
		//文本框模型

		$scope.text = "";

		$scope.todos = [
			{id: 1, text: '学习', completed: false},
			{id: 2, text: 'Angular', completed: false},
			{id: 3, text: 'bootstrap', completed: false},
			{id: 4, text: 'gulp', completed: true}

		];

		//添加函数
		$scope.add = function () {
			if ($scope.text === "") {
				return;
			}
			$scope.todos.push(
				{
					//id: Math.random(),
					id: getRandomId(),
					text: $scope.text,
					completed: false
				}
			);

			$scope.text = "";
		};

		// 删除单个项目函数
		$scope.remove = function (id) {

			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].id === id) {
					$scope.todos.splice(i, 1);
					break;
				}
			}

		};

		//递归返回不同的id
		function getRandomId() {
			var randomId = Math.random();

			for (var i = 0; i < $scope.length; i++) {
				if (randomId === $scope.todos[i].id) {
					randomId = getRandomId();
					break;
				}
			}
			return randomId;
		}

		// 删除多个选项
		$scope.deleteComplete = function () {
			var arrCompltetNo = [];

			for (var i = 0; i < $scope.todos.length; i++) {
				if (!$scope.todos[i].completed) {
					arrCompltetNo.push($scope.todos[i]);
				}
			}

			$scope.todos = arrCompltetNo;

		};
		// 列表是否有已经完成的（不显示）
		$scope.exitComplete = function () {
			//循环
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].completed) {
					return true;
				}
			}
			return false;
		};

		// 编辑当前项目
		$scope.currentId = -1;
		$scope.currentEditing = function (id, bool) {
			if (!bool) {
				$scope.currentId = id;
			} else {
				$scope.currentId = -1;
			}
		};

		//保存当前编辑项目
		$scope.saveCurrentEdit = function () {
			$scope.currentId = -1;
		}

		//全选
		/*$scope.flag = true;
		 $scope.selectAllItems = function () {

		 if  ($scope.flag) {
		 for (var i = 0;i<$scope.todos.length;i++) {
		 if (!$scope.todos[i].completed) {
		 $scope.todos[i].completed = true;
		 }
		 }
		 $scope.flag = false;
		 } else {
		 for (var i = 0;i<$scope.todos.length;i++) {
		 if ($scope.todos[i].completed) {
		 $scope.todos[i].completed = false;
		 }
		 }
		 $scope.flag = true;
		 }

		 }*/
		/*全选全不选*/
		var flag = true;
		$scope.selectAllItems = function () {
			for (var i = 0; i < $scope.todos.length; i++) {
				$scope.todos[i].completed = flag;
			}
			flag = !flag;
		};

		/*状态筛选*/
		$scope.selector = {};
		/*拿到锚点值*/
		// var hash = window.location.hash;  //要求执行环境必须要window对象
		// console.log(hash);
		// var hash = $location.hash();
		// console.log(hash);

		$scope.$location = $location;
		/* 锚点值的变化*/
		//只能监视属于$scope的属性成员
		$scope.$watch('$location.hash()', function (now, old) {
			// console.log(now);
			switch (now) {
				case '/active':
					$scope.selector = { completed: false};
					break;
				case '/completed':
					$scope.selector = { completed: true};
					break;
				default:
					$scope.selector = {};
					break;
			}


		});
		/*自定义比较函数  默认的filter使用的是模糊查询*/
		$scope.equalCompare = function (source,target) {
			return source === target;
		}

	}]);


})(angular);
