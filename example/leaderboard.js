// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Addresses = new Mongo.Collection("addresses");

if (Meteor.isClient) {
  function QueryStringToJSON(form) {
    var pairs = form.slice(1).split('&');

    var result = {};
    pairs.forEach(function(pair) {
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
  }

  Template.addressForm.events({
    'submit form#address-form': function(e, template) {
      e.preventDefault();
      console.log($('form').serialize());
      let formData = QueryStringToJSON($('form').serialize());
      console.log(formData);
      Meteor.call('createAndValidateAddress', function(err, address) {
        if (err) {
          alert(err.message);
        } else {
          Addresses.insert({
            city: address.city
          });
        }
      });
    }
  });
} else {
  Meteor.methods({
    'createAndValidateAddress': function(address) {
      check(address, Object);
      let result = EasyPost.Address.createAndVerify(address);
      return result.address;
    }
  });
}

