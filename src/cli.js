import { ArgumentParser, Const } from 'argparse';
import search from 'bing-image-search-async-iterator';
import { version } from '../package.json';

function keyValuePairsToObject(kvps = []) {
  return kvps.reduce((acc, [k, v]) => { acc[k] = v; return acc; }, {});
}

(async () => {
  try {
    const parser = new ArgumentParser({
      version,
      addHelp: true,
      description: 'Bing Image Search',
    });

    const defaultAG = parser.addArgumentGroup({ description: 'Basic arguments' });
    defaultAG.addArgument(['query'],          { help: 'Search query string' });
    defaultAG.addArgument(['--key'],          { help: 'API Key (or set BING_IMAGE_SEARCH_API_KEY instead)', defaultValue: process.env.BING_IMAGE_SEARCH_API_KEY, required: process.env.BING_IMAGE_SEARCH_API_KEY == null });
    defaultAG.addArgument(['--amount'],       { help: 'Total results desired (default: 2000)', type: 'int', defaultValue: 2000 });
    defaultAG.addArgument(['--market'],       { help: 'Market code (e.g., "en-US")' });
    defaultAG.addArgument(['--safeSearch'],   { help: 'Safe search ("Off", "Moderate", "Strict")', metavar: 'MODE', choices: ['Off', 'Moderate', 'Strict'] });

    const filtersAG = parser.addArgumentGroup({ description: 'Filter arguments' });
    filtersAG.addArgument(['--aspect'],       { help: 'Aspect ratio ("Square", "Wide", "Tall", "All")', metavar: 'ASPECT', choices: ['Square', 'Wide', 'Tall', 'All'] });
    filtersAG.addArgument(['--color'],        { help: 'Color ("ColorOnly", "Monochrome", "Black", "Blue", "Brown", "Gray", "Green", "Orange", "Pink", "Purple", "Red", "Teal", "White", "Yellow")', metavar: 'COLOR', choices: ['ColorOnly', 'Monochrome', 'Black', 'Blue', 'Brown', 'Gray', 'Green', 'Orange', 'Pink', 'Purple', 'Red', 'Teal', 'White', 'Yellow'] });
    filtersAG.addArgument(['--imageContent'], { help: 'Content type ("Face", "Portrait")', metavar: 'TYPE', choices: ['Face', 'Portrait'] });
    filtersAG.addArgument(['--imageType'],    { help: 'Image type ("AnimatedGif", "AnimatedGifHttps", "Clipart", "Line", "Photo", "Shopping", "Transparent")', metavar: 'TYPE', choices: ['AnimatedGif', 'AnimatedGifHttps', 'Clipart', 'Line', 'Photo', 'Shopping', 'Transparent'] });
    filtersAG.addArgument(['--license'],      { help: 'Image license type ("Any", "Public", "Share", "ShareCommercially", "Modify", "ModifyCommercially", "All"); "Any" excludes images without known license', metavar: 'LICENSE', choices: ['Any', 'Public', 'Share', 'ShareCommercially', 'Modify', 'ModifyCommercially', 'All'] });
    filtersAG.addArgument(['--freshness'],    { help: 'Discovery time ("Day", "Week", "Month")', metavar: 'VALUE', choices: ['Day', 'Week', 'Month'] });
    filtersAG.addArgument(['--size'],         { help: 'Image size ("Small", "Medium", "Large", "Wallpaper", "All")', metavar: 'SIZE', choices: ['Small', 'Medium', 'Large', 'Wallpaper', 'All'] });
    filtersAG.addArgument(['--width'],        { help: 'Width is equal to VALUE', type: 'int', metavar: 'VALUE' });
    filtersAG.addArgument(['--height'],       { help: 'Height is equal to VALUE', type: 'int', metavar: 'VALUE' });
    filtersAG.addArgument(['--minWidth'],     { help: 'Width is greater than or equal to VALUE', type: 'int', metavar: 'VALUE' });
    filtersAG.addArgument(['--minHeight'],    { help: 'Height is greater than or equal to VALUE', type: 'int', metavar: 'VALUE' });
    filtersAG.addArgument(['--maxWidth'],     { help: 'Width is less than or equal to VALUE', type: 'int', metavar: 'VALUE' });
    filtersAG.addArgument(['--maxHeight'],    { help: 'Height is less than or equal to VALUE', type: 'int', metavar: 'VALUE' });
    filtersAG.addArgument(['--minFileSize'],  { help: 'File is size greater than or equal to VALUE', type: 'int', metavar: 'VALUE' });
    filtersAG.addArgument(['--maxFileSize'],  { help: 'File is size less than or equal to VLAUE', type: 'int', metavar: 'VALUE' });

    const specialAG = parser.addArgumentGroup({ description: 'Special arguments' });
    specialAG.addArgument(['--offset'],       { help: 'Initial offset for API call (default: 0)', type: 'int', defaultValue: 0, ...{ help: Const.SUPPRESS } });
    specialAG.addArgument(['--count'],        { help: 'Result count per API call (default: 150)', type: 'int', defaultValue: 150, ...{ help: Const.SUPPRESS } });
    specialAG.addArgument(['--indent'],       { help: 'Spaces to indent JSON outputs (default: 2)', type: 'int', defaultValue: 2, metavar: 'SPACES' });
    specialAG.addArgument(['--qparam'],       { help: 'Add query param (multiples allowed)', nargs: 2, action: 'append', metavar: ['KEY', 'VALUE'], defaultValue: [] });
    specialAG.addArgument(['--hparam'],       { help: 'Add header param (multiples allowed)', nargs: 2, action: 'append', metavar: ['KEY', 'VALUE'], defaultValue: [] });
    specialAG.addArgument(['--raw'],          { help: 'Do not unwrap search results from API responses', nargs: 0 });



    const args = parser.parseArgs();
    const searchOpts = {
      query:          args.query,
      key:            args.key,
      amount:         args.amount,
      market:         args.market,
      safeSearch:     args.safeSearch,
      aspect:         args.aspect,
      color:          args.color,
      imageContent:   args.imageContent,
      imageType:      args.imageType,
      license:        args.license,
      freshness:      args.freshness,
      size:           args.size,
      width:          args.width,
      height:         args.height,
      minWidth:       args.minWidth,
      minHeight:      args.minHeight,
      maxWidth:       args.maxWidth,
      maxHeight:      args.maxHeight,
      minFileSize:    args.minFileSize,
      maxFileSize:    args.maxFileSize,
      offset:         args.offset,
      count:          args.count,
      queryParams:    keyValuePairsToObject(args.qparam),
      headerParams:   keyValuePairsToObject(args.hparam),
    };
    const responses = search(searchOpts);
    for (let step; !(step = await responses.next()).done;) {
      const response = step.value;
      const outputFn = obj => console.log(JSON.stringify(obj, null, args.indent));
      if (args.raw) {
        outputFn(response);
      } else {
        response.value.forEach(outputFn);
      }
    }
  } catch (err) {
    process.exitCode = 1;
    console.error(err.message);
  }
})();
