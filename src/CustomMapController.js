import { MapController } from 'react-map-gl';

export default class CustomMapController extends MapController {
  // Disable zoom and pan
  _onWheel(event) {
    return false;
  }
  _onPan(event) {
    return false;
  }
}