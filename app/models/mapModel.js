class MapModel {
  static lat = null;
  static lng = null;
  static map = null;

  // Get the latitude and longitude as an object
  static getLatLong() {
    return { lat: this.lat, lng: this.lng };
  }

  // Set the latitude and longitude
  static setLatLong(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  // Clear the latitude and longitude values
  static clearLatLong() {
    this.lat = null;
    this.lng = null;
  }

  static mapLoad(lat, lng) {
    // create the map with the given coordinates
    this.map = L.map("map").setView([lat, lng], 10);

    // add the tile layer
    L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(this.map);
  }

  // Add a marker to the map
  static async addMarker(lat, lng, text) {
    // Wait for the map to load
    await new Promise((resolve) => {
      if (this.map) {
        resolve();
      } else {
        const interval = setInterval(() => {
          if (this.map) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      }
    });

    // Add the marker with the given text
    const marker = L.marker([lat, lng]).addTo(this.map);
    marker.bindPopup(text).openPopup();
  }
}

export default MapModel;
