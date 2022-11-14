<template>
    <div class="flex flex-col space-y-6 pb-6">
        <!-- Overview -->
        <NoonOverview></NoonOverview>

        <!-- Reporting Noon -->
        <DateTimeLatLong>{{ $t("reportingNoon") }}</DateTimeLatLong>

        <!-- Weather -->
        <Weather>{{ $t("weather") }}</Weather>

        <!-- Heavy Weather Condition -->
        <div class="grid lg:grid-cols-2 bg-white rounded-lg p-5 gap-4">
            <div class="col-span-2 flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("heavyWeatherCondition") }}</span>
            </div>
            <div class="grid col-span-2 lg:col-span-1 grid-cols-5 border">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("totalHours") }}</div>
                <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                    <input v-model="heavy_weather_data.heavy_weather_hours" @keypress="preventNaN($event, heavy_weather_data.heavy_weather_hours)" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>HRS</MiniUnitDisplay>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("distance") }}</div>
                <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                    <input v-model="heavy_weather_data.heavy_weather_dist" @keypress="preventNaN($event, heavy_weather_data.heavy_weather_dist)" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>NM</MiniUnitDisplay>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("fuelConsumption") }}</div>
                <div class="flex col-span-3 p-2 pl-4 bg-white">
                    <input v-model="heavy_weather_data.heavy_weather_consumption" @keypress="preventNaN($event, heavy_weather_data.heavy_weather_consumption)" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>MT</MiniUnitDisplay>
                </div>
            </div>
            <div></div>
            <div class="col-span-2 grid grid-cols-10 border">
                <div class="col-span-10 lg:col-span-2 text-blue-700 p-3 border-b lg:border-b-0 lg:border-r bg-gray-50 text-14">{{ $t("wind") }}</div>
                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-b lg:border-b-0 border-r bg-gray-50 text-14">{{ $t("direction") }}</div>
                <input v-model="heavy_weather_data.heavy_weather_wind_direction" @keypress="preventNaN($event, heavy_weather_data.heavy_weather_wind_direction)" placeholder="000 (Degrees)" class="col-span-6 lg:col-span-2 p-3 pl-4 border-b lg:border-b-0 lg:border-r bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-4 lg:col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("force") }}</div>
                <select v-model="hwc_wave_force" class="col-span-6 lg:col-span-3 p-3 text-14 focus:border-0" :class="hwc_wave_force === 'default' ? 'text-gray-400' : 'text-gray-700'">
                    <option selected disabled value="default">{{ $t("select") }}</option>
                    <option value="0">{{ $t("wind_force_0") }}</option>
                    <option value="1">{{ $t("wind_force_1") }}</option>
                    <option value="2">{{ $t("wind_force_2") }}</option>
                    <option value="3">{{ $t("wind_force_3") }}</option>
                    <option value="4">{{ $t("wind_force_4") }}</option>
                    <option value="5">{{ $t("wind_force_5") }}</option>
                    <option value="6">{{ $t("wind_force_6") }}</option>
                    <option value="7">{{ $t("wind_force_7") }}</option>
                    <option value="8">{{ $t("wind_force_8") }}</option>
                    <option value="9">{{ $t("wind_force_9") }}</option>
                    <option value="10">{{ $t("wind_force_10") }}</option>
                    <option value="11">{{ $t("wind_force_11") }}</option>
                    <option value="12">{{ $t("wind_force_12") }}</option>
                </select>
            </div>
            <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
                <div class="col-span-2 text-blue-700 p-3  bg-gray-50 text-14">{{ $t("maxWaveHeight") }}</div>
                <div class="flex col-span-3 p-2 pl-4 border-l bg-white">
                    <input v-model="heavy_weather_data.heavy_weather_max_wave_ht" @keypress="preventNaN($event, heavy_weather_data.heavy_weather_max_wave_ht)" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>M</MiniUnitDisplay>
                </div>
            </div>
            <div></div>
        </div>

        <!-- Distance & Time -->
        <div class="grid grid-cols-1 bg-white rounded-lg p-5 gap-4">
            <div class="flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("distanceAndTime") }}</span>
            </div>
            <div class="grid grid-cols-10">
                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14">{{ $t("time") }}</div>
                <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border-x border-t">
                    <input v-model="noon_data.hours_since_noon" @keypress="preventNaN($event, noon_data.hours_since_noon)" placeholder="0" class="w-24 bg-white text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>HRS</MiniUnitDisplay>
                </div>
                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-b lg:border-b-0 border-l lg:border-l-0 border-t bg-gray-50 text-14">{{ $t("total") }}</div>
                <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border-x border-y lg:border-b-0">
                    <input v-model="noon_data.hours_total" @keypress="preventNaN($event, noon_data.hours_total)" placeholder="0" class="w-24 bg-white text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>HRS</MiniUnitDisplay>
                </div>

                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14">{{ $t("distanceByObservation") }}</div>
                <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border-x border-t">
                    <input v-model="noon_data.distance_obs_since_noon" @keypress="preventNaN($event, noon_data.distance_obs_since_noon)" placeholder="0" class="w-24 bg-white text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>NM</MiniUnitDisplay>
                </div>
                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-b lg:border-b-0 border-l lg:border-l-0 border-t bg-gray-50 text-14">{{ $t("total") }}</div>
                <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border lg:border-b-0">
                    <input v-model="dt_dbo_total" @keypress="preventNaN($event, dt_dbo_total)" placeholder="0" class="w-24 bg-white text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>NM</MiniUnitDisplay>
                </div>

                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-t lg:border-y bg-gray-50 text-14">{{ $t("distanceByEngine") }}</div>
                <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border-x border-t lg:border">
                    <input v-model="noon_data.distance_eng_since_noon" @keypress="preventNaN($event, noon_data.distance_eng_since_noon)" placeholder="0" class="w-24 bg-white text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>NM</MiniUnitDisplay>
                </div>
                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-y border-l lg:border-l-0  bg-gray-50 text-14">{{ $t("total") }}</div>
                <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border">
                    <input v-model="noon_data.distance_eng_total" @keypress="preventNaN($event, noon_data.distance_eng_total)" placeholder="0" class="w-24 bg-white text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>NM</MiniUnitDisplay>
                </div>

                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-y lg:border-t-0 bg-gray-50 text-14">{{ $t("revolutionCounter") }}</div>
                <input v-model="noon_data.revolution_count" @keypress="preventNaN($event, noon_data.revolution_count)" placeholder="0" class="col-span-6 lg:col-span-3 p-3 pl-4 border-x border-y lg:border-t-0 bg-white text-14 text-gray-700 focus:outline-0"/>
            </div>
        </div>

        <!-- Performance -->
        <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4">
            <div class="col-span-2 flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("performance") }}</span>
            </div>
            <div class="col-span-2 lg:col-span-1">
                <div class="py-2 text-14">{{ $t("noonToNoon") }}</div>
                <div class="grid grid-cols-5 border">
                    <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("speed") }}</div>
                    <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                        <input v-model="noon_data.speed_since_noon" @keypress="preventNaN($event, noon_data.speed_since_noon)" placeholder="0" class="w-16 text-14 text-gray-700 focus:outline-0"/>
                        <MiniUnitDisplay>KNOTS</MiniUnitDisplay>
                    </div>
                    <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("rpm") }}</div>
                    <input v-model="noon_data.rpm_since_noon" @keypress="preventNaN($event, noon_data.rpm_since_noon)" placeholder="0" class="col-span-3 p-3 pl-4 border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("slip") }}</div>
                    <div class="flex col-span-3 p-2 pl-4 bg-white">
                        <input v-model="noon_data.slip_since_noon" @keypress="preventNaN($event, noon_data.slip_since_noon)" placeholder="0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                        <MiniUnitDisplay>%</MiniUnitDisplay>
                    </div>
                </div>
            </div>
            <div class="col-span-2 lg:col-span-1">
                <div class="py-2 text-14">{{ $t("currentVoyage") }}</div>
                <div class=" grid grid-cols-5 border">
                    <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("averageSpeed") }}</div>
                    <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                        <input v-model="noon_data.speed_avg" @keypress="preventNaN($event, noon_data.speed_avg)" placeholder="0" class="w-16 text-14 text-gray-700 focus:outline-0"/>
                        <MiniUnitDisplay>KNOTS</MiniUnitDisplay>
                    </div>
                    <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("averageRPM") }}</div>
                    <input v-model="noon_data.rpm_avg" @keypress="preventNaN($event, noon_data.rpm_avg)" placeholder="0" class="col-span-3 p-3 pl-4 border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("slip") }}</div>
                    <div class="flex col-span-3 p-2 pl-4 bg-white">
                        <input v-model="noon_data.slip_avg" @keypress="preventNaN($event, noon_data.slip_avg)" placeholder="0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                        <MiniUnitDisplay>%</MiniUnitDisplay>
                    </div>
                </div>
            </div>
        </div> 

        <!-- Consumption & Condition -->
        <div class="grid bg-white rounded-lg p-5 gap-4">
            <div class="flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("consumptionAndCondition") }}</span>
            </div>
            <div class="grid grid-cols-16">
                <div class="col-span-4 px-6 border-l border-t"></div>
                <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("me") }}</div>
                <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("ge") }}</div>
                <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("blr") }}</div>
                <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("igg") }}</div>
                <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-l bg-gray-50 text-14">{{ $t("totalConsumption") }}</div>
                <div class="col-span-2 flex items-center text-blue-700 px-3 py-3 h-16 border-t border-x bg-gray-50 text-14">{{ $t("remainOnBoard") }}</div>

                <div class="col-span-2 row-span-2 flex p-3 border-l border-t border-green-200 bg-green-100/50">
                    <div class="self-center text-green-800 text-12">{{ $t("fuelOilInMT") }}</div>
                </div>
                    <div class="col-span-2 text-green-800 p-3 border-t border-l border-green-100 bg-green-25 text-14">{{ $t("lsfo") }}</div>
                    <input v-model="lsfo_data.me_consumed" @keypress="preventNaN($event, lsfo_data.me_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="lsfo_data.aux_consumed" @keypress="preventNaN($event, lsfo_data.aux_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="lsfo_data.boiler_consumed" @keypress="preventNaN($event, lsfo_data.boiler_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="lsfo_data.gas_generator_consumed" @keypress="preventNaN($event, lsfo_data.gas_generator_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-l bg-gray-25 text-14">{{ cc_lsfo_total }}</div>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ cc_lsfo_rob }}</div>
                    
                    <div class="col-span-2 text-green-800 p-3 border-t border-l border-green-100 bg-green-25 text-14">{{ $t("mgo") }}</div>
                    <input v-model="mgo_data.me_consumed" @keypress="preventNaN($event, mgo_data.me_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="mgo_data.aux_consumed" @keypress="preventNaN($event, mgo_data.aux_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="mgo_data.boiler_consumed" @keypress="preventNaN($event, mgo_data.boiler_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="mgo_data.gas_generator_consumed" @keypress="preventNaN($event, mgo_data.gas_generator_consumed)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-l bg-gray-25 text-14">{{ cc_mgo_total }}</div>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ cc_mgo_rob }}</div>

                <div class="col-span-2 row-span-4 flex p-3 border-t border-l border-yellow-200 bg-yellow-100/50">
                    <div class="self-center text-yellow-800 text-12">{{ $t("lubricateOilInL") }}</div>
                </div>
                    <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("meCylinder") }}</div>
                        <input v-model="cc_mecylinder_total" @keypress="preventNaN($event, cc_mecylinder_total)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                        <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ cc_mecylinder_rob }}</div>
                    <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("meSystem") }}</div>
                        <input v-model="cc_mesystem_total" @keypress="preventNaN($event, cc_mesystem_total)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                        <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ cc_mesystem_rob }}</div>
                    <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("meSump") }}</div>
                        <input v-model="cc_mesump_total" @keypress="preventNaN($event, cc_mesump_total)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                        <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ cc_mesump_rob }}</div>
                    <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("geSystem") }}</div>
                        <input v-model="cc_gesystem_total" @keypress="preventNaN($event, cc_gesystem_total)" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                        <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ cc_gesystem_rob }}</div>

                <div class="col-span-2 row-span-2 flex p-3 border-y border-l border-blue-200 bg-sysblue-100/50">
                    <div class="self-center text-sysblue-800 text-12">{{ $t("freshWaterInTon") }}</div>
                </div>
                    <div class="col-span-5 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">{{ $t("consumed") }}</div>
                    <div class="col-span-5 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">{{ $t("generated") }}</div>
                    <div class="col-span-2 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">+/-</div>
                    <div class="col-span-2 text-sysblue-800 p-3 border-t border-x border-sysblue-100 bg-sysblue-25 text-14">{{ $t("rob") }}</div>
                    
                    <input v-model="freshwater_data.consumed" @keypress="preventNaN($event, freshwater_data.consumed)" placeholder="0" class="col-span-5 p-3 pl-4 border-y border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="freshwater_data.evaporated" @keypress="preventNaN($event, freshwater_data.evaporated)" placeholder="0" class="col-span-5 p-3 pl-4 border-y border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-gray-400 p-3 border-y border-l bg-gray-25 text-14">{{ cc_freshwater_change }}</div>
                    <div class="col-span-2 text-gray-400 p-3 border-y border-x bg-gray-25 text-14">{{ cc_freshwater_rob }}</div>
            </div>
            
            <div class="grid grid-cols-8 border">
                <div class="col-span-2 text-blue-700 p-3 bg-gray-50 text-14">{{ $t("correction") }}</div>
                <!-- TODO: make dynamic -->
                <select v-model="cc_correction_type" class="col-span-3 p-3 border-l text-14 focus:border-0" :class="cc_correction_type === 'default' ? 'text-gray-400' : 'text-gray-700'" >
                    <option selected disabled value="default">{{ $t("selectType") }}</option>
                    <option value="lsfo">{{ $t("lsfo") }}</option>
                    <option value="mgo">{{ $t("mgo") }}</option>
                    <option value="mecylinder">{{ $t("mecylinder") }}</option>
                    <option value="mesystem">{{ $t("mesystem") }}</option>
                    <option value="mesump">{{ $t("mesump") }}</option>
                    <option value="gesystem">{{ $t("gesystem") }}</option>
                </select>
                <div class="flex col-span-3 p-3 pl-4 border-l bg-white">
                    <input v-model="cc_correction" @keypress="preventNaN($event, cc_correction)" placeholder="00,000.00" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>MT</MiniUnitDisplay>
                </div>
                <div class="col-span-2 row-span-2 text-blue-700 p-3 border-t bg-gray-50 text-14">{{ $t("remarks") }}</div>
                <textarea v-model.trim="cc_remarks" placeholder="Input description here" class="col-span-6 row-span-2 border-t border-l p-3 pl-4 bg-white text-14 text-gray-700 focus:outline-0"></textarea>
            </div>
        </div>
        
        <!-- Stoppage or Reduction of RPM (at sea) -->
        <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4">
            <div class="col-span-2 flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("stoppageOrReductionOfRPM") }}</span>
            </div>
            <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
                <span class="col-span-2 text-blue-700 p-3 text-14 self-center border-b border-r">{{ $t("beginningDateAndTime") }}</span>
                <DatePicker 
                    v-model="stoppage.beginning" 
                    class="col-span-3 border-b" 
                    textInput :textInputOptions="textInputOptions"
                    :format="format"
                    :modelValue="string"
                    placeholder="Select date & time">
                    <template #input-icon>
                        <img src=""/>
                    </template>
                </DatePicker>
                <span class="col-span-2 text-blue-700 p-3 text-14 self-center border-r">{{ $t("endingDateAndTime") }}</span>
                <DatePicker 
                    v-model="stoppage.ending" 
                    class="col-span-3" 
                    textInput :textInputOptions="textInputOptions"
                    :format="format"
                    :modelValue="string"
                    placeholder="Select date & time">
                    <template #input-icon>
                        <img src=""/>
                    </template>
                </DatePicker>
            </div>
            <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
                <span class="col-span-2 text-blue-700 p-3 border-b text-14 self-center">{{ $t("duration") }}</span>
                <div class="flex col-span-3 p-2 pl-4 bg-white text-14 border-l border-b">
                    <input v-model="stoppage.duration" @keypress="preventNaN($event, stoppage.duration)" placeholder="0" class="w-24 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>HRS</MiniUnitDisplay>
                </div>
                <span class="col-span-2 text-blue-700 p-3 text-14">{{ $t("reducedRPM") }}</span>
                <div class="flex col-span-3 p-2 pl-4 bg-white text-14 border-l">
                    <input v-model="stoppage.reducedRPM" @keypress="preventNaN($event, stoppage.reducedRPM)" placeholder="0" class="w-24 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>RPM</MiniUnitDisplay>
                </div>
            </div>
            <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
                <span class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center">{{ $t("latitude") }}</span>
                <input v-model="stoppage_lat_degree" @keypress="preventNaN($event, stoppage_lat_degree)" placeholder="000 (Degree)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="stoppage_lat_minutes" @keypress="preventNaN($event, stoppage_lat_minutes)" placeholder="000 (Minutes)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <select v-model="stoppage_lat_dir" class="col-span-3 p-3 text-14 border-l focus:border-0 focus:outline-0" :class="lat_dir === 'default' ? 'text-gray-400' : 'text-gray-700'">
                    <option selected disabled value="default">{{ $t("southAndNorth") }}</option>
                    <option value="S">{{ $t("south") }}</option>
                    <option value="N">{{ $t("north") }}</option>
                </select>
            </div>
            <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
                <span class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center">{{ $t("longitude") }}</span>
                <input v-model="stoppage_long_degree" @keypress="preventNaN($event, stoppage_long_degree)" placeholder="000 (Degree)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="stoppage_long_minutes" @keypress="preventNaN($event, stoppage_long_minutes)" placeholder="000 (Minutes)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <select v-model="stoppage_long_dir" class="col-span-3 p-3 text-14 border-l focus:border-0" :class="long_dir === 'default' ? 'text-gray-400' : 'text-gray-700'">
                    <option selected disabled value="default">{{ $t("eastAndWest") }}</option>
                    <option value="E">{{ $t("east") }}</option>
                    <option value="W">{{ $t("west") }}</option>
                </select>
            </div>
            <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
                <div class="col-span-2 text-blue-700 p-3 bg-gray-50 text-14">{{ $t("reason") }}</div>
                <select v-model="stoppage.reason" class="col-span-3 p-3 border-l text-14 focus:border-0" :class="stoppage.reason === 'default' ? 'text-gray-400' : 'text-gray-700'" >
                    <option selected disabled value="default">{{ $t("select") }}</option>
                </select>
                <div class="col-span-2 row-span-2 text-blue-700 p-3 border-t bg-gray-50 text-14">{{ $t("remarks") }}</div>
                <textarea v-model.trim="stoppage.remarks" :placeholder="$t('inputRemarks')" class="col-span-3 row-span-2 border-t border-l p-3 pl-4 bg-white text-14 text-gray-700 focus:outline-0"></textarea>
            </div>
            <div></div>
        </div>


        <!-- Save and Send -->
        <div class="flex justify-end space-x-4">
            <CustomButton class="p-3 text-14" type="button" v-on:click="doSomething()">
                <!-- TODO: need alternate function for saving changes to backend -->
                <template v-slot:content>{{ $t("saveChanges") }}</template> 
            </CustomButton>
            <GradientButton class="p-3 text-14" type="button" v-on:click="sendReport()">
                <!-- TODO: need alternate function for saving changes to backend -->
                <template v-slot:content>{{ $t("sendReport") }}</template> 
            </GradientButton>
        </div>
    </div>
