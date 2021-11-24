# Proposal
Submit a short (1/2 to 1 page) proposal that outlines and describe your plan for the final project. The proposal should discuss the following aspects of the project:

## Datasets

The data set(s) you wish to use in the project.

| dataset          | description                      | source |
| ---------------- | -------------------------------- | ------ |
| Bing Street View | 12000+ street view pic from Bing |        |
| Street           | Street center line               |        |
| ACS?             |                                  |        |
| ...              |                                  |        |

## Question

The questions that you want to explore.

## Method

The analysis methods and techniques that you will use.

## Requirements

How the above items satisfy the requirements outlined in the final project description?

1. ✅ Data is collected through a means more sophisticated than downloading (e.g. scraping, API).

    The Bing StreetView is collected by [Bing Developer Api](https://www.microsoft.com/en-us/maps/choose-your-bing-maps-api). This part of codes can be found [here](./data/streetview/streetViewDownloader.ipynb)

    ```python
    def downloadImage(lon,lat):
        point = [f"{lon:.5f}" ,f"{lat:.5f}"]

        # request metadata Api
        url = apiEndpoint.replace("LAT",point[1]).replace("LON",point[0])
        h = requests.get(url)
        responseJson = h.json()
        ...    
    ```

1. At least one of the datasets contains more than 1,000,000 rows.

1. ✅ It combines data collected from 3 or more different sources.

1. The analysis of the data is reasonably complex, involving multiple steps (geospatial joins/operations, data shaping, data frame operations, etc).

1. ✅ You use one of the analysis techniques for urban street networks (e.g., osmnx, pandana), clustering (e.g., scikit-learn), or raster datasets.

1. You perform a machine learning analysis with scikit-learn as part of the analysis.

1. The webpage includes a significant interactive component (cross-filtering, interactive widgets, etc).

> As a rough guideline, we should shoot for something that is 3-4 times as involved as the required assignments.


