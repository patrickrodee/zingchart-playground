angular.module('zingClient')

.factory('Charts', ['$resource', function($resource) {
		return $resource('/api/charts/:id/', {id : "@zingId"},
			{
				'update': {url: '/api/charts/:id/', method: 'PUT'},
				'get':    {url: '/api/charts/:id/', method:'GET'},
				'save':   {method:'POST', isArray:true},
				'query':  {method:'GET', isArray:true},
				'remove': {url: '/api/charts/:id/', method:'DELETE', isArray:true}
		});
}]);
angular.module('zingClient')
.factory('Chart', function($resource) {
    return $resource('/api/charts/:id');
});



angular.module('zingClient').factory('ChartPost', ['$http', function ($http) {
	return {
		// Save Chart =================
		saveChart: function (chartData) {
			return $http.post('/api/postchart', chartData)
				.success(function(data) {
					console.log('Successfully saved!');
				})
		}
	};
}]);



var data1 = {
"graphset":[
    {
        "type":"mixed",
        "width":"70%",
        "background-color":"#454754",
        "title":{
            "y":"10px",
            "text-align":"left",
            "background-color":"none",
            "text":"SALES OVERVIEW",
            "font-weight":"normal",
            "font-family":"Arial",
            "font-color":"#ffffff",
            "font-size":"18px",
            "height":"40px",
            "padding-left":"20px"
        },
        "plotarea":{
            "margin":"75px 75px 5px 67px"
        },
        "scale-x":{
            "values":["J","F","M","A","M","J","J","A","S","O","N","D"],
            "flat":false,
            "line-color":"#55717c",
            "offset-y":"4px",
            "guide":{
                "visible":false
            },
            "label":{
                "font-size":"11px",
                "font-family":"Arial",
                "font-color":"#ffffff",
                "font-weight":"normal"
            },
            "item":{
                "tooltip":{
                    "text":"%months"
                },
                "font-size":"10px",
                "font-family":"Arial",
                "font-color":"#c0c0c0"
            },
            "tick":{
                "visible":false
            }
        },
        "scale-y":{
            "line-color":"none",
            "values":"0:100000:20000",
            "multiplier":true,
            "label":{
                "text":"Net Profit",
                "font-size":"11px",
                "font-family":"Arial",
                "font-color":"#ffffff",
                "font-weight":"normal"
            },
            "item":{
                "font-size":"10px",
                "font-family":"Arial",
                "font-color":"#c0c0c0"
            },
            "guide":{
                "line-style":"solid",
                "line-color":"#5e606c",
                "alpha":1
            },
            "tick":{
                "visible":false
            }
        },
        "scale-y-2":{
            "line-color":"none",
            "values":"0:500:100",
            "multiplier":true,
            "label":{
                "text":"Units Sold",
                "offset-x":"5px",
                "font-size":"11px",
                "font-family":"Arial",
                "font-color":"#ffffff",
                "font-weight":"normal"
            },
            "item":{
                "font-size":"10px",
                "font-family":"Arial",
                "font-color":"#c0c0c0"
            },
            "guide":{
                "visible":false
            },
            "tick":{
                "visible":false
            }
        },
        "plot":{
            
        },
        "series":[
            {
                "values":[48000,31000,62000,40500,44550,29500,46000,70050,39500,45800,29000,15000],
                "type":"bar",
                "background-color":"#6597a2",
                "hover-state":{
                    "visible":0
                },
                "tooltip":{
                    "background-color":"#2f6672",
                    "border-radius":"6px",
                    "shadow":false,
                    "padding":"5px 10px"
                },
                "animation":{
                    "delay":0,
                    "effect":4,
                    "speed":"1000",
                    "method":"0",
                    "sequence":"0"
                }
            },
            {
                "values":[110,58,104,357,294,367,285,340,397,425,254,187],
                "type":"line",
                "line-color":"#96feff",
                "line-width":2,
                "marker":{
                    "background-color":"#a3bcb8",
                    "border-width":2,
                    "shadow":0,
                    "border-color":"#88f5fa"
                },
                "tooltip":{
                    "background-color":"#54ced4",
                    "font-color":"#454754",
                    "border-radius":"6px",
                    "shadow":false,
                    "padding":"5px 10px"
                },
                "animation":{
                    "delay":500,
                    "effect":5,
                    "speed":"1800",
                    "method":"0",
                    "sequence":"1"
                },
                "scales":"scale-x,scale-y-2"
            }
        ]
    },
    {
        "type":"pie",
        "width":"34%",
        "x":"66%",
        "background-color":"#454754",
        "title":{
            "background-color":"none",
            "font-weight":"normal",
            "font-family":"Arial",
            "font-color":"#ffffff",
            "height":"40px"
        },
        "plotarea":{
            "margin":"60px 10px 0px 0px"
        },
        "plot":{
            "value-box":{
                "visible":false
            },
            "animation":{
                "delay":0,
                "effect":2,
                "speed":"300",
                "method":"0",
                "sequence":"1"
            }
        },
        "series":[
            {
                "text":"Product 1",
                "values":[15],
                "background-color":"#57dce5",
                "border-color":"#454754",
								"border-width":"1px",
                "shadow":0,
                "tooltip":{
                    "background-color":"#54ced4",
                    "font-color":"#454754",
                    "border-radius":"6px",
                    "shadow":false,
                    "padding":"5px 10px"
                }
            },
            {
                "text":"Product 2",
                "values":[18],
                "background-color":"#9688f7",
                "border-color":"#454754",
                "border-width":"1px",
                "shadow":0,
                "tooltip":{
                    "background-color":"#796bdd",
                    "font-color":"#ffffff",
                    "border-radius":"6px",
                    "shadow":false,
                    "padding":"5px 10px"
                }
            },
            {
                "text":"Product 3",
                "values":[20],
                "background-color":"#b659b4",
                "border-color":"#454754",
                "border-width":"1px",
                "shadow":0,
                "tooltip":{
                    "background-color":"#a03f9c",
                    "font-color":"#ffffff",
                    "border-radius":"6px",
                    "shadow":false,
                    "padding":"5px 10px"
                }
            },
            {
                "text":"Product 4",
                "values":[16],
                "background-color":"#3bbcfc",
                "border-color":"#454754",
                "border-width":"1px",
                "shadow":0,
                "tooltip":{
                    "background-color":"#1b9ede",
                    "font-color":"#ffffff",
                    "border-radius":"6px",
                    "shadow":false,
                    "padding":"5px 10px"
                }
            },
            {
                "text":"Product 5",
                "values":[21],
                "background-color":"#6597a2",
                "border-color":"#454754",
                "border-width":"1px",
                "shadow":0,
                "tooltip":{
                    "background-color":"#2f6672",
                    "font-color":"#ffffff",
                    "border-radius":"6px",
                    "shadow":false,
                    "padding":"5px 10px"
                }
            }
        ]
    },
    {
        "type":"bar",
        "width":"100%",
        "background-color":"#454754",
        "border-bottom":"8px solid #565867",
        "plot":{
            "bar-space":"10px",
            "animation":{
                "delay":0,
                "effect":4,
                "speed":"1000",
                "method":"0",
                "sequence":"0"
            }
        },
        "plotarea":{
            "margin":"45px 30px 40px 65px"
        },
        "scale-x":{
            "values":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            "line-color":"#55717c",
            "offset-y":"4px",
            "tick":{
                "size":"5px",
                "line-color":"#55717c",
                "line-width":"1px",
                "visible":false
            },
            "guide":{
                "visible":false
            },
            "item":{
                "font-size":"10px",
                "font-family":"Arial",
                "font-color":"#c0c0c0"
            }
        },
        "scale-y":{
            "line-color":"none",
            "values":"0:50000:10000",
            "multiplier":true,
            "guide":{
                "line-style":"solid",
                "line-color":"#5e606c",
                "alpha":1
            },
            "tick":{
                "visible":false
            },
            "label":{
                "text":"Sales by Employee",
                "offset-x":"-5px",
                "font-size":"11px",
                "font-family":"Arial",
                "font-color":"#ffffff",
                "font-weight":"normal"
            },
            "item":{
                "padding-left":"2px",
                "font-size":"10px",
                "font-family":"Arial",
                "font-color":"#c0c0c0"
            }
        },
        "series":[
            {
                "values":[31000,39500,24300,36000,38000,45500,28500,38000,21000,17000,24000,17500],
                "background-color":"#57dde8",
                "tooltip":{
                    "background-color":"#54ced4",
                    "font-color":"#454754",
                    "border-radius":"6px",
                    "shadow":false,
                    "padding":"5px 10px"
                }
            },
            {
                "values":[11500,36750,7000,44500,11500,28450,42900,26750,13050,32600,12500,14300],
                "background-color":"#978af6",
                "tooltip":{
                    "background-color":"#796bdd",
                    "font-color":"#ffffff",
                    "border-radius":"6px",
                    "shadow":false,
                    "padding":"5px 10px"
                }
            },
            {
                "values":[21500,29550,14500,16500,28450,35600,21550,18750,11600,7500,14750,16000],
                "background-color":"#b857b4",
                "tooltip":{
                    "background-color":"#a03f9c",
                    "font-color":"#ffffff",
                    "border-radius":"6px",
                    "shadow":false,
                    "padding":"5px 10px"
                }
            }
        ]
    }
]
};

