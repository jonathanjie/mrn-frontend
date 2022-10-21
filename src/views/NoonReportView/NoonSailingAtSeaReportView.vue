<template>
    <div class="flex flex-col space-y-6 pb-6">
        <!-- Overview -->
        <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4">
            <div class="col-span-2 flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">Overview</span>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b">Report No.</div>
                <input class="col-span-3 p-3 border-b text-gray-700 bg-gray-50" disabled v-model="staticValues.reportNo"/>
                <div class="col-span-2 text-blue-700 p-3 border-r">Departure No.</div>
                <input class="col-span-3 p-3 text-gray-700 bg-gray-50" disabled v-model="staticValues.departureNo"/>
            </div>
            <div class="grid grid-cols-5 row-span-1 bg-gray-50 text-14">
                <div class="col-span-2 text-blue-700 p-3 border-l border-y">Voyage No.</div>
                <div class="flex col-span-3 p-3 border">
                    <input class="text-gray-700 bg-gray-50 w-12" disabled v-model="staticValues.voyageNo"/>
                    <!-- value here (e.g. Ballast) should be dynamic -->
                    <div class="flex self-center bg-gray-100 rounded-full p-1 px-2 text-12 text-gray-700">Ballast</div>
                </div>
                <!-- dummy div/input for formatting -->
                <div class="bg-white col-span-2 row-span-1"></div>
                <input class="bg-white col-span-3 p-3" disabled/> 
            </div>
            <div class="flex items-center pt-6">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700">Departure Port</span>
            </div>
            <div class="flex items-center pt-6">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700">Destination Port</span>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b">Name</div>
                <input class="col-span-3 p-3 border-b text-gray-700 bg-gray-50" disabled v-model="staticValues.departurePort"/>
                <div class="col-span-2 text-blue-700 p-3 border-r">Date & time</div>
                <input class="col-span-3 p-3 text-gray-700 bg-gray-50" disabled v-model="staticValues.departureDateTime"/>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50 text-14">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b">Name</div>
                <div class="col-span-3 p-3 border-b flex" :class="dpEditable?'bg-white':'bg-gray-50'">
                    <input 
                        class="text-gray-700" 
                        :disabled="!dpEditable" 
                        v-model="staticValues.destinationPort"/>
                    <button @click="toggleDP" class="ml-auto">
                        <img src="@/assets/icons/edit.svg"/>
                    </button>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-r">Est date & time</div>
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

        <!-- Reporting Noon -->
        <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4">
            <div class="col-span-2 flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">Reporting Noon</span>
            </div>
            <div class="grid grid-cols-5 border">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">Time zone</div>
                <select v-model="reporting_time_zone" class="col-span-3 p-3 border-b text-gray-400 text-14 focus:border-0">
                    <option selected disabled value="default">Select time zone</option>
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
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">Summer time</div>
                <select v-model="reporting_summer_time" class="col-span-3 p-3 border-b text-gray-400 text-14 focus:border-0">
                    <option selected disabled value="default">Select summer time</option>
                    <option value="a">Applied</option>
                    <option value="na">Not Applied</option>
                </select>
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">Date & time</div>
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
            <div class="grid grid-cols-5 border bg-gray-50">
                <span class="col-span-2 row-span-3  text-blue-700 p-3 text-14 self-center">Latitude</span>
                <input v-model="latitude_degree" placeholder="000 (Degree)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="latitude_minutes" placeholder="000 (Minutes)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <select v-model="latitudeSN" class="col-span-3 p-3 text-gray-400 text-14 border-l focus:border-0 focus:outline-0">
                    <option selected disabled value="default">South/North</option>
                    <option value="y">South</option>
                    <option value="n">North</option>
                </select>
            </div>
            <div class="grid grid-cols-5 border bg-gray-50">
                <span class="col-span-2 row-span-3 text-blue-700 p-3 text-14 self-center">Longitude</span>
                <input v-model="longitude_degree" placeholder="000 (Degree)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <input v-model="longitude_minutes" placeholder="000 (Minutes)" class="col-span-3 p-3 pl-4 border-l border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <select v-model="longitudeSN" class="col-span-3 p-3 text-gray-400 text-14 border-l focus:border-0">
                    <option selected disabled value="default">South/North</option>
                    <option value="y">South</option>
                    <option value="n">North</option>
                </select>
            </div>
        </div>

        <!-- Weather -->
        <div class="grid bg-white rounded-lg p-5 gap-4">
            <div class="flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">Weather</span>
            </div>
            <div class="grid grid-cols-2">
                <div class="grid grid-cols-5 border mr-4">
                    <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">Sky</div>
                    <select v-model="weather_sky" class="col-span-3 p-3 text-gray-400 text-14 focus:border-0">
                        <option selected disabled value="default">Select</option>
                        <option value="b">b: Blue sky (Cloud 0~2)</option>
                        <option value="bc">bc: Fine but Cloudy (Cloud 3~7)</option>
                        <option value="c">c: Cloudy (Cloud 8~10)</option>
                        <option value="d">d: Drizzling rain</option>
                        <option value="f">f: Fog</option>
                        <option value="g">g: Gloom</option>
                        <option value="h">h: Hail</option>
                        <option value="l">l: Lightning</option>
                        <option value="m">m: Mist</option>
                        <option value="o">o: Overcast (Cloud 10)</option>
                        <option value="p">p: Passing showers</option>
                        <option value="q">q: Squalls</option>
                        <option value="r">r: Rain</option>
                        <option value="s">s: Snow</option>
                        <option value="t">t: Thunder</option>
                        <option value="u">u: Ugly threatening wr.</option>
                        <option value="v">v: Visibility</option>
                        <option value="w">w: Dew</option>
                        <option value="z">z: Haze</option>
                    </select>
                </div>
                <div class="grid grid-cols-5 border">
                    <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">Visibility</div>
                    <select v-model="weather_visibility" class="col-span-3 p-3 text-gray-400 text-14 focus:border-0">
                        <option selected disabled value="default">Select</option>
                        <option value="1">1 (&lt; 50 m) </option>
                        <option value="2">2 (50-200 m)</option>
                        <option value="3">3 (200-500 m)</option>
                        <option value="4">4 (500-1000 m)</option>
                        <option value="5">5 (1-2 km)</option>
                        <option value="6">6 (2-4 km)</option>
                        <option value="7">7 (4-10 km)</option>
                        <option value="8">8 (10-20 km)</option>
                        <option value="9">9 (20-50 km)</option>
                        <option value="10">10 (50+ km)</option>
                    </select>
                </div>
            </div>
            
            <div class="grid grid-cols-10 border">
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">Wind</div>
                <div class="col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">Direction</div>
                <input v-model="wind_dir" placeholder="000 (Degrees)" class="col-span-2 p-3 pl-4 border-r bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">Force</div>
                <select v-model="wind_force" class="col-span-1 p-3 text-gray-400 border-r text-14 focus:border-0">
                    <option selected disabled value="default">Select</option>
                    <option value="0">0 (Calm)</option>
                    <option value="1">1 (Light air)</option>
                    <option value="2">2 (Light breeze)</option>
                    <option value="3">3 (Gentle Breeze)</option>
                    <option value="4">4 (Moderate breeze)</option>
                    <option value="5">5 (Fresh Breeze)</option>
                    <option value="6">6 (Strong Breeze)</option>
                    <option value="7">7 (Near gale)</option>
                    <option value="8">8 (Gale)</option>
                    <option value="9">9 (Severe gale)</option>
                    <option value="10">10 (Storm)</option>
                    <option value="11">11 (Violent storm)</option>
                    <option value="12">12 (Hurricane)</option>
                </select>
                <div class="col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">Max. Speed</div>
                <div class="flex col-span-2 p-2 pl-4 bg-white">
                    <input v-model="wind_max_speed" placeholder="00.0" class="text-14 text-gray-700 focus:outline-0"/>
                    <!-- value here (e.g. Ballast) is dynamic -->
                    <div class="flex self-center bg-gray-100 rounded-full p-1 px-2 ml-auto text-12 text-gray-700">M/S</div>
                </div>
            </div>
            <div class="grid grid-cols-10 border">
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">Wave</div>
                <div class="col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">Direction</div>
                <input v-model="wave_dir" placeholder="000 (Degrees)" class="col-span-2 p-3 pl-4 border-r bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">Force</div>
                <select v-model="wave_force" class="col-span-1 p-3 text-gray-400 border-r text-14 focus:border-0">
                    <option selected disabled value="default">Select</option>
                    <option value="0">0 (Calm, Glassy)</option>
                    <option value="1">1 (Calm, Rippled)</option>
                    <option value="2">2 (Smooth)</option>
                    <option value="3">3 (Slight)</option>
                    <option value="4">4 (Moderate)</option>
                    <option value="5">5 (Rough)</option>
                    <option value="6">6 (Very Rough)</option>
                    <option value="7">7 (High)</option>
                    <option value="8">8 (Very High)</option>
                    <option value="9">9 (Phenomenal)</option>
                </select>
                <div class="col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">Max. Height</div>
                <div class="flex col-span-2 p-2 pl-4 bg-white">
                    <input v-model="wave_max_height" placeholder="00.0" class="text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full p-1 px-2 ml-auto text-12 text-gray-700">M</div>
                </div>
            </div>
            <div class="grid grid-cols-10 border">
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">Swell</div>
                <div class="col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">Direction</div>
                <input v-model="swell_dir" placeholder="000 (Degrees)" class="col-span-2 p-3 pl-4 border-r bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">Scale</div>
                <select v-model="swell_scale" class="col-span-1 p-3 text-gray-400 border-r text-14 focus:border-0">
                    <option selected disabled value="default">Select</option>
                    <option value="0">0 (No swell)</option>
                    <option value="1">1 (Low swell - short or average)</option>
                    <option value="2">2 (Low Swell - long)</option>
                    <option value="3">3 (Moderate - short)</option>
                    <option value="4">4 (Moderate - average)</option>
                    <option value="5">5 (Moderate - long)</option>
                    <option value="6">6 (Heavy Swell - short)</option>
                    <option value="7">7 (Heavy Swell - average)</option>
                    <option value="8">8 (Heavy Swell - long)</option>
                    <option value="9">9 (Confused Swell)</option>
                </select>
                <div class="col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">Max. Height</div>
                <div class="flex col-span-2 p-2 pl-4 bg-white">
                    <input v-model="swell_max_height" placeholder="00.0" class="text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full p-1 px-2 ml-auto text-12 text-gray-700">M</div>
                </div>
            </div>

            <div class="grid grid-cols-2">
                <div class="grid grid-cols-5 border mr-4">
                    <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">Glacier Ice Condition</div>
                    <select v-model="glacier_ice_condition" class="col-span-3 p-3 text-gray-400 text-14 focus:border-0">
                        <option selected disabled value="default">Select</option>
                        <option value="na">N/A</option>
                        <option value="low">LOW</option>
                        <option value="mod">MOD</option>
                        <option value="high">HIGH</option>
                        <option value="ext">EXT</option>
                    </select>
                </div>
                <div></div>
            </div>
        </div>

        <!-- Heavy Weather Condition -->
        <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4">
            <div class="col-span-2 flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">Heavy Weather Condition</span>
            </div>
            <div class="grid grid-cols-5 border">
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">Total hours</div>
                <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                    <input v-model="hwc_total_hours" placeholder="00.0" class="text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full p-1 px-2 ml-auto text-12 text-gray-700">HRS</div>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">Distance</div>
                <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                    <input v-model="hwc_distance" placeholder="00.0" class="text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full p-1 px-2 ml-auto text-12 text-gray-700">NM</div>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">Fuel consumption</div>
                <div class="flex col-span-3 p-2 pl-4 bg-white">
                    <input v-model="hwc_fuel_consumption" placeholder="00.0" class="text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full p-1 px-2 ml-auto text-12 text-gray-700">MT</div>
                </div>
            </div>
            <div></div>
            <div class="col-span-2 grid grid-cols-10 border">
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">Wind</div>
                <div class="col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">Direction</div>
                <input v-model="hwc_wave_dir" placeholder="000 (Degrees)" class="col-span-3 p-3 pl-4 border-r bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-1 text-blue-700 p-3 border-r bg-gray-50 text-14">Force</div>
                <select v-model="hwc_wave_force" class="col-span-3 p-3 text-gray-400 text-14 focus:border-0">
                    <option selected disabled value="default">Select</option>
                    <option value="0">0 (Calm)</option>
                    <option value="1">1 (Light air)</option>
                    <option value="2">2 (Light breeze)</option>
                    <option value="3">3 (Gentle Breeze)</option>
                    <option value="4">4 (Moderate breeze)</option>
                    <option value="5">5 (Fresh Breeze)</option>
                    <option value="6">6 (Strong Breeze)</option>
                    <option value="7">7 (Near gale)</option>
                    <option value="8">8 (Gale)</option>
                    <option value="9">9 (Severe gale)</option>
                    <option value="10">10 (Storm)</option>
                    <option value="11">11 (Violent storm)</option>
                    <option value="12">12 (Hurricane)</option>
                </select>
            </div>
            <div class="grid grid-cols-5 border">
                <div class="col-span-2 text-blue-700 p-3  bg-gray-50 text-14">Max. wave height</div>
                <div class="flex col-span-3 p-2 pl-4 border-l bg-white">
                    <input v-model="hwc_max_wave_height" placeholder="00.0" class="text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full p-1 px-2 ml-auto text-12 text-gray-700">M</div>
                </div>
            </div>
            <div></div>
        </div>

        <!-- Distance & Time -->
        <div class="grid grid-cols-1 bg-white rounded-lg p-5 gap-4">
            <div class="flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">Distance & Time</span>
            </div>
            <div class="grid grid-cols-10">
                <div class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14">Time</div>
                <div class="flex col-span-3 p-2 pl-4 border-x border-t">
                    <input v-model="dt_time" placeholder="0" class="bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full ml-auto p-1 px-2 text-12 text-gray-700">HRS</div>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-t bg-gray-50 text-14">Total</div>
                <div class="flex col-span-3 p-2 pl-4 border-x border-t">
                    <input v-model="dt_time_total" placeholder="0" class="bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full ml-auto p-1 px-2 text-12 text-gray-700">HRS</div>
                </div>

                <div class="col-span-2 text-blue-700 p-3 border-l border-t bg-gray-50 text-14">Distance by observation</div>
                <div class="flex col-span-3 p-2 pl-4 border-x border-t">
                    <input v-model="dt_dbo" placeholder="0" class="bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full ml-auto p-1 px-2 text-12 text-gray-700">NM</div>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-t bg-gray-50 text-14">Total</div>
                <div class="flex col-span-3 p-2 pl-4 border-x border-t">
                    <input v-model="dt_dbo_total" placeholder="0" class="bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full ml-auto p-1 px-2 text-12 text-gray-700">NM</div>
                </div>

                <div class="col-span-2 text-blue-700 p-3 border-l border-y bg-gray-50 text-14">Distance by engine</div>
                <div class="flex col-span-3 p-2 pl-4 border">
                    <input v-model="dt_dbe" placeholder="0" class="bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full ml-auto p-1 px-2 text-12 text-gray-700">NM</div>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-y bg-gray-50 text-14">Total</div>
                <div class="flex col-span-3 p-2 pl-4 border">
                    <input v-model="dt_dbe_total" placeholder="0" class="bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full ml-auto p-1 px-2 text-12 text-gray-700">NM</div>
                </div>

                <div class="col-span-2 text-blue-700 p-3 border-l border-b bg-gray-50 text-14">Revolution counter</div>
                <input v-model="dt_rev_counter" placeholder="0" class="col-span-3 p-3 pl-4 border-x border-b bg-white text-14 text-gray-700 focus:outline-0"/>
            </div>
        </div>

        <!-- Performance -->
        <div class="grid grid-cols-2 bg-white rounded-lg p-5 gap-4">
            <div class="col-span-2 flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">Performance</span>
            </div>
            <div class="grid grid-cols-5 border">
                <div class="col-span-5 text-blue-700 p-3 border-b bg-gray-50 text-14">Noon to Noon</div>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">Speed (knots)</div>
                <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                    <input v-model="performance_ntn_speed" placeholder="0" class="text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full p-1 px-2 ml-auto text-12 text-gray-700">KNOTS</div>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">RPM</div>
                <input v-model="performance_ntn_rpm" placeholder="0" class="col-span-3 p-3 pl-4 border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">SLIP</div>
                <div class="flex col-span-3 p-2 pl-4 bg-white">
                    <input v-model="performance_ntn_slip" placeholder="0" class="text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full p-1 px-2 ml-auto text-12 text-gray-700">%</div>
                </div>
            </div>
            <div class="grid grid-cols-5 border">
                <div class="col-span-5 text-blue-700 p-3 border-b bg-gray-50 text-14">Current Voyage</div>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">Average Speed</div>
                <div class="flex col-span-3 p-2 pl-4 border-b bg-white">
                    <input v-model="performance_cur_avg_speed" placeholder="0" class="text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full p-1 px-2 ml-auto text-12 text-gray-700">KNOTS</div>
                </div>
                <div class="col-span-2 text-blue-700 p-3 border-r border-b bg-gray-50 text-14">Average RPM</div>
                <input v-model="performance_cur_avg_rpm" placeholder="0" class="col-span-3 p-3 pl-4 border-b bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-2 text-blue-700 p-3 border-r bg-gray-50 text-14">SLIP</div>
                <div class="flex col-span-3 p-2 pl-4 bg-white">
                    <input v-model="performance_cur_slip" placeholder="0" class="text-14 text-gray-700 focus:outline-0"/>
                    <div class="flex self-center bg-gray-100 rounded-full p-1 px-2 ml-auto text-12 text-gray-700">%</div>
                </div>
            </div>
        </div> 

        <!-- Consumption & Condition -->
        <div class="grid bg-white rounded-lg p-5 gap-4">
            <div class="flex items-center">
                <img src="@/assets/icons/selected_blue_gradient.svg" class="h-5 w-5"/>
                <span class="text-blue-700 text-16">Consumption & Condition</span>
            </div>
            <div class="grid grid-cols-16">
                <div class="col-span-4 border-l border-t"></div>
                <div class="col-span-2 text-blue-700 p-3 border-t border-l bg-gray-50 text-14">M/E</div>
                <div class="col-span-2 text-blue-700 p-3 border-t border-l bg-gray-50 text-14">G/E</div>
                <div class="col-span-2 text-blue-700 p-3 border-t border-l bg-gray-50 text-14">BLR</div>
                <div class="col-span-2 text-blue-700 p-3 border-t border-l bg-gray-50 text-14">IGG</div>
                <div class="col-span-2 text-blue-700 p-3 border-t border-l bg-gray-50 text-14">Total consumption</div>
                <div class="col-span-2 text-blue-700 p-3 border-t border-x bg-gray-50 text-14">Remain on Board</div>

                <div class="col-span-2 row-span-2 flex p-3 border-l border-t border-green-200 bg-green-100/50">
                    <div class="self-center text-green-800 text-12">Fuel Oil (MT)</div>
                </div>
                    <div class="col-span-2 text-green-800 p-3 border-t border-l border-green-100 bg-green-25 text-14">LSFO</div>
                    <input v-model="cc_lsfo_me" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_lsfo_ge" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_lsfo_blr" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_lsfo_igg" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-l bg-gray-25 text-14">N.E.</div>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">N.E.</div>
                    
                    <div class="col-span-2 text-green-800 p-3 border-t border-l border-green-100 bg-green-25 text-14">MGO</div>
                    <input v-model="cc_mgo_me" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_mgo_ge" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_mgo_blr" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_mgo_igg" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-l bg-gray-25 text-14">N.E.</div>
                    <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">N.E.</div>

                
                <div class="col-span-2 row-span-4 flex p-3 border-t border-l border-yellow-200 bg-yellow-100/50">
                    <div class="self-center text-yellow-800 text-12">Lubricate Oil (L)</div>
                </div>
                    <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">M/E Cylinder</div>
                        <input v-model="cc_mecylinder_total" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                        <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">N.E.</div>
                    <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">M/E System</div>
                        <input v-model="cc_mesystem_total" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                        <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">N.E.</div>
                    <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">M/E Sump</div>
                        <input v-model="cc_mesump_total" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                        <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">N.E.</div>
                    <div class="col-span-10 text-yellow-800 p-3 border-t border-l border-yellow-100 bg-yellow-25 text-14">G/E System</div>
                        <input v-model="cc_gesystem_total" placeholder="0" class="col-span-2 p-3 pl-4 border-t border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                        <div class="col-span-2 text-gray-400 p-3 border-t border-x bg-gray-25 text-14">N.E.</div>

                <div class="col-span-2 row-span-2 flex p-3 border-y border-l border-blue-200 bg-sysblue-100/50">
                    <div class="self-center  text-sysblue-800 text-12">Fresh Water (TON)</div>
                </div>
                    <div class="col-span-5 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">Consumed</div>
                    <div class="col-span-5 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">Generated</div>
                    <div class="col-span-2 text-sysblue-800 p-3 border-t border-l border-sysblue-100 bg-sysblue-25 text-14">+/-</div>
                    <div class="col-span-2 text-sysblue-800 p-3 border-t border-x border-sysblue-100 bg-sysblue-25 text-14">ROB</div>
                    
                    <input v-model="cc_freshwater_consumed" placeholder="0" class="col-span-5 p-3 pl-4 border-y border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <input v-model="cc_freshwater_generated" placeholder="0" class="col-span-5 p-3 pl-4 border-y border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                    <div class="col-span-2 text-gray-400 p-3 border-y border-l bg-gray-25 text-14">N.E.</div>
                    <div class="col-span-2 text-gray-400 p-3 border-y border-x bg-gray-25 text-14">N.E.</div>
            </div>
            
            <div class="grid grid-cols-7 border">
                <div class="col-span-1 text-blue-700 p-3 bg-gray-50 text-14">Correction</div>
                <!-- what are the options for select here? -->
                <select v-model="cc_correction_type" class="col-span-3 p-3 border-l text-gray-400 text-14 focus:border-0">
                    <option selected disabled value="default">Select type</option>
                </select>
                <input v-model="cc_correction" placeholder="00,000.00" class="col-span-3 p-3 pl-4 border-l bg-white text-14 text-gray-700 focus:outline-0"/>
                <div class="col-span-1 row-span-2 text-blue-700 p-3 border-t bg-gray-50 text-14">Remarks</div>
                <textarea v-model="cc_remarks" placeholder="Input description here" class="col-span-6 row-span-2 border-t border-l p-3 pl-4 bg-white text-14 text-gray-700 focus:outline-0"></textarea>
            </div>
        </div>
        
        <!-- Save and Send -->
        <div class="flex justify-end">
            <CustomButton class="px-5 py-2 text-14 mr-1 mb-1" type="button" v-on:click="doSomething()">
                <!-- TODO: need alternate function for saving changes to backend -->
                <template v-slot:content>Save</template> 
            </CustomButton>
            <GradientButton class="px-5 py-2 text-14 mr-1 mb-1" type="button" v-on:click="sendReport()">
                <!-- TODO: need alternate function for saving changes to backend -->
                <template v-slot:content>Send Report</template> 
            </GradientButton>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import DatePicker from '@vuepic/vue-datepicker';