</template>


<script setup>
import { ref, reactive, computed } from 'vue'
import DatePicker from '@vuepic/vue-datepicker'
import GradientButton from '@/components/GradientButton.vue'
import CustomButton from '@/components/CustomButton.vue'
import MiniUnitDisplay from '@/components/MiniUnitDisplay.vue'
import { textInputOptions, format, preventNaN, convertDMSToDD } from '../../utils/helpers.js'

import NoonOverview from '@/components/ReportComponents/NoonOverview.vue'
import DateTimeLatLong from '@/components/ReportComponents/DateTimeLatLong.vue'
import Weather from '@/components/ReportComponents/Weather.vue'

const reporting_time_zone = ref('default'), reporting_summer_time = ref('default'), reporting_date_time = ref();

const lat_dir = ref('default'), lat_degree = ref(''), lat_minutes = ref('');
const long_dir = ref('default'), long_degree = ref(''), long_minutes = ref('');

const stoppage_lat_dir = ref('default'), stoppage_lat_degree = ref(''), stoppage_lat_minutes = ref('');
const stoppage_long_dir = ref('default'), stoppage_long_degree = ref(''), stoppage_long_minutes = ref('');


// below fields are missing from BE
const wave_dir = '', wave_force = ref('default'), wave_max_height = '';
const swell_dir = '', swell_scale = ref('default'), swell_max_height = '';

