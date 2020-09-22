
function makedisapear_all(){
    $("#chart").hide();
    $("#slider").hide();
    $(".TopList").hide();
    $("#filters").hide();
    $("#explore_charts").hide();
    hide_map_title();
    hide_radio_buttons();
    hide_intro_content();
    hide_case_text();
}

function hide_map(){
    $("#chart").hide();
}

function show_map(){
    $("#chart").show();

}

function hide_intro_content(){
    $(".Intro").hide();
}

function show_intro_content(){
    $(".Intro").show();
}

function init_slider(){
    
	$("#ex13").slider({
		ticks: [2001, 2002, 2003, 2004, 2005,2006,2007,2008,2009,2010,2011,2012],
		ticks_labels: ["2001", "2002", "2003", "2004", "2005","2006","2007","2008","2009","2010","2011","2012"],
		ticks_snap_bounds: 1,
		formatter: function(value){
			selected=value;
			return  value;
		}
	});
}


function hide_slider(){
    $("#slider").hide();
}

function show_slider(){
    $("#slider").show();

}

function hide_top5(){
    $(".TopList").hide();

}

function show_top5(scene,year){
    $(".TopList").show();

    // <-- Testing -->
    // year=2001;
    //  var top=get_scene_top5(scene,year)

    //  state1=top[0];
    //  state2=top[1];
    //  state3=top[2];
    //  state4=top[3];
    //  state5=top[4];

    
     

    scene1="Domestic_Violence"
    scene2="Kidnapping"
    scene3="Rape"
    scene4="Sexual_Harrassment"



	switch(scene){
		case scene1:
                $("#state1").text("Assam")
        
    
                $("#state2").text("Andhra Pradesh")
                
                $("#state3").text("Rajasthan")
                
                $("#state4").text("West Bengal")
                
                $("#state5").text("Delhi")
		break;
		case scene2:
                $("#state1").text("Delhi")
        
    
                $("#state2").text("Rajasthan")
                
                $("#state3").text("Assam")
                
                $("#state4").text("West Bengal")
                
                $("#state5").text("Uttar Pradesh")
    		break;
		case scene3:
                $("#state1").text("Madhya Pradesh")
        
    
                $("#state2").text("Delhi")
                
                $("#state3").text("Odisha")
                
                $("#state4").text("West Bengal")
                
                $("#state5").text("Assam")
		break;
		case scene4:
                $("#state1").text("Andhra Pradesh")
        
    
                $("#state2").text("Assam")
                
                $("#state3").text("Chhattisgarh")
                
                $("#state4").text("Delhi")
                
                $("#state5").text("Madhya Pradesh")
		break;
	}
    




}

function show_trend_chart(){
    $("#tc").show();
}

function hide_trend_chart(){
    $("#tc").hide();

}

function show_g_chart(){
    $("#gc").show();
}

function hide_g_chart(){
    $("#gc").hide();

}

function show_c_chart(){
    $("#cc").show();
}

function hide_c_chart(){
    $("#cc").hide();

}

function change_crime_selector_title(s){
    $("#crime_selector").html(s+" <span class='caret'></span>");
}

function change_state_selector_title(s){
    $("#state_selector").html(s+" <span class='caret'></span>");
}

function hide_filters(){
    $("#filters").hide();
}

function show_filter(){
    $("#filters").show();
}

function hide_explore_charts(){
    $("#explore_charts").hide();
}

function show_explore_charts(){
    $("#explore_charts").show();

}

function show_map_title(t){
    $("#title_m").text(t);
    $("#title_m").show();
}

function show_explore_charts_titles(){
    $("#title_t").text("Number of Cases Reported per Year For "+AppState.getSelectedCrime());
    $("#title_c").text(" Number of Reported Cases per State For "+AppState.getSelectedCrime());


}

function hide_map_title(){
    $("#title_m").hide();
}

function show_radio_buttons(){
    $('#radio_buttons').show();
}

function hide_radio_buttons(){
    $('#radio_buttons').hide();
}


function initialize_filter(){
    stateclicked=false;
		purposeclicked=false;
		

		console.log("state1:"+states[1])
		// d3version5.select("#state_list").enter().append("li").text(states[1]+"")
		for(var i=0;i<states.length;i++){
		 $("#state_list").append(" <li id=\"state\">"+states[i]+"</li>");}
		 for(var i=0;i<crimePurposeList.length;i++){
			$("#purpose_list").append(" <li id=\"purpose\">"+crimePurposeList[i]+"</li>");}

		 li=d3version5.selectAll("li")
		 li.on("click",function(){

		 	var clickedon=d3version5.select(this)
		 	var which = d3version5.select(this).attr("id")
		 	if(which=="state"){
                 var text=clickedon.text()
                 change_state_selector_title(text+"");
		 		selected_state=text;
			 console.log(clickedon.text());
			 if(!purposeclicked){
			 d3version5.select("#stitle").text("Crime Against Women | State: "+selected_state);}
			 else{
				 
			 d3version5.select("#stitle").text("Crime Against Women | State: "+selected_state+" | Crime:"+selected_purpose);
			 }
			 stateclicked=true;

		 	CrimeTrendChart.set_plot(selected_state,selected_purpose);}
		 	else if(which=="purpose"){
		 		console.log(clickedon.text())
		 		var text=clickedon.text()
                 selected_purpose=text
                 change_crime_selector_title(text);
                 
                d3version5.select("#title_t").text("Number of Cases Reported per Year For "+selected_purpose);
                d3version5.select("#title_m").text("CRIME RATES FOR "+selected_purpose.toUpperCase());
                d3version5.select("#title_c").text(" Number of Reported Cases per State For "+selected_purpose);
				 if(!stateclicked){
				 d3version5.select("#stitle").text("Crime Against Women | State: "+AppState.getSelectedState()+" | Crime:"+selected_purpose);
				 }else{
					d3version5.select("#stitle").text("Crime Against Women | State: "+selected_state+" | Crime:"+selected_purpose);

				 }
				 AppState.setCrime(selected_purpose);
				 var year = AppState.getyear()+ "";
                 IndiaMapModule.set_choropleth_crime_and_year(year);
				 purposeclicked=true;
				 CrimeTrendChart.set_plot(selected_state,selected_purpose);
				 StateCrimeComparisonChart.set_plot(selected_purpose);
				 
				
			 }

			 first=false;


			 
		 })
}


