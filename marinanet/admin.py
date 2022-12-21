from django.contrib import admin

# Register your models here.
from marinanet.models import (
    ActualPerformanceData,
    ArrrivalFWETimeAndPosition,
    ArrivalPilotStation,
    ArrivalStandbyTimeAndPosition,
    CargoOperation,
    Company,
    ConsumptionConditionData,
    DeparturePilotStation,
    DepartureRunUp,
    DepartureVesselCondition,
    DistancePerformanceData,
    DistanceTimeData,
    EventData,
    FreshWaterData,
    FuelOilData,
    FuelOilDataCorrection,
    FuelOilTotalConsumptionData,
    FuelOilTotalConsumptionDataCorrection,
    HeavyWeatherData,
    LubricatingOilData,
    LubricatingOilDataCorrection,
    LubricatingOilTotalConsumptionData,
    LubricatingOilTotalConsumptionDataCorrection,
    NoonReportTimeAndPosition,
    PortOperations,
    PlannedOperations,
    ReportHeader,
    ReportRoute,
    Ship,
    ShipSpecs,
    ShipUser,
    StoppageData,
    TotalConsumptionData,
    TransoceanicBudget,
    UserProfile,
    Voyage,
    VoyageLeg,
    WeatherData
)


class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name',)


class ShipAdmin(admin.ModelAdmin):
    list_display = ('company', 'name', 'imo_reg')


# User and Company models
admin.site.register(Company, CompanyAdmin)
admin.site.register(UserProfile)
admin.site.register(Ship, ShipAdmin)
admin.site.register(ShipSpecs)
admin.site.register(ShipUser)

# Report Models
admin.site.register(Voyage)
admin.site.register(VoyageLeg)
admin.site.register(ReportHeader)
admin.site.register(NoonReportTimeAndPosition)
admin.site.register(ReportRoute)
admin.site.register(WeatherData)
admin.site.register(HeavyWeatherData)
admin.site.register(DistancePerformanceData)
admin.site.register(ConsumptionConditionData)
admin.site.register(FuelOilData)
admin.site.register(FuelOilDataCorrection)
admin.site.register(LubricatingOilData)
admin.site.register(LubricatingOilDataCorrection)
admin.site.register(FreshWaterData)
admin.site.register(StoppageData)
admin.site.register(CargoOperation)
admin.site.register(DepartureVesselCondition)
admin.site.register(DeparturePilotStation)
admin.site.register(ArrivalPilotStation)
admin.site.register(DepartureRunUp)
admin.site.register(DistanceTimeData)
admin.site.register(TransoceanicBudget)
admin.site.register(ArrivalStandbyTimeAndPosition)
admin.site.register(PlannedOperations)
admin.site.register(ActualPerformanceData)
admin.site.register(TotalConsumptionData)
admin.site.register(FuelOilTotalConsumptionData)
admin.site.register(FuelOilTotalConsumptionDataCorrection)
admin.site.register(LubricatingOilTotalConsumptionData)
admin.site.register(LubricatingOilTotalConsumptionDataCorrection)
admin.site.register(ArrrivalFWETimeAndPosition)
admin.site.register(PortOperations)
admin.site.register(EventData)