const hwc_wave_force = ref('default');

const dt_dbo_total = '';

// computed fields
const cc_lsfo_total = computed(() => +(Number(lsfo_data.me_consumed) + Number(lsfo_data.aux_consumed)
                                    + Number(lsfo_data.boiler_consumed) + Number(lsfo_data.gas_generator_consumed)));
const cc_lsfo_rob = computed(() => (staticValues.lsfoPrevROB - cc_lsfo_total.value));
const cc_mgo_total = computed(() => +(Number(mgo_data.me_consumed) + Number(mgo_data.aux_consumed) 
                                    + Number(mgo_data.boiler_consumed) + Number(mgo_data.gas_generator_consumed)).toFixed(2));;
const cc_mgo_rob = computed(() => (staticValues.mgoPrevROB - cc_mgo_total.value));

const cc_mecylinder_total = ref('');
const cc_mecylinder_rob = computed(() => +(staticValues.mecylPrevROB - cc_mecylinder_total.value).toFixed(2));
const cc_mesystem_total = ref('');
const cc_mesystem_rob = computed(() => +(staticValues.mesysPrevROB - cc_mesystem_total.value).toFixed(2));
const cc_mesump_total = ref('');
const cc_mesump_rob = computed(() => +(staticValues.mesumpPrevROB - cc_mesump_total.value).toFixed(2));
const cc_gesystem_total = ref('');
const cc_gesystem_rob = computed(() => +(staticValues.gesysPrevROB - cc_gesystem_total.value).toFixed(2));

