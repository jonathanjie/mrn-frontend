# Generated by Django 4.1.1 on 2022-09-27 08:11

from decimal import Decimal
import django.contrib.gis.db.models.fields
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("marinanet", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ReportHeader",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("uuid", models.UUIDField(default=uuid.uuid4, unique=True)),
                (
                    "report_type",
                    models.CharField(
                        choices=[
                            ("NOON", "Noon at Sea"),
                            ("WAIT", "Noon Waiting"),
                            ("PORT", "Noon in Port"),
                            ("DEP", "Departure"),
                            ("ARR", "Arrival"),
                            ("BDN", "Bunker Delivery Note"),
                        ],
                        max_length=4,
                    ),
                ),
                ("report_num", models.IntegerField()),
                (
                    "cargo_presence",
                    models.TextField(
                        choices=[
                            ("BALL", "Ballast"),
                            ("LADN", "Laden"),
                            ("EAST", "Eastbound"),
                            ("WEST", "Westbound"),
                        ],
                        max_length=4,
                    ),
                ),
                ("summer_time", models.BooleanField()),
                ("position", django.contrib.gis.db.models.fields.PointField(srid=4326)),
                (
                    "status",
                    models.PositiveSmallIntegerField(
                        choices=[(0, "Inactive"), (1, "Active")]
                    ),
                ),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                ("date_modified", models.DateTimeField(auto_now=True)),
            ],
            options={
                "db_table": "report_headers",
            },
        ),
        migrations.CreateModel(
            name="FreshWaterData",
            fields=[
                (
                    "report_data",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.PROTECT,
                        primary_key=True,
                        serialize=False,
                        to="marinanet.reportheader",
                    ),
                ),
                ("rob", models.PositiveIntegerField()),
                ("consumed", models.PositiveIntegerField()),
                ("evaporated", models.PositiveIntegerField()),
                ("correction", models.IntegerField()),
                ("remarks", models.TextField()),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                ("date_modified", models.DateTimeField(auto_now=True)),
            ],
            options={
                "db_table": "fresh_water_data",
            },
        ),
        migrations.CreateModel(
            name="HeavyWeatherData",
            fields=[
                (
                    "report_data",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.PROTECT,
                        primary_key=True,
                        serialize=False,
                        to="marinanet.reportheader",
                    ),
                ),
                (
                    "heavy_weather_hours",
                    models.DecimalField(
                        decimal_places=1,
                        max_digits=3,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "heavy_weather_dist",
                    models.DecimalField(
                        decimal_places=0,
                        max_digits=3,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "heavy_weather_consumption",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=5,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "heavy_weather_wind_direction",
                    models.DecimalField(
                        decimal_places=1,
                        max_digits=4,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0")),
                            django.core.validators.MaxValueValidator(Decimal("360")),
                        ],
                    ),
                ),
                (
                    "heavy_weather_wind_speed",
                    models.DecimalField(
                        decimal_places=1,
                        max_digits=4,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "heavy_weather_max_wave_ht",
                    models.DecimalField(
                        decimal_places=1,
                        max_digits=3,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                ("date_modified", models.DateTimeField(auto_now=True)),
            ],
            options={
                "db_table": "heavy_weather_data",
            },
        ),
        migrations.CreateModel(
            name="NoonReportAtSea",
            fields=[
                (
                    "report_header",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.PROTECT,
                        primary_key=True,
                        serialize=False,
                        to="marinanet.reportheader",
                    ),
                ),
                (
                    "distance_to_go",
                    models.DecimalField(
                        decimal_places=0,
                        max_digits=5,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "hours_since_noon",
                    models.DecimalField(
                        decimal_places=1,
                        max_digits=3,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0")),
                            django.core.validators.MaxValueValidator(Decimal("48")),
                        ],
                    ),
                ),
                (
                    "hours_total",
                    models.DecimalField(
                        decimal_places=1,
                        max_digits=5,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "distance_obs_since_noon",
                    models.DecimalField(
                        decimal_places=0,
                        max_digits=3,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "distance_eng_since_noon",
                    models.DecimalField(
                        decimal_places=0,
                        max_digits=3,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "distance_eng_total",
                    models.DecimalField(
                        decimal_places=0,
                        max_digits=5,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "revolution_count",
                    models.IntegerField(
                        validators=[django.core.validators.MinValueValidator(0)]
                    ),
                ),
                (
                    "speed_since_noon",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=4,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "rpm_since_noon",
                    models.DecimalField(
                        decimal_places=1,
                        max_digits=4,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "slip_since_noon",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=4,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "speed_avg",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=4,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "rpm_avg",
                    models.DecimalField(
                        decimal_places=1,
                        max_digits=4,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "slip_avg",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=4,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                ("date_modified", models.DateTimeField(auto_now=True)),
            ],
            options={
                "db_table": "noon_reports_at_sea",
            },
        ),
        migrations.CreateModel(
            name="WeatherData",
            fields=[
                (
                    "report_data",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.PROTECT,
                        primary_key=True,
                        serialize=False,
                        to="marinanet.reportheader",
                    ),
                ),
                (
                    "weather",
                    models.TextField(
                        choices=[
                            ("B", "Blue sky (Cloud 0-2)"),
                            ("BC", "Fine but Cloudy (Cloud 3-7)"),
                            ("C", "Cloudy (Cloud 8-10)"),
                            ("D", "Drizzling rain"),
                            ("F", "Fog"),
                            ("G", "Gloom"),
                            ("H", "Hail"),
                            ("L", "Lightning"),
                            ("M", "Mist"),
                            ("O", "Overcast (Cloud 10)"),
                            ("P", "Passing showers"),
                            ("Q", "Squalls"),
                            ("R", "Rain"),
                            ("S", "Snow"),
                            ("T", "Thunder"),
                            ("U", "Ugly threatening weather"),
                            ("W", "Dew"),
                            ("Z", "Haze"),
                        ],
                        max_length=2,
                    ),
                ),
                (
                    "sea_state",
                    models.PositiveSmallIntegerField(
                        validators=[
                            django.core.validators.MinValueValidator(0),
                            django.core.validators.MaxValueValidator(9),
                        ]
                    ),
                ),
                (
                    "wind_direction",
                    models.DecimalField(
                        decimal_places=1,
                        max_digits=4,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0")),
                            django.core.validators.MaxValueValidator(Decimal("360")),
                        ],
                    ),
                ),
                (
                    "wind_speed",
                    models.DecimalField(
                        decimal_places=1,
                        max_digits=4,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "beaufort",
                    models.PositiveSmallIntegerField(
                        choices=[
                            (0, "Calm"),
                            (1, "Light air"),
                            (2, "Light breeze"),
                            (3, "Gentle breeze"),
                            (4, "Moderate breeze"),
                            (5, "Fresh breeze"),
                            (6, "Strong breeze"),
                            (7, "Near gale"),
                            (8, "Gale"),
                            (9, "Strong gale"),
                            (10, "Storm"),
                            (11, "Violent storm"),
                            (12, "Hurricane"),
                        ]
                    ),
                ),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                ("date_modified", models.DateTimeField(auto_now=True)),
            ],
            options={
                "db_table": "weather_data",
            },
        ),
        migrations.CreateModel(
            name="Voyage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("uuid", models.UUIDField(default=uuid.uuid4, unique=True)),
                ("voyage_num", models.PositiveIntegerField()),
                ("departure_date", models.DateTimeField()),
                ("departure_port", models.CharField(max_length=6)),
                ("arrival_date", models.DateTimeField()),
                ("arrival_port", models.CharField(max_length=6)),
                (
                    "status",
                    models.PositiveSmallIntegerField(
                        choices=[(0, "Inactive"), (1, "Active")]
                    ),
                ),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                ("date_modified", models.DateTimeField(auto_now=True)),
                (
                    "ship",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT, to="marinanet.ship"
                    ),
                ),
            ],
            options={
                "db_table": "voyages",
            },
        ),
        migrations.AddField(
            model_name="reportheader",
            name="voyage",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to="marinanet.voyage"
            ),
        ),
        migrations.CreateModel(
            name="BunkerData",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "fuel_type",
                    models.TextField(
                        choices=[
                            ("HFO", "HFO"),
                            ("LSFO", "LSFO"),
                            ("MDO", "MDO"),
                            ("MGO", "MGO"),
                            ("LPGP", "LPG (Propane)"),
                            ("LPGB", "LPG (Butane"),
                            ("METH", "Methanol"),
                            ("ETH", "Ethanol"),
                            ("LNG", "LNG"),
                        ],
                        max_length=4,
                    ),
                ),
                (
                    "rob",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=7,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "me_consumed",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=5,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "aux_consumed",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=5,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "boiler_consumed",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=5,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "gas_generator_consumed",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=5,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "total_consumed",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=6,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                (
                    "correction",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=7,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.0"))
                        ],
                    ),
                ),
                ("remarks", models.TextField()),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                ("date_modified", models.DateTimeField(auto_now=True)),
                (
                    "report_data",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="marinanet.reportheader",
                    ),
                ),
            ],
            options={
                "db_table": "bunker_data",
                "unique_together": {("report_data", "fuel_type")},
            },
        ),
    ]
