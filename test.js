if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to test.";
  };

  Template.hello.events({
    'click input' : function () {
        // template data, if any, is available in 'this'
        console.log('clicked');
        var dmOptions = {
            data: 'hello, world!',
            path: 'tags/'
        };
        console.log('calling generateDm');
        Meteor.call('generateDm',
                   dmOptions, function(error,res) {
            $result = $('#result');
            $result.html('');
            if (error !== undefined) {
                $result.html('Error: '+error);
                return;
            }
            if (res.success) {
                $result.html('Tag created: '+res.success);
            } else {
                $result.html('Failed to create tag. Check that directory exists.');
            }
        });

    }
  });
}

if (Meteor.isServer) {
    Meteor.methods ({
        generateDm: function(options) {
            console.log("generateDm on server "+DmCreator.generateDm);
            return DmCreator.generateDm(options);
        }
    });
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
