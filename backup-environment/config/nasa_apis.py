"""
NASA API Configuration and Data Sources
"""

# NASA API Configuration
NASA_API_KEY = "DEMO_KEY"  # Replace with actual NASA API key
EARTHDATA_USERNAME = ""    # NASA Earthdata username
EARTHDATA_PASSWORD = ""    # NASA Earthdata password

# NASA Data Sources and Endpoints
DATASETS = {
    # MODIS Data
    "MODIS_NDVI": {
        "url": "https://modis.gsfc.nasa.gov/data/dataprod/mod13.php",
        "description": "Vegetation Indices (NDVI/EVI)",
        "resolution": "250m, 500m, 1km",
        "temporal": "16-day composite"
    },
    
    # FIRMS Fire Data
    "FIRMS": {
        "url": "https://firms.modaps.eosdis.nasa.gov/api",
        "description": "Fire Information for Resource Management System",
        "endpoints": {
            "active_fires": "/country/csv/{api_key}/VIIRS_SNPP_NRT/{country}/{days}",
            "fire_archive": "/archive/csv/{api_key}/VIIRS_SNPP_NRT/{country}/{date}"
        }
    },
    
    # GRACE Water Data
    "GRACE": {
        "url": "https://grace.jpl.nasa.gov/data",
        "description": "Gravity Recovery and Climate Experiment",
        "data_types": ["groundwater", "ice_mass", "ocean_mass"]
    },
    
    # AIRS Atmospheric Data
    "AIRS": {
        "url": "https://airs.jpl.nasa.gov/data",
        "description": "Atmospheric Infrared Sounder",
        "parameters": ["temperature", "humidity", "co2", "methane"]
    },
    
    # OMI Air Quality
    "OMI": {
        "url": "https://disc.gsfc.nasa.gov/datasets/OMNO2d_V003",
        "description": "Ozone Monitoring Instrument",
        "parameters": ["NO2", "SO2", "HCHO", "aerosols"]
    },
    
    # GPM Precipitation
    "GPM": {
        "url": "https://gpm.nasa.gov/data",
        "description": "Global Precipitation Measurement",
        "products": ["IMERG", "DPR", "GMI"]
    },
    
    # Landsat Data
    "LANDSAT": {
        "url": "https://landsat.gsfc.nasa.gov/data",
        "description": "Landsat Earth Observation Satellites",
        "resolution": "30m",
        "bands": ["visible", "infrared", "thermal"]
    },
    
    # SMAP Soil Moisture
    "SMAP": {
        "url": "https://smap.jpl.nasa.gov/data",
        "description": "Soil Moisture Active Passive",
        "resolution": "9km, 36km",
        "parameters": ["soil_moisture", "freeze_thaw"]
    }
}

# NASA GIBS (Global Imagery Browse Services) Layers
GIBS_LAYERS = {
    "MODIS_Aqua_CorrectedReflectance_TrueColor": {
        "title": "MODIS Aqua Corrected Reflectance (True Color)",
        "format": "image/jpeg",
        "resolution": "250m"
    },
    "MODIS_Terra_CorrectedReflectance_TrueColor": {
        "title": "MODIS Terra Corrected Reflectance (True Color)", 
        "format": "image/jpeg",
        "resolution": "250m"
    },
    "VIIRS_SNPP_CorrectedReflectance_TrueColor": {
        "title": "VIIRS SNPP Corrected Reflectance (True Color)",
        "format": "image/jpeg", 
        "resolution": "750m"
    },
    "MODIS_Fires_All": {
        "title": "MODIS Active Fires",
        "format": "image/png",
        "resolution": "1km"
    }
}

# Real-time NASA Data Endpoints
REALTIME_ENDPOINTS = {
    "FIRMS_ACTIVE_FIRES": "https://firms.modaps.eosdis.nasa.gov/api/country/csv/{api_key}/VIIRS_SNPP_NRT/USA/1",
    "MODIS_NDVI_LATEST": "https://modis.gsfc.nasa.gov/data/dataprod/mod13.php",
    "GRACE_GROUNDWATER": "https://grace.jpl.nasa.gov/data/get-data/groundwater-depletion",
    "OMI_NO2_GLOBAL": "https://disc.gsfc.nasa.gov/datasets/OMNO2d_V003/summary",
    "GPM_PRECIPITATION": "https://gpm.nasa.gov/data/imerg"
}

# NASA Open Data Portal
NASA_OPEN_DATA = {
    "base_url": "https://data.nasa.gov/api/views",
    "datasets": {
        "meteorite_landings": "gh4g-9sfh.json",
        "exoplanet_archive": "5trs-105k.json", 
        "climate_data": "w2ew-2xhq.json"
    }
}

# NASA Earth Science Data Systems (ESDS)
ESDS_ENDPOINTS = {
    "giovanni": "https://giovanni.gsfc.nasa.gov/giovanni/",
    "earthdata": "https://earthdata.nasa.gov/",
    "worldview": "https://worldview.earthdata.nasa.gov/"
}