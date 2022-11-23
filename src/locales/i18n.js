import { list } from "postcss";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "en",
  messages: {
    en: {
      actualPerformanceAtSea: "Actual Performance at Sea",
      actualPerformancePortToPort: "Actual Performance (Port to Port)",
      addNewReport: "Add New Report",
      address: "Address",
      afterArrival: "After Arrival",
      allReports: "All Reports",
      alongside: "Along-side",
      anchoringInnerLimit: "Anchoring (inner limit)",
      anchoringOutLimit: "Anchoring (out limit)",
      anchoringStartInside: "Anchoring start (Inside of port limit)",
      anchoringStartOutside: "Anchoring start (Outside of port limit)",
      applied: "Applied",
      arrival: "Arrival",
      arrivalPort: "Arrival Port",
      averageRPM: "Average RPM",
      averageSpeed: "Average Speed",
      awayside: "Away-side",
      ballast: "Ballast",
      barge: "BARGE",
      bargeName: "Barge name",
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
      bwts: "BWTS",
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
      chartVessels: "Chartered Vessels",
      clickOnCreateNewVoyageAboveToBegin:
        "Click on 'Create New Voyage' above to begin",
      coastalWaterAnchoringDrifting: 'Coastal water (Anchoring, Drifting)',
      combiCarrier: "Combination Carrier",
      constant: "Constant",
      consumed: "Consumed",
      consumptionAndCondition: "Consumption & Condition",
      consumptionAndConditionHarbourInPortInTotal:
        "Consumption & Condition (Harbour/In Port in Total)",
      consumptionAndConditionLastReportEventNoon: 
        'Consumption & Condition (Last Report - Event/Noon)',
      consumptionAndConditionNoonToNoon:
        "Consumption & Condition (Noon to Noon)",
      consumptionAndConditionNoonToSby: "Consumption & Condition (Noon - S/BY)",
      consumptionAndConditionSbyToFwe: "Consumption & Condition (S/BY - F.W.E)",
      consumptionAndConditionSbyToRup:
        "Consumption & Condition - (S/BY to R/UP)",
      container: "Container Ship",
      correction: "Correction",
      cosp: "COSP (=R/UP)",
      createNewVoyage: "Create New Voyage",
      crewChange: "Crew change",
      cruisePassenger: "Cruise Passenger Ship",
      cubicCapacity: "Cubic Capacity",
      currentVoyage: "Current Voyage",
      dateAndTime: "Date & time",
      dateOfSubmission: "Date of Submission",
      debunkering: "De-Bunkering",
      deliverdOil: "Delivered Oil",
      deliveredOil: "Delivered Oil",
      densityAt15: "Density at 15°C",
      departure: "Departure",
      departureNo: "Departure No.",
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
      distanceAndTimeRupEngine: "Distance & Time (R/UP Engine)",
      distanceAndTimeSbyToFwe: "Distance & Time (S/BY to F.W.E)",
      distanceByEngine: "Distance by engine",
      distanceByObservation: "Distance by observation",
      distanceLeft: "Distance Left",
      distanceTravelled: "Distance travelled",
      draft: "Draft",
      dragAndDrop: "Drag and Drop",
      driftingStart: "Drifting start",
      dropFileHere: "Drop file here",
      dryDocking: "Dry docking",
      duration: "Duration",
      dwt: "Dwt",
      east: "East",
      eastAndWest: "East/West",
      endingDateAndTime: "Ending date & time",
      eosp: "EOSP",
      estDateAndTime: "Est. date & time",
      estimatedArrivalDraft: "Estimated arrival draft",
      estimatedTimeOfArrival: "Estimated time of arrival",
      etcVessels: "ETC",
      event: "Event",
      exportCSV: "Export CSV",
      fallbackContent: "Fallback Content",
      finishWithEngine: "Finish With Engine",
      flag: "Flag",
      flashPointDMCC: "Flash point DMCC",
      force: "Force",
      freshWaterInTon: "Fresh Water (TON)",
      fuelConsumption: "Fuel consumption",
      fuelOilInMT: "Fuel Oil (MT)",
      fuelOilOption: "Fuel oil option",
      fuelOption: "Fuel option",
      fuelType: "Fuel Type",
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
      glacierIceCondition: "Glacier Ice Condition",
      glacier_ext: "EXT",
      glacier_high: "HIGH",
      glacier_low: "LOW",
      glacier_mod: "MOD",
      gm: "G.M",
      grossTonnage: "Gross Tonnage",
      heavyWeatherCondition: "Heavy Weather Condition",
      hfo: "HFO",
      hoseConnection: "Hose connection",
      hoseDisconnection: "Hose disconnection",
      igg: "IGG",
      imoNo: "IMO No.",
      inHarbourOrPort: "In Harbour / Port",
      inertGasEngine: "Inert gas generator",
      inPortBerthingShiftingDryDocking: 'In port (Berthing, Shifting, Dry Docking)',
      inputDetails: "Input details",
      inputName: "Input name",
      inputOtherPlannedOperation: "Input other planned operation",
      inputRemarks: "Input remarks",
      lastReportToSbyForDeparture: "Last report to S/BY for departure",
      latitude: "Latitude",
      legNo: "Leg No.",
      lng: "LNG",
      lngCarrier: "LNG Carrier",
      loadCondition: "Load condition",
      loading: "Loading",
      logOut: "Log out",
      longitude: "Longitude",
      lpgb: "LPG-Butbane",
      lpgp: "LPG-Propane",
      lsfo: "LSFO",
      lubricateOilInL: "Lubricate Oil (L)",
      lubricateOilType: "Lubricate oil type",
      machineryType: "Machinery Type",
      mainEngine: "Main Engine",
      mainEngineImo: "Main Engine IMO",
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
      notApplied: "Not Applied",
      operationAtCurrentLocation: "Operation (at current location)",
      operations: "Operations",
      or: " or ",
      others: "Others",
      overview: "Overview",
      ownedVessels: "Owned Vessels",
      percentActive: "% Active Days",
      percentIdle: "% Idle Days",
      performance: "Performance",
      pilotStationArrival: "Pilot Station - Arrival",
      pilotStationDeparture: "Pilot Station - Departure",
      plannedOperation: "Planned operation",
      pleaseLogIn: "Please log in",
      pleaseSelectDateAndTime: "Please select date & time",
      pleaseSelectOne: "Please select one",
      portName: "Port name",
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
      report: "Report",
      reportNo: "Report No.",
      reportedEedi: "Reported EEDI",
      reporting: "Reporting",
      reportingNoon: "Reporting Noon",
      requiredTimeOfArrival: "Required time of arrival",
      revolutionCounter: "Revolution counter",
      rob: "ROB",
      roroCargo: "Ro-Ro Cargo Ship",
      roroCargoVehicle: "Ro-Ro Cargo Ship (Vehicle Carrier)",
      roroPassenger: "Ro-Ro Passenger Ship",
      rpm: "RPM",
      sailingAtSea: "SAILING AT SEA",
      sampleSealingNo: "Sample Sealing No.",
      sampleSeatingNo: "Sample Seating No.",
      save: "Save",
      saveChanges: "Save changes",
      saveDetails: "Save details",
      sbyForDeparture: "S/BY for Departure",
      sbyForEOSP: "S/BY for EOSP",
      sbyToRupInHarbour: "S/BY to R/UP (In Harbour)",
      scale: "Scale",
      scrubber: "Scrubber",
      searchVessels: "Search vessels...",
      select: "Select",
      selectAnOption: "Select an option",
      selectCase: "Select case",
      selectCountry: "Select country",
      selectDateAndTime: "Select date & time",
      selectDepartureType: "Select departure type",
      selectEvent: "Select event",
      selectPort: "Select port",
      selectSummerTime: "Select summer time",
      selectTimeZone: "Select time zone",
      selectType: "Select type",
      selectionOfOil: "Selection of Oil",
      sendReport: "Send report",
      setRPMofME: "Set RPM of M/E",
      ship: "SHIP",
      shipOwner: "Ship Owner",
      shipSize: "Size",
      signIn: "Sign In",
      signInToYourAccount: "Sign in to your account",
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
      slip: "SLIP",
      south: "South",
      southAndNorth: "South/North",
      speed: "Speed",
      status: "Status",
      stoppageOrReductionOfRPM: "Stoppage or Reduction of RPM (at sea)",
      submitNewReport: "Submit New Report",
      submitted: "Submitted",
      sulfurContent: "Sulfur content",
      summerTime: "Summer time",
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
      vesselAge: "Age",
      vesselCondition: "Vessel Condition",
      vesselConditionAtDeparture: "Vessel Condition at Departure",
      vesselList: "Vessel List",
      vesselName: "Vessel Name",
      vesselOwnership: "Ownership",
      vesselType: "Vessel type",
      vesselsDashboard: "Vessels Dashboard",
      viewJourney: "View Journey",
      viscosityAt15: "Viscosity at 15°C",
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
      voyageNo: "Voyage No.",
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
      weatherNoonToSby: "Weather (Noon to S/BY)",
      welcomeBack: "Welcome back! Please login with the button below.",
      west: "West",
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
    },
    // Janky way to sort the list
    // 1. console.log the list as a Object, it will be sorted alpabetically by the browser
    // 2. Copy the output onto an empty JS file and Format document, VS Code will add in ";"
    // 3. Replace all ";" with ","
    // TODO: add korean translations here
    kr: {
      reporting: "리포트",
      myVessels: "나의 선박",
>>>>>>> master
    },
  },
});
export default i18n;