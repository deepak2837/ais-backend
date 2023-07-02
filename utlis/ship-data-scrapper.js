import axios from "axios";
import cheerio from "cheerio";
const url = 'https://www.vesselfinder.com/vessels/details/9462706'; // Replace with your desired URL
const list_of_mmsi = [
    416467000,
    235808000,
    419079600,
    374475000,
    419000372,
    518998272,
    205373000,
    419172000,
    352823000,
    273399650,
    636021344,
    419065300,
    538009800,
    212531000,
    538004002,
    419001664,
    405000305,
    419001116,
    419663000,
    419779000,
    419001125,
    441708000,
    636091959,
    419001230,
    419566000,
    419001665,
    215209000,
    419001795,
    432729000,
    355187000,
    419001526,
    538007142,
    538004297,
    419001637,
    355098000,
    636022492,
    352001705,
    373383000,
    419728000,
    419531000,
    538008317,
    419001114,
    441736000,
    419001548,
    419000860,
    419077700,
    419220300,
    375087000,
    419000218,
    419001591,
    419901429,
    538003035,
    257993000,
    355730000,
    525119191,
    419001575,
    419001268,
    538007023,
    419000655,
    419000392,
    419000346,
    538010526,
    419096300,
    477648500,
    419001552,
    419001747,
    419001534,
    419001481,
    477044300,
    419900470,
    419001239,
    419001238,
    613003810,
    419901983,
    419001641,
    419001471,
    419084700,
    419093300,
    419001366,
    246663000,
    419001110,
    538010328,
    419000482,
    419026700,
    419022500,
    636009384,
    419025000,
    419001111,
    419697000,
    419009000,
    419001410,
    419385000,
    477241800,
    419000791,
    419000640,
    419001522,
    356641000,
    354322000,
    419001542,
    563157500,
    538003252,
    419001527,
    419000618,
    419096100,
    419000620,
    419001493,
    636019951,
    419001717,
    419000399,
    419603000,
    419001053,
    419900150,
    636009943,
    419001465,
    636020364,
    419001231,
    419060600,
    419001201,
    419001258,
    419074100,
    538010625,
    419000128,
    273450080,
    419000329,
    419000298,
    419000327,
    419001331,
    412348000,
    419902313,
    419001246,
    419783000,
    419000391,
    419000510,
    419900923,
    419001609,
    419000619,
    419469000,
    419902252,
    419030000,
    419057700,
    419551000,
    419001530,
    419047400,
    511100932,
    419901202,
    419010200,
    419001772,
    419076800,
    440047000,
    419090700,
    419001132,
    419000923,
    351276000,
    419070400,
    419900460,
    419001106,
    419000966,
    419001500,
    419001473,
    419902026,
    419000648,
    419701000,
    419001175,
    371451000,
    626231000,
    518100958,
    538009168,
    419001296,
    419042500,
    419085200,
    419000667,
    564927000,
    419001688,
    566770000,
    419900450,
    419000184,
    419047300,
    419001065,
    419020500,
    419001371,
    419000341,
    419001673,
    419000334,
    419067900,
    419000004,
    419001353,
    419099300,
    419902025,
    419001174,
    419000491,
    376776000,
    419575000,
    419001000,
    419000660,
    419001515,
    419901201,
    419000149,
    419001491,
    636014801,
    419075800,
    419000337,
    355001000,
    636009817,
    538003860,
    354816000,
    419001585,
    419000036,
    419900756,
    419000645,
    419067800,
    352001635,
    419055600,
    373388000,
    563207000,
    355308000,
    574002820,
    636015130,
    351515000,
    352544000,
    210377000,
    220237000,
    441747000,
    353160000,
    419001541,
    419001593,
    566737000,
    357478000,
    563136600,
    518100912,
    419001628,
    419000845,
    419001809,
    419000125,
    538007698,
    419000644,
    419000000,
    419000956,
    419000854,
    477476100,
    419041600,
    374273000,
    356777000,
    352001425,
    341052001,
    372463000,
    314639000,
    466214000,
    538005622,
    353337000,
    419001676,
    373361000,
    419001685,
    352001343,
    219216000,
    419473000,
    538009979,
    305346000,
    419901427,
    419902301,
    419099400,
    351966000,
    255803780,
    636093096,
    636020416,
    636018743,
    419000162,
    452136748,
    405000293,
    353580000,
    419000636,
    248052000,
    422068100,
    419001723,
    248699000,
    463046101,
    419901203,
    419579000,
    419768000,
    563013000,
    419900390,
    419001252,
    419901255,
    419001752,
    353402000,
    419901649,
    419000533,
    721289216,
    636012807,
    273210170,
    352978118,
    419001531,
    576674000,
    356249000,
    352978218,
    533894000,
    419902300,
    563080600,
    310495000,
    525003272,
    256235000,
    311468000,
    352001708,
    636021685,
    463047101,
    419001287,
    371959000,
    574014349,
    538006314,
    477392900,
    419001682,
    677058400,
    414496000,
    419001003,
    210142000,
    417222469,
    419956527,
    419001632,
    636020437,
    419001533,
    538007908,
    538004707,
    538006648,
    419001532,
    538006061,
    636021366,
    419900754,
    419001616,
    636017306,
    419001666,
    419745000,
    419227000,
    419395000,
    355126000,
    419000409,
    636021781,
    215736000,
    419027200,
    636012662,
    636090654,
    352002154,
    419900611,
    419001236,
    431177000,
    419001425,
    533868000,
    563094900,
    419070600,
    376955000,
    576621000,
    636015879,
    477593600,
    419000120,
    419000216,
    419001543,
    352002486,
    419074600,
    636022215,
    419069800,
    419017900,
    477636200,
    538008960,
    419001197,
    419757000,
    419900753,
    419001211,
    419001074,
    563035400,
    419026600,
    441248000,
    419000914,
    566203000,
    248109000,
    419000411,
    419381000,
    339419202,
    229581000,
    419036000,
    419901430,
    259303000,
    636021347,
    538005476,
    419000212,
    372045000,
    419000846,
    419001733,
    419900758,
    419000374,
    210238000,
    419001306,
    419024700,
    419001415,
    419000141,
    419012000,
    477975000
]
// Fetch the HTML content using Axios
axios.get(url,{
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  })
  .then(response => {
    const html = response.data;

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Extract the desired data using CSS selectors
    const vesselName = $('h1.title').text().trim();
    const imoNumber = $('span:contains("IMO number")').next().text().trim();
    const flag = $('span:contains("Flag")').next().text().trim();
    const type = $('span:contains("Type")').next().text().trim();
    const grossTonnage = $('span:contains("Gross Tonnage")').next().text().trim();
const  data = $("n3").text().trim();
    // Print the extracted data
    console.log('Vessel Name:', vesselName);
    console.log('IMO Number:', imoNumber);
    console.log('Flag:', flag);
    console.log('Type:', type);
    console.log('Type:',data);
    console.log('Gross Tonnage:', grossTonnage);
  })
  .catch(error => {
    console.error('Error fetching the URL:', error);
  });
