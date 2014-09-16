this.path_to_theme = "/themes/dataweek.txt";


// zingchart.MODULESDIR = './lib/modules/';
zingchart.loadModules('maps,maps-usa');


function generateRandomNumbers(nodes) {
    	var values, m1, m2, s;
        values = [];
        m1 = 10+40*Math.random();
        m2 = 10+40*Math.random();
        s = 40+160*Math.random();
        for (var n=0;n<nodes+1;n++) {
            v = s*Math.exp(Math.abs(n-nodes/2)/nodes)*Math.sin(n/(nodes/(m1)))*Math.cos(n/(nodes/m2));
            v = parseFloat(v.toFixed(2));
            values.push(v)
        }
        return values;
}