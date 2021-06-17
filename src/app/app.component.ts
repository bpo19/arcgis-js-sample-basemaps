import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';

import { loadModules, setDefaultOptions } from 'esri-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public view: any = null;

  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  async initializeMap(): Promise<any> {
    setDefaultOptions({ version: '4.19' });

    const [WebMap, MapView] = await loadModules([
      'esri/WebMap',
      'esri/views/MapView'
    ])

    const container = this.mapViewEl.nativeElement;

    const webmap = new WebMap({
      portalItem: {
        id: 'aa1d3f80270146208328cf66d022e09c',
      },
    });

    const view = new MapView({
      container,
      map: webmap
    });
    await view.when();

    this.view = view;
    return this.view.when();
  }

  async ngOnInit() {
    this.initializeMap().then(async () => {
      console.log('The map is ready.');
      const [BasemapGallery, Basemap] = await loadModules([
        'esri/widgets/BasemapGallery',
        'esri/Basemap'
      ])
  
      const basemapGallery = new BasemapGallery({
        view: this.view,
        source: [Basemap.fromId("topo-vector")]
      });
      await basemapGallery.when();
  
      this.view.ui.add(basemapGallery, {
        position: "top-right"
      });

      setTimeout(() => {
        let basemap = Basemap.fromId("hybrid");

        basemapGallery.source.basemaps.add(basemap);
      }, 8000);
    });
  }

  ngOnDestroy(): void {
    if (this.view) {
      this.view.destroy();
    }
  }
}