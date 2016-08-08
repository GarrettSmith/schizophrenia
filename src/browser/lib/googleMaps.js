export function openNavMap(to, from = 'My Location') {
  plugin.google.maps.external.launchNavigation({from, to});
}
