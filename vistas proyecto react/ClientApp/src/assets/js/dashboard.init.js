var colors = ["#727cf5", "#0acf97"];
(dataColors = $("#sales-overview").data("colors")) && (colors = dataColors.split(","));
var options = {
    chart: { height: 370, type: "line", toolbar: { show: !1 } },
    series: [{ name: "Valor Total", type: "column", data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160, 440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160, 440, 505, 414, 671, 227, 413] },
    { name: "Clientes", type: "line", data: [15, 19, 15, 23, 8, 15, 8, 12, 26, 10, 9, 6, 15, 19, 15, 23, 8, 15, 8, 12, 26, 10, 9, 6, 15, 19, 15, 23, 8, 14] }], stroke: { width: [0, 4] },
    labels: ["01 Jan 2022", "02 Jan 2022", "03 Jan 2022", "04 Jan 2022", "05 Jan 2022", "06 Jan 2022", "07 Jan 2022", "08 Jan 2022", "09 Jan 2022", "10 Jan 2022", "11 Jan 2022", "12 Jan 2022", "13 Jan 2022", "14 Jan 2022", "15 Jan 2022", "16 Jan 2022", "17 Jan 2022", "18 Jan 2022", "19 Jan 2022", "20 Jan 2022", "21 Jan 2022", "22 Jan 2022", "23 Jan 2022", "24 Jan 2022", "25 Jan 2022", "26 Jan 2022", "27 Jan 2022", "28 Jan 2022", "29 Jan 2022", "30 Jan 2022"], xaxis: { type: "datetime" },
    colors: colors, yaxis: [{ title: { text: "Valor Total" } },
    { opposite: !0, title: { text: "Clientes" } }], legend: { offsetY: 7 },
    grid: { borderColor: "#f1f3fa", padding: { bottom: 5 } }
};
(chart = new ApexCharts(document.querySelector("#sales-overview"), options)).render();

colors = ["#3bafda", "#1abc9c", "#f672a7"];
(dataColors = $("#order-overview").data("colors")) && (colors = dataColors.split(","));
options = {
    chart: {
        height: 370, type: "line", padding: { right: 0, left: 0 },
        stacked: !1, toolbar: { show: !1 }
    },
    stroke: { width: [1, 2], curve: "smooth" },
    plotOptions: { bar: { columnWidth: "50%" } },
    colors: colors, series: [{ name: "Ventas Mensuales", type: "area", data: [220, 300, 67, 22, 43, 21, 41, 56, 27, 43, 45] },
        //{name:"Clientes",type:"line",data:[30,25,36,30,45,35,64,52,59,36,39,34]}],stroke:{width:[0,4]},
    ], labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], markers: { size: 0 },
    grid: { borderColor: "#f1f3fa", padding: { bottom: 10 } }
};
(chart = new ApexCharts(document.querySelector("#order-overview"), options)).render();
var dataColors;

colors = ["#727cf5", "#02a8b5", "#fd7e14"];
(dataColors = $("#wallet-balance").data("colors")) && (colors = dataColors.split(","));
options = {
    chart: {
        height: 370, type: "line", padding: { right: 0, left: 0 },
        stacked: !1, toolbar: { show: !1 }
    },
    stroke: { width: [1, 2], curve: "smooth" },
    plotOptions: { bar: { columnWidth: "50%" } },
    colors: colors, series: [{ name: "Ventas anuales", type: "column", data: [6000000, 0, 0, 0, 0, 0] },
        //{name:"Clientes",type:"line",data:[50000,0,36,30,45,35,]}],stroke:{width:[0,4]},
    ], labels: ["2022", "2023", "2024", "2025", "2026", "2027"], markers: { size: 0 },
    grid: { borderColor: "#f1f3fa", padding: { bottom: 10 } }
};
(chart = new ApexCharts(document.querySelector("#wallet-balance"), options)).render();

