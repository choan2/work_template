function App(){
	this.bodyWid = null;
	this.bodyHe = null;	
};


//이미지 온오프 함수
App.prototype.onOff = function( elements, on ){
	var img
	, index = 0
	, length = elements.length;
	if( on ){		
		for( ; index < length; index++ ){
			img = elements[ index ];			
			if( img.src.match(/_off/) ) img.src = img.src.replace( "_off", "_on" );
		}
	}else{
		for( ; index < length; index++ ){
			img = elements[ index ];
			if( img.src.match(/_on/) ) img.src = img.src.replace( "_on", "_off" );
		}
	}
	return elements;
}

//레이어 정렬함수
App.prototype.align = function( element ){	
	if( element.length > 1 ) return element;
	var $ele = element;
	var $par = $ele.parent();
	var tWid = $ele.width();
	var tHig = $ele.height();
	var pWid = $par.width();
	var pHig = $par.height();	
	var dx = (pWid - tWid) / 2;
	var dy = (pHig - tHig) / 2;

	$ele.css({"position" : "absolute", "left" : dx, "top" : dy});
	$par.css({"position" : "relative"});
	return element;
} 

//모달 함수
App.prototype.modalOn = function( element, op ){
	if( !this.bodyWid ) this.bodyWid = $("body").width();
	if( !this.bodyHe ) this.bodyHe = $("body").height();
	var obj = $("#modalBg");
	var thick = op || 0.6;
	if( !obj.attr("id") ){
		var ele = $("<div id='modalBg'></div>");
		ele.prependTo($("body"));
	}else{
		var ele = $("#modalBg");
	}
	
	ele.css({
		"background-color" : "#111"
		, "display" : "block"
		, "opacity" : thick
		, "position" : "absolute"
		, "width" : this.bodyWid
		, "height" : this.bodyHe
		, "top" : 0
		, "left" : 0
	})
	return element;
}
//모달 끄는함수
App.prototype.modalOff = function( element ){
	$("#modalBg").hide();
	return element;
}

//윈도우 팝업
App.prototype.winPop = function( element, url, sizeW, sizeH, val ){
	var winWid = $(window).width();
	var winHe = $(window).height();

	var left = (winWid - sizeW)/2
	var top = (winHe - sizeH)/2
	if( val === "undefined" ){
		window.open( url, "pop", 'left=' +left + ', top=' + top + ', width=' +sizeW + ', height=' +sizeH);
	}else{
		console.log(url, "pop", 'left=' +left + ', top=' + top + ', width=' +sizeW + ', height=' +sizeH + ', '+ val)
		window.open( url, "pop", 'left=' +left + ', top=' + top + ', width=' +sizeW + ', height=' +sizeH + ', '+ val );
	}	
	return element
}

//faq
App.prototype.faq = function( element, l, t, n ){
	var obj = element;	
	var no = (n === undefined )? no = 0 : no = n-1
	var link, tar;
	var he = [];
	var oldNo = no;
	var speed = 500;
	
	if( l ===  undefined || t ===  undefined ) return element;
	if( typeof(l) === "string" ) link = obj.find(l);
	if( typeof(t) === "string" ) tar = obj.find(t);
	if( typeof(l) === "object" ) link = l;
	if( typeof(t) === "object" ) tar = t;

	link.on( "click", faqStart )


	function init(){
		for( var i = 0; i < tar.length; i++ ){
			he.push( tar.eq(i).height() );
			link.eq(i).data("idx",i);
			tar.eq(i).css({ "overflow" : "hidden", "height" : 0 });
		}
		tar.eq(oldNo).css({"height" : he[oldNo]});
		link.eq(oldNo).find("img").imgOn();
	}

	function faqStart(e){
		var newNo = $(this).data("idx");
		if( newNo == oldNo ) return false;
		link.eq(oldNo).find("img").imgOff();
		link.eq(newNo).find("img").imgOn();

		tar.eq(oldNo).animate(
				{"height" : 0 }
				, speed
			);		
		tar.eq(newNo).animate(
				{"height" : he[newNo] }
				, speed
				, function(){
					oldNo = newNo;
				}
			)
		return false;
	}



	init();
	return element;
}

