/*
*Messages
*/

//Meteor.startup(function(){
//  $("#chatti").outerHeight($("#sivukuva").height());
//  console.log("meteori startuppi");
//});

$(document).ready(function(){
  $("#chatti").outerHeight($("#sivukuva").height());
  console.log("document ready");
  //$('.modal-trigger').leanModal();
  //$('#message').tooltip({"delay":50});
  $('.carousel').carousel({ interval: 10000, pause: false});
});
$(window).resize(function(){
    $("#chatti").outerHeight($("#sivukuva").height());
    //console.log("testi1")
  });
$(window).load(function(){
  $("#chatti").outerHeight($("#sivukuva").height());
    console.log("window load");
});
$('#this-carousel-id').on('slide.bs.carousel', function(){
  $("#chatti").outerHeight($("#sivukuva").height());
  console.log("carousel slide");
});


var quotet = ['Toinen tiistai, seuranani hitler.'
              ,'Olen jättimäinen Nicholas Cage baarissa.'
              ,'Olen jättimäinen kyrpä omassa kodissani.'
              ,'Luontodokumentti sen kertoi, Karhu osaa myös koodata javaa.'
              ,'Putous ja lasillinen kuplivaa'
              ,'Tarvitaan Drupal-konsultointia/apua. Jos tiedät osaavan henkilön, ota yhteyttä. Mahdollisuus myös tienata hieman taskurahaa.'
              ,'Ilmeeni kun esitän taululla tekemättömän demotehtäväni.'
              ,'Ei juku. Harvemmin pääsen osaksi feissarimokia. Hymyilyttää.'
              ,'Oisinpa rohkea.'
              ,'Oisinpa selvä kuin vesi.']

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


Template.messages.helpers({
  messages: function(){
    return Messages.find({}, {sort: {time:-1}});
  }
});

Template.quote.helpers({
  quotet: function(){
    return quotet[getRandomArbitrary(0,9)]; 
  }
});

Template.input.events = {
  'keydown input#message' : function(event){
    

    if(event.which==13){
      var name = Meteor.user().services.facebook.first_name + " " + Meteor.user().services.facebook.last_name;
      var message = document.getElementById('message');
      var tags = [];
      var tagHandler = message.value;
      console.log(tagHandler);
      var tagList = tagHandler.split(" ");

      //Handlaa tagit ja puskee hashtagilla alkavat stringit tagilistaksi
      if(message.value != '' && message.value != ' '){
        for(var i = 0; i<tagList.length; i++){
          if(tagList[i].charAt(0) === '#'){
            tags.push(tagList[i]);
          }
        }

        Messages.insert({
          name: name,
          message: message.value,
          time: Date.now(),
          tags: tags
        });
        
        document.getElementById('message').value = '';
        message.value='';
      }
    }
  }
}