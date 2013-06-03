if (Meteor.isClient) {
    Template.hello.greeting = function () {
        return "Welcome to app.";
    };
    
    Template.hello.events({
        'click input' : function () {
            var dmOptions = {
                data: 'hello, world!',
                path: 'tags/'
            };
            Meteor.call('generateDm',
                       dmOptions, function(error,res) {
                $result = $('#result');
                $result.html('');
                if (error !== undefined) {
                    $result.html('Error: '+error);
                    return;
                }
                if (res.success) {
                    $result.html('Tag created: '+res.path);
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
            return DmCreator.generateDm(options);
        }
    });
}
