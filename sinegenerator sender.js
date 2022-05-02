var hid = require('node-hid')
var parametri = [41.5, 3.3, 30, 62.5, 3.3, 30, 62.5, 3.3, 30, 62.5, 3.3, 30, 62.5, 3.3, 30, 62.5, 3.3, 30, 62.5, 3.3, 30, 62.5, 3.3, 30, 72.5, 3.1, 30, 82.5, 3.3, 30];
var vrh = 0;
var buffer = new Uint8Array(64);
var buffer2 = new Uint8Array(64);
var vrh1 = 0, vrh2 = 0;


/*buffer[0] = 0x80;
buffer[1] = 0x1;
buffer2[0] = 0x80;
buffer2[1] = 0x2;
*/

function buffer1Push(val){
    
    buffer[vrh1] = val;
    vrh1++;
    
}

function buffer2Push(val){
    
    
    buffer2[vrh2] =val; 
    vrh2++;
    
}

buffer1Push(0x80);
buffer1Push(0x01);
buffer2Push(0x80);
buffer2Push(0x02);


//const device = new hid.HID('/dev/hidraw3');
const device = new hid.HID(1156, 22353); //vid,pid
function send1() {
    const toSend = new Buffer(buffer.buffer)
    const bytes = device.write(Array.from(toSend))
    console.log(buffer)
   /* var tst = device.on("data", function (data) {
        console.log(data.toString('hex'));
    });*/
}
function send2() {
    const toSend1 = new Buffer(buffer2.buffer)
    const bytes = device.write(Array.from(toSend1))
    console.log(buffer2)
   /* var tst = device.on("data", function (data) {
        console.log(data.toString('hex'));
    });*/
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

function writeFloatToBuff(dataArr, buffArrNum, numberSet) {
    var i,j;
    numberSet *= 3;
    var tempFloatArr;
for( j = 0;j < 2; j++){

    tempFloatArr = floatSlice(dataArr, numberSet + j);




    for (i = 0; i < 4; i++) {
    if(buffArrNum == 1){
     
        buffer1Push( tempFloatArr[i]);
        
    }
    if(buffArrNum == 2){
     
        buffer2Push( tempFloatArr[i]);
        
    }
    }
}
}

function writeIntToBuff(dataArr,buffArrNum,numberSet){


    if(buffArrNum == 1){
     
        buffer1Push( dataArr[(3*numberSet)+2]);
        
    }
    if(buffArrNum == 2){
     
        buffer2Push( dataArr[(3*numberSet)+2]);
        
    }
    

}

for(k = 0; k < 5;k++){

writeFloatToBuff(parametri,1,k);
writeIntToBuff(parametri,1,k);

}
for(n = 5; n < 10;n++){
    
writeFloatToBuff(parametri,2,n);
writeIntToBuff(parametri,2,n);
}

send1();
//send2();
setTimeout(function(){send2();},100);





    /*
    const bufferloc = new ArrayBuffer(16);
    const view = new DataView(bufferloc);
      view.setFloat32(0,parametri[1],1);
        for(i = 2; i < 6; i++){
            buffer[i] = view.getUint8(i-2);
        }
    */
