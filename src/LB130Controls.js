import React, {Component} from 'react';
import LightSwitch from './LightSwitch';
import {HuePicker} from 'react-color';
import PropTypes from 'prop-types'; // ES6
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';



export default class LB130Controls extends Component {
	constructor (props) {
		super(props);
		this.state = { 
			color: {h: 0, s: 0, l: 0},
			color_temp: 4000,
			brightness: 100
		};
		this.changeHue = this.changeHue.bind(this);
		this.toggleBulb = this.toggleBulb.bind(this);
		this.changeBrightness = this.changeBrightness.bind(this);
		this.changeColorTemp = this.changeColorTemp.bind(this);
		this.changeSaturation = this.changeSaturation.bind(this);
		this.sendChange = this.sendChange.bind(this);
	}
    
	componentDidMount (){
        console.log(this.props.bulb.lighting.lightState);
        let lightState = this.props.bulb.lighting.lightState;
		let color = this.state.color;
        color.h = this.props.bulb.lighting.lightState.hue;
        color.s = this.props.bulb.lighting.lightState.saturation/100;
        this.setState({color});
        this.setState({brightness: lightState.brightness});
        this.setState({color_temp: lightState.color_temp});
	}
    
	changeHue (newHue){
		console.log(newHue);
		let hue = Math.floor(newHue.hsl.h);
		this.setState({color: newHue.hsl});
		console.log(hue);
		this.props.bulb.lighting.setLightState({
			hue,
			color_temp: 0,
			brightness: 100,
			transition_period: 200
		}, {
			transport: 'udp'
		}).catch(console.log);
	}
    
	changeBrightness (brightness){
		console.log(brightness);
		this.setState({brightness});
        this.sendChange({brightness})
	}
    
	sendChange (params){
		if (this.props.bulb){
			this.props.bulb.lighting.setLightState({
                ...params,
                transition_period: 200
			}, {transport: 'udp'});
		}
	}
    
	changeSaturation (saturation){
		let color =this.state.color;
		color.s = saturation/100;
		this.setState({color});
		this.sendChange({saturation});
	}
    
	changeColorTemp (color_temp){
		this.setState({color_temp});
		if (this.props.bulb)
			this.props.bulb.lighting.setLightState({
				color_temp
			}, {transport: 'udp'});
	}
    
	toggleBulb () {
		this.props.bulb.togglePowerState();
	}
    
	render () { 
		return ( 
			<div>
				<LightSwitch onToggle={this.toggleBulb}/>
				<br/><br/>
				<HuePicker color={this.state.color} width='100%' onChange={this.changeHue}/>
				<p>Saturation</p>
				<Slider min={0} value={this.state.color.s*100} onChange={this.changeSaturation} max={100}/>
				<p>Brightness</p>
				<Slider min={1} value={this.state.brightness} onChange={this.changeBrightness} max={100}/>
				<p>Color Temperature</p>
				<Slider min={2500} max={9000} value={this.state.color_temp} onChange={this.changeColorTemp}/>
			</div> 
		);
	}
}

LB130Controls.propTypes = {
	bulb: PropTypes.object
}; 