import GradientButton from '@/components/GradientButton.vue';
import CustomButton from '@/components/CustomButton.vue';

export default {
    components: { DatePicker, GradientButton, CustomButton },
    setup() {
        const reporting_time_zone = 'default';
        const reporting_summer_time = 'default';
        const reporting_date_time = ref();

        const latitudeSN = 'default';
        const latitude_degree = '';
        const latitude_minutes = '';

        const longitudeSN = 'default';
        const longitude_degree = '';
        const longitude_minutes = '';

        const weather_sky = 'default';
        const weather_visibility = 'default';
        
        const wind_dir = '';
        const wind_force = 'default';
        const wind_max_speed = '';
        const wave_dir = '';
        const wave_force = 'default';
        const wave_max_height = '';
        const swell_dir = '';
        const swell_scale = 'default';
        const swell_max_height = '';
        const glacier_ice_condition = 'default';

        const hwc_total_hours = '';
        const hwc_distance = '';
        const hwc_fuel_consumption = '';
        const hwc_wave_dir = '';
        const hwc_wave_force = 'default';
        const hwc_max_wave_height = '';

        const dt_time = '';
        const dt_time_total = '';
        const dt_dbo = '';
        const dt_dbo_total = '';
        const dt_dbe = '';
        const dt_dbe_total = '';
        const dt_rev_counter = '';

        const performance_ntn_speed = '';
        const performance_ntn_rpm = '';
        const performance_ntn_slip = '';
        const performance_cur_avg_speed= '';
        const performance_cur_avg_rpm = '';
        const performance_cur_slip = '';

        const cc_lsfo_me = '';
        const cc_lsfo_ge = '';
        const cc_lsfo_blr = '';
        const cc_lsfo_igg = '';
        const cc_mgo_me = '';
        const cc_mgo_ge = '';
        const cc_mgo_blr = '';
        const cc_mgo_igg = '';
        const cc_mecylinder_total = '';
        const cc_mesystem_total = '';
        const cc_mesump_total = '';
        const cc_gesystem_total = '';
        const cc_freshwater_consumed = '';
        const cc_freshwater_generated = '';
        const cc_correction_type = 'default';
        const cc_correction = '';
        const cc_remarks = '';

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

        const DUMMY_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjYxbl96VlI1WmFoZ0hLcy1QOEx5MyJ9.eyJpc3MiOiJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjM1MGUzZWY2MmNiNTRiMmU5MTcwYjI0IiwiYXVkIjpbImh0dHBzOi8vZGphbmdvLWp3dC10ZXN0LWRhbi9hcGkiLCJodHRwczovL2Rldi14eXJoczYwOS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjY2MjQ5MzIzLCJleHAiOjE2NjYzMzU3MjMsImF6cCI6ImhuTnRMa0lKQmxuSExEVGhTTDc3Q1lUdTlRRWFXaWpOIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.hMXcvjne_ig6e0_BQbA2vNhxm_cZICEPPZJn9xohGeC0tk6JtzLUr6uRn7gPSuj0nknOx5CadpQkUzFvrK21EC8aF3IixF7-HfyEuq3b2Grc1GgEH-B6kI5ckKf7A87ADYkmSfudDQm04kSx8oAdJGesMtRn0zraXn4nwVKweYEYIXIa6eB9VHMon05GSI7mrknAbHRAjcYMUmhJ1L4TafAonK-SUe4PUQJyniYDCleeA7Bmm-IgychhG7x6szO2Duk6AZxfoXn-QRjv2zVXTh63_9r391N8MAx3gF-qF780Y4tVonZGbHXeHw2yJyGsJC7DCE98R1ddUKw9LCcuZA"

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

        return {
            toggleDP,
            toggleDDT,
            dpEditable,
            ddtEditable,
            staticValues,
            reporting_time_zone,
            reporting_summer_time,
            reporting_date_time,
            latitudeSN,
            latitude_degree,
            latitude_minutes,
            longitudeSN,
            longitude_degree,
            longitude_minutes,
            format,
            textInputOptions,
            weather_sky,
            weather_visibility,
            wind_dir,
            wind_force,
            wind_max_speed,
            wave_dir,
            wave_force,
            wave_max_height,
            swell_dir,
            swell_scale,
            swell_max_height,
            glacier_ice_condition,
            hwc_total_hours,
            hwc_distance,
            hwc_fuel_consumption,
            hwc_wave_dir,
            hwc_wave_force,
            hwc_max_wave_height,
            dt_time,
            dt_time_total,
            dt_dbo,
            dt_dbo_total,
            dt_dbe,
            dt_dbe_total,
            dt_rev_counter,
            performance_ntn_speed,
            performance_ntn_rpm,
            performance_ntn_slip,
            performance_cur_avg_speed,
            performance_cur_avg_rpm,
            performance_cur_slip,
            cc_lsfo_me,
            cc_lsfo_ge,
            cc_lsfo_blr,
            cc_lsfo_igg,
            cc_mgo_me,
            cc_mgo_ge,
            cc_mgo_blr,
            cc_mgo_igg,
            cc_mecylinder_total,
            cc_mesystem_total,
            cc_mesump_total,
            cc_gesystem_total,
            cc_freshwater_consumed,
            cc_freshwater_generated,
            cc_correction_type,
            cc_correction,
            cc_remarks,

            sendReport: async() => {
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
        };
    },
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