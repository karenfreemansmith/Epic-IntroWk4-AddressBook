//backend logic
function Contact(first, last) {
  this.firstName=first;
  this.lastName=last;
  this.addresses=[];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}

//global variable to maintain contacts
var contacts=getContacts();

function getContacts() {
  if(localStorage.myContacts) {
    var contacts=JSON.parse(localStorage.getItem("myContacts"));
  } else {
    var contacts=[];
  }
  return contacts;
}

//frontend logic
$(document).ready(function() {
  contacts.forEach(function(contact) {
    var newContact = new Contact(contact.firstName, contact.lastName);
    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() +"</span></li>");
     $(".contact").last().click(function() {
       $("#show-contact").show();
       $("#show-contact h2").text(newContact.firstName);
       $(".first-name").text(contact.firstName);
       $(".last-name").text(contact.lastName);
       $("ul#addresses").text("");
       contact.addresses.forEach(function(address) {
         //var newAddress(address.street, address.city, address.state);
         //$("ul#addresses").append("<li>" + newAddress.fullAddress() + "</ul>");
         $("ul#addresses").append("<li>" + address.street + ", " + address.city + ", " + address.state + "</ul>");
       });
     });
  });

  $("#save-contacts").click(function() {
    localStorage.setItem("myContacts", JSON.stringify(contacts));
  });

  $("#add-address").click(function() {
    $("#new-addresses").append(
      '<div class="new-address">' +
        '<div class="form-group">' +
          '<label for="new-street">Street</label>' +
          '<input type="text" class="form-control new-street">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="new-city">City</label>' +
          '<input type="text" class="form-control new-city">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="new-state">State</label>' +
          '<input type="text" class="form-control new-state">' +
        '</div>' +
      '</div>');
  });
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var first = $("input#new-first-name").val();
    var last = $("input#new-last-name").val();
    var newContact=new Contact(first, last);
    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);
      newContact.addresses.push(newAddress);
    });
    contacts.push(newContact);
    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() +"</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</ul>");
      });
    });

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
  });
});
