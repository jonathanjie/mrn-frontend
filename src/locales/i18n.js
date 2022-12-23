// import { list } from "postcss";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "en",
  messages: {
    en: {
      dir_16_placeholder: "16 winds vine (e.g. ENE)",
      dir_16_N: "N",
      dir_16_NNE: "NNE",
      dir_16_NE: "NE",
      dir_16_ENE: "ENE",
      dir_16_E: "E",
      dir_16_ESE: "ESE",
      dir_16_SE: "SE",
      dir_16_SSE: "SSE",
      dir_16_S: "S",
      dir_16_SSW: "SSW",
      dir_16_SW: "SW",
      dir_16_WSW: "WSW",
      dir_16_W: "W",
      dir_16_NWN: "NWN",
      dir_16_NW: "NW",
      dir_16_NNW: "NNW",
      dir_8_placeholder: "8 directions (e.g. NE)",
      dir_8_N: "N",
      dir_8_NE: "NE",
      dir_8_E: "E",
      dir_8_SE: "SE",
      dir_8_S: "S",
      dir_8_SW: "SW",
      dir_8_W: "W",
      dir_8_NW: "NW",
      actualPerformancePilotToPilot: "Actual Performance (Pilot to Pilot)",
      actualPerformancePortToPort: "Actual Performance (Port to Port)",
      addNewReport: "Add New Report",
      address: "Address",
      afterArrival: "After Arrival",
      airTemperature: "Air temperature",
      allReports: "All Reports",
      alongside: "Along-side",
      anchoringEndOutside: "Anchoring end (Outside of port limit)",
      anchoringEndInside: "Anchoring end (Inside of port limit)",
      anchoringInnerLimit: "Anchoring (inner limit)",
      anchoringOutLimit: "Anchoring (out limit)",
      anchoringStartInside: "Anchoring start (Inside of port limit)",
      anchoringStartOutside: "Anchoring start (Outside of port limit)",
      applied: "Applied",
      arrival: "Arrival",
      arrivalPort: "Arrival Port",
      averageRPM: "Average RPM",
      averageSlip: "Average slip",
      averageSpeed: "Average speed",
      awayside: "Away-side",
      ballast: "Ballast",
      barge: "BARGE",
      bargeName: "Barge name",
      barometer: "Barometer",
      beaufort: "Beaufort",
      beforeArrival: "Before Arrival",
      beginningDateAndTime: "Beginning date & time",
      berthing: "Berthing",
      berthingStart: "Berthing start",
      blr: "BLR",
      boiler: "Boiler",
      boilerEngine: "Boiler",
      browseFile: "browse file",
      budgetTransOceanPilotToPilot: "Budget Trans Ocean (Pilot to Pilot)",
      bulkCarrier: "Bulk Carrier",
      bunkerDelivery: "Bunker Delivery",
      bunkeringDebunkering: "Bunkering/De-bunkering",
      bunkeringPort: "Bunkering Port",
      cancel: "Cancel",
      cancelled: "Cancelled",
      cargoCeu: "CEU",
      cargoLD: "Cargo L/D",
      cargoM3: "M³",
      cargoMt: "MT",
      cargoOperation: "Cargo Operation",
      cargoOperationBerth: "Cargo operation (Berth)",
      cargoOperationSTSSTB: "Cargo operation (STS, STB)",
      cargoTeu: "TEU",
      cargoUnit: "Cargo unit",
      clickOnCreateNewVoyageAboveToBegin:
        "Click on 'Create New Voyage' above to begin",
      coastalWaterAnchoringDrifting: "Coastal water (Anchoring, Drifting)",
      combiCarrier: "Combination Carrier",
      constant: "Constant",
      consumed: "Consumed",
      consumptionAndCondition: "Consumption & Condition",
      consumptionAndConditionHarbourInPortInTotal:
        "Consumption & Condition (Harbour/In Port in Total)",
      consumptionAndConditionLastReportToEventNoon:
        "Consumption & Condition (Last Report to Event/Noon)",
      consumptionAndConditionLastReportToSby:
        "Consumption & Condition (Last Report to S/BY)",
      consumptionAndConditionNoonToNoon:
        "Consumption & Condition (Noon to Noon)",
      consumptionAndConditionNoonToSby:
        "Consumption & Condition (Noon to S/BY)",
      consumptionAndConditionSbyToFwe:
        "Consumption & Condition (S/BY to F.W.E)",
      consumptionAndConditionSbyToRup: "Consumption & Condition (S/BY to R/UP)",
      container: "Container Ship",
      correction: "Correction",
      cosp: "COSP or R/UP",
      createNewVoyage: "Create New Voyage",
      crewChange: "Crew change",
      cruisePassenger: "Cruise Passenger Ship",
      currentVoyage: "Current Voyage",
      dateAndTime: "Date & time",
      dateOfReport: "Date of report",
      debunkering: "De-Bunkering",
      deliverdOil: "Delivered Oil",
      deliveredOil: "Delivered Oil",
      densityAt15: "Density at 15°C",
      departure: "Departure",
      departureNo: "Departure No.",
      departureNoLegNo: "Departure no. (Leg no.)",
      departurePort: "Departure Port",
      departurePortName: "Departure port name",
      destination: "Destination",
      destinationPort: "Destination Port",
      destinationPortName: "Destination port name",
      direction: "Direction",
      discharging: "Discharging",
      displacement: "Displacement",
      distance: "Distance",
      distanceAndTime: "Distance & Time",
      distanceAndTimeNoonToSby: "Distance & Time (Noon to S/BY)",
      distanceAndTimeSbyToRup: "Distance & Time (S/BY to R/UP)",
      distanceAndTimeSbyToFwe: "Distance & Time (S/BY to F.W.E)",
      distanceByEngine: "Distance by engine",
      distanceByObservation: "Distance by observation",
      distanceLeft: "Distance Left",
      distanceOBS: "Distance (OBS)",
      distanceToGo: "Distance to go",
      distanceTravelled: "Distance travelled",
      douglasScale: "Douglas scale",
      draft: "Draft",
      dragAndDrop: "Drag and Drop",
      driftingStart: "Drifting start",
      driftingEnd: "Drifting end",
      dropFileHere: "Drop file here",
      dry: "Dry",
      dryDocking: "Dry docking",
      duration: "Duration",
      dwt: "DWT",
      east: "East",
      eastNorthEast: "East-Northeast",
      eastSouthEast: "East-Southeast",
      eastAndWest: "East/West",
      eastbound: "Eastbound",
      editDetails: "Edit details",
      endingDateAndTime: "Ending date & time",
      eosp: "EOSP or S/BY",
      estDateAndTime: "Est. date & time",
      estimatedArrivalDraft: "Estimated arrival draft",
      estimatedTimeOfArrival: "Estimated time of arrival",
      etcVessels: "ETC",
      event: "Event",
      exportCSV: "Export CSV",
      fallbackContent: "Fallback Content",
      finishWithEngine: "Finish With Engine",
      flag: "Flag",
      flashPoint: "Flash point",
      force: "Force",
      freshWaterInTon: "Fresh Water (TON)",
      fuelConsumption: "Fuel consumption",
      fuelOil: "Fuel oil",
      fuelOilInMT: "Fuel Oil (MT)",
      fuelOilOption: "Fuel oil option",
      fuelOption: "Fuel option",
      fwe: "F.W.E",
      gasCarrier: "Gas Carrier",
      ge: "G/E",
      geSystem: "G/E System",
      geSystemOil: "G/E system oil",
      generalCargo: "General Cargo Ship",
      generalInfo: "General Info",
      generated: "Generated",
      generatorEngine: "Generator Engine",
      gesystem: "G/E System",
      getShips: "Get Ships",
      getToken: "Get Token",
      glacierIceCondition: "Glacier ice condition",
      glacier_ext: "EXT",
      glacier_high: "HIGH",
      glacier_low: "LOW",
      glacier_mod: "MOD",
      gm: "G.M",
      heavyWeatherCondition: "Heavy Weather Condition",
      hfo: "HFO",
      hoseConnection: "Hose connection",
      hoseDisconnection: "Hose disconnection",
      igg: "IGG",
      imoNo: "IMO No.",
      inHarbourOrPort: "In Harbour / Port",
      inertGasEngine: "Inert gas generator",
      inPortBerthingShiftingDryDocking:
        "In port (Berthing, Shifting, Dry Docking)",
      inputDescriptionHere: "Input description here",
      inputDetails: "Input details",
      inputCountryCode: "Input Country Code (e.g. KR)",
      inputLocode2: "Input LOCODE (e.g. KR)",
      inputLocode3: "Input LOCODE (e.g. PUS)",
      inputName: "Input name",
      inputOtherPlannedOperation: "Input other planned operation",
      inputRemarks: "Input remarks",
      laden: "Laden",
      latitude: "Latitude",
      legNo: "Leg no.",
      lng: "LNG",
      lngCarrier: "LNG Carrier",
      loadCondition: "Load condition",
      loading: "Loading",
      loadingCondition: "Loading condition",
      logOut: "Log out",
      longitude: "Longitude",
      lpgb: "LPG-Butbane",
      lpgp: "LPG-Propane",
      lsfo: "LSFO",
      lubricatingOil: "Lubricating oil",
      lubricatingOilInL: "Lubricating Oil (L)",
      lubricatingOilType: "Lubricating oil type",
      machineryType: "Machinery Type",
      mainEngine: "Main Engine",
      marpol: "MARPOL",
      maxHeight: "Max. Height",
      maxSpeed: "Max. Speed",
      maxWaveHeight: "Max. wave height",
      mdo: "MDO",
      me: "M/E",
      meCylinder: "M/E Cylinder",
      meCylinderOil: "M/E cylinder oil",
      meDailyFOCons: "M/E Daily F.O Cons",
      meRPM: "M/E RPM",
      meSump: "M/E Sump",
      meSumpTank: "M/E sump tank",
      meSystem: "M/E System",
      meSystemOil: "M/E system oil",
      mecylinder: "M/E Cylinder",
      mefoConsumptionPerDay: "M/E F.O. Consumption/day",
      mesump: "M/E Sump",
      mesystem: "M/E System",
      mgo: "MGO",
      myVessels: "My Vessels",
      na: "N/A",
      name: "Name",
      ne: "N.E.",
      noVesselCreated: "No Vessel Created",
      noVoyageCreated: "No Voyage Created",
      noon: "Noon",
      noonInHarbourPort: "Noon in Harbour/Port",
      noonToNoon: "Noon to Noon",
      north: "North",
      northEast: "Northeast",
      northWest: "Northwest",
      northNorthEast: "North-Northeast",
      northNorthWest: "North-Northwest",
      notApplied: "Not Applied",
      operationAtCurrentLocation: "Operation (at current location)",
      operations: "Operations",
      or: " or ",
      others: "Others",
      overview: "Overview",
      performance: "Performance",
      pilotStationArrival: "Pilot Station - Arrival",
      pilotStationDeparture: "Pilot Station - Departure",
      plannedOperation: "Planned operation",
      pleaseLogIn: "Please log in",
      pleaseSelectDateAndTime: "Please select date & time",
      pleaseSelectOne: "Please select one",
      portName: "Port name",
      proceed: "Proceed",
      productType: "Product type",
      pumpStart: "Pump start",
      pumpStop: "Pump stop",
      purchaser: "Purchaser",
      quantity: "Quantity",
      reason: "Reason",
      receipt: "Receipt",
      receivedBunkerDetail: "Received Bunker Detail",
      receiving: "Receiving",
      receivingProvisionSpareParts: "Receiving provision / Spare parts",
      reducedRPM: "Reduced RPM",
      refrigeratedCargo: "Refrigerated Cargo Carrier",
      remainOnBoard: "Remain on Board",
      remarks: "Remarks",
      remarksOfChanges: "Remarks of changes",
      report: "Report",
      reportNo: "Report no.",
      reporting: "Reporting",
      reportingDateAndTime: "Reporting date & time",
      reportingNoon: "Reporting Noon",
      reportingTimeZone: "Reporting time zone",
      reportSubmission: "Report submission",
      requiredTimeOfArrival: "Required time of arrival",
      revolutionCounter: "Revolution counter",
      rob: "ROB",
      roroCargo: "Ro-Ro Cargo Ship",
      roroCargoVehicle: "Ro-Ro Cargo Ship (Vehicle Carrier)",
      roroPassenger: "Ro-Ro Passenger Ship",
      rpm: "RPM",
      rupEngine: "R/UP Engine",
      sailingAtSea: "SAILING AT SEA",
      sampleSealingNo: "Sample Sealing No.",
      sampleSeatingNo: "Sample Seating No.",
      save: "Save",
      saveChanges: "Save changes",
      saveDetails: "Save details",
      sby: "S/BY",
      sbyForArrival: "S/BY for Arrival",
      sbyToRupInHarbour: "S/BY to R/UP (In Harbour)",
      scale: "Scale",
      searchVessels: "Search vessels...",
      seaWaterTemperature: "Sea water temperature",
      select: "Select",
      selectAnOption: "Select an option",
      selectCase: "Select case",
      selectCountry: "Select country",
      selectDateAndTime: "Select date & time",
      selectDepartureType: "Select departure type",
      selectEvent: "Select event",
      selectPort: "Select port",
      selectTimeZone: "Select time zone",
      selectType: "Select type",
      selectOil: "Select oil",
      selectOilType: "Select oil type",
      sendReport: "Send report",
      setRPMofME: "Set RPM of M/E",
      specificGravityAt15: "Specific Gravity at 15°C",
      shiftingStart: "Shifting start",
      shiftingEnd: "Shifting end",
      ship: "SHIP",
      shipOwner: "Ship Owner",
      shipSize: "Size",
      signIn: "Sign In",
      signInToYourAccount: "Sign in to your account",
      slip: "Slip",
      south: "South",
      southEast: "Southeast",
      southWest: "Southwest",
      southSouthEast: "South-Southeast",
      southSouthWest: "South-Southwest",
      southAndNorth: "South/North",
      speed: "Speed",
      status: "Status",
      stoppageOrReductionOfRPM: "Stoppage or Reduction of RPM (at sea)",
      submitNewReport: "Submit New Report",
      submitted: "Submitted",
      sulfurContent: "Sulfur content",
      supplier: "Supplier",
      supplierName: "Supplier name",
      survey: "Survey",
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
      tableFilter: "Table Filter",
      tanker: "Tanker",
      telephoneNumber: "Telephone number",
      tgSystemOil: "TG system oil",
      time: "Time",
      timeZone: "Time zone",
      total: "Total",
      totalAmount: "Total amount",
      totalConsumption: "Total consumption",
      totalConsumptionAtSea: "Total consumption (at sea)",
      totalConsumptionPilotToPilot: "Total Consumption (Pilot to Pilot)",
      totalConsumptionPortToPort: "Total Consumption (Port to Port)",
      totalDistanceByOBS: "Total distance by OBS",
      totalHours: "Total hours",
      totalSailingTime: "Total sailing time",
      totalTime: "Total time",
      totalVessels: "Total Vessels",
      type: "Type",
      typeToSearch: "Type to search...",
      unknown: "Unknown",
      unloading: "Unloading",
      uploadBunkerDeliveryNote: "Upload Bunker Delivery Note",
      vesselCondition: "Vessel Condition",
      vesselConditionAtDeparture: "Vessel Condition at Departure",
      vesselList: "Vessel List",
      vesselName: "Vessel Name",
      vesselType: "Vessel type",
      vesselsDashboard: "Vessels Dashboard",
      viewJourney: "View Journey",
      viscosity: "Viscosity",
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
      voyageNo: "Voyage no.",
      voyageNoCaps: "VOYAGE NO",
      waiting: "Waiting",
      wave: "Wave",
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
      weather: "Weather",
      weather_b: "b: Blue sky (Cloud 0~2)",
      weather_bc: "bc: Fine but Cloudy (Cloud 3~7)",
      weather_c: "c: Cloudy (Cloud 8~10)",
      weather_d: "d: Drizzling rain",
      weather_f: "f: Fog",
      weather_g: "g: Gloom",
      weather_h: "h: Hail",
      weather_l: "l: Lightning",
      weather_m: "m: Mist",
      weather_o: "o: Overcast (Cloud 10)",
      weather_p: "p: Passing showers",
      weather_q: "q: Squalls",
      weather_r: "r: Rain",
      weather_s: "s: Snow",
      weather_t: "t: Thunder",
      weather_u: "u: Ugly threatening wr.",
      weather_v: "v: Visibility",
      weather_w: "w: Dew",
      weather_z: "z: Haze",
      weatherNoonToSby: "Weather (Noon to S/BY)",
      weatherNotation: "Weather notation",
      welcomeBack: "Welcome back! Please login with the button below.",
      wet: "Wet",
      west: "West",
      westbound: "Westbound",
      westSouthWest: "West-Southwest",
      westNorthWest: "West-Northwest",
      wind: "Wind",
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
      inPortVessels: "In Port",
      sailingVessels: "Sailing",
      bunkering: "Bunkering",
      uploadedStatus: "Uploaded on",
      errorStatus: "Error",
      pendingStatus: "Pending",
      backToMyVessel: "Back To My Vessel",
      vesselSpec: "Vessel Specifications",
      uploadedReports: "Uploaded Reports",
      capacity: "Capacity",
      previousCII: "Previous CII Grade",
      eexiGrade: "EEXI Grade",
      estimatedArrivalTime: "Estimated Time of Arrival:",
      knots: "Knots",
      focLabel: "FOC/day",
      nauticalMiles: "NM",
      weekly: "Weekly",
      voyage: "Voyage",
      portCalls: "Port Calls",
      reminders: "Reminders",
      imoNumber: "IMO number",
      owner: "Owner",
      commercialManager: "Commercial manager",
      techManager: "Technical manager",
      shipType: "Ship's type",
      yard: "Yard",
      dateOfDelivery: "Date of delivery",
      portOfRegistry: "Port of registry",
      callSign: "Call sign",
      hullNo: "Hull no.",
      class: "Class",
      nextSpecialSurvey: "Next special survey",
      dryDock: "Dry Dock",
      fullDisplacement: "Full displacement",
      cargoCapacity: "Cargo capacity",
      lightShipWeight: "Lightship weight",
      cruisingRange: "Cruising range",
      fuelDailyConsumption: "Fuel daily consumption",
      propellerPitch: "Propeller Pitch",
      engineProblem: "Engine problem",
      accident: "Accident",
      collision: "Collision",
      grounding: "Grounding",
      oilSpill: "Oil spill",
      additionalRemarks: "Additional remarks",
      other: "Other",
      fwd: "FWD",
      mid: "MID",
      aft: "AFT",
    },
    // Janky way to sort the list
    // 1. console.log the list as a Object, it will be sorted alpabetically by the browser
    // 2. Copy the output onto an empty JS file and Format document, VS Code will add in ";"
    // 3. Replace all ";" with ","
    // TODO: add korean translations here
    kr: {
      reporting: "리포트",
      myVessels: "나의 선박",
    },
  },
});
export default i18n;
