# ArcGIS API for JavaScript with Angular CLI

This repo is a copy of an example from https://github.com/Esri/jsapi-resources/tree/master/esm-samples/jsapi-angular-cli.
Esri loader (latest) and  Angular 12 is used instead of the [@arcgis/core](https://www.npmjs.com/package/@arcgis/core) ES modules. 

---
## Known issues

`Unhandled Promise Rejection` console errors are thrown when starting adding new basemaps to the BasemapGallery widget.
The errors appear starting in ArcGIS JS API Version `4.18`, previous versions work without the errors.

## Get Started

**Step 1** - Run `npm install`. 

**Step 2** - Run `ng serve`