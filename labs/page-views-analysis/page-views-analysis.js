

$(function(){
    /* for analyzes */
    $("a[title]").each(function(){
        var MID=1000, HIGH=3000;
        var ME=$(this), tt=ME.attr("title"), pos=ME.css("position");
        if(!/[\d.]+/.test(tt)){return;}
        if(pos!="absolute" || pos!="relative"){
            ME.css("position","relative");
        }
        ME.css('overflow','visible').parents().each(function(){
            if($(this).css('overflow')=='hidden')
                $(this).css('overflow','visible');
        });
        var rang="low";
        tt=tt|0;
        if(tt>=MID){rang="mid";}
        if(tt>=HIGH){rang="high";}
        ME.append('<span class="analy-tip analy-pv analy-pv-tip-'+rang+'">'+tt+"<i>PV</i></span>");
		ME.addClass("analy");
        ME.attr({"title":"","rel":"facebox"});
    });

    $("a[rel*=facebox]").live("click",function(){return false;});
    $("a[rel*=facebox]>span.analy-tip").live("click",function(){
        var url;
        if($(this).hasClass('analy-pv')){
            url="https://dss.alipay.com/alipaydw/alipaylog/analysis/data_detail.htm?page="+encodeURIComponent($(this).parent().attr("href"))+"&clickId=183&date=20101027&p="+Math.random();
        }else if($(this).hasClass('analy-seed')){
            url="";
						return false;
        }else{return false;}
        $ .facebox({
            opacity : 0.2,
            closeImage : "https://dss.alipay.com/alipaydw/front/css/ui/facebox/closelabel-cn.gif",
            ajax:(url)
        });
    	return false;
    })
    var seeds=[];
    $("*[seed]").each(function(){
		var s=$(this).attr("seed"), i;
		if(i=s.lastIndexOf(">")>-1){s=s.substr(i+1)}
        seeds[seeds.length] = s;
    });

    $ .ajax({
		type:"GET",
		dataType:"json",
        url:'seed_data.json',
        data:'clickId=183&date=20101027&hour=&seeds='+seeds.join(','),
        success:function(data){
            var MID=1000, HIGH=3000;
            $('*[seed]').each(function(){
                var ME=$(this), tt=data[ME.attr("seed")]||'unknow', pos=ME.css("position");
                if(!/[\d.]+/.test(tt)){return;}
                if(pos!="absolute" || pos!="relative"){
                    ME.css("position","relative");
                }
                ME.css('overflow','visible').parents().each(function(){
                    if($(this).css('overflow')=='hidden')
                        $(this).css('overflow','visible');
                });
                var rang="low";
                tt=tt|0;
                if(tt>=MID){rang="mid";}
                if(tt>=HIGH){rang="high";}
                ME.append('<span class="analy-tip analy-seed analy-seed-'+rang+'">'+tt+"<i>SEED</i></span>");
				ME.addClass("analy");
                ME.attr({"title":"","rel":"facebox"});
            });
        },
		error:function(){
			alert("Error from get seeds.");
		}
    })
});
