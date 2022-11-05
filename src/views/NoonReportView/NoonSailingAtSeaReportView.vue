<template>
    <div class="flex flex-col space-y-6 pb-6">
        <!-- Overview -->
        <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4">
            <div class="col-span-2 flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("overview") }}</span>
            </div>
            <div class="col-span-2 xl:col-span-1 grid grid-cols-5 border bg-gray-50 text-14">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b">{{ $t("reportNo") }}</div>
                <input class="col-span-3 p-3 border-b text-gray-700 bg-gray-50" disabled v-model="staticValues.reportNo"/>
                <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("departureNo") }}</div>
                <input class="col-span-3 p-3 text-gray-700 bg-gray-50" disabled v-model="staticValues.departureNo"/>
            </div>
            <div class="col-span-2 xl:col-span-1 grid grid-cols-5 row-span-1 bg-gray-50 text-14">
                <div class="col-span-2 text-blue-700 p-3 border-l border-y">{{ $t("voyageNo") }}</div>
                <div class="flex col-span-3 p-3 border">
                    <input class="text-gray-700 bg-gray-50 w-12" disabled v-model="staticValues.voyageNo"/>
                    <!-- value here (e.g. Ballast) should be dynamic -->
                    <MiniUnitDisplay class="ml-0 mr-auto">{{ $t("ballast") }}</MiniUnitDisplay>
                </div>
                <!-- dummy div/input for formatting -->
                <div class="hidden xl:block bg-white col-span-2 row-span-1"></div>
                <input class="hidden xl:block bg-white col-span-3 p-3" disabled/> 
            </div>
            <div class="col-span-2 xl:col-span-1 items-center mt-2">
                <div class="flex items-center">
                    <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                    <span class="text-blue-700">{{ $t("departurePort") }}</span>
                </div>
                <div class="grid grid-cols-5 border bg-gray-50 text-14 mt-4">
                    <div class="col-span-2 text-blue-700 p-3 border-r border-b">{{ $t("name") }}</div>
                    <input class="col-span-3 p-3 border-b text-gray-700 bg-gray-50" disabled v-model="staticValues.departurePort"/>
                    <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("dateAndTime") }}</div>
                    <input class="col-span-3 p-3 text-gray-700 bg-gray-50" disabled v-model="staticValues.departureDateTime"/>
                </div>
            </div>

            <div class="col-span-2 xl:col-span-1 mt-2">
                <div class="flex items-center">
                    <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                    <span class="text-blue-700">{{ $t("destinationPort") }}</span>
                </div>
                <div class="grid grid-cols-5 border bg-gray-50 text-14 mt-4">
                    <div class="col-span-2 text-blue-700 p-3 border-r border-b">{{ $t("name") }}</div>
                    <div class="col-span-3 p-3 border-b flex" :class="dpEditable?'bg-white':'bg-gray-50'">
                        <input 
                            class="text-gray-700" 
                            :disabled="!dpEditable" 
                            v-model="staticValues.destinationPort"/>
                        <button @click="toggleDP" class="ml-auto">
                            <img src="@/assets/icons/edit.svg"/>
                        </button>
                    </div>
                    <div class="col-span-2 text-blue-700 p-3 border-r">{{ $t("estDateAndTime") }}</div>
                    <div class="col-span-3 p-3 flex" :class="ddtEditable?'bg-white':'bg-gray-50'">
                        <input 
                            class="text-gray-700" 
                            :disabled="!ddtEditable" 
                            v-model="staticValues.destinationDateTime"/>
                        <button @click="toggleDDT" class="ml-auto">
                            <img src="@/assets/icons/edit.svg"/>
                        </button>
                    </div>
                </div>
            </div>
            
            
        </div>

        <!-- Reporting Noon -->
        <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4">
            <div class="col-span-2 flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("reportingNoon") }}</span>
            </div>
            <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("timeZone") }}</div>
                <select v-model="reporting_time_zone" class="col-span-3 p-3 border-b text-gray-400 text-14 focus:border-0">
                    <option selected disabled value="default">{{ $t("selectTimeZone") }}</option>
                    <!-- TODO: select +1 or -1 timezone from previous report -->
                    <option value="utc">UTC</option>
                    <option value="utc1">UTC+1:00</option>
                    <option value="utc2">UTC+2:00</option>
                    <option value="utc3">UTC+3:00</option>
                    <option value="utc4">UTC+4:00</option>
                    <option value="utc5">UTC+5:00</option>
                    <option value="utc6">UTC+6:00</option>
                    <option value="utc7">UTC+7:00</option>
                    <option value="utc8">UTC+8:00</option>
                    <option value="utc9">UTC+9:00</option>
                    <option value="utc10">UTC+10:00</option>
                    <option value="utc11">UTC+11:00</option>
                    <option value="utc12">UTC+12:00</option>
                    <option value="utc-11">UTC-11:00</option>
                    <option value="utc-10">UTC-10:00</option>
                    <option value="utc-9">UTC-9:00</option>
                    <option value="utc-8">UTC-8:00</option>
                    <option value="utc-7">UTC-7:00</option>
                    <option value="utc-6">UTC-6:00</option>
                    <option value="utc-5">UTC-5:00</option>
                    <option value="utc-4">UTC-4:00</option>
                    <option value="utc-3">UTC-3:00</option>
                    <option value="utc-2">UTC-2:00</option>
                    <option value="utc-1">UTC-1:00</option>
                </select>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("summerTime") }}</div>
                <select v-model="reporting_summer_time" class="col-span-3 p-3 border-b text-gray-400 text-14 focus:border-0">
                    <option selected disabled value="default">{{ $t("selectSummerTime") }}</option>
                    <option value="a">{{ $t("applied") }}</option>
                    <option value="na">{{ $t("notApplied") }}</option>
                </select>
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("dateAndTime") }}</div>
                <DatePicker 
                    v-model="reporting_date_time" 
                    class="col-span-3" 
                    textInput :textInputOptions="textInputOptions"
                    :format="format"
                    placeholder="Select date & time">
                    <template #input-icon>
                        <img src=""/>
                    </template>
                </DatePicker>
            </div>
            <div></div>
            <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
                <span class="col-span-2 row-span-3  text-blue-700 p-3 text-14 self-center">{{ $t("latitude") }}</span>
                <input v-model="latitude_degree" placeholder="000 (Degree)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="latitude_minutes" placeholder="000 (Minutes)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <select v-model="latitudeSN" class="col-span-3 p-3 text-gray-400 text-14 border-l focus:border-0 focus:outline-0">
                    <option selected disabled value="default">{{ $t("southAndNorth") }}</option>
                    <option value="y">{{ $t("south") }}</option>
                    <option value="n">{{ $t("north") }}</option>
                </select>
            </div>
            <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border bg-gray-50">
                <span class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center">{{ $t("longitude") }}</span>
                <input v-model="longitude_degree" placeholder="000 (Degree)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="longitude_minutes" placeholder="000 (Minutes)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <select v-model="longitudeSN" class="col-span-3 p-3 text-gray-400 text-14 border-l focus:border-0">
                    <option selected disabled value="default">{{ $t("southAndNorth") }}</option>
                    <option value="y">{{ $t("south") }}</option>
                    <option value="n">{{ $t("north") }}</option>
                </select>
            </div>
        </div>

        <!-- Weather -->
        <div class="grid bg-white rounded-lg p-5 gap-4">
            <div class="flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("weather") }}</span>
            </div>
            <div class="grid grid-cols-2">
                <div class="grid grid-cols-5 border mr-4">
                    <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("sky") }}</div>
                    <select v-model="weather_sky" class="col-span-3 p-3 text-gray-400 text-14 focus:border-0">
                        <option selected disabled value="default">{{ $t("select") }}</option>
                        <option value="b">{{ $t("sky_b") }}</option>
                        <option value="bc">{{ $t("sky_bc") }}</option>
                        <option value="c">{{ $t("sky_c") }}</option>
                        <option value="d">{{ $t("sky_d") }}</option>
                        <option value="f">{{ $t("sky_f") }}</option>
                        <option value="g">{{ $t("sky_g") }}</option>
                        <option value="h">{{ $t("sky_h") }}</option>
                        <option value="l">{{ $t("sky_l") }}</option>
                        <option value="m">{{ $t("sky_m") }}</option>
                        <option value="o">{{ $t("sky_o") }}</option>
                        <option value="p">{{ $t("sky_p") }}</option>
                        <option value="q">{{ $t("sky_q") }}</option>
                        <option value="r">{{ $t("sky_r") }}</option>
                        <option value="s">{{ $t("sky_s") }}</option>
                        <option value="t">{{ $t("sky_t") }}</option>
                        <option value="u">{{ $t("sky_u") }}</option>
                        <option value="v">{{ $t("sky_v") }}</option>
                        <option value="w">{{ $t("sky_w") }}</option>
                        <option value="z">{{ $t("sky_z") }}</option>
                    </select>
                </div>
                <div class="grid grid-cols-5 border">
                    <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("visibility") }}</div>
                    <select v-model="weather_visibility" class="col-span-3 p-3 text-gray-400 text-14 focus:border-0">
                        <option selected disabled value="default">{{ $t("select") }}</option>
                        <option value="1">{{ $t("visibility_1") }}</option>
                        <option value="2">{{ $t("visibility_2") }}</option>
                        <option value="3">{{ $t("visibility_3") }}</option>
                        <option value="4">{{ $t("visibility_4") }}</option>
                        <option value="5">{{ $t("visibility_5") }}</option>
                        <option value="6">{{ $t("visibility_6") }}</option>
                        <option value="7">{{ $t("visibility_7") }}</option>
                        <option value="8">{{ $t("visibility_8") }}</option>
                        <option value="9">{{ $t("visibility_9") }}</option>
                        <option value="10">{{ $t("visibility_10") }}</option>
                    </select>
                </div>
            </div>
            
            <div class="grid grid-cols-10 border">
                <div class="col-span-10 xl:col-span-2 text-blue-700 p-3 border-b xl:border-b-0 xl:border-r bg-gray-50 text-14">{{ $t("wind") }}</div>
                <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-b xl:border-b-0 border-r bg-gray-50 text-14">{{ $t("direction") }}</div>
                <input v-model="wind_dir" placeholder="000 (Degrees)" class="col-span-6 xl:col-span-2 p-3 pl-4 border-b xl:border-b-0 xl:border-r bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-b xl:border-b-0 border-r bg-gray-50 text-14">{{ $t("force") }}</div>
                <select v-model="wind_force" class="col-span-6 xl:col-span-1 p-3 text-gray-400 border-b xl:border-b-0 xl:border-r text-14 focus:border-0">
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
                <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("maxSpeed") }}</div>
                <div class="col-span-6 flex xl:col-span-2 p-2 pl-4 bg-white">
                    <input v-model="wind_max_speed" placeholder="00.0" class="text-14 w-24 text-gray-700 focus:outline-0"/>
                    <!-- value here (e.g. Ballast) is dynamic -->
                    <MiniUnitDisplay>M/S</MiniUnitDisplay>
                </div>
            </div>

            <div class="grid grid-cols-10 border">
                <div class="col-span-10 xl:col-span-2 text-blue-700 p-3 border-b xl:border-b-0 xl:border-r bg-gray-50 text-14">{{ $t("wave") }}</div>
                <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r border-b xl:border-b-0 bg-gray-50 text-14">{{ $t("direction") }}</div>
                <input v-model="wave_dir" placeholder="000 (Degrees)" class="col-span-6 xl:col-span-2 p-3 pl-4 border-b xl:border-b-0 xl:border-r bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r border-b xl:border-b-0 bg-gray-50 text-14">{{ $t("force") }}</div>
                <select v-model="wave_force" class="col-span-6 xl:col-span-1 p-3 text-gray-400 border-b xl:border-b-0 xl:border-r text-14 focus:border-0">
                    <option selected disabled value="default">{{ $t("select") }}</option>
                    <option value="0">{{ $t("wave_force_0") }}</option>
                    <option value="1">{{ $t("wave_force_1") }}</option>
                    <option value="2">{{ $t("wave_force_2") }}</option>
                    <option value="3">{{ $t("wave_force_3") }}</option>
                    <option value="4">{{ $t("wave_force_4") }}</option>
                    <option value="5">{{ $t("wave_force_5") }}</option>
                    <option value="6">{{ $t("wave_force_6") }}</option>
                    <option value="7">{{ $t("wave_force_7") }}</option>
                    <option value="8">{{ $t("wave_force_8") }}</option>
                    <option value="9">{{ $t("wave_force_9") }}</option>
                </select>
                <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("maxHeight") }}</div>
                <div class="flex col-span-6 xl:col-span-2 p-2 pl-4 bg-white">
                    <input v-model="wave_max_height" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>M</MiniUnitDisplay>
                </div>
            </div>
            <div class="grid grid-cols-10 border">
                <div class="col-span-10 xl:col-span-2 text-blue-700 p-3 border-b xl:border-b-0 xl:border-r bg-gray-50 text-14">{{ $t("swell") }}</div>
                <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-b xl:border-b-0 border-r bg-gray-50 text-14">{{ $t("direction") }}</div>
                <input v-model="swell_dir" placeholder="000 (Degrees)" class="col-span-6 xl:col-span-2 p-3 pl-4 border-b xl:border-b-0 xl:border-r bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-b xl:border-b-0 border-r bg-gray-50 text-14">{{ $t("scale") }}</div>
                <select v-model="swell_scale" class="col-span-6 xl:col-span-1 p-3 text-gray-400 border-b xl:border-b-0 xl:border-r text-14 focus:border-0">
                    <option selected disabled value="default">{{ $t("select") }}</option>
                    <option value="0">{{ $t("swell_0") }}</option>
                    <option value="1">{{ $t("swell_1") }}</option>
                    <option value="2">{{ $t("swell_2") }}</option>
                    <option value="3">{{ $t("swell_3") }}</option>
                    <option value="4">{{ $t("swell_4") }}</option>
                    <option value="5">{{ $t("swell_5") }}</option>
                    <option value="6">{{ $t("swell_6") }}</option>
                    <option value="7">{{ $t("swell_7") }}</option>
                    <option value="8">{{ $t("swell_8") }}</option>
                    <option value="9">{{ $t("swell_9") }}</option>
                </select>
                <div class="col-span-4 xl:col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("maxHeight") }}</div>
                <div class="col-span-6 flex xl:col-span-2 p-2 pl-4 bg-white">
                    <input v-model="swell_max_height" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>M</MiniUnitDisplay>
                </div>
            </div>

            <div class="xl:grid xl:grid-cols-2">
                <div class="grid grid-cols-5 border">
                    <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("glacierIceCondition") }}</div>
                    <select v-model="glacier_ice_condition" class="col-span-3 p-3 text-gray-400 text-14 focus:border-0">
                        <option selected disabled value="default">{{ $t("select") }}</option>
                        <option value="na">{{ $t("na") }}</option>
                        <option value="low">{{ $t("glacier_low") }}</option>
                        <option value="mod">{{ $t("glacier_mod") }}</option>
                        <option value="high">{{ $t("glacier_high") }}</option>
                        <option value="ext">{{ $t("glacier_ext") }}</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Heavy Weather Condition -->
        <div class="grid lg:grid-cols-2 bg-white rounded-lg p-5 gap-4">
            <div class="col-span-2 flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("heavyWeatherCondition") }}</span>
            </div>
            <div class="grid col-span-2 lg:col-span-1 grid-cols-5 border">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("totalHours") }}</div>
                <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                    <input v-model="hwc_total_hours" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>HRS</MiniUnitDisplay>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("distance") }}</div>
                <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                    <input v-model="hwc_distance" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>NM</MiniUnitDisplay>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("fuelConsumption") }}</div>
                <div class="flex col-span-3 p-2 pl-4 bg-white">
                    <input v-model="hwc_fuel_consumption" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>MT</MiniUnitDisplay>
                </div>
            </div>
            <div></div>
            <div class="col-span-2 grid grid-cols-10 border">
                <div class="col-span-10 lg:col-span-2 text-blue-700 p-3 border-b lg:border-b-0 lg:border-r bg-gray-50 text-14">{{ $t("wind") }}</div>
                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-b lg:border-b-0 border-r bg-gray-50 text-14">{{ $t("direction") }}</div>
                <input v-model="hwc_wave_dir" placeholder="000 (Degrees)" class="col-span-6 lg:col-span-2 p-3 pl-4 border-b lg:border-b-0 lg:border-r bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-4 lg:col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("force") }}</div>
                <select v-model="hwc_wave_force" class="col-span-6 lg:col-span-3 p-3 text-gray-400 text-14 focus:border-0">
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
                    <input v-model="hwc_max_wave_height" placeholder="00.0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
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
                    <input v-model="dt_time" placeholder="0" class="w-24 bg-white text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>HRS</MiniUnitDisplay>
                </div>
                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-b lg:border-b-0 border-l lg:border-l-0 border-t bg-gray-50 text-14">{{ $t("total") }}</div>
                <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border-x border-y lg:border-b-0">
                    <input v-model="dt_time_total" placeholder="0" class="w-24 bg-white text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>HRS</MiniUnitDisplay>
                </div>

                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14">{{ $t("distanceByObservation") }}</div>
                <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border-x border-t">
                    <input v-model="dt_dbo" placeholder="0" class="w-24 bg-white text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>NM</MiniUnitDisplay>
                </div>
                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-b lg:border-b-0 border-l lg:border-l-0 border-t bg-gray-50 text-14">{{ $t("total") }}</div>
                <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border lg:border-b-0">
                    <input v-model="dt_dbo_total" placeholder="0" class="w-24 bg-white text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>NM</MiniUnitDisplay>
                </div>

                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-t lg:border-y bg-gray-50 text-14">{{ $t("distanceByEngine") }}</div>
                <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border-x border-t lg:border">
                    <input v-model="dt_dbe" placeholder="0" class="w-24 bg-white text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>NM</MiniUnitDisplay>
                </div>
                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-y border-l lg:border-l-0  bg-gray-50 text-14">{{ $t("total") }}</div>
                <div class="flex col-span-6 lg:col-span-3 p-2 pl-4 border">
                    <input v-model="dt_dbe_total" placeholder="0" class="w-24 bg-white text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>NM</MiniUnitDisplay>
                </div>

                <div class="col-span-4 lg:col-span-2 text-blue-700 p-3 border-l border-y lg:border-t-0 bg-gray-50 text-14">{{ $t("revolutionCounter") }}</div>
                <input v-model="dt_rev_counter" placeholder="0" class="col-span-6 lg:col-span-3 p-3 pl-4 border-x border-y lg:border-t-0 bg-white text-14 text-gray-700 focus:outline-0"/>
            </div>
        </div>

        <!-- Performance -->
        <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4">
            <div class="col-span-2 flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">{{ $t("performance") }}</span>
            </div>
            <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
                <div class="col-span-5 text-blue-700 p-3 border-b bg-gray-50 text-14">{{ $t("noonToNoon") }}</div>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("speed") }}</div>
                <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                    <input v-model="performance_ntn_speed" placeholder="0" class="w-16 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>KNOTS</MiniUnitDisplay>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("rpm") }}</div>
                <input v-model="performance_ntn_rpm" placeholder="0" class="col-span-3 p-3 pl-4 border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("slip") }}</div>
                <div class="flex col-span-3 p-2 pl-4 bg-white">
                    <input v-model="performance_ntn_slip" placeholder="0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>%</MiniUnitDisplay>
                </div>
            </div>
            <div class="col-span-2 lg:col-span-1 grid grid-cols-5 border">
                <div class="col-span-5 text-blue-700 p-3 border-b bg-gray-50 text-14">{{ $t("currentVoyage") }}</div>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("averageSpeed") }}</div>
                <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                    <input v-model="performance_cur_avg_speed" placeholder="0" class="w-16 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>KNOTS</MiniUnitDisplay>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">{{ $t("averageRPM") }}</div>
                <input v-model="performance_cur_avg_rpm" placeholder="0" class="col-span-3 p-3 pl-4 border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">{{ $t("slip") }}</div>
                <div class="flex col-span-3 p-2 pl-4 bg-white">
                    <input v-model="performance_cur_slip" placeholder="0" class="w-24 text-14 text-gray-700 focus:outline-0"/>
                    <MiniUnitDisplay>%</MiniUnitDisplay>
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
                <div class="col-span-4 border-l border-t"></div>
                <div class="col-span-2 text-blue-700 p-3 border-t border-l bg-gray-50 text-14">{{ $t("me") }}</div>
                <div class="col-span-2 text-blue-700 p-3 border-t border-l bg-gray-50 text-14">{{ $t("ge") }}</div>
                <div class="col-span-2 text-blue-700 p-3 border-t border-l bg-gray-50 text-14">{{ $t("blr") }}</div>
                <div class="col-span-2 text-blue-700 p-3 border-t border-l bg-gray-50 text-14">{{ $t("igg") }}</div>
                <div class="col-span-2 text-blue-700 p-3 border-t border-l bg-gray-50 text-14">{{ $t("totalConsumption") }}</div>
                <div class="col-span-2 text-blue-700 p-3 border-t border-x bg-gray-50 text-14">{{ $t("remainOnBoard") }}</div>

                <div class="col-span-2 row-span-2 flex p-3 border-l border-t border-green-200 bg-green-100/50">
                    <div class="self-center text-green-800 text-12">{{ $t("fuelOilInMT") }}</div>
                </div>
                    <div class="col-span-2 text-green-800 p-3 border-t border-l border-green-100 bg-green-25 text-14">{{ $t("lsfo") }}</div>
                    <input v-model="cc_lsfo_me" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_lsfo_ge" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_lsfo_blr" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_lsfo_igg" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-l bg-gray-25 text-14">{{ $t("ne") }}</div>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ $t("ne") }}</div>
                    
                    <div class="col-span-2 text-green-800 p-3 border-t border-l border-green-100 bg-green-25 text-14">{{ $t("mgo") }}</div>
                    <input v-model="cc_mgo_me" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_mgo_ge" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_mgo_blr" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_mgo_igg" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-l bg-gray-25 text-14">{{ $t("ne") }}</div>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ $t("ne") }}</div>

                
                <div class="col-span-2 row-span-4 flex p-3 border-t border-l border-yellow-200 bg-yellow-100/50">
                    <div class="self-center text-yellow-800 text-12">{{ $t("lubricateOilInL") }}</div>
                </div>
                    <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("meCylinder") }}</div>
                        <input v-model="cc_mecylinder_total" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                        <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ $t("ne") }}</div>
                    <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("meSystem") }}</div>
                        <input v-model="cc_mesystem_total" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                        <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ $t("ne") }}</div>
                    <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("meSump") }}</div>
                        <input v-model="cc_mesump_total" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                        <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ $t("ne") }}</div>
                    <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">{{ $t("geSystem") }}</div>
                        <input v-model="cc_gesystem_total" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                        <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">{{ $t("ne") }}</div>

                <div class="col-span-2 row-span-2 flex p-3 border-y border-l border-blue-200 bg-sysblue-100/50">
                    <div class="self-center  text-sysblue-800 text-12">{{ $t("freshWaterInTon") }}</div>
                </div>
                    <div class="col-span-5 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">{{ $t("consumed") }}</div>
                    <div class="col-span-5 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">{{ $t("generated") }}</div>
                    <div class="col-span-2 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">+/-</div>
                    <div class="col-span-2 text-sysblue-800 p-3 border-t border-x border-sysblue-100 bg-sysblue-25 text-14">{{ $t("rob") }}</div>
                    
                    <input v-model="cc_freshwater_consumed" placeholder="0" class="col-span-5 p-3 pl-4 border-y border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_freshwater_generated" placeholder="0" class="col-span-5 p-3 pl-4 border-y border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-gray-400 p-3 border-y border-l bg-gray-25 text-14">{{ $t("ne") }}</div>
                    <div class="col-span-2 text-gray-400 p-3 border-y border-x bg-gray-25 text-14">{{ $t("ne") }}</div>
            </div>
            
            <div class="grid grid-cols-8 border">
                <div class="col-span-2 text-blue-700 p-3 bg-gray-50 text-14">{{ $t("correction") }}</div>
                <!-- what are the options for select here? -->
                <select v-model="cc_correction_type" class="col-span-3 p-3 border-l text-gray-400 text-14 focus:border-0">
                    <option selected disabled value="default">{{ $t("selectType") }}</option>
                </select>
                <input v-model="cc_correction" placeholder="00,000.00" class="col-span-3 p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-2 row-span-2 text-blue-700 p-3 border-t bg-gray-50 text-14">{{ $t("remarks") }}</div>
                <textarea v-model="cc_remarks" placeholder="Input description here" class="col-span-6 row-span-2 border-t border-l p-3 pl-4 bg-white text-14 text-gray-700 focus:outline-0"></textarea>
            </div>
        </div>
        
        <!-- Save and Send -->
        <div class="flex justify-end">
            <CustomButton class="px-5 py-2 text-14 mr-1 mb-1" type="button" v-on:click="doSomething()">
                <!-- TODO: need alternate function for saving changes to backend -->
                <template v-slot:content>{{ $t("save") }}</template> 
            </CustomButton>
            <GradientButton class="px-5 py-2 text-14 mr-1 mb-1" type="button" v-on:click="sendReport()">
                <!-- TODO: need alternate function for saving changes to backend -->
                <template v-slot:content>{{ $t("sendReport") }}</template> 
            </GradientButton>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import DatePicker from '@vuepic/vue-datepicker'
