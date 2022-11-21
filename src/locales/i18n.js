import { createI18n } from "vue-i18n";

const i18n = createI18n({
    locale: "en",
    messages: {
        en: {
            reporting: "Reporting",
            myVessels: "My Vessels",
            generalInfo: "General Info",
            vesselName: "Vessel Name",
            imoNo: "IMO No.",
            fuelOption: "Fuel option",
            pleaseSelectOne: "Please select one",
            cancel: "Cancel",
            saveChanges: "Save Changes",
            fallbackContent: "Fallback Content",
            reportNo: "Report No.",
            departure: "Departure",
            arrival: "Arrival",
            status: "Status",
            cargoLD: "Cargo L/D",
            distance: "Distance",
            distanceAndTime: "Distance & Time",
            distanceLeft: "Distance Left",
            dateOfSubmission: "Date of Submission",
            voyageNo: "VOYAGE NO",
            viewJourney: "View Journey",
            allReports: "All Reports",
            noon: "Noon",
            bunkerDelivery: "Bunker Delivery",
            addNewReport: "Add New Report",
            shipOwner: "Ship Owner",
            unknown: "Unknown",
            pleaseLogIn: "Please log in",
            getToken: "Get Token",
            logOut: "Log out",
            overview: "Overview",
            departureNo: "Departure No.",
            voyageNo: "Voyage No.",
            ballast: "Ballast",
            departurePort: "Departure Port",
            destinationPort: "Destination Port",
            name: "Name",
            dateAndTime: "Date & time",
            estDateAndTime: "Est. date & time",
            reportingNoon: "Reporting Noon",
            selectTimeZone: "Select time zone",
            timeZone: "Time zone",
            summerTime: "Summer time",
            selectSummerTime: "Select summer time",
            applied: "Applied",
            notApplied: "Not Applied",
            latitude: "Latitude",
            southAndNorth: "South/North",
            longitude: "Longitude",
            south: "South",
            north: "North",
            weather: "Weather",
            sky: "Sky",
                sky_b: "b: Blue sky (Cloud 0~2)",
                sky_bc: "bc: Fine but Cloudy (Cloud 3~7)",
                sky_c: "c: Cloudy (Cloud 8~10)",
                sky_d: "d: Drizzling rain",
                sky_f: "f: Fog",
                sky_g: "g: Gloom",
                sky_h: "h: Hail",
                sky_l: "l: Lightning",
                sky_m: "m: Mist",
                sky_o: "o: Overcast (Cloud 10)",
                sky_p: "p: Passing showers",
                sky_q: "q: Squalls",
                sky_r: "r: Rain",
                sky_s: "s: Snow",
                sky_t: "t: Thunder",
                sky_u: "u: Ugly threatening wr.",
                sky_v: "v: Visibility",
                sky_w: "w: Dew",
                sky_z: "z: Haze",
            visibility: "Visibility",
                visibility_1: "1 (<50 m)",
                visibility_2: "2 (50-200 m)",
                visibility_3: "3 (200-500 m)",
                visibility_4: "4 (500-1000 m)",
                visibility_5: "5 (1-2 km)",
                visibility_6: "6 (2-4 km)",
                visibility_7: "7 (4-10 km)",
                visibility_8: "8 (10-20 km)",
                visibility_9: "9 (20-50 km)",
                visibility_10: "10 (50+ km)",
            wind: "Wind",
            direction: "Direction",
            force: "Force",
                wind_force_0: "0 (Calm)",
                wind_force_1: "1 (Light air)",
                wind_force_2: "2 (Light breeze)",
                wind_force_3: "3 (Gentle Breeze)",
                wind_force_4: "4 (Moderate breeze)",
                wind_force_5: "5 (Fresh Breeze)",
                wind_force_6: "6 (Strong Breeze)",
                wind_force_7: "7 (Near gale)",
                wind_force_8: "8 (Gale)",
                wind_force_9: "9 (Severe gale)",
                wind_force_10: "10 (Storm)",
                wind_force_11: "11 (Violent storm)",
                wind_force_12: "12 (Hurricane)",
                
                wave_force_0: "0 (Calm, Glassy)",
                wave_force_1: "1 (Calm, Rippled)",
                wave_force_2: "2 (Smooth)",
                wave_force_3: "3 (Slight)",
                wave_force_4: "4 (Moderate)",
                wave_force_5: "5 (Rough)",
                wave_force_6: "6 (Very Rough)",
                wave_force_7: "7 (High)",
                wave_force_8: "8 (Very High)",
                wave_force_9: "9 (Phenomenal)",

            select: "Select",
            maxSpeed: "Max. Speed",
            maxHeight: "Max. Height",
            wave: "Wave",
            swell: "Swell",
                swell_0: "0 (No swell)",
                swell_1: "1 (Low swell - short or average)",
                swell_2: "2 (Low Swell - long)",
                swell_3: "3 (Moderate - short)",
                swell_4: "4 (Moderate - average)",
                swell_5: "5 (Moderate - long)",
                swell_6: "6 (Heavy Swell - short)",
                swell_7: "7 (Heavy Swell - average)",
                swell_8: "8 (Heavy Swell - long)",
                swell_9: "9 (Confused Swell)",
            scale: "Scale",
            glacierIceCondition: "Glacier Ice Condition",
                glacier_low: "LOW",
                glacier_mod: "MOD",
                glacier_high: "HIGH",
                glacier_ext: "EXT",
            na: "N/A",
            heavyWeatherCondition: "Heavy Weather Condition",
            totalHours: "Total hours",
            fuelConsumption: "Fuel consumption",
            wind: "Wind",
            maxWaveHeight: "Max. wave height",
            time: "Time",
            total: "Total",
            distanceByObservation: "Distance by observation",
            distanceByEngine: "Distance by engine",
            revolutionCounter: "Revolution counter",
            performance: "Performance",
            noonToNoon: "Noon to Noon",
            speed: "Speed",
            currentVoyage: "Current Voyage",
            averageSpeed: "Average Speed",
            averageRPM: "Average RPM",
            slip: "SLIP",
            rpm: "RPM",
            consumptionAndCondition: "Consumption & Condition",
            consumptionAndConditionNoonToNoon: "Consumption & Condition (Noon to Noon)",
            consumptionAndConditionSbyToFwe: "Consumption & Condition (S/BY - F.W.E)",
            ne: "N.E.",
            totalConsumption: "Total consumption",
            remainOnBoard: "Remain on Board",
            fuelOilInMT: "Fuel Oil (MT)",
            me: "M/E",
            ge: "G/E",
            blr: "BLR",
            igg: "IGG",
            lsfo: "LSFO",
            mgo: "MGO",
            lubricateOilInL: "Lubricate Oil (L)",
            meCylinder: "M/E Cylinder",
            meSystem: "M/E System",
            meSump: "M/E Sump",
            geSystem: "G/E System",
            consumed: "Consumed",
            generated: "Generated",
            rob: "ROB",
            freshWaterInTon: "Fresh Water (TON)",
            correction: "Correction",
            selectType: "Select type",
            remarks: "Remarks",
            save: "Save",
            sendReport: "Send report",
            noVoyageCreated: "No Voyage Created",
            clickOnCreateNewVoyageAboveToBegin: "Click on 'Create New Voyage' above to begin",
            overview: "Overview",
            submitted: "Submitted",
            draft: "Draft",
            cancelled: "Cancelled",
            createNewVoyage: "Create New Voyage",
            submitNewReport: "Submit New Report",
            selectCase: "Select case",
            selectDepartureType: "Select departure type",
            arrivalPort: "Arrival Port",
            signIn: "Sign In",
            signInToYourAccount: "Sign in to your account",
            welcomeBack: "Welcome back! Please login with the button below.",
            getShips: "Get Ships",
            typeToSearch: "Type to search...",
            mecylinder: "M/E Cylinder",
            mesystem: "M/E System",
            mesump: "M/E Sump",
            gesystem: "G/E System",
            sailingAtSea: "SAILING AT SEA",
            saveChanges: 'Save changes',
            legNo: 'Leg No.',
            east: 'East',
            west: 'West',
            eastAndWest: 'East/West',
            stoppageOrReductionOfRPM: 'Stoppage or Reduction of RPM (at sea)',
            selectDateAndTime: 'Select date & time',
            beginningDateAndTime: 'Beginning date & time',
            endingDateAndTime: 'Ending date & time',
            duration: 'Duration',
            reducedRPM: 'Reduced RPM',
            reason: 'Reason',
            inputRemarks: 'Input remarks',
            portName: 'Port name',
            plannedOperation: 'Planned operation',
            cargoOperationBerth: 'Cargo operation (Berth)',
            cargoOperationSTSSTB: 'Cargo operation (STS, STB)',
            bunkeringDebunkering: 'Bunkering/De-bunkering',
            dryDocking: 'Dry docking',
            crewChange: 'Crew change',
            receivingProvisionSpareParts: 'Receiving provision / Spare parts',
            survey: 'Survey',
            others: 'Others',
            inputOtherPlannedOperation: 'Input other planned operation',
            sbyForEOSP: 'S/BY for EOSP',
            weatherNoonToSby: 'Weather (Noon to S/BY)',
            distanceAndTimeNoonToSby: 'Distance & Time (Noon to S/BY)',
            weatherNoonToSby: 'Weather (Noon to S/BY)',
            pilotStationArrival: 'Pilot Station - Arrival',
            consumptionAndConditionNoonToSby: 'Consumption & Condition (Noon - S/BY)',
            actualPerformanceAtSea: 'Actual Performance at Sea',
            totalConsumptionPilotToPilot: 'Total Consumption (Pilot to Pilot)',
            name: 'Name',
            inputName: 'Input name',
            pleaseSelectDateAndTime: 'Please select date & time',
            totalDistanceByOBS: 'Total distance by OBS',
            totalSailingTime: 'Total sailing time',
            displacement: 'Displacement',
            totalConsumptionAtSea: 'Total consumption (at sea)',
            mefoConsumptionPerDay: 'M/E F.O. Consumption/day',
            boiler: 'Boiler',
            finishWithEngine: 'Finish With Engine',
            operationAtCurrentLocation: 'Operation (at current location)',
            status: 'Status',
            anchoringStartOutside: 'Anchoring start (Outside of port limit)',
            anchoringStartInside: 'Anchoring start (Inside of port limit)',
            driftingStart: 'Drifting start',
            berthingStart: 'Berthing start',
            draft: 'Draft',
            vesselCondition: 'Vessel Condition',
            distanceAndTimeSbyToFwe: 'Distance & Time (S/BY to F.W.E)',
            totalTime: 'Total time',
            actualPerformancePortToPort: 'Actual Performance (Port to Port)',
            inHarbourOrPort: 'In Harbour / Port',
            bunkerDelivery: 'Bunker Delivery',
            eosp: 'EOSP',
            fwe: 'F.W.E',
            sbyForDeparture: 'S/BY for Departure',
            cosp: 'COSP (=R/UP)',
            selectCountry: 'Select country',
            selectPort: 'Select port',
            destination: 'Destination',
            estimatedTimeOfArrival: 'Estimated time of arrival',
            cargoOperation: 'Cargo Operation',
            loading: 'Loading',
            unloading: 'Unloading',
            totalAmount: 'Total amount',
            time: 'Time',
            inputDetails: 'Input details',
            loadCondition: 'Load condition',
            selectAnOption: 'Select an option',
            vesselConditionAtDeparture: 'Vessel Condition at Departure',
            constant: 'Constant',
            gm: 'G.M',
            displacement: 'Displacement',
            lastReportToSbyForDeparture: 'Last report to S/BY for departure',
            receipt: 'Receipt',
            debunkering: 'De-Bunkering',
            receiving: 'Receiving',
            discharging: 'Discharging',
            consumptionAndConditionHarbourInPortInTotal: 'Consumption & Condition (Harbour/In Port in Total)',
            pilotStationDeparture: 'Pilot Station - Departure',
            requiredTimeOfArrival: 'Required time of arrival',
            estimatedArrivalDraft: 'Estimated arrival draft',
            distanceAndTimeRupEngine: 'Distance & Time (R/UP Engine)',
            sbyToRupInHarbour: 'S/BY to R/UP (In Harbour)',
            setRPMofME: 'Set RPM of M/E',
            meDailyFOCons: 'M/E Daily F.O Cons',
            meRPM: 'M/E RPM',
            budgetTransOceanPilotToPilot: 'Budget Trans Ocean (Pilot to Pilot)',
            consumptionAndConditionSbyToRup: 'Consumption & Condition - (S/BY to R/UP)',
            arrivalPort: 'Arrival Port',
            beforeArrival: 'Before Arrival',
            afterArrival: 'After Arrival',
            anchoringOutLimit: 'Anchoring (out limit)',
            anchoringInnerLimit: 'Anchoring (inner limit)',
            berthing: 'Berthing',
            bunkeringPort: 'Bunkering Port',
            status: 'Status',
            receivedBunkerDetail: 'Received Bunker Detail',
            uploadBunkerDeliveryNote: 'Upload Bunker Delivery Note',
            deliverdOil: 'Delivered Oil',
            productType: 'Product type',
            quantity: 'Quantity',
            densityAt15: 'Density at 15°C',
            viscosityAt15: 'Viscosity at 15°C',
            flashPointDMCC: 'Flash point DMCC',
            sulfurContent: 'Sulfur content',
            selectionOfOil: 'Selection of Oil',
            sampleSealingNo: 'Sample Sealing No.',
            marpol: 'MARPOL',
            ship: 'SHIP',
            barge: 'BARGE',
            alongside: 'Along-side',
            hoseConnection: 'Hose connection',
            pumpStart: 'Pump start',
            pumpStop: 'Pump stop',
            hoseDisconnection: 'Hose disconnection',
            awayside: 'Away-side',
            supplier: 'Supplier',
            purchaser: 'Purchaser',
            bargeName: 'Barge name',
            supplierName: 'Supplier name',
            address: 'Address',
            telephoneNumber: 'Telephone number',
            deliveredOil: 'Delivered Oil',
            sampleSeatingNo: 'Sample Seating No.',
            dragAndDrop: 'Drag and Drop',
            dropFileHere: 'Drop file here',
            or: ' or ',
            browseFile: 'browse file',
            inputRemarks: 'Input remarks',
            selectAnOption: "Select an option",
            saveDetails: "Save details",
            // Vessel Types
            vesselType: "Vessel type",
            bulkCarrier: "Bulk Carrier",
            gasCarrier: "Gas Carrier",
            tanker: "Tanker",
            container: "Container Ship",
            generalCargo: "General Cargo Ship",
            refrigeratedCargo: "Refrigerated Cargo Carrier",
            combiCarrier: "Combination Carrier",
            lngCarrier: "LNG Carrier",
            roroCargoVehicle: "Ro-Ro Cargo Ship (Vehicle Carrier)",
            roroCargo: "Ro-Ro Cargo Ship",
            roroPassenger: "Ro-Ro Passenger Ship",
            cruisePassenger: "Cruise Passenger Ship",
            // Cargo Unit
            cargoUnit: "Cargo unit",
            cargoM3: "M³",
            cargoMt: "MT",
            cargoTeu: "TEU",
            cargoCeu: "CEU",
            // Fuel option
            fuelOilOption: "Fuel oil option",
            mdo: "MDO",
            mgo: "MGO",
            lsfo: "LSFO",
            hfo: "HFO",
            lpgp: "LPG-Propane",
            lpgb: "LPG-Butbane",
            lng: "LNG",
            // Lubricate oil
            lubricateOilType: "Lubricate oil type",
            meCylinderOil: "M/E cylinder oil",
            meSystemOil: "M/E system oil",
            meSumpTank: "M/E sump tank",
            geSystemOil: "G/E system oil",
            tgSystemOil: "TG system oil",
            others: "Others",
            // Machinery type
            machineryType : "Machinery Type",
            mainEngine : "Main Engine",
            generatorEngine: "Generator Engine",
            boilerEngine: "Boiler",
            inertGasEngine: "Inert gas generator",
            // MyVessels Page
            vesselsDashboard: "Vessels Dashboard",
            totalVessels: "Total Vessels",
            ownedVessels: "Owned Vessels",
            chartVessels: "Chartered Vessels",
            etcVessels: "ETC",
            vesselList: "Vessel List",
            searchVessels: "Search vessels...",
            tableFilter: "Table Filter",
            exportCSV: "Export CSV",
            noVesselCreated: "No Vessel Created",
            // Vessel List Card
            type: "Type",
            flag: "Flag",
            shipSize: "Size",
            dwt: "Dwt",
            grossTonnage: "Gross Tonnage",
            // Vessel Card
            cubicCapacity: "Cubic Capacity",
            vesselAge: "Age",
            vesselOwnership: "Ownership",
            mainEngineImo: "Main Engine IMO",
            fuelType: "Fuel Type",
            percentActive: "% Active Days",
            percentIdle: "% Idle Days",
            reportedEedi: "Reported EEDI",
            bwts: "BWTS",
            scrubber: "Scrubber"       
        },
        // TODO: add korean translations here
        kr: {
            reporting: "리포트",
            myVessels: "나의 선박",
        },
    },
});

export default i18n;