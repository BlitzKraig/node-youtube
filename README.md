Youtube to snapshots and GIFs.
================================================================

This module was forked from [node-youtube](https://github.com/Javascipt/node-youtube).
It is an extended version of it, providing more ffmpeg features and creating gifs from local paths.
![youtube.com](https://api.travis-ci.org/Javascipt/node-youtube.svg)

Have you ever dreamt of creating a gif out of a youtube video ? Then you are in the right place

![GIF](https://www.dropbox.com/s/w7w870zd14jhr1x/file.gif?raw=1)

[GIF source](https://www.youtube.com/watch?v=ja8pA2B0RR4)

This package allows you to take a screenshot, a gif or a portion out of a youtube video.

This package is the son of these two amazing parents:

- [Youtube-dl package](https://github.com/fent/node-youtube-dl)
- [Fluent-ffmpeg package](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

### Dependencies:

> You need to get [ffmpeg and ffprobe](https://ffmpeg.org/) installed to start using this package.

## Installation :

```bash
  $ npm install youtube.com-extended --save
```

## How does it work ?

Instantiate the `youtube` object :

```javascript
    var Youtube = require('youtube.com-extended');
    
    // You can instantiate the youtube object using the video url
    var youtube = Youtube('http://www.youtube.com/watch?v=ategZqxHkz4');
    
    // or you can also specify the video id
    var youtube = Youtube('ategZqxHkz4');
```

#### Crop a youtube video :

```javascript
    youtube.crop('0:05', '0:25', './file.mp4')
        .then(function () {
            console.log("Done");
        }).catch(function (err) {
            console.log("err : ", err)
        });
```

The `.crop()` method takes a 4th argument which is the format of the video to download example : `['--format=18']`
This format is exactly the same we specify when downloading a youtube video using the [Youtube-dl package](https://github.com/fent/node-youtube-dl). Make sure to take a look at it for more info.

#### Take a screenshot :

```javascript
    youtube.snapshot('1:00', './file.jpg')
        .then(function () {
            console.log("Done");
        }).catch(function (err) {
            console.log("err : ", err)
        });
```

The `.snapshot()` method also takes the format as its 3rd argument.

#### Creating a GIF :

```javascript
    youtube.gif('0:05', '0:35', './file.gif')
        .then(function () {
            console.log("Done");
        }).catch(function (err) {
            console.log("err : ", err)
        });
```

#### Creating a GIF from local path video file

```javascript
    var Youtube = require('youtube.com-extended');
    var youtube = Youtube(); // do NOT provide any argument here

    youtube.gif('0:05', '0:35', '/tmp/existing_video.mp4', './file.gif')
            .then(function () {
                console.log("Done");
            }).catch(function (err) {
                console.log("err : ", err)
            });
```

The `.gif()` method takes 1 more argument, which is `options` object.
- `options.size` : The hight and width of the final gif ex : `"600x300"`
- `options.ratio` : The aspect argument may either be a number or a X:Y string. For example, '4:3' or 1.33333
- `options.fps` : An integer representing the fps of the final gif
- `options.maxWidth` : An integer representing the max width of final gif, `ffprobe` used here to get original video width and choose minimum value, ignored when `options.size` provided
- `options.maxHeight` : An integer representing the fps of the final gif, `ffprobe` used here to get original video width and choose minimum value, ignored when `options.size` provided

You can find more details on `size`, `ratio`, `fps` arguments on the [Fluent-ffmpeg package](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg).

#### Creating a GIF with different options

```javascript
    youtube.gif('0:05', '0:35', './file.gif', {size: '800:?', fps: 8})
            .then(function () {
                // gif width is 800, height computed automatically, fps is 8
                console.log("Done");
            }).catch(function (err) {
                console.log("err : ", err)
            });

    youtube.gif('0:05', '0:35', './file.gif', {maxWidth: 800})
                .then(function () {
                    // gif max width is 800, height computed automatically
                    // for example, if original video width is 720, then result width is 720
                    // for example, if original video width is 1280, then result width is 800
                    console.log("Done");
                }).catch(function (err) {
                    console.log("err : ", err)
                });
```

#### Downloading a video

```javascript
    youtube.download('file.mp4', format)
        .then(function () {
            console.log("done");
        });
```

Again, the format is the same as the one mentioned before.