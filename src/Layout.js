import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const {Client} = nodeRequire('tplink-smarthome-api');
import { DeviceList } from './DeviceList';


class Layout extends Component {
	constructor (props) {
		super(props);
		this.state = {
			client: new Client(),
			color: {h: 0, s: 100, l: 100}
		};

		this.toggleBulb = this.toggleBulb.bind(this);
		this.changeHue = this.changeHue.bind(this);
	}


	/*componentDidMount () {
		if (this.state.client){
			this.state.client.getDevice({host: '192.168.0.83'}).then(bulb => {
				this.setState({bulb});
			});
		}
		
	}*/

	toggleBulb () {
		if (this.state.bulb)
			this.state.bulb.togglePowerState();
	}

	changeHue (newHue){
		console.log(newHue);
		let hue = Math.floor(newHue.hsl.h);
		this.setState({color: newHue});
		console.log(hue);
		if (this.state.bulb);
		this.state.bulb.lighting.setLightState({
			hue,
			color_temp: 0,
			saturation: 100,
			transition_period: 0
		}, {
			transport: 'udp'
		}).catch(console.log);
	}
	



	render () {
		return (
			<div className="container">
				<div className="col-sm-12">
					<DeviceList/>
				</div>
			</div>
		);
	}
}

export default Layout;