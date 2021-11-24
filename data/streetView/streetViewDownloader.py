#!/usr/bin/env python
# coding: utf-8

import requests
from PIL import Image
from io import BytesIO

apiKey = "AgnofOMBhhPkWbfWoS7hZ-lqafsz5tkGlf1RLsua_XLt2FAvpZOvoHXbOPts3tdm"
apiEndpoint = f"http://dev.virtualearth.net/REST/v1/Imagery/MetaData/Streetside/LAT,LON?key={apiKey}"

def concatImages(imgList):
    # horizontally concat 4 images
    buffer = Image.new('RGB', (imgList[0].width*4, imgList[0].height))
    buffer.paste(imgList[0], (0, 0))
    buffer.paste(imgList[1], (imgList[0].width, 0))
    buffer.paste(imgList[2], (imgList[0].width*2, 0))
    buffer.paste(imgList[3], (imgList[0].width*3, 0))
    return buffer

def downloadImage(lon,lat):
    '''
    Input:  lon: float, lat: float
    Output: PIL.Image
    '''
    point = [f"{lon:.5f}" ,f"{lat:.5f}"]

    # request metadata Api
    url = apiEndpoint.replace("LAT",point[1]).replace("LON",point[0])
    h = requests.get(url)
    responseJson = h.json()
    
    # check if it is successful
    if responseJson["authenticationResultCode"] != 'ValidCredentials':
        raise(RuntimeWarning(f"Response Code Invalid! Code: '{responseJson['authenticationResultCode']}'"))
    
    # request Image
    imageUrl = responseJson["resourceSets"][0]["resources"][0]["imageUrl"]    
    imageCropIdList = [[1,0],[0,1],[0,2],[0,3]]
    imageCropList = []
    for imageCropId in imageCropIdList:
        imageCropUrl = imageUrl.replace("{subdomain}","t0")\
            .replace("{faceId}",f"{imageCropId[0]}")\
            .replace("{tileId}",f"{imageCropId[1]}")
        h = requests.get(imageCropUrl)
        imageCropList.append(Image.open(BytesIO(h.content)))

    return concatImages(imageCropList)
