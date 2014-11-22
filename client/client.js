/*
*Messages
*/
$(document).ready(function(){
  $("#chatti").height($("#sivukuva").height());
  $(window).resize(function(){
    $("#chatti").height($("#sivukuva").height());
    console.log("testi1")
  });
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

      if(message.value != '' && message.value != ' '){
        Messages.insert({
          name: name,
          message: message.value,
          time: Date.now()
        });
        
        document.getElementById('message').value = '';
        message.value='';
      }
    }
  }
}