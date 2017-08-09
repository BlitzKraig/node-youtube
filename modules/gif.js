var ffmpeg      = require('fluent-ffmpeg');
var path        = require('path');
var fs          = require('fs');

module.exports = function (videoFilePath, filePath, startTime, duration, options, cb) {
    options = options || {};

    var ws  = fs.createWriteStream(path.resolve(filePath));
    var f   = ffmpeg(videoFilePath)
        .format('gif')
        .setStartTime(startTime)
        .duration(duration);

    if((options.maxWidth || options.maxHeight) && !options.size) {
        ffmpeg.ffprobe(videoFilePath, function(err, metadata) {
            if(err) {
                return cb(err);
            }

            var videoInfo = {};

            if(metadata) {
                if(metadata.streams && metadata.streams.length) {
                    metadata.streams.forEach(function (stream) {
                        if(stream.codec_type == 'video' && !videoInfo.codec_type) {
                            stream.codec_type && (videoInfo.codec_type = stream.codec_type);
                            stream.width && (videoInfo.width = stream.width);
                            stream.height && (videoInfo.height = stream.height);
                        }
                    })
                }
            }

            videoInfo.width = videoInfo.width || options.maxHeight;
            videoInfo.height = videoInfo.height || options.maxWidth;

            var computedSize = options.maxWidth ? (Math.min(options.maxWidth, videoInfo.width) + 'x') : '?x';
            computedSize += (options.maxHeight ? Math.min(options.maxHeight, videoInfo.height) : '?');

            f.size(computedSize);
            options.fps && f.inputFPS(options.fps);
            options.ratio && f.aspect(options.ratio);

            f.on('error', cb)
                .on('end', cb)
                .writeToStream(ws, { end: true });
        })
    }
    else {
        options.size && f.size(options.size);
        options.fps && f.inputFPS(options.fps);
        options.ratio && f.aspect(options.ratio);

        f.on('error', cb)
            .on('end', cb)
            .writeToStream(ws, { end: true });
    }
};