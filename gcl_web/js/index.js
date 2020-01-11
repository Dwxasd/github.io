$(function (){
    // echart_map();
    echart_1();
    echart_2();
    echart_3();
    echart_4();
    echart_5();
    echart_6();
    echart_7();
    echart_8();
    echart_9();

     // 中国地图数据流向沈阳
	function echart_map(){
		 // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_map'));

        var mapName = 'china'
        var data = []
        var toolTipData = [];
        /*获取地图数据*/
        myChart.showLoading();
        var mapFeatures = echarts.getMap(mapName).geoJson.features;
        myChart.hideLoading();
        var geoCoordMap = {
            '烟台': [121.39, 37.52],
            '辽阳': [123.1724, 41.2733],
            '沈阳': [123.38, 41.8]

        };

         var GZData = [
            [{
                name: '沈阳'
            }, {
                name: '烟台',
                value: 95
            }],
            [{
                name: '沈阳'
            }, {
                name: '辽阳',
                value: 30
            }]
        ];


        // 根据data得到每个data中城市的坐标
        //convertData是函数的返回值res吗？
        //参数data又是什么呢？
        var convertData = function (data) {       //定义的函数不给名称叫匿名函数
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[1].name];//获取城市的名字
                var toCoord = geoCoordMap[dataItem[0].name];//获取城市的经纬度
                if (fromCoord && toCoord) {
                    // push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度
                    res.push({
                        fromName: dataItem[1].name,
                        toName: dataItem[0].name,
                        /*fromName: dataItem[1].name,
                        toName: dataItem[0].name,*/
                        coords: [fromCoord, toCoord]
                    });
                }
            }
            return res;
        };

        var color = ['#c5f80e'];
        var series = [];
        [
            ['沈阳', GZData]
        ].forEach(function (item, i) {
            series.push({
                name: item[0],
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: 'arrow',
                    symbolSize: 5
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            }, {
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
        });

        option = {
            tooltip: {
                trigger: 'item'
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(47,79,79, .1)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        // shadowColor: 'rgba(255, 255, 255, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                    emphasis: {
                        areaColor: '#389BB7',
                        borderWidth: 0
                    }
                }
            },
            series: series
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });

	}

