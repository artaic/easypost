# Meteor Easypost Wrapper

A simple wrapper for EasyPost. It wraps every method with a future,
giving a readable error message as well as a response result when it
returns.

### Usage

Simply set `process.env.EASYPOST_KEY` to a valid easypost key.

Exports a single object called `EasyPost` which you can use in your
code. This only exists on the server.

It is exactly the same as [the easypost
api](https://www.easypost.com/docs/api), with the only catch being that
the methods are camelCase instead of snake_case (eg, `createAndVerify`
instead of `create_and_verify`).

### Example Usage

if (Meteor.isServer) {
  Meteor.methods({
    // if the address is not valid, an error will be thrown.
    'validateAddress': function (address) {
      check(address, Object);
      let result = EasyPost.Address.createAndVerify(address);
      return result.address;
    }
  });
} else {
  Meteor.call('validateAddress', function (err, address) {
    if (err) {
      alert(err.message);
    } else {
      Profiles.update(Meteor.userId(), {
        $set: {
          'address.city': address.city
        }
      });
    }
  });
}

