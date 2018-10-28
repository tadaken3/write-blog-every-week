exports.handler = function(event, content, callback) {
    callback(null,{
        stasusCode: 200,
        bosy: "hello, world"
    })
}