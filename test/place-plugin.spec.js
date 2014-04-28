/**
* @license event-plugin https://github.com/flams/place-plugin
*
* The MIT License (MIT)
*
* Copyright (c) 2014 Olivier Scherrer <pode.fr@gmail.com>
*/
require("quick-dom");

var PlacePlugin = require("../index"),
    SeamView = require("seam-view");

describe("PlacePlugin ", function () {
    it("should be a constructor function", function () {
        expect(typeof PlacePlugin).toBe("function");
    });
});

describe("PlacePluginRegister", function () {
    var placePlugin = null,
        falseUI = {},
        rightUI = new SeamView();

    beforeEach(function () {
        placePlugin = new PlacePlugin();
    });

    it("should set a new ui", function () {
        expect(placePlugin.set("ui")).toBe(false);
        expect(placePlugin.set()).toBe(false);
        expect(placePlugin.set("ui", "ui")).toBe(false);
        expect(placePlugin.set("ui", falseUI)).toBe(false);
        expect(placePlugin.set("ui", rightUI)).toBe(true);
    });

    it("should get a set ui", function () {
        placePlugin.set("ui", rightUI);
        expect(placePlugin.get("ui")).toBe(rightUI);
    });

    it("should set multiple uis at once", function () {
        var uis = {
                "myUI1": new SeamView(),
                "myUI2": new SeamView()
            };

        placePlugin.setAll(uis);
        expect(placePlugin.get("myUI1")).toBe(uis.myUI1);
        expect(placePlugin.get("myUI2")).toBe(uis.myUI2);
    });

});

describe("PlacePluginInit", function () {

    var placePlugin = null,
        uis = {
            "myUI1": new SeamView(),
            "myUI2": new SeamView()
        };

    it("should allow for initializing placePlugin with multiple UIs", function () {
        placePlugin = new PlacePlugin(uis);

        expect(placePlugin.get("myUI1")).toBe(uis.myUI1);
        expect(placePlugin.get("myUI2")).toBe(uis.myUI2);
    });

});

describe("PlacePluginUILoading", function () {

    var placePlugin = null,
        myUI = new SeamView(),
        node = document.createElement("div");

    beforeEach(function () {
        placePlugin = new PlacePlugin();
        placePlugin.set("myUI", myUI);

    });

    it("should call the place method of an ui", function () {
        spyOn(myUI, "place");
        placePlugin.place(node, "myUI");
        expect(myUI.place.wasCalled).toBe(true);
        expect(myUI.place.mostRecentCall.args[0]).toBe(node);
    });

    it("should throw an exception if the ui is not registered", function () {
        expect(function () {
            placePlugin.place(node, "missing");
        }).toThrow();
    });

});
