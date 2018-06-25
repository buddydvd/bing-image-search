# Bing Image Search
Tool to query the [Bing Image Search API](https://azure.microsoft.com/en-us/services/cognitive-services/bing-image-search-api/) ([v7](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference)).

## Motivation
Bing Image Search API returns up to [150](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference#count) results per API call. To access more results, you need to specify the _proper_ [`offset`](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference#offset) request parameter in subsequent API calls. This tool automates the process of filling the [`offset`](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference#offset) parameter value and determines when to stop making API calls.

## Installation
```
npm install --global bing-image-search
```

## Usage
```
usage: bing-image-search [-h] [-v] [--key KEY] [--amount AMOUNT]
                         [--market MARKET] [--safeSearch MODE]
                         [--aspect ASPECT] [--color COLOR]
                         [--imageContent TYPE] [--imageType TYPE]
                         [--license LICENSE] [--freshness VALUE] [--size SIZE]
                         [--width VALUE] [--height VALUE] [--minWidth VALUE]
                         [--minHeight VALUE] [--maxWidth VALUE]
                         [--maxHeight VALUE] [--minFileSize VALUE]
                         [--maxFileSize VALUE] [--indent SPACES]
                         [--qparam KEY VALUE] [--hparam KEY VALUE] [--raw]
                         query

Bing Image Search

Optional arguments:
  -h, --help           Show this help message and exit.
  -v, --version        Show program's version number and exit.

  Basic arguments

  query                Search query string
  --key KEY            API Key (or set BING_IMAGE_SEARCH_API_KEY instead)
  --amount AMOUNT      Total results desired (default: 2000)
  --market MARKET      Market code (e.g., "en-US")
  --safeSearch MODE    Safe search ("Off", "Moderate", "Strict")

  Filter arguments

  --aspect ASPECT      Aspect ratio ("Square", "Wide", "Tall", "All")
  --color COLOR        Color ("ColorOnly", "Monochrome", "Black", "Blue",
                       "Brown", "Gray", "Green", "Orange", "Pink", "Purple",
                       "Red", "Teal", "White", "Yellow")
  --imageContent TYPE  Content type ("Face", "Portrait")
  --imageType TYPE     Image type ("AnimatedGif", "AnimatedGifHttps",
                       "Clipart", "Line", "Photo", "Shopping", "Transparent")
  --license LICENSE    Image license type ("Any", "Public", "Share",
                       "ShareCommercially", "Modify", "ModifyCommercially",
                       "All"); "Any" excludes images without known license
  --freshness VALUE    Discovery time ("Day", "Week", "Month")
  --size SIZE          Image size ("Small", "Medium", "Large", "Wallpaper",
                       "All")
  --width VALUE        Width is equal to VALUE
  --height VALUE       Height is equal to VALUE
  --minWidth VALUE     Width is greater than or equal to VALUE
  --minHeight VALUE    Height is greater than or equal to VALUE
  --maxWidth VALUE     Width is less than or equal to VALUE
  --maxHeight VALUE    Height is less than or equal to VALUE
  --minFileSize VALUE  File is size greater than or equal to VALUE
  --maxFileSize VALUE  File is size less than or equal to VLAUE

  Special arguments

  --indent SPACES      Spaces to indent JSON outputs (default: 2)
  --qparam KEY VALUE   Add query param (multiples allowed)
  --hparam KEY VALUE   Add header param (multiples allowed)
  --raw                Do not unwrap search results from API responses
```

For more information, check out these links:
- [Get your Bing Search API Key](https://azure.microsoft.com/en-us/services/cognitive-services/bing-image-search-api/)
- [Bing Search Advanced Operator Reference](https://msdn.microsoft.com/library/ff795620.aspx)
- [Market code options](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference#market-codes)
- [SafeSearch options](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference#safesearch)

## Example
To search for "kittens", execute the following command:

**Command**
```
bing-image-search --key <YOUR_API_SUBSCRIPTION_KEY> --amount 2 kittens
```

**Output**
```JS
{
  "webSearchUrl": "https://www.bing.com/images/search?view=detailv2&FORM=OIIRPO&q=kittens&id=[redacted]&simid=[redacted]",
  "name": "wallpapers: Maine Coon kittens",
  "thumbnailUrl": "https://tse4.mm.bing.net/th?id=[redacted]&pid=Api",
  "datePublished": "2011-12-12T12:00:00.0000000Z",
  "contentUrl": "http://1.bp.blogspot.com/-9Z45_45PdN0/T5ZVrvnx7MI/AAAAAAAACLI/_omn-glE4iM/s1600/Maine+Coon+kittens.jpg",
  "hostPageUrl": "http://wallpapers-xs.blogspot.com/2012/04/maine-coon-kittens.html",
  "contentSize": "194706 B",
  "encodingFormat": "jpeg",
  "hostPageDisplayUrl": "wallpapers-xs.blogspot.com/2012/04/maine-coon-kittens.html",
  "width": 1600,
  "height": 1200,
  "thumbnail": {
    "width": 474,
    "height": 355
  },
  "imageInsightsToken": "[redacted]",
  "insightsMetadata": {
    "recipeSourcesCount": 0,
    "bestRepresentativeQuery": {
      "text": "Maine Coon Cats Kittens",
      "displayText": "Maine Coon Cats Kittens",
      "webSearchUrl": "https://www.bing.com/images/search?q=Maine+Coon+Cats+Kittens&id=[redacted]&FORM=IDBQDM"
    },
    "pagesIncludingCount": 62,
    "availableSizesCount": 18
  },
  "imageId": "A753D07B2EDAFCD2F61EG905A1EF6CC373727D84",
  "accentColor": "808A41"
}
{
  "webSearchUrl": "https://www.bing.com/images/search?view=detailv2&FORM=OIIRPO&q=kittens&id=[redacted]&simid=[redacted]",
  "name": "Kittens Wallpapers - Pets Cute and Docile",
  "thumbnailUrl": "https://tse4.mm.bing.net/th?id=[redacted]&pid=Api",
  "datePublished": "2018-03-14T22:15:00.0000000Z",
  "contentUrl": "http://1.bp.blogspot.com/-xzYw9bwU11s/T_VUmLlVG2I/AAAAAAAAD1o/RFswfHEUtAk/s1600/Kittens+wallpapers+2.jpg",
  "hostPageUrl": "http://dark-horse-adaptations.blogspot.com/2012/07/kittens-wallpapers.html",
  "contentSize": "248162 B",
  "encodingFormat": "jpeg",
  "hostPageDisplayUrl": "dark-horse-adaptations.blogspot.com/2012/07/kittens-wallpapers.html",
  "width": 1024,
  "height": 768,
  "thumbnail": {
    "width": 474,
    "height": 355
  },
  "imageInsightsToken": "[redacted]",
  "insightsMetadata": {
    "recipeSourcesCount": 0,
    "bestRepresentativeQuery": {
      "text": "Cute Calico Kitten",
      "displayText": "Cute Calico Kitten",
      "webSearchUrl": "https://www.bing.com/images/search?q=Cute+Calico+Kitten&id=[redacted]&FORM=IDBQDM"
    },
    "pagesIncludingCount": 85,
    "availableSizesCount": 20
  },
  "imageId": "832CB1C6B258E8A041A7545DAD0D5F92F2ABD8EF",
  "accentColor": "AFAB1C"
}
```

## Features
- Stops output _when requested amount is reached_ or _when there are no more results_
- [Avoids results overlap](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference#offset) by specifying the [`offset`](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference#offset) API parameter with previous response's [`nextOffset`](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference#nextoffset) value
- Sets the [`X-MSEdge-ClientID`](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference#clientid) header according to the previous API response

## Raw responses
If you specify the `--raw` flag, you get raw responses with additional metadata (e.g., [`queryExpansions`](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference#queryexpansions), [`pivotSuggestions`](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference#pivotsuggestions), [`similarTerms`](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference#similarterms) and [`relatedSearches`](https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-images-api-v7-reference#caption-relatedsearches)). To access the search results, you will need to extract them out of the `value` field from each of the raw responses.

```JS
{
  "_type": "Images",
  "totalEstimatedMatches": 834,
  "nextOffset": 195,
  "value": [
    {
      "webSearchUrl": ...,
      "name": ...,
      "thumbnailUrl": ...,
      "datePublished": ...,
      "contentUrl": ...,
      ...
    },
    ...
  ],
  "queryExpansions": ...,
  "pivotSuggestions": ...,
  "similarTerms": ...,
  "relatedSearches": ...,
  ...
}
{ ... }
{ ... }
```

## License
MIT