function get_scene_top5(scene_name, year)
{
	var top5_data = 
	{'Domestic_Violence': {2001: ['Uttar Pradesh',
   'Maharashtra',
   'Andhra Pradesh',
   'Rajasthan',
   'West Bengal'],
  2002: ['Uttar Pradesh',
   'Andhra Pradesh',
   'Rajasthan',
   'Maharashtra',
   'West Bengal'],
  2003: ['Andhra Pradesh',
   'Rajasthan',
   'Maharashtra',
   'West Bengal',
   'Uttar Pradesh'],
  2004: ['Andhra Pradesh',
   'Rajasthan',
   'West Bengal',
   'Uttar Pradesh',
   'Maharashtra'],
  2005: ['Andhra Pradesh',
   'West Bengal',
   'Maharashtra',
   'Rajasthan',
   'Uttar Pradesh'],
  2006: ['Andhra Pradesh',
   'West Bengal',
   'Rajasthan',
   'Maharashtra',
   'Uttar Pradesh'],
  2007: ['Andhra Pradesh',
   'West Bengal',
   'Uttar Pradesh',
   'Rajasthan',
   'Maharashtra'],
  2008: ['West Bengal',
   'Andhra Pradesh',
   'Uttar Pradesh',
   'Rajasthan',
   'Maharashtra'],
  2009: ['West Bengal',
   'Andhra Pradesh',
   'Rajasthan',
   'Uttar Pradesh',
   'Maharashtra'],
  2010: ['West Bengal',
   'Andhra Pradesh',
   'Rajasthan',
   'Uttar Pradesh',
   'Maharashtra'],
  2011: ['West Bengal',
   'Andhra Pradesh',
   'Rajasthan',
   'Uttar Pradesh',
   'Maharashtra'],
  2012: ['West Bengal',
   'Andhra Pradesh',
   'Rajasthan',
   'Uttar Pradesh',
   'Maharashtra']},
 'Kidnapping': {2001: ['Uttar Pradesh',
   'Rajasthan',
   'Assam',
   'Delhi',
   'Gujarat'],
  2002: ['Uttar Pradesh', 'Rajasthan', 'Assam', 'Delhi', 'Andhra Pradesh'],
  2003: ['Rajasthan', 'Uttar Pradesh', 'Assam', 'Andhra Pradesh', 'Gujarat'],
  2004: ['Uttar Pradesh', 'Rajasthan', 'Assam', 'Andhra Pradesh', 'Bihar'],
  2005: ['Uttar Pradesh', 'Rajasthan', 'Assam', 'Delhi', 'West Bengal'],
  2006: ['Uttar Pradesh',
   'Rajasthan',
   'Assam',
   'Andhra Pradesh',
   'West Bengal'],
  2007: ['Uttar Pradesh',
   'Rajasthan',
   'West Bengal',
   'Andhra Pradesh',
   'Assam'],
  2008: ['Uttar Pradesh', 'West Bengal', 'Rajasthan', 'Bihar', 'Assam'],
  2009: ['Uttar Pradesh', 'Rajasthan', 'West Bengal', 'Assam', 'Bihar'],
  2010: ['Uttar Pradesh', 'West Bengal', 'Assam', 'Bihar', 'Rajasthan'],
  2011: ['Uttar Pradesh', 'West Bengal', 'Assam', 'Bihar', 'Rajasthan'],
  2012: ['Uttar Pradesh', 'West Bengal', 'Bihar', 'Assam', 'Rajasthan']},
 'Rape': {2001: ['Madhya Pradesh',
   'Uttar Pradesh',
   'Maharashtra',
   'Rajasthan',
   'Chhattisgarh'],
  2002: ['Madhya Pradesh',
   'Uttar Pradesh',
   'Maharashtra',
   'Rajasthan',
   'Bihar'],
  2003: ['Madhya Pradesh', 'Maharashtra', 'Assam', 'Rajasthan', 'West Bengal'],
  2004: ['Madhya Pradesh',
   'West Bengal',
   'Uttar Pradesh',
   'Bihar',
   'Maharashtra'],
  2005: ['Madhya Pradesh',
   'West Bengal',
   'Maharashtra',
   'Assam',
   'Uttar Pradesh'],
  2006: ['Madhya Pradesh',
   'West Bengal',
   'Maharashtra',
   'Uttar Pradesh',
   'Assam'],
  2007: ['Madhya Pradesh',
   'West Bengal',
   'Uttar Pradesh',
   'Bihar',
   'Maharashtra'],
  2008: ['Madhya Pradesh',
   'West Bengal',
   'Uttar Pradesh',
   'Maharashtra',
   'Assam'],
  2009: ['Madhya Pradesh',
   'West Bengal',
   'Uttar Pradesh',
   'Assam',
   'Rajasthan'],
  2010: ['Madhya Pradesh', 'West Bengal', 'Assam', 'Maharashtra', 'Rajasthan'],
  2011: ['Madhya Pradesh',
   'West Bengal',
   'Uttar Pradesh',
   'Rajasthan',
   'Maharashtra'],
  2012: ['Madhya Pradesh',
   'Rajasthan',
   'West Bengal',
   'Uttar Pradesh',
   'Maharashtra']},
 'Sexual_Harrassment': {2001: ['Madhya Pradesh',
   'Andhra Pradesh',
   'Uttar Pradesh',
   'Maharashtra',
   'Rajasthan'],
  2002: ['Madhya Pradesh',
   'Andhra Pradesh',
   'Uttar Pradesh',
   'Tamil Nadu',
   'Maharashtra'],
  2003: ['Madhya Pradesh',
   'Andhra Pradesh',
   'Uttar Pradesh',
   'Maharashtra',
   'Tamil Nadu'],
  2004: ['Madhya Pradesh',
   'Andhra Pradesh',
   'Uttar Pradesh',
   'Maharashtra',
   'Tamil Nadu'],
  2005: ['Madhya Pradesh',
   'Andhra Pradesh',
   'Uttar Pradesh',
   'Maharashtra',
   'Rajasthan'],
  2006: ['Madhya Pradesh',
   'Andhra Pradesh',
   'Uttar Pradesh',
   'Maharashtra',
   'Kerala'],
  2007: ['Andhra Pradesh',
   'Madhya Pradesh',
   'Uttar Pradesh',
   'Maharashtra',
   'Orissa'],
  2008: ['Andhra Pradesh',
   'Madhya Pradesh',
   'Uttar Pradesh',
   'Maharashtra',
   'Orissa'],
  2009: ['Andhra Pradesh',
   'Madhya Pradesh',
   'Uttar Pradesh',
   'Maharashtra',
   'Kerala'],
  2010: ['Andhra Pradesh',
   'Madhya Pradesh',
   'Maharashtra',
   'Kerala',
   'Orissa'],
  2011: ['Andhra Pradesh',
   'Madhya Pradesh',
   'Maharashtra',
   'Kerala',
   'Uttar Pradesh'],
  2012: ['Andhra Pradesh',
   'Madhya Pradesh',
   'Maharashtra',
   'Orissa',
   'Kerala']}};

   return top5_data[scene_name][year];

}

