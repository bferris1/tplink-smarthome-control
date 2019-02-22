import React, {Component} from 'react';
import LB130Controls  from './LB130Controls';
const {Client} = nodeRequire('tplink-smarthome-api');


export class DeviceList extends Component {
	constructor (props) {
		super(props);
		this.handleNewDevice = this.handleNewDevice.bind(this);

		this.state = { devices: []};
		this.client = new Client();
		this.client.on('device-new', this.handleNewDevice);
		this.client.startDiscovery();
        
	}
    

	handleNewDevice (device){
		let devices = this.state.devices.slice();
		devices.push(device);
		device.startPolling(5000);
		this.setState({devices});
	}


	render () { 
		let deviceNames = this.state.devices.map((device, index) => {
			return (<div key={index}>
				<h2 >{device.name}</h2>
				{device.model === 'LB130(US)' ? <LB130Controls bulb={device}/> : <p>Not supported</p>}
			</div>);
		});
		return ( 
			<div>
				<h1>Devices</h1>
				{deviceNames.length > 0 ? deviceNames : 'No devices found.'}
            
			</div>
		);
	}
}
 
export default DeviceList;