import GradientButton from '@/components/GradientButton.vue'
import CustomButton from '@/components/CustomButton.vue'
import MiniUnitDisplay from '@/components/MiniUnitDisplay.vue'

const reporting_time_zone = 'default', reporting_summer_time = 'default', reporting_date_time = ref();

const latitudeSN = 'default', latitude_degree = '',latitude_minutes = '';
const longitudeSN = 'default', longitude_degree = '', longitude_minutes = '';

const weather_sky = 'default', weather_visibility = 'default';

const wind_dir = '', wind_force = 'default', wind_max_speed = '';
const wave_dir = '', wave_force = 'default', wave_max_height = '';
const swell_dir = '', swell_scale = 'default', swell_max_height = '';
const glacier_ice_condition = 'default';

const hwc_total_hours = '', hwc_distance = '', hwc_fuel_consumption = '';
const hwc_wave_dir = '', hwc_wave_force = 'default', hwc_max_wave_height = '';

const dt_time = '', dt_time_total = '';
const dt_dbo = '', dt_dbo_total = '';
const dt_dbe = '', dt_dbe_total = '';
const dt_rev_counter = '';

const performance_ntn_speed = '', performance_ntn_rpm = '', performance_ntn_slip = '';
const performance_cur_avg_speed= '', performance_cur_avg_rpm = '', performance_cur_slip = '';

