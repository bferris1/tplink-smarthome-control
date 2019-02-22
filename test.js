const {Client} = require('tplink-smarthome-api');

const client = new Client();
client.on('bulb-new', (bulb) => {console.log('new bulb');});

let hue = 0;

function incHue (device){
	hue += 10;
	if (hue > 360)
		hue = 0;
    
	let saturation = 100;
	console.log(`Setting hue to ${hue} and saturation to ${saturation}`);
	return device.lighting.setLightState({
		hue: hue,
		saturation: saturation,
		transition_period: 1000,
		color_temp: 0
	});
}

// starts the timeout after the response is received
function loopHue (device){
	incHue(device).then(res => {
		// device.lighting.getLightState().then(console.log);
		setTimeout(() => {
			loopHue(device);
		}, 1200);
	}).catch((err) => {
		console.log(err);
		setTimeout(() => {
			loopHue(device);
		}, 1200);
	});
}

let brightness = false;
function redAlert (device){
	device.lighting.setLightState({
		brightness: brightness ? 100 : 30,
		transition_period: 1000,
		hue: 0,
		saturation: 100
	}).then(() => {
		brightness = !brightness;
		setTimeout(() => {
			redAlert(device);
		}, 1050);
	});
}

function randomHue (){
	return Math.floor(Math.random() * 360);
}

function randomNumber (maxValue){
	return Math.floor(Math.random() * (maxValue + 1));
}

client.getDevice({host: '10.0.0.30'})
	.then(device => {
		device.lighting.getLightState().then(console.log);
		// redAlert(device);
		// device.lighting.setLightState({
		//     brightness:1,
		//     transition_period: 60000
		// }).catch(console.log)
		loopHue(device);
		// setInterval(() => incHue(device), 2000);
	});


// client.startDiscovery();
    