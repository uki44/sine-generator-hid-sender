var hid = require('node-hid')
var parametri = [41.5, 3.3, 30, 62.5, 3.3, 30, 62.5, 3.3, 30, 62.5, 3.3, 30, 62.5, 3.3, 30, 62.5, 3.3, 30, 62.5, 3.3, 30, 62.5, 3.3, 30, 72.5, 3.1, 32, 82.5, 3.3, 30];
var vrh = 0;
var buffer = new Uint8Array(64);
var buffer2 = new Uint8Array(64);
buffer[0] = 0x80;
buffer[1] = 0x1;
buffer2[0] = 0x80;
buffer2[1] = 0x2;
//const device = new hid.HID('/dev/hidraw3');
const device = new hid.HID(1156, 22353); //vid,pid
function send1() {
    const toSend = new Buffer(buffer.buffer)
    const bytes = device.write(Array.from(toSend))
    console.log(buffer)
    var tst = device.on("data", function (data) {
        console.log(data.toString('hex'));
    });
}
function send2() {
    const toSend = new Buffer(buffer2.buffer)
    const bytes = device.write(Array.from(toSend))
    console.log(buffer2)
    var tst = device.on("data", function (data) {
        console.log(data.toString('hex'));
    });
}

function floatSlice(dataArr, index) {
    var tempBuff = [];
    var j;
    const bufferloc = new ArrayBuffer(16);
    const view = new DataView(bufferloc);
    view.setFloat32(0, dataArr[index], 1);
    for (j = 0; j < 4; j++) {
        tempBuff[j] = view.getUint8(j);
    }
    return tempBuff;
}

function writeFloatToBuff(dataArr, buffArr, numberSet) {
    var i,j;
    numberSet *= 3;
    var tempFloatArr;
for( j = 0;j < 2; j++){
    tempFloatArr = floatSlice(dataArr, numberSet + j);




    for (i = 0; i < 4; i++) {

        buffArr.push(tempFloatArr[i]);

    }
}
}

function writeIntToBuff(dataArr,buffArr,numberSet){

    buffArr.push(dataArr[numberSet+2]);

}

for(k = 0; k < 5;k++){

writeFloatToBuff(parametri,buffer,k);
writeIntToBuff(parametri,buffer,k);

}
for(n = 5; n < 10;n++){
    
writeFloatToBuff(parametri,buffer,n);
writeIntToBuff(parametri,buffer2,n);
}

send1();
send2();





    /*
    const bufferloc = new ArrayBuffer(16);
    const view = new DataView(bufferloc);
      view.setFloat32(0,parametri[1],1);
        for(i = 2; i < 6; i++){
            buffer[i] = view.getUint8(i-2);
        }
    */