const BUS_COST = 1.8,
    MAX_COST = 3.2,
    COST_ONLY_ZONE_ONE = 2.5,
    COST_ONE_ZONE_NOT_INCLUDING_ZONE_ONE = 2.0,
    COST_TWO_ZONES_INCLUDING_ZONE_ONE = 3.0,
    COST_TWO_ZONES_EXCLUDING_ZONE_ONE = 2.25;

export const STATIONS = {
    Holborn: {
        name: 'Holborn',
        zones: [1]
    },
    EarlsCourt: {
        name: 'Earls Court',
        zones: [1, 2]
    },
    Hammersmith: {
        name: 'Hammersmith',
        zones: [2]
    },
    Wimbledon: {
        name: 'Wimbledon',
        zones: [3]
    }
};

export default class OysterCard {
    constructor(credit = 0) {
        this.credit = credit;
        this.fare = 0;
        this.journeyInProgress = false;
        this.startStation = undefined;
        this.exitStation = undefined;
    }

    startJourney(station) {
        if (this.journeyInProgress) {
            alert('journey already in progress');
            return;
        }
        if (!station) {
            alert('Invalid Station');
            return;
        }
        this.journeyInProgress = true;
        this.startStation = station;
        this.fare = MAX_COST;
        this.setDebit();
    }

    getFare() {
        return this.fare;
    }

    getCredit() {
        return this.credit;
    }

    setDebit() {
        if (this.credit >= this.fare)
            this.credit -= this.fare
        else
            alert('credit exceeded');
    }

    exitJourney(station) {
        if (!this.startStation) {
            alert('please select start station');
            return;
        }
        this.exitStation = station;
        this.getFinalCost();
        this.setDebit();
        this.startStation = undefined;
        this.journeyInProgress = false;
        alert(`journey ended, fare: ${this.fare}`);
    }

    getFinalCost() {
        if (this.startStation && this.exitStation && this.startStation.zones && this.exitStation.zones) {
            //return the max cost into the account and then calculate the fare cost
            this.credit += MAX_COST;

            var zonesCrossed = this.minimumZonesVisited(this.startStation, this.exitStation);
            var isZoneOneCrossed = this.startStation.zones.indexOf(1) > -1 && this.exitStation.zones.indexOf(1) > -1;
            var cost = this.getCostByZone(zonesCrossed, isZoneOneCrossed);
            this.fare = cost;
        } else {
            alert('exit or start station is invalid')
        }
    }

    // system should favour the customer, hence we calculate minimum zones visited
    minimumZonesVisited(fromStation, toStation) {

        var minZoneInFromStation = Math.min(...fromStation.zones);
        var minZoneInToStation = Math.min(...toStation.zones);

        return Math.abs(minZoneInFromStation - minZoneInToStation) + 1;
    }

    getCostByZone(zonesCrossed, isZoneOneCrossed) {
        if (zonesCrossed === 1 && isZoneOneCrossed) {
            return COST_ONLY_ZONE_ONE;
        }
        if (zonesCrossed === 1 && !isZoneOneCrossed) {
            return COST_ONE_ZONE_NOT_INCLUDING_ZONE_ONE;
        }
        if (zonesCrossed === 2 && isZoneOneCrossed) {
            return COST_TWO_ZONES_INCLUDING_ZONE_ONE;
        }
        if (zonesCrossed === 2 && !isZoneOneCrossed) {
            return COST_TWO_ZONES_EXCLUDING_ZONE_ONE;
        }
        if (zonesCrossed === 3) {
            return MAX_COST;
        }
        return MAX_COST;
    }

    setBusJourney() {
        this.fare = BUS_COST;
        this.setDebit();
    }
}