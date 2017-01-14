/**
 * Created by Dulitha RD on 12/31/2016.
 */
import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

var cloudinary = require('cloudinary');

import './youtubevideouploadform.html';


Template.youtubeVideoUploadForm.onRendered(function () {

    cloudinary.config({
        cloud_name: "hwshbhsyq",
        api_key: "765487893716384",
        api_secret: "rYsjtZYYZGWa9hT_6mF-9BSZ36I"
    });

});

Template.youtubeVideoUploadForm.events({

    'submit #videoUploadFormClient': function (event) {
        // Prevent default actions
        event.preventDefault();

        var files = event.target.uploadVideo.files; // FileList object

        var file = files[0];
        var start = 0;
        var stop = file.size - 1;

        var reader = new FileReader();

        // If we use onloadend, we need to check the readyState.
        reader.onloadend = function (evt) {
            if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                console.log(evt.target.result);
                console.log('Read bytes: ', start + 1, ' - ', stop + 1,
                    ' of ', file.size, ' byte file');
                cloudinary.uploader.upload("hhh.mp4", function (result) {
                    console.log(result)
                });
            }
        };

        var blob = file.slice(start, stop + 1);
        reader.readAsBinaryString(blob);

        // Meteor.call('uploadVideoCloud', fileData);
    },

    'click #button': function () {
        console.log("Upload Clicked");
    }
});


Meteor.methods({});