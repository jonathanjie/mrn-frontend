<template>
  <div class="flex rounded-xl bg-white mx-12 mt-10 py-8 divide-y divide-solid">
    <div class="flex relative flex-col w-full">
      <div class="flex items-center">
        <img src="@/assets/icons/vessel_spec_header.svg" class="absolute" />
        <span class="text-18 text-blue-700 font-bold pl-6">Tanker</span>
      </div>
      <div class="grid grid-cols-3">
        <VesselSpecCard>
          <template v-slot:header> Overview:</template>
        </VesselSpecCard>
        <VesselSpecCard>
          <template v-slot:title>IMO number</template>
          <template v-slot:value>9449431</template>
        </VesselSpecCard>
        <VesselSpecCard>
          <template v-slot:title>Owner</template>
          <template v-slot:value>Hello</template>
        </VesselSpecCard>
        <VesselSpecCard></VesselSpecCard>
        <VesselSpecCard>
          <template v-slot:title>Commercial manager:</template>
          <template v-slot:value>-</template>
        </VesselSpecCard>
        <VesselSpecCard>
          <template v-slot:title>Technical manager:</template>
          <template v-slot:value>-</template>
        </VesselSpecCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import VesselSpecCard from "@/components/VesselSpecCard.vue";

// const ship = {
//   owner,
//   commercialManager,
//   technicalManager,
//   yard,
//   deliveryDate,
//   flag,
//   registryPort,
//   callSign,
//   hullNo,
//   class1,
//   nextDrydockDate,
//   dimensions,
//   draft,
//   grossTonnage,
//   deadweightTonnage,
//   fullDisplacement,
//   cargoCapacity,
//   lightshipWeight,
//   cruisingRange,
//   trialSpeed,
//   serviceSpeed,
//   dailyFuelConsumption,
//   ballast,
//   load,
//   mainEngineNo,
//   mcr,
//   imoTier,
//   fuelType,
//   generatorType,
//   generatorRpm,
//   generatorPower,
//   generatorSet,
//   boiler,
//   cargoTanks,
//   cargoCapacity,
//   cargoPumpType,
//   cargoPumpCapacity,
//   cargoPumpSet,
//   propellerType,
//   propellerBlade,
//   propellerSet,
//   btwsIsFitted,
//   scrubberIsInstalled,
//   scrIsInstalled,
//   egrIsInstalled,
//   windlassIsInstalled,
//   hoseHandlingCraneIsInstalled,
//   waterBallastCapacity,
//   hfoCapacity,
//   mdoLsmgoCapacity,
//   freshwaterCapacity,
//   eexiRating,
//   estimatedCiiRating,
// };
defineProps({
  vesselname: String,
  imo: String,
});
</script>