function get_cases(scene, year){
    var temp = {
        "2001": {
          "Rape": 16075,
          "Kidnapping": 14759,
          "Domestic_Violence": 56021,
          "Sexual_Harrassment": 43870
        },
        "2002": {
          "Rape": 16373,
          "Kidnapping": 14582,
          "Domestic_Violence": 56059,
          "Sexual_Harrassment": 44098
        },
        "2003": {
          "Rape": 15847,
          "Kidnapping": 13342,
          "Domestic_Violence": 56911,
          "Sexual_Harrassment": 45264
        },
        "2004": {
          "Rape": 18233,
          "Kidnapping": 15667,
          "Domestic_Violence": 65147,
          "Sexual_Harrassment": 44568
        },
        "2005": {
          "Rape": 18359,
          "Kidnapping": 15899,
          "Domestic_Violence": 65106,
          "Sexual_Harrassment": 44159
        },
        "2006": {
          "Rape": 19348,
          "Kidnapping": 17481,
          "Domestic_Violence": 70746,
          "Sexual_Harrassment": 46583
        },
        "2007": {
          "Rape": 20737,
          "Kidnapping": 20477,
          "Domestic_Violence": 84023,
          "Sexual_Harrassment": 49684
        },
        "2008": {
          "Rape": 21467,
          "Kidnapping": 23006,
          "Domestic_Violence": 89516,
          "Sexual_Harrassment": 52627
        },
        "2009": {
          "Rape": 21397,
          "Kidnapping": 25789,
          "Domestic_Violence": 97929,
          "Sexual_Harrassment": 49720
        },
        "2010": {
          "Rape": 22172,
          "Kidnapping": 29831,
          "Domestic_Violence": 102432,
          "Sexual_Harrassment": 50574
        },
        "2011": {
          "Rape": 24206,
          "Kidnapping": 35645,
          "Domestic_Violence": 107753,
          "Sexual_Harrassment": 51538
        },
        "2012": {
          "Rape": 24923,
          "Kidnapping": 38321,
          "Domestic_Violence": 114760,
          "Sexual_Harrassment": 54524
        }
      };

      return temp[year][scene];
      
      
}

function initialize_cases_text(scene,year){
    scene=AppState.getCurrentScene();
    year=AppState.getyear();
    update_cases_text(get_cases(scene,year));
}

function update_cases_text(t)
{
    $('#cases_text').text(t);
}

function show_case_text(){
    $('.member').show();
}

function hide_case_text(){
    $('.member').hide();

}