const cc_freshwater_change = computed(() => +(freshwater_data.evaporated - freshwater_data.consumed).toFixed(2))
const cc_freshwater_rob = computed(() => (staticValues.freshwaterPrevROB + cc_freshwater_change.value))

const cc_correction_type = ref('default'), cc_correction = '', cc_remarks = '';

// TODO: retrieve from backend or generate as needed
// TODO: modify DateTime display to also display UTC time next to local time
const staticValues = {
    reportNo: '2',
    legNo: '2',
    voyageNo: '1',
    departurePort: 'Singapore, Singapore',
    departureDateTime: '2022.06.01 12:23 (LT)',
    destinationPort: 'Ras Tanura, Saudi Arabia',
    destinationDateTime: '2022.06.01 12:23 (LT)',
    distanceLeft: 2300,
    lsfoPrevROB: 200,
    mgoPrevROB: 200,
    mecylPrevROB: 200,
    mesysPrevROB: 200,
    mesumpPrevROB: 200,
    gesysPrevROB: 200,
    freshwaterPrevROB: 200
};

const getFuelCorrection = (fuel_type) => { // should return float
    switch(fuel_type) {
        case "LSFO":
            return cc_correction_type == "LSFO" ? cc_lsfo_total : "0.00";
            break;
        case "MGO":
            return cc_correction_type == "MGO" ? cc_mgo_total : "0.00";
            break;
    }
}

