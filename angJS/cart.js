var app=angular.module("cartApp",[]);
app.controller('cartCtrl', function($scope){

    // Q1) add two more pizza objects 
    $scope.pizzas=[
        {name:'Pepperoni',price:9.99,img: "pepperoni.jpg"},
        {name:'Alfredo',price:10.99,img: "chickenAlf.jpg"},
        {name:'Works',price:12.99,img:"works.jpg"},
        {name:'Veg',price:13.99,img:"veg.jpg"},
        {name:'Meat',price:14.99,img:"meat.jpg"},
        {name:'Cheese',price:8.99,img:"cheese.jpg"}
    ]
    $scope.cart=JSON.parse(localStorage.getItem("cart"))
    if($scope.cart==null)
    {
        $scope.cart=[]
        $scope.total=0.0
        $scope.numItems=0
    }
    else
    {
        $scope.numItems=$scope.cart.reduce((total, item) => total + item.quantity,0)
    }


//Q2: addToCart() function
$scope.addToCart=function(item){
    let index=$scope.cart.findIndex(x=>x.name==item.name)
    if(index==-1)
    {
        item.quantity=1
        $scope.cart.push(item)
    }
    else
        $scope.cart[index].quantity+=1

    $scope.numItems+=1
    localStorage.setItem("cart", JSON.stringify($scope.cart))
}

//Q3: removeFromCart() function
$scope.removeFromCart=function(item){
    let index=$scope.cart.findIndex(x=>x.name==item.name)
    if(item.quantity==0)
    {
        localStorage.removeItem("cart")
        document.getElementById("totalPrice").innerHTML = '$'+$scope.totalPrice

    }
    else
    {
        $scope.cart[index].quantity-=1
        $scope.numItems-=1
        console.log('Removing item: ',item)
        $scope.totalPrice = $scope.totalPrice-item.price
        document.getElementById("totalPrice").innerHTML = '$'+$scope.totalPrice
    }

}

//Q4: clearCart() function
$scope.clearCart=function(){
    $scope.cart.splice(0, $scope.numItems)
    $scope.numItems=0

    if (document.getElementById("totalPrice") != null) {
        document.getElementById("totalPrice").innerHTML = '$'+0.0
    }

    localStorage.clear()

}

//Q5: calcTotalPrice() function
$scope.calcTotalPrice=function(){
    document.getElementById("totalPrice").innerHTML = 0.0
    var total = 0

    $scope.cart.map((item,index) => {
        console.log('item: ',item);
        if (item.quantity > 1) {
            total += item.price * item.quantity
        } else {
            total+= item.price
        }
    })

    $scope.totalPrice = total
    document.getElementById("totalPrice").innerHTML = '$'+$scope.totalPrice

}
    
})