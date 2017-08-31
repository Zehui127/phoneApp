// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
            
            // enable the dynamic navbar for this view:
            dynamicNavbar: true
         });
         
 $$('#login').on('click', function () {
	var uname = $$('.login-screen input[name = "username"]').val();
	var pwd = $$('.login-screen input[name = "password"]').val();
	var query = 'http://192.168.0.101:8000/login.json';
	var postdata ={};
	
	postdata.username = uname;
	postdata.password = pwd;
	$$.ajax({
	 url: query,
	 type: "POST",
	 contentType: "application/json",
	 data: JSON.stringify(postdata),
	 success: function(data, textStatus ){
// We have received response and can hide activity indicator
    myApp.hideIndicator();
	myApp.alert('success');
   //  data = JSON.parse(data);
    // if (!data.username) {return}

   //  var username = data.username; 
 
    // Will pass context with retrieved user name 
    // to welcome page. Redirect to welcome page
 /*    mainView.router.load({
     url: main.html,
     context: {
      name: username
     }
   }); */
   mainView.router.loadPage('main.html');
   
  },
  error: function(xhr, textStatus, errorThrown){ 
    // We have received response and can hide activity indicator
    myApp.hideIndicator(); 
    myApp.alert('Login was unsuccessful, please verify username and password and try again');

    $$('#login-email').val('');
    $$('#login-password').val('');
	}
	});

 });
 
 //sign up 
 
 $$('#good').on('click', function () {
	var uname = $$('.login-screen input[name = "username"]').val();
	var pwd = $$('.login-screen input[name = "password"]').val();
	var email = $$('.login-screen input[name = "email"]').val();
	var vcode = $$('.login-screen input[name = "verify"]').val();
	var query = 'http://192.168.0.101:8000/login.json';
	var postdata ={};
	
	postdata.username = uname;
	postdata.password = pwd;
	postdata.email = email;
	postdata.vcode = vcode;
	$$.ajax({
	 url: query,
	 type: "PUT",
	 contentType: "application/json",
	 data: JSON.stringify(postdata),
	 success: function(data, textStatus ){
// We have received response and can hide activity indicator
    myApp.hideIndicator();
	myApp.alert('We have sent a mail to your email address, Please confirm your email address to complete the registration');
    mainView.router.loadPage('index.html');
	setTimeout(function() {
        window.location='index.html';
    },5000);
   
  },
  error: function(xhr, textStatus, errorThrown){ 
    // We have received response and can hide activity indicator
    myApp.hideIndicator(); 
    myApp.alert('Registration was unsuccessful, please verify the information');

    $$('#login-email').val('');
    $$('#login-password').val('');
	}
	});

 });
 

 
 
 $$('.hide').on('click', function () {
	 htmlStr = "<li class = \"item-content\"><div class = \"item-inner\"><div class = \"item-title label\">Email</div><div class = \"item-input\"><input type = \"email\" name = \"email\" placeholder = \"Enter the Email\"></div></div></li>"
        $$('#hide').append(htmlStr);
        $$('#disapp').html(" ");
	//	secHtmlstr="<li><a href = \"#\" id=\"good\" class = \"item-link button\">sign up</a></li>";
      //  $$('#core').html(secHtmlstr);
        $$('#login').html("");
		$$('#back').show();
		
		$$('#good').show();
 });

 $$('#back').on('click', function () {
	window.location='index.html';
 });
 
 
 
	
myApp.onPageInit('home-1', function (page) {
    // Do something here for "about" page
	window.location='main.html';
myApp.alert('Here comes About page');
})

myApp.onPageInit('about', function (page) {
    // Do something here for "about" pag	window.location='main.html';
	myApp.alert('Here comes About page');
})

 
		 
		 
		 



$$(document).on('deviceready', function() {
    console.log("Getting data from server");
    $$.ajax({
        datatype: 'json',
        type: 'GET',
        cache: true,
        url: 'http://192.168.0.101:8000/activity.json',
        success: function(data) {
            var articles = JSON.parse(data);
            addArticlesLatest(articles);
            addArticlesHot(articles);
        }
    });
    $$.ajax({
        datatype: 'json',
        type: 'GET',
        cache: true,
        url: 'http://192.168.0.101:8000/thumbs.json',
        success: function(data) {
            var thumbs = JSON.parse(data);
            addThumbnailsLatest(thumbs);
            addThumbnailsHot(thumbs);
        }
    });
});
 

function addArticlesLatest(data) {
    for (var i = 0; i < data.length; i++) {
        htmlStr = "<div class=\"card myCard\"><div class=\"card-content\"><div class=\"card-content-inner\"><div class=\"row\"><div class=\"col-50\"><img id=\"img_latest_"+i+"\" src=\"\" height=\"90\" width=\"147\"></div><div class=\"col-50\">" + data[i].title + "</div></div></div></div></div>"
        $$(pageTab2).append(htmlStr);
    }
}

function addArticlesHot(data) {
    for (var i = 0; i < data.length; i++) {
        htmlStr = "<div class=\"card myCard\"><div class=\"card-content\"><div class=\"card-content-inner\"><div class=\"row\"><div class=\"col-50\"><img id=\"img_hot_"+i+"\" src=\"\" height=\"90\" width=\"147\"></div><div class=\"col-50\">" + data[i].title + "</div></div></div></div></div>"
        $$(pageTab1).append(htmlStr);
    }
}

function addThumbnailsLatest(data) {
    for (var i = 0; i < data.length; i++) {
        $$('#img_latest_'+i).attr("src", "data:image/jpg;base64," + data[i]);
    }
}

function addThumbnailsHot(data) {
    for (var i = 0; i < data.length; i++) {
        $$('#img_hot_'+i).attr("src", "data:image/jpg;base64," + data[i]);
    }
}


var mySwiper = myApp.swiper('.swiper-container', {
    speed: 400,
    pagination: '.swiper-pagination'
    // spaceBetween: 100
});