const getFuelCorrectionRemarks = (fuel_type) => {
    switch(fuel_type) {
        case "LSFO":
            return cc_correction_type == "LSFO" ? cc_remarks : "NIL";
            break;
        case "MGO":
            return cc_correction_type == "MGO" ? cc_remarks : "NIL";
            break;
    }
}

const convertReportDate = (date) => {
    // TODO: consider daylight savings in calculating UTC timezone offset + display

    const userOffset = parseInt(reporting_time_zone.value) * -60;
    const calcOffset = date.getTimezoneOffset()

    // calculate based on timezone input
    if (userOffset !== calcOffset) {
        date = new Date(date.getTime() + (3600000 * ((parseInt(reporting_time_zone.value)) + (calcOffset / 60))));
    } 

    console.log(date.toISOString())

    return date.toISOString()
}


// TODO: should be dynamic; get all fuels used from database and filter accordingly
const createBunkerData = () => { 
    return [lsfo_data, mgo_data];

    // for (const fuel in fuel_data) {
    //     bunkerDataList.push(fuel);
    // }
    // return bunkerDataList;
}

const lsfo_data = reactive({
    "fuel_type": "LSFO", 
    "rob": '', 
    "me_consumed": '',
    "aux_consumed": '',
    "boiler_consumed": '',
    "gas_generator_consumed": '',
    "total_consumed": '',
    "correction": getFuelCorrection("LSFO"),
    "remarks": getFuelCorrectionRemarks("LSFO")
});