const cc_lsfo_me = '', cc_lsfo_ge = '', cc_lsfo_blr = '', cc_lsfo_igg = '';
const cc_mgo_me = '', cc_mgo_ge = '', cc_mgo_blr = '', cc_mgo_igg = '';
const cc_mecylinder_total = '', cc_mesystem_total = '', cc_mesump_total = '', cc_gesystem_total = '';
const cc_freshwater_consumed = '', cc_freshwater_generated = '';
const cc_correction_type = 'default', cc_correction = '', cc_remarks = '';

const dpEditable = ref(false);
const ddtEditable = ref(false);

// TODO: retrieve from backend or generate as needed
// TODO: modify DateTime display to also display UTC time next to local time
const staticValues = {
    reportNo: 'Noon 2',
    departureNo: '2',
    voyageNo: '0000',
    departurePort: 'Singapore, Singapore',
    departureDateTime: '2022.06.01 12:23 (LT)',
    destinationPort: 'Ras Tanura, Saudi Arabia',
    destinationDateTime: '2022.06.01 12:23 (LT)',
};

const format = (date) => {
    const day = ('0' + date.getUTCDate()).slice(-2); // may need to make custom method that takes in time zone and calculates utc time manually
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const year = date.getUTCFullYear();
    const hour = ('0' + date.getUTCHours()).slice(-2);
    const minute = ('0' + date.getUTCMinutes()).slice(-2);

    return `${year}.${month}.${day} ${hour}:${minute} (UTC)`;
}