//锚杆应立计实时数据
    function echart_5() {
        var myChart = echarts.init(document.getElementById('chart_5'));
        var time = ['5/1 10:10','5/1 10:16','5/1 10:22','5/1 10:28','5/1 10:34'];
        var da1 = [-0.68067,-0.6833,-0.6833,-0.69014,-0.6833];
        var da2 = [-0.83771,-0.83986,-0.8391,-0.83543,-0.8391];
        var da3 = [0.0296,0.028,0.03186,0.03026,0.0296];
        var da4 = [0.05618,0.05881,0.07099,0.05701,0.05438];
        var db1 = [-0.6308,-0.6363,-0.63169,-0.63169,-0.63362];
        var db2 = [-0.25701,-0.25887,-0.25701,-0.25801,-0.2553];
        var db3 = [-0.72248,-0.7193,-0.72089,-0.72248,-0.72169];
        var db4 = [0.3102,0.31481,0.30663,0.30842,0.30752];

        // var now = new Date();

        // time.push(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
        // da1.push((Math.random() * 40 + 60).toFixed(2)); //取60到100间的随机数，toFixed()方法可把 Number 四舍五入为指定小数位数的数字
        // da2.push((Math.random() * 60 + 20).toFixed(2));
        // da3.push((Math.random() * 20 + 80).toFixed(2));
        // 配置项
        var option = {
            // title: {
            //     text: '集群中各个服务器CPU使用率',
            //     subtext: 'made by 王雷鸣',
            //     left: 'center'
            // },
            tooltip: {
                trigger: 'axis'
            },
            toolbox:{
                feature:{
                    saveAsImage: {}
                }
            },
            grid:{                   //绘图区域和图表容器之间的间隔
                top: '25%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true  //grid 区域是否包含坐标轴的刻度标签,默认为false
            },
            legend: {
                // right:'20%',
                // left:'20%',
                data:['A1','A2','A3','A4','B1','B2','B3','B4'],
                textStyle:{
                    color: '#fff'
                },
                top: '8%'
            },
            // xAixs: {因为拼错了这个单词导致我好久没找到错误所在
            xAxis: {
                type: 'category',
                data: time,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            // y轴此处为默认
            yAxis: {
                type:'value',
                axisLabel:{
                    formatter: '{value}kN'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            // series为对象的数组
            series: [{
                name: 'A1',
                type: 'line',
                data: da1
            },{
                name: 'A2',
                type: 'line',
                data: da2
            },{
                name: 'A3',
                type: 'line',
                data: da3
            },{
                name: 'A4',
                type: 'line',
                data: da4
            },{
                name: 'B1',
                type: 'line',
                data: db1
            },{
                name: 'B2',
                type: 'line',
                data: db2
            },{
                name: 'B3',
                type: 'line',
                data: db3
            },{
                name: 'B4',
                type: 'line',
                data: db4
            }]
        };

        myChart.setOption(option);

        // setInterval(function(){

        //     if(time.length == 5){  //保持10秒的长度
        //         time.shift();       //shift() 方法用于把数组的第一个元素从其中删除
        //         data1.shift();
        //         data2.shift();
        //         data3.shift();
        //     }

        //     var now = new Date();
        //     time.push(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());  //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度
        //     data1.push((Math.random() * 40 - 30).toFixed(2)); //取60到100间的随机数，toFixed()方法可把 Number 四舍五入为指定小数位数的数字
        //     data2.push((Math.random() * 60 - 50).toFixed(2));
        //     data3.push((Math.random() * 20 + 80).toFixed(2));

        //     myChart.setOption({  //实时更新变化的配置项并加载
        //         xAxis:{
        //             data: time
        //         },
        //         series:[{
        //             data: data1
        //         },{
        //             data: data2
        //         },{
        //             data: data3
        //         }]
        //     });
        // },6000)  //1000代表每一秒调用/刷新一次
    }

//载荷变化速率
    function echart_9() {
        var myChart = echarts.init(document.getElementById('chart_9'));
        var time = ['5/1 10:10','5/1 10:16','5/1 10:22','5/1 10:28','5/1 10:34'];
        var da1 = [0.0000,   -0.0004,     0.0000,  -0.0011,     0.0011 ];
        var da2 = [0.0004,   -0.0004,     0.0001,  0.0006,  -0.0006 ];
        var da3 = [-0.0005,  -0.0003,     0.0006,  -0.0003,     -0.0001 ];
        var da4 = [0.0022,   0.0004,  0.0020,  -0.0023,     -0.0004 ];
        var db1 = [0.0001,   -0.0009,     0.0008,  0.0000,  -0.0003 ];
        var db2 = [0.0010,   -0.0003,     0.0003,  -0.0002,     0.0005 ];
        var db3 = [-0.0007,  0.0010,  0.0004,  0.0005,  0.0021 ];
        var db4 = [-0.0071,  0.0008,  -0.0014,     0.0003,  -0.0002 ];
        // var time = ['5/1 10:16','5/1 10:22','5/1 10:28','5/1 10:34','5/1 10:40'];
        // var da1 = [-0.6833,-0.6833,-0.69014,-0.6833,-0.68942];
        // var da2 = [-0.83986,-0.8391,-0.83543,-0.8391,-0.8391];
        // var da3 = [0.028,0.03186,0.03026,0.0296,0.03106];
        // var da4 = [0.05881,0.07099,0.05701,0.05438,0.05881];
        // var db1 = [-0.6363,-0.63169,-0.63169,-0.63362,-0.63258];
        // var db2 = [-0.25887,-0.25701,-0.25801,-0.2553,-0.25701];
        // var db3 = [-0.7193,-0.72089,-0.72248,-0.72169,-0.72169];
        // var db4 = [0.31481,0.30663,0.30842,0.30752,0.30842];
        // var now = new Date();

        // time.push(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
        // da1.push((Math.random() * 40 + 60).toFixed(2)); //取60到100间的随机数，toFixed()方法可把 Number 四舍五入为指定小数位数的数字
        // da2.push((Math.random() * 60 + 20).toFixed(2));
        // da3.push((Math.random() * 20 + 80).toFixed(2));
        // 配置项
        var option = {
            // title: {
            //     text: '集群中各个服务器CPU使用率',
            //     subtext: 'made by 王雷鸣',
            //     left: 'center'
            // },
            tooltip: {
                trigger: 'axis'
            },
            toolbox:{
                feature:{
                    saveAsImage: {}
                }
            },
            grid:{                   //绘图区域和图表容器之间的间隔
                top: '35%',
                left: '5%',
                right: '4%',
                bottom: '1%',
                containLabel: true  //grid 区域是否包含坐标轴的刻度标签,默认为false
            },
            legend: {
                // right:'20%',
                // left:'20%',
                data:['A1','A2','A3','A4','B1','B2','B3','B4'],
                textStyle:{
                    color: '#fff'
                },
                top: '8%'
            },
            // xAixs: {因为拼错了这个单词导致我好久没找到错误所在
            xAxis: {
                type: 'category',
                data: time,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            // y轴此处为默认
            yAxis: {
                name:'载荷变化速率(kN/min)',
                type:'value',
                axisLabel:{
                    formatter: '{value}'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            // series为对象的数组
            series: [{
                name: 'A1',
                type: 'line',
                data: da1
            },{
                name: 'A2',
                type: 'line',
                data: da2
            },{
                name: 'A3',
                type: 'line',
                data: da3
            },{
                name: 'A4',
                type: 'line',
                data: da4
            },{
                name: 'B1',
                type: 'line',
                data: db1
            },{
                name: 'B2',
                type: 'line',
                data: db2
            },{
                name: 'B3',
                type: 'line',
                data: db3
            },{
                name: 'B4',
                type: 'line',
                data: db4
            }]
        };

        myChart.setOption(option);

        // setInterval(function(){

        //     if(time.length == 5){  //保持10秒的长度
        //         time.shift();       //shift() 方法用于把数组的第一个元素从其中删除
        //         data1.shift();
        //         data2.shift();
        //         data3.shift();
        //     }

        //     var now = new Date();
        //     time.push(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());  //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度
        //     data1.push((Math.random() * 40 - 30).toFixed(2)); //取60到100间的随机数，toFixed()方法可把 Number 四舍五入为指定小数位数的数字
        //     data2.push((Math.random() * 60 - 50).toFixed(2));
        //     data3.push((Math.random() * 20 + 80).toFixed(2));

        //     myChart.setOption({  //实时更新变化的配置项并加载
        //         xAxis:{
        //             data: time
        //         },
        //         series:[{
        //             data: data1
        //         },{
        //             data: data2
        //         },{
        //             data: data3
        //         }]
        //     });
        // },6000)  //1000代表每一秒调用/刷新一次
    }

//位移值
    function echart_1() {
		//初始化echarts
        var myChart = echarts.init(document.getElementById('chart_1'));
		//横轴刻度值
        var time = ['5/1 10:01','5/1 10:07','5/1 10:13','5/1 10:19','5/1 10:25'];
		//位移计两套8个测点的数据
        var da1 = [-0.0362,-0.0388,-0.0440,-0.0471,-0.0518];
        var da2 = [0.0552 , 0.0570, 0.0580, 0.0562, 0.0602];
        var da3 = [-0.0517,-0.0572,-0.0588,-0.0618,-0.0649];
        var da4 = [-0.0707,-0.0732,-0.0707,-0.0744,-0.0762];
        var db1 = [-1.1447,-1.1456,-1.1475,-1.1462,-1.1496];
        var db2 = [-1.0619,-1.0649,-1.0673,-1.0691,-1.0788];
        var db3 = [-0.7687,-0.7686,-0.7692,-0.7691,-0.7699];
        var db4 = [-1.2087,-1.2087,-1.2068,-1.2068,-1.2105];
        // var now = new Date();

        // time.push(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
        // da1.push((Math.random() * 40 + 60).toFixed(2)); //取60到100间的随机数，toFixed()方法可把 Number 四舍五入为指定小数位数的数字
        // da2.push((Math.random() * 60 + 20).toFixed(2));
        // da3.push((Math.random() * 20 + 80).toFixed(2));
		
        // 配置项
        var option = {
            //提示框
            tooltip: {
                trigger: 'axis'
            },
            toolbox:{
                feature:{
                    saveAsImage: {}
                }
            },
			//绘图区
            grid:{
				//绘图区域和图表容器之间的间隔
                top: '25%',
                left: '3%',
                right: '4%',
                bottom: '3%',
				//grid 区域是否显示坐标轴的刻度值,默认为false不显示
                containLabel: true  
            },
			//图例
            legend: {
				//图例水平排列（竖直排列为：vertical）
                orient: 'horizontal',  
				//每个数据系列的图例的名字，系列名和图例名一样时才会显示出来
                data:['A2','A4','A5','A6','B1','B2','B3','B6'],
                textStyle:{
                    color: '#fff'
                },
                top: '8%'
            },
			//X轴
            xAxis: {
				//轴类型：类目
                type: 'category',
				//数据源
                data: time,
				//对应到轴上每个刻度值的网格线
                splitLine: {
					//网格线不显示
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            // y轴
            yAxis: {
                type:'value',
				//轴标签
                axisLabel:{
					//标签格式
                    formatter: '{value}mm'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine:{    
                    show:true,
                    lineStyle:{
                        type:'dashed'  //虚线
                    }
                },
            },
            // 显示的数据系列[{系列一},{系列二}，...]
            series: [{
                name: 'A2',
                type: 'line',
                data: da1,
                itemStyle:{
                    normal:{
                        color:'#C1232B'
                    }
                }
            },{
                name: 'A4',
                type: 'line',
                data: da2,
                itemStyle:{
                    normal:{
                        color:'#9BCA63'
                    }
                }
            },{
                name: 'A5',
                type: 'line',
                data: da3,
                itemStyle:{
                    normal:{
                        color:'#26C0C0'
                    }
                }
            },{
                name: 'A6',
                type: 'line',
                data: da4,
                itemStyle:{
                    normal:{
                        color:'#F0805A'
                    }
                }
            },{
                name: 'B1',
                type: 'line',
                data: db1,
                itemStyle:{
                    normal:{
                        color:'#D7504B'
                    }
                }
            },{
                name: 'B2',
                type: 'line',
                data: db2,
                itemStyle:{
                    normal:{
                        color:'#27727B'
                    }
                }
            },{
                name: 'B3',
                type: 'line',
                data: db3,
                itemStyle:{
                    normal:{
                        color:'#FAD860'
                    }
                }
            },{
                name: 'B6',
                type: 'line',
                data: db4,
                itemStyle:{
                    normal:{
                        color:'#F4E001'
                    }
                }
            }]
        };

        myChart.setOption(option);
    }

//预测位移值
    function echart_4() {
        var myChart = echarts.init(document.getElementById('chart_4'));
        var time = ['5/2','5/3','5/4','5/5','5/6'];
        var da1 = [-0.1265,  -0.1279,     -0.1293,     -0.1307,     -0.1320 ];
        var da2 = [0.0552 ,0.0570 ,0.0580 ,0.0562 ,0.0602];
        var da3 = [-0.0517 ,-0.0572 ,-0.0588 ,-0.0618 ,-0.0649];
        var da4 = [-0.0707 ,-0.0732 ,-0.0707 ,-0.0744 ,-0.0762];
        var db1 = [-1.1447,-1.1456,-1.1475,-1.1462,-1.1496];
        var db2 = [-1.1032,  -1.1437,     -1.1851,     -1.2271,     -1.2699];
        var db3 = [-0.7687 ,-0.7686 ,-0.7692 ,-0.7691 ,-0.7699];
        var db4 = [-1.2087 ,-1.2087 ,-1.2068 ,-1.2068 ,-1.2105];

        // time.push(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
        // da1.push((Math.random() * 40 + 60).toFixed(2)); //取60到100间的随机数，toFixed()方法可把 Number 四舍五入为指定小数位数的数字
        // da2.push((Math.random() * 60 + 20).toFixed(2));
        // da3.push((Math.random() * 20 + 80).toFixed(2));
        // 配置项
        var option = {
            
            tooltip: {
                trigger: 'axis'
            },
            toolbox:{
                feature:{
                    saveAsImage: {}
                }
            },
            grid:{                   //绘图区域和图表容器之间的间隔
                top: '25%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true  //grid 区域是否包含坐标轴的刻度标签,默认为false
            },
            legend: {
                // orient: 'horizontal',  //水平
                // right:'0%',
                // left:'0%',
                data:['A2','A4','A5','A6','B1','B2','B3','B6'],
                textStyle:{
                    color: '#fff'
                },
                top: '8%'
            },
            // xAixs: {因为拼错了这个单词导致我好久没找到错误所在
            xAxis: {
                type: 'category',
                data: time,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            // y轴此处为默认
            yAxis: {
                type:'value',
                axisLabel:{
                    formatter: '{value}mm'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine:{          //苦度线设置
                    show:true,
                    lineStyle:{
                        type:'dashed'  //虚线
                    }
                },
            },
            // series为对象的数组'#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B', '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD', 
            //'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
            series: [{
                name: 'A2',
                type: 'line',
                data: da1,
                itemStyle:{
                    normal:{
                        color:'#C1232B'
                    }
                }
            },{
                name: 'A4',
                type: 'line',
                data: da2,
                itemStyle:{
                    normal:{
                        color:'#9BCA63'
                    }
                }
            },{
                name: 'A5',
                type: 'line',
                data: da3,
                itemStyle:{
                    normal:{
                        color:'#26C0C0'
                    }
                }
            },{
                name: 'A6',
                type: 'line',
                data: da4,
                itemStyle:{
                    normal:{
                        color:'#F0805A'
                    }
                }
            },{
                name: 'B1',
                type: 'line',
                data: db1,
                itemStyle:{
                    normal:{
                        color:'#D7504B'
                    }
                }
            },{
                name: 'B2',
                type: 'line',
                data: db2,
                itemStyle:{
                    normal:{
                        color:'#27727B'
                    }
                }
            },{
                name: 'B3',
                type: 'line',
                data: db3,
                itemStyle:{
                    normal:{
                        color:'#FAD860'
                    }
                }
            },{
                name: 'B6',
                type: 'line',
                data: db4,
                itemStyle:{
                    normal:{
                        color:'#F4E001'
                    }
                }
            }]
        };

        myChart.setOption(option);
    }

//位移变化速率
    function echart_2() {
        var myChart = echarts.init(document.getElementById('chart_2'));
        var time = ['5/1 10:01','5/1 10:07','5/1 10:13','5/1 10:19','5/1 10:25'];
        var da1 = [-0.0009 ,-0.0004 ,-0.0009 ,-0.0005 ,-0.0008];
        var da2 = [0.0000 , 0.0003,  0.0002,  -0.0003, 0.0007];
        var da3 = [-0.0002,  -0.0009, -0.0003, -0.0005, -0.0005];
        var da4 = [-0.0002,  -0.0004,     0.0004,  -0.0006,     -0.0003];
        var db1 = [-0.0006,  -0.0001,     -0.0003,     0.0002,  -0.0006];
        var db2 = [-0.0007,  -0.0005,     -0.0004,     -0.0003,     -0.0016 ];
        var db3 = [0.0000,   0.0000,  -0.0001,     0.0000,  -0.0001];
        var db4 = [-0.0002,  0.0000,  0.0003,  0.0000,  -0.0006];
        // var time = ['5/1 10:07','5/1 10:13','5/1 10:19','5/1 10:25','5/1 10:31'];
        // var da1 = [-0.0388,-0.044,-0.0471 ,-0.0518,-0.0549];
        // var da2 = [0.0570 ,0.0580 ,0.0562 ,0.0602,0.0589];
        // var da3 = [-0.0572 ,-0.0588 ,-0.0618 ,-0.0649,-0.0696];
        // var da4 = [-0.0732 ,-0.0707 ,-0.0744 ,-0.0762,-0.0756];
        // var db1 = [-1.1456,-1.1475,-1.1462,-1.1496,-1.1507];
        // var db2 = [-0.0840 ,-0.0890 ,-0.0958 ,-0.1038,-0.1082];
        // var db3 = [-0.7686 ,-0.7692 ,-0.7691 ,-0.7699,-0.7701];
        // var db4 = [-1.2087 ,-1.2068 ,-1.2068 ,-1.2105,-1.2087];
        // var now = new Date();

        // 配置项
        var option = {
            
            tooltip: {
                trigger: 'axis'
            },
            toolbox:{
                feature:{   //工具特征对象
                    dataView:{       //数据视图（一个数据表格）
                        show: true,
                        readOnly: false //可以修改
                    },
                    saveAsImage: {}
                }
            },
            grid:{                   //绘图区域和图表容器之间的间隔
                top: '35%',
                left: '3%',
                right: '4%',
                bottom: '1%',
                containLabel: true  //grid 区域是否包含坐标轴的刻度标签,默认为false
            },
            legend: {
                // orient: 'horizontal',  //水平
                // right:'0%',
                // left:'0%',
                data:['A2','A4','A5','A6','B1','B2','B3','B6'],
                textStyle:{
                    color: '#fff'
                },
                top: '8%'
            },
            // xAixs: {因为拼错了这个单词导致我好久没找到错误所在
            xAxis: {
                type: 'category',
                data: time,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            // y轴此处为默认
            yAxis: {
                name:'速率(mm/min)',
                type:'value',
                axisLabel:{
                    formatter: '{value}'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine:{          //苦度线设置
                    show:true,
                    lineStyle:{
                        type:'dashed'  //虚线
                    }
                },
            },
            // series为对象的数组'#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B', '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD', 
            //'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
            series: [{
                name: 'A2',
                type: 'line',
                data: da1,
                smooth: true,
                itemStyle:{
                    normal:{
                        color:'#C1232B'
                    }
                }
            },{
                name: 'A4',
                type: 'line',
                data: da2,
                itemStyle:{
                    normal:{
                        color:'#9BCA63'
                    }
                }
            },{
                name: 'A5',
                type: 'line',
                data: da3,
                itemStyle:{
                    normal:{
                        color:'#26C0C0'
                    }
                }
            },{
                name: 'A6',
                type: 'line',
                data: da4,
                itemStyle:{
                    normal:{
                        color:'#F0805A'
                    }
                }
            },{
                name: 'B1',
                type: 'line',
                data: db1,
                itemStyle:{
                    normal:{
                        color:'#D7504B'
                    }
                }
            },{
                name: 'B2',
                type: 'line',
                data: db2,
                itemStyle:{
                    normal:{
                        color:'#27727B'
                    }
                }
            },{
                name: 'B3',
                type: 'line',
                data: db3,
                itemStyle:{
                    normal:{
                        color:'#FAD860'
                    }
                }
            },{
                name: 'B6',
                type: 'line',
                data: db4,
                itemStyle:{
                    normal:{
                        color:'#F4E001'
                    }
                }
            }]
        };

        myChart.setOption(option);
    }

    //位移变化加速度
    function echart_6() {
        var myChart = echarts.init(document.getElementById('chart_6'));
        var time = ['5/1 10:01','5/1 10:07','5/1 10:13','5/1 10:19','5/1 10:25'];
        var da1 = [-0.0001,  0.0001,  -0.0001,     0.0001,  0.0000 ];
        var da2 = [0.0000,   0.0001,  0.0000,  -0.0001,     0.0001  ];
        var da3 = [0.0000,   -0.0001,     0.0001,  0.0000,  0.0000 ];
        var da4 = [0.0000,   0.0000,  0.0001,  -0.0002,     0.0001 ];
        var db1 = [0.0002,   0.0001,  0.0000,  0.0001,  -0.0001 ];
        var db2 = [0.0000,   0.0000,  0.0000,  0.0000,  -0.0002];
        var db3 = [0.0000,   0.0000,  0.0000,  0.0000,  0.0000 ];
        var db4 = [-0.0002,  0.0000,  0.0001,  -0.0001,     -0.0001 ];
        // var time = ['5/1 10:07','5/1 10:13','5/1 10:19','5/1 10:25','5/1 10:31'];
        // var da1 = [-0.0388,-0.044,-0.0471 ,-0.0518,-0.0549];
        // var da2 = [0.0570 ,0.0580 ,0.0562 ,0.0602,0.0589];
        // var da3 = [-0.0572 ,-0.0588 ,-0.0618 ,-0.0649,-0.0696];
        // var da4 = [-0.0732 ,-0.0707 ,-0.0744 ,-0.0762,-0.0756];
        // var db1 = [-1.1456,-1.1475,-1.1462,-1.1496,-1.1507];
        // var db2 = [-0.0840 ,-0.0890 ,-0.0958 ,-0.1038,-0.1082];
        // var db3 = [-0.7686 ,-0.7692 ,-0.7691 ,-0.7699,-0.7701];
        // var db4 = [-1.2087 ,-1.2068 ,-1.2068 ,-1.2105,-1.2087];
        // var now = new Date();

        // 配置项
        var option = {
            
            tooltip: {
                trigger: 'axis'
            },
            toolbox:{
                feature:{   //工具特征对象
                    dataView:{       //数据视图（一个数据表格）
                        show: true,
                        readOnly: false //可以修改
                    },
                    saveAsImage: {}
                }
            },
            grid:{                   //绘图区域和图表容器之间的间隔
                top: '35%',
                left: '3%',
                right: '4%',
                bottom: '1%',
                containLabel: true  //grid 区域是否包含坐标轴的刻度标签,默认为false
            },
            legend: {
                // orient: 'horizontal',  //水平
                // right:'0%',
                // left:'0%',
                data:['A2','A4','A5','A6','B1','B2','B3','B6'],
                textStyle:{
                    color: '#fff'
                },
                top: '8%'
            },
            // xAixs: {因为拼错了这个单词导致我好久没找到错误所在
            xAxis: {
                type: 'category',
                data: time,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            // y轴此处为默认
            yAxis: {
                name:'加速度(mm*mm/min)',
                type:'value',
                axisLabel:{
                    formatter: '{value}'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine:{          //苦度线设置
                    show:true,
                    lineStyle:{
                        type:'dashed'  //虚线
                    }
                },
            },
            // series为对象的数组'#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B', '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD', 
            //'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
            series: [{
                name: 'A2',
                type: 'line',
                data: da1,
                smooth: true,
                itemStyle:{
                    normal:{
                        color:'#C1232B'
                    }
                }
            },{
                name: 'A4',
                type: 'line',
                data: da2,
                itemStyle:{
                    normal:{
                        color:'#9BCA63'
                    }
                }
            },{
                name: 'A5',
                type: 'line',
                data: da3,
                itemStyle:{
                    normal:{
                        color:'#26C0C0'
                    }
                }
            },{
                name: 'A6',
                type: 'line',
                data: da4,
                itemStyle:{
                    normal:{
                        color:'#F0805A'
                    }
                }
            },{
                name: 'B1',
                type: 'line',
                data: db1,
                itemStyle:{
                    normal:{
                        color:'#D7504B'
                    }
                }
            },{
                name: 'B2',
                type: 'line',
                data: db2,
                itemStyle:{
                    normal:{
                        color:'#27727B'
                    }
                }
            },{
                name: 'B3',
                type: 'line',
                data: db3,
                itemStyle:{
                    normal:{
                        color:'#FAD860'
                    }
                }
            },{
                name: 'B6',
                type: 'line',
                data: db4,
                itemStyle:{
                    normal:{
                        color:'#F4E001'
                    }
                }
            }]
        };

        myChart.setOption(option);
    }

// 预测指标显示
    function echart_10() {
        var myChart = echarts.init(document.getElementById('chart_10'));
        var option = {
            toolbox:{
                show:true,
                feature:{
                    saveAsImage:{}
                }
            },
            tooltip:{
                show: false
            },
            series: [{
                name: '沉降量',
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                radius: '50%',
                center: ['25%', '40%'], //整个表盘相对于div的位置
                // min: -0.2,               //表盘最小值即起始值
                // max: 0.2,
                axisLine: {
                    lineStyle: {
                        width: 10,      //表盘边缘宽度
                        color: [         //分段刻度盘的颜色
                        [0.4, '#32CD32'],
                        [0.6, '#4169E1'],
                        [0.8, '#FFFF00'],
                        [0.9, '#ff9900'],
                        [1, '#FF0000']]
                    }
                },
                splitLine:{              //表盘边缘带的刻度线长度与上面的宽度要一致
                    length:10
                },
                detail:{
                    show: true,             //数据是否显示，默认为true
                    fontSize: 5,
                    formatter: function(value){
                        if (value <=40){return '安全';}
                        else if(value <=60) {return '蓝色预警';}
                        else if(value <=80) {return '黄色预警';}
                        else if(value <=90) {return '橙色预警';}
                        else {return '红色预警';}
                    },
                    // formatter: '{value}%',  //数据显示样式，默认没有%
                    offsetCenter:[0, '12%'] //显示的数据偏离中心的位置，默认为表盘中心
                },
                
                 axisLabel: {            // 刻度标签。
                    show: false,             // 是否显示标签,默认 true。
                    // distance: 5,            // 标签与刻度线的距离,默认 5。
                    // color: "#fff",          // 文字的颜色,默认 #fff。
                    fontSize: 2,           // 文字的字体大小,默认 5。
                    formatter: "{value}",   // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。 示例:// 使用字符串模板，模板变量为刻度默认标签 {value},如:formatter: '{value} kg'; // 使用函数模板，函数参数分别为刻度数值,如formatter: function (value) {return value + 'km/h';}
                },

                pointer: {                     //指针样式
                     show: true,             // 是否显示指针,默认 true。
                    length: "60%",          // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
                    width: 3,               // 指针宽度,默认 8。
                },               
                data: [{
                    name: '预测力A孔',
                    value: 10
                }]
            },{
                name: '沉降量',
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                radius: '50%',
                center: ['75%', '40%'], //整个表盘相对于div的位置
                // min: -0.2,               //表盘最小值即起始值
                // max: 0.2,
                axisLine: {
                    lineStyle: {
                        width: 10,      //表盘边缘宽度
                        color: [         //分段刻度盘的颜色
                        [0.4, '#32CD32'],
                        [0.6, '#4169E1'],
                        [0.8, '#FFFF00'],
                        [0.9, '#ff9900'],
                        [1, '#FF0000']]
                    }
                },
                splitLine:{              //表盘边缘带的刻度线长度与上面的宽度要一致
                    length:10
                },
                detail:{
                    show: true,             //数据是否显示，默认为true
                    fontSize: 5,
                    formatter: function(value){
                        if (value <=40){return '安全';}
                        else if(value <=60) {return '蓝色预警';}
                        else if(value <=80) {return '黄色预警';}
                        else if(value <=90) {return '橙色预警';}
                        else {return '红色预警';}
                    },
                    // formatter: '{value}%',  //数据显示样式，默认没有%
                    offsetCenter:[0, '12%'] //显示的数据偏离中心的位置，默认为表盘中心
                },
                
                 axisLabel: {            // 刻度标签。
                    show: false,             // 是否显示标签,默认 true。
                    // distance: 5,            // 标签与刻度线的距离,默认 5。
                    // color: "#fff",          // 文字的颜色,默认 #fff。
                    fontSize: 2,           // 文字的字体大小,默认 5。
                    formatter: "{value}",   // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。 示例:// 使用字符串模板，模板变量为刻度默认标签 {value},如:formatter: '{value} kg'; // 使用函数模板，函数参数分别为刻度数值,如formatter: function (value) {return value + 'km/h';}
                },

                pointer: {                     //指针样式
                     show: true,             // 是否显示指针,默认 true。
                    length: "60%",          // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
                    width: 3,               // 指针宽度,默认 8。
                },               
                data: [{
                    name: '预测力B孔',
                    value: 10
                }]
            },{
                name: '沉降量',
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                radius: '50%',
                center: ['25%', '80%'], //整个表盘相对于div的位置
                // min: -0.2,               //表盘最小值即起始值
                // max: 0.2,
                axisLine: {
                    lineStyle: {
                        width: 10,      //表盘边缘宽度
                        color: [         //分段刻度盘的颜色
                        [0.4, '#32CD32'],
                        [0.6, '#4169E1'],
                        [0.8, '#FFFF00'],
                        [0.9, '#ff9900'],
                        [1, '#FF0000']]
                    }
                },
                splitLine:{              //表盘边缘带的刻度线长度与上面的宽度要一致
                    length:10
                },
                detail:{
                    show: true,             //数据是否显示，默认为true
                    fontSize: 5,
                    formatter: function(value){
                        if (value <=40){return '安全';}
                        else if(value <=60) {return '蓝色预警';}
                        else if(value <=80) {return '黄色预警';}
                        else if(value <=90) {return '橙色预警';}
                        else {return '红色预警';}
                    },
                    // formatter: '{value}%',  //数据显示样式，默认没有%
                    offsetCenter:[0, '12%'] //显示的数据偏离中心的位置，默认为表盘中心
                },
                
                 axisLabel: {            // 刻度标签。
                    show: false,             // 是否显示标签,默认 true。
                    // distance: 5,            // 标签与刻度线的距离,默认 5。
                    // color: "#fff",          // 文字的颜色,默认 #fff。
                    fontSize: 2,           // 文字的字体大小,默认 5。
                    formatter: "{value}",   // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。 示例:// 使用字符串模板，模板变量为刻度默认标签 {value},如:formatter: '{value} kg'; // 使用函数模板，函数参数分别为刻度数值,如formatter: function (value) {return value + 'km/h';}
                },

                pointer: {                     //指针样式
                     show: true,             // 是否显示指针,默认 true。
                    length: "60%",          // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
                    width: 3,               // 指针宽度,默认 8。
                },               
                data: [{
                    name: '预测位移A孔',
                    value: 10
                }]
            },{
                name: '沉降量',
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                radius: '50%',
                center: ['75%', '80%'], //整个表盘相对于div的位置
                // min: -0.2,               //表盘最小值即起始值
                // max: 0.2,
                axisLine: {
                    lineStyle: {
                        width: 10,      //表盘边缘宽度
                        color: [         //分段刻度盘的颜色
                        [0.4, '#32CD32'],
                        [0.6, '#4169E1'],
                        [0.8, '#FFFF00'],
                        [0.9, '#ff9900'],
                        [1, '#FF0000']]
                    }
                },
                splitLine:{              //表盘边缘带的刻度线长度与上面的宽度要一致
                    length:10
                },
                detail:{
                    show: true,             //数据是否显示，默认为true
                    fontSize: 5,
                    formatter: function(value){
                        if (value <=40){return '安全';}
                        else if(value <=60) {return '蓝色预警';}
                        else if(value <=80) {return '黄色预警';}
                        else if(value <=90) {return '橙色预警';}
                        else {return '红色预警';}
                    },
                    // formatter: '{value}%',  //数据显示样式，默认没有%
                    offsetCenter:[0, '12%'] //显示的数据偏离中心的位置，默认为表盘中心
                },
                
                 axisLabel: {            // 刻度标签。
                    show: false,             // 是否显示标签,默认 true。
                    // distance: 5,            // 标签与刻度线的距离,默认 5。
                    // color: "#fff",          // 文字的颜色,默认 #fff。
                    fontSize: 2,           // 文字的字体大小,默认 5。
                    formatter: "{value}",   // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。 示例:// 使用字符串模板，模板变量为刻度默认标签 {value},如:formatter: '{value} kg'; // 使用函数模板，函数参数分别为刻度数值,如formatter: function (value) {return value + 'km/h';}
                },

                pointer: {                     //指针样式
                     show: true,             // 是否显示指针,默认 true。
                    length: "60%",          // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
                    width: 3,               // 指针宽度,默认 8。
                },               
                data: [{
                    name: '预测位移B孔',
                    value: 10
                }]
            }]
        }

        myChart.setOption(option);

        setInterval(function(){
            option.series[0].data[0].value = (10 + Math.random() * 90).toFixed(0);
            option.series[1].data[0].value = (30 + Math.random() * 30).toFixed(0);
            option.series[2].data[0].value = (20 + Math.random() * 70).toFixed(0);
            option.series[3].data[0].value = (1 + Math.random() * 90).toFixed(0);
            myChart.setOption(option);
        }, 6000);
    }

//每周微震事件数
    function echart_7() {
        var myChart = echarts.init(document.getElementById('chart_7'));
        // 配置项
        var option = {
            // title: {
            //     text: '微震事件数',
            //     subtext: 'made by 王雷鸣',
            //     left: 'center'
            // },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            toolbox:{      //工具栏
                show: true, //让它显示
                feature:{   //工具特征对象
                    dataView:{       //数据视图（一个数据表格）
                        show: true,
                        readOnly: false //可以修改
                    },
                    saveAsImage:{}  //下载图片
                }
            },
            grid:{                   //绘图区域和图表容器之间的间隔
                top: '15%',
                left: '3%',
                right: '10%',
                bottom: '1%',
                containLabel: true  //grid 区域是否包含坐标轴的刻度标签,默认为false
            },
            xAxis: {
                type: 'category', //类型：类目
                // data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
                data: ["1/8","1/15","1/22","1/29","2/5","2/12","2/19","2/26","3/5","3/12","3/19"],
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            // y轴此处为默认
            yAxis: {
                type: 'value',
                axisLabel:{
                    formatter: '{value} 次'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine:{          //苦度线设置
                    show:true,
                    lineStyle:{
                        type:'dashed'  //虚线
                    }
                },
            },
            // series为对象的数组
            series: [{
                name: '次数',
                type: 'bar',
                // data: [25, 15, 15, 214, 358, 125, 326, 214, 125,245, 586, 120],
                data: [14, 5, 4, 2, 2,4,7,2,2,8,6],
                itemStyle:{      //修改柱状图样式
                    normal:{
                        color: function(params){
                            var colorList = [
                            '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B', 
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD', 
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                            ];
                            return colorList[params.dataIndex]    //params.dataIndex返回每个柱状图的索引值
                        }
                    }
                },
                markPoint:{
                    itemStyle:{
                        color:'#313695',
                    },
                    data:[{
                        name: '最小值',
                        type: 'min'
                    },{
                        name: '最大值',
                        type: 'max'
                    }]
                },
                markLine:{
                    itemStyle:{
                        color:'#C1232B',
                    },
                    data: [{
                        name: '平均值',
                        type: 'average'
                    }]
                }
            }]
        }

        myChart.setOption(option);
    }

//微震事件与工作时间
    function echart_8() {
        var myChart = echarts.init(document.getElementById('chart_8'));
        var option = {
            // title: {
            //     text: '某店月销售额统计',
            //     left: 'center',         //标题位置，默认在左侧，可取值包括（xxpx,n%,right等）
            //     subtext: 'made by 王雷鸣'  //副标题
            // },
            tooltip: {  //交互时出现提示框
                trigger: 'axis'//触发类型：坐标轴，此种主要用于柱状、折线等使用类目轴的图
            },
            toolbox:{      //工具栏
                show: true, //让它显示
                feature:{   //工具特征对象
                    saveAsImage:{}  //下载图片
                }
            },
            grid:{                   //绘图区域和图表容器之间的间隔
                top: '15%',
                left: '3%',
                right: '2%',
                bottom: '1%',
                containLabel: true  //grid 区域是否包含坐标轴的刻度标签,默认为false
            },
            /*legend: {
                data:['销量']
            },*/
            xAxis: {
                type: 'category', //类型：类目
                data: ["0-8时","9时","10时","11时","12时","13时","14时","15时","16时","17时","17-24时"],
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            // y轴此处为默认
            yAxis: [{
                name: '微震事件数',
                type: 'value',
                min:0,
                max:16,
                axisLabel: {                 //坐标轴标签
                    formatter: '{value} 次'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine:{
                    show:false      //刻度分割线，默认为true
                }
            },{
                name: '平均能量',
                type: 'value',
                min:0,
                max:6700,
                axisLabel: {                 //坐标轴标签
                    formatter: '{value} J'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                splitLine:{
                    show:false      //刻度分割线
                }
            }],
            // 系列列表series为对象的数组
            series: [{
                name: '微震事件数', //对每个系列的命名，增加可读性
                type: 'bar',
                yAxisIndex:0,     //指定对应那条Y轴
                label:{
                    normal:{
                        show:true,
                        position:'top'
                    }
                },
                data: [0,1,2,9,0,3,10,15,11,4,0],
                // smooth: true, //平滑度
                markPoint: {           //标出某些点
                    data: [{           //具有data属性，对象数组
                        name: '最小值', //对某个标记命名，增加可读性
                        type: 'min'
                        },{
                        name: '最大值',
                        type: 'max'
                    }]
                },
                markLine: {        //标出某些线
                    data:[{
                        name: '平均值',
                        type: 'average'
                    }]
                }
            },{
                name: '平均能量', //对每个系列的命名，增加可读性
                type: 'line',
                yAxisIndex:1,
                label:{          //每个数据点是否显示详细值及样式rgba(0,0,0,0.4)
                    normal:{
                        show:true,
                        position:'right',
                        textStyle: {
                         color: '#26C0C0', //坐标值得具体的颜色
                        },
                        formatter:'{c}J'
                    }
                },
                lineStyle:{       //线条样式
                    normal:{
                        color:'#26C0C0',
                        width:3,
                        // shadowBlur:10,
                        // shadowColor:'rgba(0,0,0,0.4)'
                    }
                },
                data: [0,593,2993,5910,0,247.7,3182,913.3,6315,481.7,0],
                smooth: true, //平滑度
                markPoint: {           //标出某些点
                    itemStyle:{
                        color:'#26C0C0',
                    },
                    data: [{           //具有data属性，对象数组
                        name: '最小值', //对某个标记命名，增加可读性
                        type: 'min'
                        },{
                        name: '最大值',
                        type: 'max'
                    }]
                },
                markLine: {        //标出某些线
                    itemStyle:{
                        color:'#26C0C0',
                    },
                    data:[{
                        name: '平均值',
                        type: 'average'
                    }]
                }
            }]
        };
        myChart.setOption(option);
    }

//微震数据
    function echart_3() {
        var myChart = echarts.init(document.getElementById('chart_3'));
        // var dom = document.getElementById("container");
        // var myChart = echarts.init(dom);
        var app = {};
        option = null;

        // var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        //         '7a', '8a', '9a','10a','11a',
        //         '12p', '1p', '2p', '3p', '4p', '5p',
        //         '6p', '7p', '8p', '9p', '10p', '11p'];
        // var days = ['Saturday', 'Friday', 'Thursday',
        //         'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
        var months = ['January', 'February', 'Marcy'];        
        var days = ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15',
                '16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
        var data = [[0,2,16585.6919],[0,2,2000.43056],[0,2,4326.50146],[0,3,16017.397],[0,3,2974.04785],[0,3,1808.1145],[0,3,52.2326469],[0,3,5484.50006],
            [0,4,6.45360279],[0,4,47.6293983],[0,5,293.435303],[0,6,102.072421],[0,7,1289.50128],[0,7,3539.29456],[0,10,83.3497391],[0,11,2.09730864],
            [0,11,72.1886359],[0,12,208.082653],[0,13,3780.5616],[0,16,54.3829536],[0,16,1368.58627],[0,16,4961.43811],[0,16,992.764595],[0,24,16534.6553],
            [0,24,306.958221],[1,1,1438.57132],[1,1,60.9519806],[1,10,239.729401],[1,11,21916.5595],[1,11,8766.12622],[1,12,20931.4277],[1,13,0],[1,14,486.791046],
            [1,15,592.989357],[1,15,1373.6066],[1,18,1331.13586],[1,19,256.236448],[1,19,560.514465],[1,20,33.9701881],[1,20,313.08523],[2,5,2607.41162],
            [2,6,290.282181],[2,6,28.638813],[2,7,1280.09126],[2,7,5.10722351],[2,8,607.045166],[2,9,1223.63611],[2,11,402.367661],
            [2,12,154.246667],[2,17,240.8592],[2,19,307.360664],[2,19,53.4186897],[2,19,53.5538502],[2,19,24.1040211]];


        option = {
            tooltip: {},
            visualMap: {
                max: 25000,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                }
            },
            xAxis3D: {
                type: 'category',
                data: days,
                name: '日期',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff',  //更改坐标轴文字颜色
                    // fontSize : 14      //更改坐标轴文字大小
                    }
                },
                 axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            yAxis3D: {
                type: 'category',
                data: months,
                name: '月份',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff',  //更改坐标轴外刻度文字颜色
                    // fontSize : 14      //更改坐标轴外刻度文字大小
                    }
                },
                 axisLine: {
                    lineStyle: {
                        color: '#fff'  //坐标轴地颜色
                    }
                }
            },
            zAxis3D: {
                type: 'value',
                name: '事件能量',
                axisLabel: {
                    show: true,
                    formatter:'{value}J',
                    textStyle: {
                        color: '#fff',  //更改坐标轴文字颜色
                    // fontSize : 14      //更改坐标轴文字大小
                    }
                },
                 axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            grid3D: {
                boxWidth: 200,
                boxDepth: 80,
                viewControl: {
                    // projection: 'orthographic'
                },
                light: {
                    main: {
                        intensity: 1.2,
                        shadow: true
                    },
                    ambient: {
                        intensity: 0.3
                    }
                }
            },
            series: [{
                name: '微震事件能量',
                type: 'bar3D',
                data: data.map(function (item) {
                    return {
                        value: [item[1], item[0], item[2]],
                    }
                }),
                shading: 'lambert',

                label: {
                    textStyle: {
                        fontSize: 16,
                        // color: '#c3dbff',
                        borderWidth: 1
                    }
                },

                emphasis: {
                    label: {
                        textStyle: {
                            fontSize: 20,
                            color: '#900'
                        },
                    },
                    formatter:'{a}: {c}',
                    itemStyle: {
                        color: '#900'
                    }
                }
            }]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        };
    } 
})