const mgo_data = reactive({
    "fuel_type": "MGO", 
    "rob": '', 
    "me_consumed": '',
    "aux_consumed": '',
    "boiler_consumed": '',
    "gas_generator_consumed": '',
    "total_consumed": '',
    "correction": getFuelCorrection("MGO"),
    "remarks": getFuelCorrectionRemarks("MGO")
});

const noon_data = reactive({
    // TODO: total distance in voyage - distance by observation? or engine?
    "distance_to_go": '0', // staticValues.distanceLeft - noon_data.distance_obs_since_noon?
    "hours_since_noon": '', // Distance & Time: time
    "hours_total": '', // Distance & Time: time total
    "distance_obs_since_noon": '', // Distance & Time: distance by observation
    // distance observation total field missing from BE
    "distance_eng_since_noon": '', // Distance & Time: distance by engine
    "distance_eng_total": '', // Distance & Time: distance by engine total
    "revolution_count": '', // Distance & Time: revolution counter
    "speed_since_noon": '', // Performance: noon to noon speed
    "rpm_since_noon": '', // Performance: noon to noon rpm
    "slip_since_noon": '', // Performance: noon to noon slip
    "speed_avg": '', // Performance: current voyage average speed
    "rpm_avg": '', // Performance: current voyage average rpm
    "slip_avg": '' // Performance: current voyage slip     
});