const toggleDP = () => {
    dpEditable.value = !dpEditable.value
}

const toggleDDT = () => {
    ddtEditable.value = !ddtEditable.value
}

const textInputOptions = ref({
    format: 'yyyy.MM.dd HH:mm'
}) 

const DUMMY_TOKEN = localStorage.getItem('jwt');

const DUMMY_FORMDATA = {
    "report_type": "NOON",
    "report_num": 2,
    "cargo_presence": "EAST",
    "summer_time": false,
    "position": "SRID=4326;POINT (106.75205889883298 4.770291088248677)",
    "status": 1,
    "voyage": 1,
    "noonreportatsea": {
        "distance_to_go": "20000",
        "hours_since_noon": "24.0",
        "hours_total": "72.0",
        "distance_obs_since_noon": "100",
        "distance_eng_since_noon": "100",
        "distance_eng_total": "10000",
        "revolution_count": 1000000,
        "speed_since_noon": "12.34",
        "rpm_since_noon": "123.4",
        "slip_since_noon": "12.34",
        "speed_avg": "12.34",
        "rpm_avg": "123.4",
        "slip_avg": "12.34"
    },
    "weatherdata": {
        "weather": "B",
        "sea_state": 1,
        "wind_direction": "45.0",
        "wind_speed": "10.0",
        "beaufort": 1
    },
    "bunkerdata_set": [
        {
            "fuel_type": "HFO",
            "rob": "65536.00",
            "me_consumed": "512.00",
            "aux_consumed": "256.00",
            "boiler_consumed": "256.00",
            "gas_generator_consumed": "128.00",
            "total_consumed": "1024.00",
            "correction": "0.00",
            "remarks": "NIL"
        }
    ],
    "freshwaterdata": {
        "rob": 65536,
        "consumed": 4096,
        "evaporated": 4096,
        "correction": 0,
        "remarks": "NIL"
    }
}
const sendReport = async() => {
    const response = await fetch('https://testapi.marinachain.io/marinanet/reports/new/', {
        headers: {
            Authorization: 'Bearer ' + DUMMY_TOKEN,
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(DUMMY_FORMDATA)
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