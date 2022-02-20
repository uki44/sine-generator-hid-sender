var parametri = [62.5,3.3,30,62.5,3.3,30,62.5,3.3,30,62.5,3.3,30,62.5,3.3,30,62.5,3.3,30,62.5,3.3,30,62.5,3.3,30,72.5,3.1,32,82.5,3.3,30];
buffer = [0x80,1]; // [f,f,f,v,v,t,t]

function numConv1(n){
   // if(n>5){return 0;} 
    var num;
    num = parametri[n*3] 
    num*=num;
    buffer[n*3+4] = num % 10;
    num = num/10;
    buffer[n*3+3] = num % 10;
    num = num/10;
    buffer[n*3+2] = num % 10;
}
function numConv2(n){
    //if(n<=5){return 0;} 
    var num;
    num = parametri[n*3] 
    num*=num;
    buffer[n*3+4] = num % 10;
    num = num/10;
    buffer[n*3+3] = num % 10;
    num = num/10;
    buffer[n*3+2] = num % 10;
}
function numconv3(){
    var k,num,voltage,time;
    var n100 = 0;
    var n10 = 0,v10 = 0,t10 = 0;
    var n1 = 0, v1=0, t1 = 0;
    for(k = 0;k<5;k++){
        num = parametri[k*3] 
        voltage = parametri[k*3+1]
        time = parametri[k*3+2];
        num = num * 10;
        voltage *=10;
        n1 = num % 10;
        num = (num-n1)/10;
        n10 = num % 10;
        num = (num-n10)/10;
        n100 = num % 10;
        buffer[k*7+2] = n100;
        buffer[k*7+3] = n10;
        buffer[k*7+4] = n1;
        v1 = voltage % 10;
        voltage = (voltage -v1)/10;
        v10 = voltage % 10
        buffer[k*7+5] = v10;
        buffer[k*7+6] = v1;
        t1 = time % 10;
        time = (time-t1)/10;
        t10 = time % 10
        buffer[k*7+7] = t10;
        buffer[k*7+8] = t1;
        
    } 
    
    // 
    //[init,nr,f,f,f,v,v,t,t,f,f,f,v,v,t,t]


}
function numconv4(){
    var k,num,voltage,time,j=0;
    var n100 = 0;
    var n10 = 0,v10 = 0,t10 = 0;
    var n1 = 0, v1=0, t1 = 0;
    for(k = 0;k<5;k++){
        j = k+5;
        num = parametri[j*3] 
        voltage = parametri[j*3+1]
        time = parametri[j*3+2];
        num = num * 10;
        voltage *=10;
        n1 = num % 10;
        num = (num-n1)/10;
        n10 = num % 10;
        num = (num-n10)/10;
        n100 = num % 10;
        buffer[k*7+2] = n100;
        buffer[k*7+3] = n10;
        buffer[k*7+4] = n1;
        v1 = voltage % 10;
        voltage = (voltage -v1)/10;
        v10 = voltage % 10
        buffer[k*7+5] = v10;
        buffer[k*7+6] = v1;
        t1 = time % 10;
        time = (time-t1)/10;
        t10 = time % 10
        buffer[k*7+7] = t10;
        buffer[k*7+8] = t1;
        console.log(k)  
    } 
    // 
    //[init,nr,f,f,f,v,v,t,t,f,f,f,v,v,t,t]


}

numconv3();
console.log(buffer);
numconv4();
console.log(buffer);