const weather_data = reactive({
    "weather": "default", // Weather: sky
    "sea_state": "default", // Weather: visibility
    "wind_direction": '', // Weather: wind dir 
    "wind_speed": '', // Weather: wind max speed
    "beaufort": "default", // Weather: wind force
    "ice_condition": "default" // Weather: glacier ice condition
});

const heavy_weather_data = reactive({
    "heavy_weather_hours": '', // HWC: total hours
    "heavy_weather_dist": '', // HWC: distance (OBS)
    "heavy_weather_consumption": '', // HWC: fuel consumption
    "heavy_weather_wind_direction": '', // HWC: wind direction
    "heavy_weather_wind_speed": '0', // HWC: wind force; missing from BE
    "heavy_weather_max_wave_ht": '' // HWC: max wave height
});

const freshwater_data = reactive({
    "rob": '0', // staticValues.freshwaterPrevROB + cc_freshwater_change
    "consumed": '', // C&C: fresh water consumed
    "evaporated": '', // C&C: fresh water generated
    "correction": 0, // NOT NEEDED; remove from BE
    "remarks": "NIL" // NOT NEEDED; remove from BE
});

const stoppage = reactive({
    "beginning": '',
    "ending": '',
    "duration": '',
    "reducedRPM": '',
    "reason": 'default',
    "remarks": '',
});

