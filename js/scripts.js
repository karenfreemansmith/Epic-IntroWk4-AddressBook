//backend logic
function Contact(first, last) {
  this.firstName=first;
  this.lastName=last;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

//frontend logic
$(document).ready(function() {
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var first = $("input#new-first-name").val();
    var last = $("input#new-last-name").val();
    var newContact=new Contact(first, last);

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() +"</span></li>");

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
    });
  });


});