/*var colors=["#727cf5","#0acf97"];
(dataColors=$("#sales-overview").data("colors"))&&(colors=dataColors.split(","));
var options={chart:{height:370,type:"line",toolbar:{show:!1}},
series:[{name:"Valor Total",type:"column",data:[440,505,414,671,227,413,201,352,752,320,257,160,440,505,414,671,227,413,201,352,752,320,257,160,440,505,414,671,227,413]},
{name:"Clientes",type:"line",data:[15,19,15,23,8,15,8,12,26,10,9,6,15,19,15,23,8,15,8,12,26,10,9,6,15,19,15,23,8,14]}],stroke:{width:[0,4]},
labels:["01 Jan 2001","02 Jan 2001","03 Jan 2001","04 Jan 2001","05 Jan 2001","06 Jan 2001","07 Jan 2001","08 Jan 2001","09 Jan 2001","10 Jan 2001","11 Jan 2001","12 Jan 2001","13 Jan 2001","14 Jan 2001","15 Jan 2001","16 Jan 2001","17 Jan 2001","18 Jan 2001","19 Jan 2001","20 Jan 2001","21 Jan 2001","22 Jan 2001","23 Jan 2001","24 Jan 2001","25 Jan 2001","26 Jan 2001","27 Jan 2001","28 Jan 2001","29 Jan 2001","30 Jan 2001"],xaxis:{type:"datetime"},
colors:colors,yaxis:[{title:{text:"Valor Total"}},
{opposite:!0,title:{text:"Clientes"}}],legend:{offsetY:7},
grid:{borderColor:"#f1f3fa",padding:{bottom:5}}};
(chart=new ApexCharts(document.querySelector("#sales-overview"),options)).render();

colors=["#3bafda","#1abc9c","#f672a7"];
(dataColors=$("#order-overview").data("colors"))&&(colors=dataColors.split(","));
options={chart:{height:370,type:"line",padding:{right:0,left:0},
stacked:!1,toolbar:{show:!1}},
stroke:{width:[1,2],curve:"smooth"},
plotOptions:{bar:{columnWidth:"50%"}},
colors:colors,series:[{name:"Desktops",type:"area",data:[44,55,41,67,22,43,21,41,56,27,43]},
{name:"Laptops",type:"line",data:[30,25,36,30,45,35,64,52,59,36,39]}],fill:{opacity:[.25,1],gradient:{inverseColors:!1,shade:"light",type:"vertical",opacityFrom:.85,opacityTo:.55,stops:[0,100,100,100]}},
labels:["01/01/2020","02/01/2020","03/01/2020","04/01/2020","05/01/2020","06/01/2020","07/01/2020","08/01/2020","09/01/2020","10/01/2020","11/01/2020"],markers:{size:0},
legend:{offsetY:7},
xaxis:{type:"datetime"},
yaxis:{labels:{formatter:function(e){return e+"k"},
offsetX:-10}},
tooltip:{shared:!0,intersect:!1,y:{formatter:function(e){return void 0!==e?e.toFixed(0)+" Dollars":e}}},
grid:{borderColor:"#f1f3fa",padding:{bottom:10}}};
(chart=new ApexCharts(document.querySelector("#order-overview"),options)).render();
var dataColors;

colors=["#727cf5","#02a8b5","#fd7e14"];
(dataColors=$("#wallet-balance").data("colors"))&&(colors=dataColors.split(","));
var chart;
options={chart:{height:340,type:"radar",toolbar:{show:!1}},
series:[{name:"Series 1",data:[80,50,30,40,100,20]},
{name:"Series 2",data:[20,30,40,80,20,80]},
{name:"Series 3",data:[44,76,78,13,43,10]}],stroke:{width:0},
fill:{opacity:.4},
markers:{size:0},
legend:{show:!1},
colors:colors,labels:["2011","2012","2013","2014","2015","2016"]};
(chart=new ApexCharts(document.querySelector("#wallet-balance"),options)).render();
*/