const sendReport = async() => {
    // TODO: need to do form validation first

    const latDD = convertDMSToDD(parseFloat(lat_degree.value), parseFloat(lat_minutes.value), lat_dir.value);
    const longDD = convertDMSToDD(parseFloat(long_degree.value), parseFloat(long_minutes.value), long_dir.value);
    
    noon_data.distance_to_go = staticValues.distanceLeft - noon_data.distance_obs_since_noon
    freshwater_data.rob = staticValues.freshwaterPrevROB + cc_freshwater_change
    lsfo_data.rob = staticValues.lsfoPrevROB - lsfo_data.total_consumed

    const REPORT = {
        "report_type": "NOON", // FIXED
        "report_date": convertReportDate(reporting_date_time.value), // ISO-8601 standard
        "voyage": parseInt(staticValues.voyageNo), // TODO: need to fetch from BE
        "report_num": parseInt(staticValues.reportNo), // TODO: need to fetch from BE
        "cargo_presence": "EAST", // TODO: where to fetch and edit this value on the form?
        "summer_time": reporting_summer_time,
        "position": `SRID=4326;POINT (${latDD} ${longDD})`,
        "status": 1, // FIXED
        "noonreportatsea": noon_data,
        "weatherdata": weather_data,
        "heavyweatherdata": heavy_weather_data, // need to remove if hwc not toggled
        "bunkerdata_set": createBunkerData(),
        // TODO: need Lubricate oil table
        "freshwaterdata": freshwater_data
    }

    const response = await fetch('https://testapi.marinachain.io/marinanet/reports/new/', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(REPORT)
    });
    const data = await response.json();
    console.log(response);
}
</script>

<style lang="scss">
$dp__font_family: "Manrope";
$dp__font_size: 0.875rem;
$dp__border_radius: 0px;
$dp__input_padding: 12px 12px;
$dp__input_icon_padding: 14px;

@import 'node_modules/@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss';

.dp__theme_light {
   --dp-background-color: #ffffff;
   --dp-text-color: #212121;
   --dp-hover-color: #f3f3f3;
   --dp-hover-text-color: #0093B8;
   --dp-hover-icon-color: #0093B8;
   --dp-primary-color: #0093B8;
   --dp-primary-text-color: #f8f5f5;
   --dp-secondary-color: #c0c4cc;
   --dp-border-color: #FFFFFF;
   --dp-menu-border-color: #ddd;
   --dp-border-color-hover: #FFFFFF;
   --dp-disabled-color: #f6f6f6;
   --dp-scroll-bar-background: #f3f3f3;
   --dp-scroll-bar-color: #959595;
   --dp-success-color: #0093B8;
   --dp-success-color-disabled: #a3d9b1;
   --dp-icon-color: #959595;
   --dp-danger-color: #ff6f60;
   --dp-highlight-color: rgba(25, 118, 210, 0.1);
}
</style>