var data2 = {
"graphset":[
    {
        "background-color":"none",
        "type":"area",
        "height":"65%",
        "width":"97%",
        "title":{
            "text":"AUDIENCE",
            "font-family":"Dosis",
            "font-size":"14px",
            "font-color":"#666666",
            "background-color":"none",
            "align":"left",
            "font-weight":"normal",
            "x":"3%"
        },
        "plotarea":{
            "margin":"40 0 20 60"
        },
        "scaleX":{
            "values":["","22 Dec","23 Dec","24 Dec","25 Dec","26 Dec","27 Dec","28 Dec","29 Dec","30 Dec","31 Dec"],
            "line-color":"#666666",
            "line-width":"1px",
            "item":{
                "font-family":"Dosis",
                "font-size":"10px",
                "color":"#717b7c"
            },
            "tick":{
                "visible":false
            },
            "guide":{
                "rules":[
                    {
                        "rule":"%i == 0",
                        "visible":false
                    },
                    {
                        "rule":"%i > 0",
                        "line-style":"solid",
                        "line-width":"1px",
                        "line-color":"#666666",
                        "alpha":"0.25"
                    },
                    {
                        "rule":"%i == 11",
                        "visible":false
                    }
                ]
            }
        },
        "scaleY":{
            "item":{
                "font-family":"Dosis",
                "font-size":"10px",
                "color":"#717b7c",
                "rules":[
                    {
                        "rule":"%i == 0",
                        "visible":false
                    },
                    {
                        "rule":"%i == 10",
                        "visible":false
                    }
                ]
            },
            "line-color":"none",
            "multiplier":true,
            "guide":{
                "line-style":"solid"
            },
            "tick":{
                "visible":false
            }
        },
        "plot":{
            
        },
        "series":[
            {
                "aspect":"spline",
                "step-start":"before",
                "line-width":"1px",
                "line-color":"#71c5d2",
                "background-color":"#8fdeea",
                "alpha-area":1,
                "marker":{
                    "visible":"false"
                },
                "values":[0,27000,39000,48000,70000,74000,98000,70000,72000,68000,49000,0]
            },
            {
                "aspect":"spline",
                "step-start":"before",
                "line-width":"1px",
                "line-color":"#2cafc3",
                "background-color":"#45c8dc",
                "alpha-area":1,
                "marker":{
                    "visible":"false"
                },
                "values":[1000,9000,36000,88000,65000,48000,84000,93000,39000,82000,45000,0]
            },
            {
                "type":"line",
                "line-color":"none",
                "line-width":0,
                "border-color":"none",
                "shadow":"none",
                "hover-state":{
                    "visible":false
                },
                "tooltip":{
                    "visible":false
                },
                "marker":{
                    "flat":true,
                    "type":"circle",
                    "background-color":"#8fdeea",
                    "border-color":"none",
                    "shadow":0
                },
                "hover-marker":{
                    "visible":false
                },
                "values":[null,100000,100000,100000,100000,100000,100000,100000,100000,100000,100000,null]
            }
        ]
    },
    {
        "type":"pie",
        "background-color":"none",
        "height":"35%",
        "width":"35%",
        "y":"68%",
        "x":"3%",
        "title":{
            "text":"DETAILS",
            "font-family":"Dosis",
            "font-size":"14px",
            "color":"#717b7c",
            "background-color":"none",
            "align":"left",
            "font-weight":"normal"
        },
        "labels":[
            {
                "text":"Overall Visits",
                "font-size":"10px",
                "font-family":"Dosis",
                "color":"#717b7c",
                "x":"20%",
                "y":"80%"
            }
        ],
        "plot":{
            "slice":35,
            "ref-angle":270,
            "shadow":"false",
            "border-color":"none",
            "offset-y":"-7%",
            "offset-x":"-70%"
        },
        "plotarea":{
            "margin-top":10,
            "x":"20%"
        },
        "series":[
            {
                "values":[192],
                "background-color":"#26abbf",
                "value-box":{
                    "visible":true,
                    "anchor":"c",
                    "font-family":"Dosis",
                    "type":"first",
                    "connected":false,
                    "placement":"in",
                    "text":"%vk",
                    "font-color":"#717b7c",
                    "font-size":"24px",
                    "font-weight":"normal",
                    "offset-x":"-15%",
                    "offset-y":"-35%"
                }
            },
            {
                "values":[30],
                "background-color":"#d5e0e1",
                "value-box":{
                    "visible":false
                }
            }
        ]
    },
    {
        "type":"pie",
        "background-color":"none",
        "height":"35%",
        "width":"35%",
        "y":"68%",
        "x":"25%",
        "labels":[
            {
                "text":"New Visitors",
                "font-size":"10px",
                "font-family":"Dosis",
                "color":"#717b7c",
                "x":"30%",
                "y":"80%"
            }
        ],
        "plot":{
            "slice":35,
            "ref-angle":270,
            "value-box":{
                "visible":"false"
            },
            "shadow":"false",
            "border-color":"none",
            "offset-y":"-7%",
            "offset-x":"-70%"
        },
        "plotarea":{
            "margin-top":10,
            "x":"30%"
        },
        "series":[
            {
                "values":[66],
                "background-color":"#26abbf",
                "value-box":{
                    "visible":true,
                    "anchor":"c",
                    "font-family":"Dosis",
                    "type":"first",
                    "connected":false,
                    "placement":"in",
                    "text":"%v%",
                    "font-color":"#717b7c",
                    "font-size":"24px",
                    "font-weight":"normal",
                    "offset-x":"-30%",
                    "offset-y":"-18%"
                }
            },
            {
                "values":[34],
                "background-color":"#d5e0e1",
                "value-box":{
                    "visible":false
                }
            }
        ]
    },
    {
        "type":"pie",
        "background-color":"none",
        "height":"35%",
        "width":"35%",
        "y":"68%",
        "x":"50%",
        "labels":[
            {
                "text":"Mobile Visitors",
                "font-size":"10px",
                "font-family":"Dosis",
                "color":"#717b7c",
                "x":"32%",
                "y":"80%"
            }
        ],
        "plot":{
            "slice":35,
            "ref-angle":270,
            "value-box":{
                "visible":"false"
            },
            "shadow":"false",
            "border-color":"none",
            "offset-y":"-7%",
            "offset-x":"-70%"
        },
        "plotarea":{
            "margin-top":10,
            "x":"33%"
        },
        "series":[
            {
                "values":[75],
                "background-color":"#26abbf",
                "value-box":{
                    "visible":true,
                    "anchor":"c",
                    "font-family":"Dosis",
                    "type":"first",
                    "connected":false,
                    "placement":"in",
                    "text":"%v%",
                    "font-color":"#717b7c",
                    "font-size":"24px",
                    "font-weight":"normal",
                    "offset-x":"-25%",
                    "offset-y":"-25%"
                }
            },
            {
                "values":[25],
                "background-color":"#d5e0e1",
                "value-box":{
                    "visible":false
                }
            }
        ]
    },
    {
        "type":"pie",
        "background-color":"none",
        "height":"35%",
        "width":"35%",
        "y":"68%",
        "x":"75%",
        "labels":[
            {
                "text":"Desktop Visitors",
                "font-size":"10px",
                "font-family":"Dosis",
                "color":"#717b7c",
                "x":"28%",
                "y":"80%"
            }
        ],
        "plot":{
            "slice":35,
            "ref-angle":270,
            "value-box":{
                "visible":"false"
            },
            "shadow":"false",
            "border-color":"none",
            "offset-y":"-7%",
            "offset-x":"-70%"
        },
        "plotarea":{
            "margin-top":10,
            "x":"30%"
        },
        "series":[
            {
                "values":[25],
                "background-color":"#26abbf",
                "value-box":{
                    "visible":true,
                    "anchor":"c",
                    "font-family":"Dosis",
                    "type":"first",
                    "connected":false,
                    "placement":"in",
                    "text":"%v%",
                    "font-color":"#717b7c",
                    "font-size":"24px",
                    "font-weight":"normal",
                    "offset-x":"-25%",
                    "offset-y":"28%"
                }
            },
            {
                "values":[75],
                "background-color":"#d5e0e1",
                "value-box":{
                    "visible":false
                }
            }
        ]
    }
]
};