//이미지 탭메뉴
App.prototype.tab = function(element ,ev ){
	var obj = element;
	var link = obj.find("a");
	var imgs = link.find("img");
	var layers = $("."+$(link[0].hash).attr("class"));

	link.on(ev, tabControl );

	function tabControl(e){
		var layer = $(e.currentTarget.hash);
		var img = (e.type == "focus") ? $(e.target).find("img") : $(e.target);
		layers.hide();
		layer.show();
		imgs.imgOff();
		img.imgOn();
		return false;
	}

	return element
}

//텍스트 탭
App.prototype.txtTab = function(element ,ev ){
	var obj = element;
	var link = obj.find("a");
	var layers = $("."+$(link[0].hash).attr("class"));

	link.on(ev, tabControl );

	function tabControl(e){
		var layer = $(e.currentTarget.hash);
		var tar = $(e.target);
		layers.hide();
		layer.show();
		link.removeClass("on");
		tar.addClass("on");
		return false;
	}

	return element
}



var app = new App();


jQuery.fn.extend({
	imgOn : function(){
		return app.onOff( this, true );
	}
	, imgOff : function(){
		return app.onOff( this );
	}
	, align : function(){
		return app.align( this );
	}
	, modalOn : function(op){
		return app.modalOn( this,op);
	}
	, modalOff : function(){
		return app.modalOff( this );
	}
	, winPop : function(url, sizeW, sizeH, val){
		return app.winPop(this, url, sizeW, sizeH, val);
	}
	, faq : function(link, tar, no){
		return app.faq( this, link, tar, no );
	}
	, tab : function( ev ){
		return app.tab( this, ev );
	}
	, txtTab : function( ev ){
		return app.txtTab( this, ev );
	}
});




function navi( gnb, depth1, depth2, _init1, _init2 ){
	var $gnb = gnb;
	var $depth1 = depth1;
	var $depth2 = depth2;

	var $oldImg = null;
	var $oldLayerImg = null;
	var $oldLayer = null;

	$depth1.mouseenter( enterHandler );
	$depth1.mouseleave( leaveHandler );
	$depth2.mouseenter( enterHandler2 )
	$depth2.mouseleave( leaveHandler2 );
	$gnb.mouseleave( gnbLeaveHander );

	init( _init1, _init2 );
	function init(){
		$depth1.eq( _init1 ).trigger( "mouseenter" );

		var $actveDepth1Li = $(">li", $gnb ).eq( _init1 );
		var $img = $actveDepth1Li.find("ul:first").find("li").eq( _init2 ).find("a:first");
		$img.trigger( "mouseenter" );
	}

	function enterHandler(e){
		var alink = e.currentTarget;

		var $layer = $(alink).next();
		var $img = $(alink).find("img");

		if( $oldImg ) imgOff($oldImg);
		imgOn( $img );
		layerActive( $layer );

		$oldImg = $img;
	}

	function leaveHandler(e){

	}

	function enterHandler2(e){
		var alink = e.currentTarget;
		var $img = $(alink).find("img");

		if( $oldLayerImg ) imgOff($oldLayerImg);
		imgOn( $img );

		$oldLayerImg = $img;
	}

	function leaveHandler2(e){

	}

	function gnbLeaveHander(){
		imgOff( $oldImg );
		imgOff( $oldLayerImg );
		$oldLayer.hide();
		init();

	}
	
	function layerActive($layer){
		if( $oldLayer && $oldLayer != $layer  ) $oldLayer.hide();

		$layer.show();
		$oldLayer = $layer;
	}
	
	function imgOn($img){
		var src = $img.attr("src");
		if( src.indexOf("_on") == -1 ) $img.attr( "src", src.replace("_off","_on") );
	}
	function imgOff($img){
		var src = $img.attr("src");
		if( src.indexOf("_on") != -1 ) $img.attr( "src", src.replace("_on","_off") );
	}
}