function get_anno( scene, state){
    
    var domes={
  
      'general':'<p style="text-align: justify;"><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Domestic_violence" target="_blank">Domestic violence</a><a href="https://en.wikipedia.org/wiki/Domestic_violence" target="_blank">[1]</a></span><span style="font-weight: 400;">&nbsp;is abuse by one partner against another in an intimate relationship such as dating, marriage, cohabitation or a familial relationship. Domestic violence is also known as domestic abuse, spousal abuse, battering, family violence,</span><a href="https://en.wikipedia.org/wiki/Dating_abuse" target="_blank"> <span style="font-weight: 400;">dating abuse<a href="https://en.wikipedia.org/wiki/Dating_abuse" target="_blank">[2]</a></span></a><span style="font-weight: 400;">and</span><a href="https://en.wikipedia.org/wiki/Intimate_partner_violence" target="_blank"> <span style="font-weight: 400;">intimate partner violence</span></a><span style="font-weight: 400;"> <a href="https://en.wikipedia.org/wiki/Intimate_partner_violence" target="_blank">[3]</a>(IPV). Domestic violence can be physical, emotional, verbal, economic and</span><a href="https://en.wikipedia.org/wiki/Sexual_abuse" target="_blank"> <span style="font-weight: 400;">sexual abuse</span></a><span style="font-weight: 400;">.<a href="https://en.wikipedia.org/wiki/Sexual_abuse" target="_blank">[4]</a> Domestic violence can be subtle, coercive or violent. In India, 70% of women are victims of domestic violence.</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-Chowdhury-41" target="_blank"><span style="font-weight: 400;">[5]</span></a><span style="font-weight: 400;">&nbsp;</span><span style="font-weight: 400;">Every 9 minutes, a case of cruelty is committed by either by husband or a relative of the husband.</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-BBC-3" target="_blank"><span style="font-weight: 400;">[6]</span></a><span style="font-weight: 400;"> Cruelty by a husband or his relatives is the greatest occurring crime against women. From 2011 to 2012, there was a 7.5% increase in cruelty by husbands and relatives.</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2" target="_blank"><span style="font-weight: 400;">[7]</span></a><span style="font-weight: 400;">&nbsp;&nbsp;</span></p><p style="text-align: left;"><strong>Source:</strong></p><p><span style="font-weight: 400;">[1]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Domestic_violence" target="_blank">Wikipedia:Domestic-Violence</a></span></p><p><span style="font-weight: 400;">[2]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Dating_abuse" target="_blank">Wikipedia:Dating-abuse</a></span></p><p style="text-align: left;"><span style="font-weight: 400;">[3</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Intimate_partner_violence" target="_blank">Wikipedia:Intimate-partner-violence</a></span></p><p><span style="font-weight: 400;">[4]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Sexual_abuse">Wikipedia:Sexual-abuse</a></span></p><p><span style="font-weight: 400;">[5]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-Chowdhury-41">Wikipedia:Violence-against-women-in-India</a></span></p><p><span style="font-weight: 400;">[6]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-BBC-3">Wikipedia:Violence-against-women-in-India</a></span></p><p><span style="font-weight: 400;">[7]</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2"><span style="font-weight: 400;">Wikipedia:Violence-against-women-in-India#</span></a></p>',
    'Assam':'<p style="text-align: justify;">Between 2001-2012, Domestic violence incidents have become five times in Assam. It has been the fastest-growing crime against women in Assam. More than 90% of domestic violence cases in Assam are perpetrated by husbands and relatives. The large growth is due to large increase in reported cases of cruelty by husbands and in-laws. The majority of the victims are in the age group 18-30. The conviction rate for these cases (10.8%) is lower than the national average (11.8%).<br /><br /></p><p style="text-align: left;">Source: <a href="https://timesofindia.indiatimes.com/city/guwahati/6000-cases-of-domestic-violence-in-assam-this-year/articleshow/65752864.cms">Times of India - 6000 Cases of Domestic Violence in Assam</a>, <a href="https://timesofindia.indiatimes.com/city/guwahati/women-in-assam-most-unsafe-at-home/articleshow/69737372.cms">Times of India - Women in Assam most unsafe at home</a></p>',
    'Andhra Pradesh':'<p style="text-align: justify;">The reported cases for Domestic violence incidents have increased by&nbsp; 125% during 2001-12 in Andhra Pradesh. This has been the&nbsp; fastest growing crime against women in Andhra Pradesh. Pan India, this crime type has increased largely due to increase in reported cases. The large growth is due to large increase in reported cases of cruelty by Husbands and in laws. Nearly, 95% of domestic violence&nbsp; cases in Andhra Pradesh are perpetratred by husbands and relatives. Majority of the victims are in the age group 18-30. The conviction rate for these cases (10.8%) is lower than the national average (11.3%).</p><p style="text-align: left;"><strong> Source </strong> - <a href="http://medind.nic.in/jal/t06/i4/jalt06i4p184.pdf%20."> Medind-NIC </a> <a href="https://www.newindianexpress.com/cities/vijayawada/2017/aug/28/maximum-number-of-domestic-violence-cases-reported-from-andhra-pradesh-sc-judge-1648997.html"> Domestic Violence Cases from Andhra Pradesh </a></p>',
    'Rajasthan':'<p style="text-align: justify;">Between 2001-2012, Domestic violence incidents have increased by 133% times in Rajasthan. This has seen the fastest growth in&nbsp; crime&nbsp; against women in Rajasthan. The large growth is due to large increase in reported cases of cruelty by Husbands and in laws. Pan India, this crime type has increased largely due to increase in reported cases. About 93% of domestic violence&nbsp; cases in Assam are perpetratred by husbands and relatives. Majority of the victims are in the age group 18-30. The conviction rate for these cases (9.8%) is far below the national average (11.3%).</p><p style="text-align: left;"><strong>Source</strong>- <a href="Source-http://www.researchgate.net/publication/284432711_Domestic_Violence_Against_Women_in_Rural_Rajasthan_India_A_Sociological_Analysis https://www.researchgate.net/publication/284432711_Domestic_Violence_Against_Women_in_Rural_Rajasthan_India_A_Sociological_Analysis">Domestic Violence Against Women in Rural Rajasthan</a><br /><a href="https://www.researchgate.net/publication/284432711_Domestic_Violence_Against_Women_in_Rural_Rajasthan_India_A_Sociological_Analysis">Domestic Violence Against Women in Rural Rajasthan India-A Sociological Analysis</a></p>',
    'West Bengal':'<p style="text-align: justify;">Between 2001-2012, Domestic violence incidents have become five times in West Bengal.West Bengal has the maximum incidents of Domestic Violence across all India. The large growth is due to large increase in reported cases of cruelty by Husbands and in laws. Nearly, 95% of domestic violence&nbsp; cases in Assam are perpetratred by husbands and relatives. Pan India, this crime type has increased largely due to increase in reported cases. Majority of the victims are in the age group 18-30. The conviction rate for these cases (10.9%)below the national average (11.3%).</p><p style="text-align: left;"><strong>Source</strong>- <a href="https://timesofindia.indiatimes.com/india/West-Bengal-tops-chart-in-domestic-violence/articleshow/49928756.cms">Timesofindia-West Bengal-in-domestic-violence</a>. <a href="https://www.telegraphindia.com/states/west-bengal/domestic-violence-topper-for-7-years/cid/1316437">Telegraphindia-West Bengal-domestic-violence</a></p>',
    'Delhi':'<p style="text-align: justify;">Between 2001-2012, Domestic violence incidents have an eight fold increase in Delhi. The large growth is due to large increase in reported cases of cruelty by Husbands and in laws. Pan India, this crime type has increased largely due to increase in reported cases. The conviction rate for these cases (9.7%) is far below than the national average (11.3%).</p>'
	}   

    var kidnap={
 
        'general':'<p style="text-align: justify;"><span style="font-weight: 400;">Incidents of reported kidnappings and abductions of women increased 7.6% from 2011 to 2012.</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2"><span style="font-weight: 400;">[1]</span></a><a href="https://en.wikipedia.org/wiki/Uttar_Pradesh"> <span style="font-weight: 400;">Uttar Pradesh<a href="https://en.wikipedia.org/wiki/Uttar_Pradesh">[2]</a></span></a><span style="font-weight: 400;">&nbsp;had 7,910 cases, accounting for 22.2% of the total of cases nationwide.</span></p><p style="text-align: left;"><span style="font-weight: 400;"><img style=" display: block; margin-left: auto; margin-right: auto;" title="This desperate mother traveled from her village in Nepal to Mumbai, India, hoping to find and rescue her teenage daughter who was trafficked into an Indian brothel. &quot;I will stay in Mumbai,&quot; said the mother, &quot;Until I find my daughter or die. I am not leaving here without her.&quot;" src="https://upload.wikimedia.org/wikipedia/commons/6/6d/3.2519_Nepalese-mother1.jpg" alt="" width="156" height="229" /></p><p style="text-align: left;"><strong>Source:</strong></p><p style="text-align: left;"><span style="font-weight: 400;">&nbsp;[1]<a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2">Wikipedia Violence Against women</a></span></p><p style="text-align: left;"><span style="font-weight: 400; line-height: 10px;">&nbsp;[2]<a href="https://en.wikipedia.org/wiki/Uttar_Pradesh">Wikipedia - Uttar Pradesh</a></span></p>',
        'Delhi':'<p style="text-align: justify;">Between 2001-12, the incidents of kidnapping and abductions have increased by 124% in Delhi. Kidnapping and abductions has&nbsp; been the fastest growing crime in Delhi during 2001-2012. Unlike rest of India, Kidnapping for marriage is not the most important reason for Abductions in Delhi. The majority of victims are in the age group 18-30 years. The conviction rate in kidnapping and abduction cases is just 7.1 %.&nbsp;</p><p style="text-align: left;"><strong>Source</strong>-<a href="https://www.indiatoday.in/mail-today/story/10-women-are-kidnapped-in-delhi-everyday-1268826-2018-06-25">IndiaToday-women-are-kidnapped-in-delhi</a>. <a href="https://archive.indiaspend.com/investigations/indias-fastest-growing-crime-kidnapping-of-women-girls-20567">India-fastest-growing-crime-kidnapping-of-women-girls</a>.</p>',
        'Rajasthan':'<p style="text-align: justify;">Rajasthan has traditionally&nbsp; had a high incidents for kidnapping and abductions. Between 2001-12, the incidents of kidnapping and abductions have increased by 24% in Rajasthan. Kidnapping for labour, begging etc are the biggest reasons for kidnapping and abductions in Rajasthan. The conviction rate for kidnapping and abductions is about 7.8%, marginally higher than the national average rate.</p><p style="text-align: left;"><strong>Source</strong>-<a href="http://police.rajasthan.gov.in/New/Rajpolice/Crbranchwomenatro.aspx">Rajasthan-women-crime</a></p>',
        'Assam':'<p style="text-align: justify;">Between 2001-2012, kidnapping and abduction incidents have tripled in Assam. It has been the second fastest growing crime after Domestic Violence in Assam. Nearly, two-thirds of kidnapping and abduction cases in Assam are to compel the girl for marriage. Majority of the victims are in the age group 18-30.&nbsp;The conviction rate for these cases (9%) are higher than the national average.</p><p style="text-align: left;"><strong>Source</strong>-<a href="https://archive.indiaspend.com/investigations/indias-fastest-growing-crime-kidnapping-of-women-girls-20567">Indiaspend-crime-kidnapping-of-women-girls-Assam</a>.</p>',
        'West Bengal':'<p style="text-align: justify;">Kidnapping and abduction cases in West Bengal have seen a four-fold rise during 2001-12. This crime type has rapidly grownin West Bengal in these years. About half of the victims are kidnapped for begging slavery and prostitution purposes. Majority of the victims are in the age groups under 15 and 15-18 years. The conviction rate for such cases in West Bengal is marginally higher than the national average.</p><p style="text-align: left;"><strong>Source</strong>-<a href="https://archive.indiaspend.com/investigations/indias-fastest-growing-crime-kidnapping-of-women-girls-20567">Indiaspend-crime-kidnapping-of-women-West Bengal</a>.</p>',
    	'Uttar Pradesh':'<p style="text-align: justify;">Between 2001-12, the kidnapping and abduction cases in UP have nearly tripled. Among all states, UP has reported the highest number of cases for kidnapping and abductions in the country. About three-fourth of the victims are kidnapped for begging for marriage. Most women are&nbsp; in the age group 18-30. At 8.2%, the conviction rate for such cases in UP is highest in the country.</p><p style="text-align: left;"><strong>Source</strong>-<a href="https://www.news18.com/news/india/with-maximum-kidnapping-abduction-cases-up-tops-in-crimes-against-women-2356081.html">News18-kidnapping-abduction-cases-against-women-UttarPradesh</a> . <a href="https://archive.indiaspend.com/investigations/indias-fastest-growing-crime-kidnapping-of-women-girls-20567">Indiaspend-crime-kidnapping-of-women-girls-Uttar Pradesh</a>.</p>'
    }
   

    var sexual_harrasment={
    	'general':'<p style="text-align: justify;"><span style="font-weight: 400;">Modesty-related violence against women includes assaults on women with intent to outrage her modesty and insults to the modesty of women. From 2011 to 2012, there was a 5.5% increase in reported assaults on women with intent to outrage her modesty.</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2"><span style="font-weight: 400;">[1]</span></a><a href="https://en.wikipedia.org/wiki/Madhya_Pradesh"> <span style="font-weight: 400;">Madhya Pradesh<a href="https://en.wikipedia.org/wiki/Madhya_Pradesh">[2]</a></span></a><span style="font-weight: 400;">&nbsp;had 6,655 cases, accounting for 14.7% of the national incidents.</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2"><span style="font-weight: 400;">[3]</span></a><span style="font-weight: 400;"> From 2011 to 2012, there was a 7.0% increase in reported insults to the modesty of women.</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2"><span style="font-weight: 400;">[4]</span></a><a href="https://en.wikipedia.org/wiki/Andhra_Pradesh"> <span style="font-weight: 400;">Andhra Pradesh<a href="https://en.wikipedia.org/wiki/Andhra_Pradesh">[5]</a></span></a><span style="font-weight: 400;">&nbsp;had 3,714 cases, accounting for 40.5% of the national accounts, and</span><a href="https://en.wikipedia.org/wiki/Maharashtra"> <span style="font-weight: 400;">Maharashtra<a href="https://en.wikipedia.org/wiki/Maharashtra">[6]</a></span></a><span style="font-weight: 400;">&nbsp;had 3,714 cases, accounting for 14.1% of the national accounts.</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2"><span style="font-weight: 400;">[7]</span></a></p><p style="text-align: left;"><strong>Source:</strong></p><p><span style="font-weight: 400;">[1]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2">Wikipedia:Violence_against_women_in_India</a></span></p><p><span style="font-weight: 400;">[2]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Madhya_Pradesh">Wikipedia:Madhya_Pradesh</a></span></p><p><span style="font-weight: 400;">[3]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2">Wikipedia:Violence_against_women_in_India</a></span></p><p><span style="font-weight: 400;">[4]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2">Wikipedia:Violence_against_women_in_India</a></span></p><p><span style="font-weight: 400;">[5]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Andhra_Pradesh">Wikipedia:Andhra_Pradesh</a></span></p><p><span style="font-weight: 400;">[6]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Maharashtra">Wikipedia:Maharashtra</a></span></p><p style="text-align: left;"><span style="font-weight: 400;">[7]</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2"><span style="font-weight: 400;">Wikipedia:Violence_against_women_in_India</span></a></p>',
    	'Andhra Pradesh':'<p style="text-align: justify;">Between 2001-2012, the overall reported cases in Andhra Pradesh for sexual harassment increased by 95%. Andhra Pradesh, Delhi, Chattishgarh and Odisha are states with high rates of sexual Harassment cases. The large growth is due to large increase in reported cases of sexual harassment and their compliance. Unlike past, more and more victims in metros have been reporting the crime.</p><p style="text-align: left;"><strong>Source</strong>-<a href="https://www.bbc.com/news/world-asia-india-43782471">BBC-news-asia-india-Crime-Sexual-Harassment-Andhra Pradesh</a>.</p>',
    	'Assam':'<p style="text-align: justify;">The number of reported cases in Assam has nearly doubled between 2001-2012. The large growth is due to large increase in reported cases of sexual harassment and their compliance. Unlike past,&nbsp; more and more victims in metros have been reporting the crime. Majority of victims in these states were in the age group 18-30. Only about 9.6% of the arrested get convicted for sexual harassment cases in chhattisgarh.</p><p style="text-align: left;"><strong>Source</strong>-<a href="http://www.ipsnews.net/2019/06/indias-criminal-justice-system-failing-victims-sexual-violence/">IPSNEWS-crime-sexual-violence-Assam</a>.</p>',
    	'Chhattisgarh':'<p style="text-align: justify;">Between 2001-2012, the overall reported cases in Chattisgarh for sexual harassment has nearly been constant. However, the overall volume in state has been consistently high. Majority of victims in these states were in the age group 18-30. Lack of awareness about gender based crimes is a major issue for&nbsp; Madhya Pradesh, Chattisgarh and Rajasthan. Only about 9.6% of the arrested get convicted for sexual harassment cases in chhattisgarh.</p><p style="text-align: left;"><strong>Source</strong>-<a href="http://www.ipsnews.net/2019/06/indias-criminal-justice-system-failing-victims-sexual-violence/">IPSNEWS-crime-sexual-violence-Chhattisgarh</a>.</p>',
    	'Delhi':'<p style="text-align: justify;">Between 2001-2012, the no. of reported cases for sexual harassment&nbsp; in Delhi has nearly doubled. Unlike past,&nbsp; more and more victims in metros have been reporting the crime. However, with only about 12% convictions, most cases witness no punishment for victims. The large growth is due to large increase in reported cases of sexual harassment and their compliance.</p><p style="text-align: left;"><strong>Source</strong>-<a href="https://www.business-standard.com/article/news-ians/low-conviction-rate-in-crimes-against-women-matter-of-concern-minister-118052101408_1.html">Business-standard-rate-in-crimes-against-women-Sexual Harassment-Delhi</a>. <a href="https://www.newslaundry.com/2018/04/20/why-delhis-rape-capital-tag-is-problematic">NEWSLAUNDRY-Delhi-rape-capital-tag</a>.</p>',
    	'Madhya Pradesh':'<p style="text-align: justify;">Between 2001-2012, the overall reported cases in Madhya Pradesh for rape increased&nbsp; by about 10%. Madhya Pradesh,&nbsp; Delhi, Chattishgarh and Odisha are states with&nbsp; high rates ofsexual Harassment cases. Majority of victims in these states were in the age group 18-30. Lack of awareness about gender based crimes is a major issue for&nbsp; Madhya Pradesh, Chattisgarh and Rajasthan. Pan-India and in M.P. about 11.6% of the arrested get convicted for sexual harassment cases.</p><p style="text-align: left;"><strong>Source</strong>-<a href="https://www.bbc.com/news/world-asia-india-43782471">BBC-news-Madhya Pradesh-Sexual Harassment</a>.</p>'
    }
    


    var rape={
    	'general':'<p style="text-align: justify;"><span style="font-weight: 400;">Rape is one of the most common crimes in India.</span><a href="https://en.wikipedia.org/wiki/Criminal_Law_(Amendment)_Act,_2013"> <span style="font-weight: 400;">Criminal Law (Amendment) Act, 2013<a href="https://en.wikipedia.org/wiki/Criminal_Law_(Amendment)_Act,_2013">[1]</a></span></a><span style="font-weight: 400;">&nbsp;defines rape as penile and non-penile penetration in bodily orifices of a woman by a man, without the consent of the woman.</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-Zeldin-34"><span style="font-weight: 400;">[2]</span></a><span style="font-weight: 400;"> According to the National Crime Records Bureau, one woman is raped every 20 minutes in India.</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-BBC-3"><span style="font-weight: 400;">[3]</span></a><span style="font-weight: 400;"> Incidents of reported rape increased 3% from 2011 to 2012.</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2"><span style="font-weight: 400;">[4]</span></a><span style="font-weight: 400;"> Incidents of reported incest rape increased 46.8% from 268 cases in 2011 to 392 cases in 2012.</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2"><span style="font-weight: 400;">[5]</span></a><span style="font-weight: 400;"> Despite its prevalence, rape accounted for 10.9% of reported cases of violence against women in 2016.</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-:1-7"><span style="font-weight: 400;">[6]</span></a></p><p style="text-align: left;"><strong>Source:</strong></p><p><span style="font-weight: 400;">[1]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Criminal_Law_(Amendment)_Act,_2013">Wikipedia:Criminal_Law</a></span></p><p><span style="font-weight: 400;">[2]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-Zeldin-34">Wikipedia:Violence_against_women_in_India</a></span></p><p style="text-align: left;"><span style="font-weight: 400;">[3]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-BBC-3">Wikipedia:/Violence_against_women_in_India</a></span></p><p><span style="font-weight: 400;">[4]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2">Wikipedia:Violence_against_women_in_India</a></span></p><p><span style="font-weight: 400;">[5]</span><span style="font-weight: 400;"><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-bureau-2">Wikipedia:Violence_against_women_in_India</a></span></p><p><span style="font-weight: 400;">[6]</span><a href="https://en.wikipedia.org/wiki/Violence_against_women_in_India#cite_note-:1-7"><span style="font-weight: 400;">Wikipedia:Violence_against_women_in_India</span></a></p>',    	
    	'Madhya Pradesh':'<p style="text-align: justify;">Between 2001-2012, the overall reported cases for rape increased by about 55%. Madhya Pradesh, Delhi, Chattishgarh and Odisha are states with high rates of rape cases. Majority of victims in these states were in the age group 18-30. Lack of awareness about gender based crimes is a major issue for Madhya Pradesh, Chattisgarh and Rajasthan. Overall, About 90% of perpetrators were known to victims. Pan-India, only 16% of the arrested get convicted for rape cases.</p><p style="text-align: left;"><strong>Source</strong>-<a href="https://www.bbc.com/news/world-asia-india-43782471">BBC-NEWS-Madhya Pradesh- Rape</a>.</p>',
    	'Delhi':'<p style="text-align: justify;">Between 2001-2012, the no. of reported cases in Delhi has nearly doubled. Unlike past,&nbsp; more and more victims in metros have been reporting the crime. However, with only about 15% convictions, most cases witness no punishment for victims. In 96% of the cases, far higher than the national average, the perpetrators were known to the victims.</p><p style="text-align: left;"><strong>Source</strong>-<a href="https://www.business-standard.com/article/news-ians/low-conviction-rate-in-crimes-against-women-matter-of-concern-minister-118052101408_1.html">Business Standard-crimes-against-women-Delhi</a>. <a href="https://www.newslaundry.com/2018/04/20/why-delhis-rape-capital-tag-is-problematic">Newslaundry-why-delhi-is-rape-capital-tag-is-problematic</a>.</p>',
    	'Odisha':'<p style="text-align: justify;">The reported cases in Odisha has increased by 84% between 2001-12. However, unlike rest of the country, only in 64 % of the cases, perpetrators have been known to the victim. The average conviction rate for these cases over the years has only been 15.8%. The share of minor (below 18) girls in victims is also higher than the rest of the country.</p><p style="text-align: left;"><strong>Source</strong>-<a href="https://odishatv.in/odisha/for-delhis-5-rapes-a-day-in-2018-odisha-scores-7-rapes-a-day-in-2018-369419">OdishaTv.in-odisha-rapes</a>. <a href="https://www.outlookindia.com/magazine/story/india-news-alarming-rise-in-child-rapes-leaves-odisha-in-pain-and-shame/302005">OutlookIndia-india-news-alarming-rise-in-child-rapes-leaves-odisha-in-pain-and-shame</a>.</p>',
    	'West Bengal':'<p style="text-align: justify;">The number of reported cases in West Bengal has nearly tripled between 2001-2012. West Bengal accounts for about 12.67% of the total rape cases in the country. The share of minor girls in victims is higher than the national average. The average conviction rate for the perpetrators is lesser than the national average.&nbsp;In about 75% of the cases, the perpetrators were known to the victims, anumber far less than the national average.</p><p style="text-align: left;"><strong>Source</strong>-<a href="https://www.indiatoday.in/india/east/story/mamata-banerjee-west-bengal-most-unsafe-for-women-166539-2013-06-12">Indiatoday.in-west-bengal-unsafe-for-women</a>.</p>',
    	'Assam':'<p style="text-align: justify;">The number of reported cases in Assam has nearly doubled between 2001-2012. The share of minor girls in victims is higher than the national average. The average conviction rate for the perpetrators is only marginally higher than the national average.In about 88% of the cases, the perpetrators were known to the victims, anumber far less than the national average.</p><p style="text-align: left;"><strong>Source</strong>-<a href="https://www.business-standard.com/article/pti-stories/12-750-cases-of-crime-against-women-in-assam-in-2017-2018-118092400814_1.html">Business Standard-cases-of-crime-against-women-in-assam</a>. <a href="https://timesofindia.indiatimes.com/india/rate-of-crime-against-women-highest-in-assam-in-2017-ncrb/articleshow/71710059.cms.">Timesofindia-rate-of-crime-against-women-highest-in-assam</a>&nbsp;.</p>'
    }

   
    scene1="Domestic_Violence"
    scene2="Kidnapping"
    scene3="Rape"
    scene4="Sexual_Harrassment"



	switch(scene){
		case scene1:
		return domes[state];
		break;
		case scene2:
		return kidnap[state];
		break;
		case scene3:
		return rape[state];
		break;
		case scene4:
		return sexual_harrasment[state];
		break;
	}
    
    return sexual_harrasment['general'];

    console.log('scene:' +scene+" state:"+state);

    
    

}

function initialize_ano(state){
    show_ano();
    console.log("inside initialize:"+state);
    ano=get_anno(AppState.getCurrentScene(),state);
    console.log("the ano is "+ano);
    $(".anno").html(ano);
}

function hide_ano(){
    $(".anno").hide();
}


function show_ano(){
    $(".anno").show();
}

function update_scene_charts(scene, year)
{
    if(scene == "Domestic_Violence")
    {
        SceneDomesticViolence.update_charts(year);
    }
    else if(scene == "Kidnapping")
    {
        SceneKidnappingAbduction.update_charts(year);
    }
    else if(scene == "Rape")
    {
        SceneRape.update_charts(year);
    }
    else if(scene == "Sexual_Harrassment")
    {
        SceneSexualHarrassment.update_charts(year);
    }
    else if(scene == "Explore")
    {

    }
    else {
        // do nothing
    }



}