angular.module('zingClient')
.factory("_charts", ['$resource', function($resource) {
	return  [{ "_id" :"5409ebf584abf9b80a023652", "lockCode" : "4bbf803fac4017c8bedd655c971d2ab1", "zingId" : "5409ebf50364d", "created" : "2014-09-05T16:59:33.042Z", "ip" : "137.110.42.33", "name" : "Untitled", "width" : 657, "height" : 831, "keywords" : [ "stuff" ], "write_permissions" : [ ], "read_permissions" : [ ], "update_count" : 1, "__v" : 0 }, 
	{ "_id" :"5409ec0884abf9b80a023654", "lockCode" : "c88ca2cbf5f5694a863311df6912d987", 
	"zingId" : "5409ec080364f",
	"created" : "2014-09-05T16:59:52.917Z",
	"ip" : "24.4.204.250", 
	"name" : "Sales Overview", 
	"data": JSON.stringify(data1,null,'\t'),
	"output" : "img",
	"image_format" : "png", 
	"watermark_type" : "light",
	"watermark_position" : "top-right",
	"keywords" : [ "keyword" ],
	"write_permissions" : [ ], 
	"read_permissions" : [ ],
	"update_count" : 1,
	"__v" : 0 },
{ "_id" : "540a24b7091aefcb171387ba", 
"lockCode" : "463f11e957f2fd299c8b573138ffc193", 
"zingId" : "540a24b792616", 
"created" :"2014-09-05T21:01:43.495Z",
"ip" : "24.4.204.250",
"name" : " Dashboard (font-family)",
"data" : JSON.stringify(data2, null, '\t'),
"output" : "img"
, "image_format" : "jpg",
"watermark_type" : "dark",
"watermark_position" : "top-right",
"encoding" : "base64",
"keywords" : [ "need to click perfectly" ], 
"write_permissions" : [ ],
"read_permissions" : [ ],
"update_count" : 1,
"__v" : 0 } ];

}]);

