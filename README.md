# lctv-bot-flyouts-plugin
Flyouts plugin for the LCTV Bot

## Setup
To add flyouts on command, add a `settings.json` file in the plugin folder with the following structure:

```
{
    "flyouts" : [{
        // Anytime '#doge' is said in chat,
        // the doge.png will flyout with the flyLeft animation
        "command" : "#doge",
        "image" : "doge.png",
        "animation" : "flyLeft"
    }, {
        // Anytime '#test' is said in chat,
        // the doge.png will flyout with the flyBottom animation
        "command" : "#test",
        "image" : "doge.png",
        "animation" : "flyBottom"
    }, {
        // Anytime '#scale' is said in chat,
        // the doge.png will flyout with the scale animation
        "command" : "#scale",
        "image" : "doge.png",
        "animation" : "scale",
        "template" : "{{username}} followed the stream"
    }, {
        // Anytime '#fade' is said in chat,
        // the doge.png will flyout with the fade animation
        "command" : "#fade",
        "image" : "doge.png",
        "animation" : "fade",
        "template" : "Thanks for the follow!"
    }]
}
```
