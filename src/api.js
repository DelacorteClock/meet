export const extractLocations = function (events) {
    var extractLocations = events.map(function (event) {return event.location});
    var locations = [...new Set(extractLocations)];
    return locations;
};