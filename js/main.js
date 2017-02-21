angular.module("myapp",["ngRoute"])
.config(function($httpProvider){
	$httpProvider.defaults.transformRequest = function(request){
		if(typeof(request)!='object'){
			return request;
		}
		var str = [];
		for(var k in request){
			if(k.charAt(0)=='$'){
				delete request[k];
				continue;
			}
			var v='object'==typeof(request[k])?JSON.stringify(request[k]):request[k];
			str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
		}
		return str.join("&");
	};
	$httpProvider.defaults.timeout=10000;
	$httpProvider.defaults.headers.post = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'X-Requested-With': 'XMLHttpRequest'
	};
})
.controller("mycontroller",function($scope,$http,$sce){
	$scope.setupshop=function(){//注册
    	alert("请用电脑登录：http:/www.baidu.com 进行注册");
    }
	$scope.search=function(){//搜索栏
		var searchmsg=document.getElementById("search").value;
		$http({
	    	method:"post",
	    	url:"search.json",
	    	dataType:"json",
	    	data:('searchmsg', searchmsg)
	    })
	    .success(function(data, status, headers, config){
	    	//console.log(data.homeshoppings);
	    	$scope.searchs=data.searchs;
	    })
	}

	$scope.distiguish=function(dis){
	    /*首页分类name的类型
		*1、cloth衣帽2、decortion首饰3、electrical家电4、ticket门票5、plant植物6、building建材7、hours24小时店8、digit数码9、shoes鞋子10、shopping超市
		*/
		$http({
	    	method:"post",
	    	url:"recommend1.json",
	    	dataType:"json",
	    	data:('name', dis)
	    })
	    .success(function(data, status, headers, config){
	    	//console.log(data.homeshoppings);
	    	$scope.recommendstores=data.recommendstores;
	    })
	}
	
	$scope.homeCl=function(){
		
	}
	$scope.gotostore=function(storeid){//进入店铺首页  发送一个店铺id
		$http({
	    	method:"post",
	    	url:"thingsdetail.json",
	    	dataType:"json",
	    	data:('id', storeid)
	    })
	    .success(function(data, status, headers, config){
	    	//console.log(data.homeshoppings);
	    	//$scope.videosource=data.videosource;
	    	$scope.videosource=data.videosource;
			$scope.videosource = $sce.trustAsHtml($scope.videosource);
			$scope.phone=data.phone;
			$scope.shoppingintro=data.shoppingintro;
			$scope.shoppingaddr=data.shoppingaddr;
			$scope.thingsdetails=data.thingsdetails;
        })
	}

	$scope.recommedCl=function(){//推荐页
		$http({
	    	method:"post",
	    	url:"recommend.json",
	    	dataType:"json"
	    })
	    .success(function(data, status, headers, config){
	    	$scope.recommendstores=data.recommendstores;
	    })
	}
	$scope.toevaluate=function(name){//评价
		// alert(name)
		$http({
	    	method:"post",
	    	url:"evaluatedetail.json",
	    	dataType:"json",
	    	data:('name', name)
	    })
	    .success(function(data, status, headers, config){
	    	//console.log(data.homeshoppings);
	    	$scope.storename=data.storename;
			$scope.thingssource=data.thingssource;
			$scope.thingsname=data.thingsname;
			$scope.thingsprice=data.thingsprice;
			$scope.star=data.star;
			$scope.expressprice=data.expressprice;
			$scope.num=data.num;
	    })
	}
	$scope.cartCl=function(){
		
	}
	$scope.centerCl=function(){
		//alert("本功能暂未开放！")
	}
	$scope.person=function(){
	
	}
	$scope.goback=function(){
		window.history.go(-1);
	}
	$scope.thingshead=function(id){//商品详细信息 通过id获取具体商品
		$http({
	    	method:"post",
	    	url:"things.json",
	    	dataType:"json",
	    	data:('thingsid', id)
	    })
	    .success(function(data, status, headers, config){
	    	//console.log(data.homeshoppings);
	    	$scope.thingslist=data.thingslist;
	    	$scope.remains=data.remains;
	    	$scope.thingsid=data.thingsid;
	    	$scope.storename=data.storename;
			$scope.thingssource=data.thingssource;
			$scope.thingsname=data.thingsname;
			$scope.thingsprice=data.thingsprice;
			$scope.star=data.star;
			$scope.expressprice=data.expressprice;
			$scope.num=data.num;
			$scope.text1=data.text1;
			$scope.thingstext = $sce.trustAsHtml($scope.text1);
			$scope.peraddress=data.peraddress;

	    })
	}
	$scope.gobackshopping=function(){
		
	}
})
.controller("home",function($scope,$http){//首页下方推荐的店铺
    $http({
    	method:"post",
    	url:"home.json",
    	dataType:"json"
    })
    .success(function(data, status, headers, config){
    	$scope.homelist=data.homelist;
    	$scope.homeshoppings=data.homeshoppings;
    	setTimeout(img, 500)
    	
    })

    function img(){
    	var t;
		var dot=$(".img_list li");
		var imgs=$(".scroll");
		var len=imgs.length;
		var mn=len-1;
		function abc(){
			//console.log($(".scroll").eq(i).attr("src"))
			imgs.not(imgs.eq(mn)).animate( { "opacity":0 }, "slow" );
			
			if(mn == -1){
				mn= len-1;
			}
			//alert(i)

			imgs.eq(mn).animate( { "opacity":1 }, "slow" );
			
			dot.eq(mn).addClass('listback');
			dot.not(dot.eq(mn)).removeClass('listback');mn--;
			//console.log(mn)
			t=setTimeout(abc, 2000);
		};
		abc();
		dot.click(function(event) {
			/* Act on the event */
			clearTimeout(t);
			mn=$(this).index();
			//alert(mn)
			imgs.eq(mn).animate( { "opacity":1 }, "slow" );
			//alert(mn)
			if(mn==0){
				mn= len;
			}
			imgs.not(imgs.eq(mn)).animate( { "opacity":0 }, "slow" );
			dot.eq(mn).addClass('listback')
			dot.not(dot.eq(mn)).removeClass('listback');
			mn--;
			setTimeout(abc, 1000);
		})
    }
})
.controller("recommend",function($scope,$http){
	
})
.controller("cart",function($scope,$http){//购物车  发送一个status状态1、unfinished未完成2、finished已完成3、expired已过期
	$http({
    	method:"post",
    	url:"cart.json",
    	dataType:"json",
    	data:{"status":"unfinished"}
    })
    .success(function(data, status, headers, config){
    	$scope.cartthings=data.cartthings;
    });
    $scope.unfinished=true;
    $scope.finished=false;
    $scope.expired=false;
    $scope.cartlist=function(status){
    	//alert(status)
    	if(status == "unfinished"){
    		$scope.unfinished=true;
		    $scope.finished=false;
		    $scope.expired=false;
    	}else if(status == "finished"){
    		$scope.unfinished=false;
		    $scope.finished=true;
		    $scope.expired=false;
    	}else{
    		$scope.unfinished=false;
		    $scope.finished=false;
		    $scope.expired=true;
    	}
    	$http({
	    	method:"post",
	    	url:"cart.json",
	    	dataType:"json",
	    	data:{"status":status}
	    })
	    .success(function(data, status, headers, config){
	    	$scope.cartthings=data.cartthings;
	    });
    };
    $scope.deleteorder=function(abc,target){
    	/*
    	*传cartthingsname商品名称
    	*/
    	//console.log(abc);
    	var confi=confirm("确定删除订单？");
    	if(confi){
    		//console.log("true");
    		$http({
    			method:"post",
    			url:"cart.json",
    			dataType:"json",
    			data:{"thingsname":abc}
    		})
    		.success(function(data,status,headers,config){
    			//console.log(data+"+"+status+"+"+headers+"+"+config);
    			var obj=target.parentNode.parentNode;
    			obj.parentNode.removeChild(obj);
    		})
    	}
    }
})
.controller("myCenter",function($scope,$http){
   $http({
    	method:"post",
    	url:"persondetail.json",
    	dataType:"json"
    })
    .success(function(data, status, headers, config){
    	$scope.personlogo=data.personlogo;
		$scope.personalname=data.personalname;
		$scope.sex=data.sex;
    })
})
.controller("search",function($scope,$http){
	
})
.controller("thingsdetail",function($scope,$http){//商家页面
	
})
.controller('things',function($scope,$http,$sce){
	$scope.order=function(){//不同取货方式”预约“,通过thingid获取商品
		document.getElementById("num").style.display="block";
	}
	$scope.submit=function(){
		//alert(1)
		var price=document.getElementById("thingid").value;
		var my=document.getElementById("count").value;
		var remains=document.getElementById("remains").value;
		//var phone=document.getElementById("phonenumber");
		var address=document.getElementById("peraddress");
		if( 0 < parseInt(my) && parseInt(my) <= parseInt(remains) ){
			$http({
		    	method:"post",
		    	url:"thingsdetail.json",
		    	dataType:"json",
		    	data:{'thingid': parseFloat(price),'count':parseInt(my),"id":address.value}
		    })
		    .success(function(data, status, headers, config){
		    	alert("预约成功");
		    	document.getElementById("num").style.display="none";
		    	//console.log(address.value)
		    })
		}else{
			alert("您输入的数量不合法！");
		}
	}
	$scope.cancel=function(){
		document.getElementById("num").style.display="none";
	}
	function img1(){
    	var t;
		var dot=$(".img_list1 li");
		var imgs=$(".scroll1");
		var len=imgs.length;
		var mn=len-1;
		function abc(){
			//console.log($(".scroll").eq(i).attr("src"))
			imgs.not(imgs.eq(mn)).animate( { "opacity":0 }, "slow" );
			
			if(mn == -1){
				mn= len-1;
			}
			//alert(i)

			imgs.eq(mn).animate( { "opacity":1 }, "slow" );
			
			dot.eq(mn).addClass('listback');
			dot.not(dot.eq(mn)).removeClass('listback');mn--;
			//console.log(mn)
			t=setTimeout(abc, 2000);
		};
		abc();
		dot.click(function(event) {
			/* Act on the event */
			clearTimeout(t);
			mn=$(this).index();
			//alert(mn)
			imgs.eq(mn).animate( { "opacity":1 }, "slow" );
			//alert(mn)
			if(mn==0){
				mn= len;
			}
			imgs.not(imgs.eq(mn)).animate( { "opacity":0 }, "slow" );
			dot.eq(mn).addClass('listback')
			dot.not(dot.eq(mn)).removeClass('listback');
			mn--;
			setTimeout(abc, 1000);
		})
    }
    setTimeout(img1, 500)
})
.controller('barcode',function($scope,$http){

})
.controller('mycenterlist',function($scope,$http){
	$scope.listselectall=function(){
    	var cart=document.getElementsByClassName("selectfont");
    	for(var i=0;i<cart.length;i++){
    		cart[i].style.color="orange";
    	}
    }
    $scope.listselect=function(that){
    	if(that.style.color=="orange"){
    		that.style.color="rgb(100,100,100)";
    	}else if(that.style.color=="rgb(100,100,100)"){
    		that.style.color="orange";
    	}else{
    		that.style.color="orange";
    	}
    }
    
})
.controller('evaluate',function($scope,$http){

})
.controller('evaluatedetail',function($scope,$http){
	window.starnum=0;
	$scope.star=function(num){
		starnum=num;
		var starli=document.getElementsByClassName("starli");
		for(var i=0 ;i<num;i++){
			starli[i].style.color="orange";
		}
	}
	$scope.send=function(){//提交评价
		var textdetail=document.getElementsByClassName("evatext").value;
		$http({
    		method:"post",
	    	url:"persondetail.json",
	    	dataType:"json",
	    	data:{'star':starnum,"evaluate":textdetail}
	    })
	    .success(function(data, status, headers, config){
	    	//console.log(data.homeshoppings);
	    	alert("提交成功！")
	    })
	}
})
.controller('address',function($scope,$http){//获取已有收货地址
	$http({
    	method:"post",
    	url:"address.json",
    	dataType:"json"
    })
    .success(function(data, status, headers, config){
    	$scope.adds=data.adds;
    })

    $scope.addsure=function(){//添加收货地址
    	var addAddress=document.getElementById("submitadd").value;
    	var addrP=document.getElementById("addrP").value;
    	if(!(/^1[3|4|5|7|8]\d{9}$/.test(addrP))){
			alert("11位手机号码有误，请重填");
			return false;
		}else{
			if(addAddress.length>30){
				alert("地址过长")
				return false;
			}else{
				$http({
			    	method:"post",
			    	url:"address.json",
			    	dataType:"json",
			    	data:{'address':addAddress,"addrP":addrP}
			    })
			    .success(function(data, status, headers, config){
			    	alert("添加成功");
			    	window.history.go(-1) 
			    })	
			}
			
		}
	    	
    }
    $scope.deleteadd=function(n){//删除地址
    	var iss=confirm("shifoushanchu")
    	console.log(iss==true)
    	$http({
	    	method:"post",
	    	url:"address.json",
	    	dataType:"json",
	    	data:{'id':n}
	    })
	    .success(function(data, status, headers, config){
	    	$scope.adds=data.adds;
	    	alert("删除成功！")
	    })
    }
})
.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'view/home.html',
		controller:'home'
	})
	.when('/recommend',{
		templateUrl:'view/recommend.html',
		controller:'recommend'
	})
	.when('/cart',{
		templateUrl:'view/cart.html',
		controller:'cart'
	})
	.when('/myCenter',{
		templateUrl:'view/myCenter.html',
		controller:'myCenter'
	})
	.when('/search',{
		templateUrl:'view/search.html',
		controller:'search'
	})
	.when('/barcode',{
		templateUrl:'view/barcode.html',
		controller:'barcode'
	})
	.when('/thingsdetail',{
		templateUrl:'view/thingsdetail.html',
		controller:'thingsdetail'
	})
	.when('/things',{
		templateUrl:'view/things.html',
		controller:'things'
	})
	.when('/mycenterlist',{
		templateUrl:'view/mycenterlist.html',
		controller:'mycenterlist'
	})
	.when('/evaluate',{
		templateUrl:'view/evaluate.html',
		controller:'evaluate'
	})
	.when('/evaluatedetail',{
		templateUrl:'view/evaluatedetail.html',
		controller:'evaluatedetail'
	})
	.when('/address',{
		templateUrl:'view/address.html',
		controller:'address'
	})
	.when('/guangsu',{
		templateUrl:'view/guangsu.html',
	})
	.otherwise({
		redirectTo:'/'
	});
}])