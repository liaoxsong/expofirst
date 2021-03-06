import React, {useState} from 'react';
import {TouchableOpacity, Image, View, Text, Button, StyleSheet} from 'react-native';

import questions from '../data/questions';
import MyText from '../components/MyText';
import images from '../../img/images';
import SelectButton from '../components/SelectButton';
import CyanButton from '../components/CyanButton';
import Alert from '../components/Alert';
import alerts from '../data/alerts';
import MySlider from "../components/MySlider";
import BodyMetricsSlider from "../components/BodyMetricsSlider";

const styles = StyleSheet.create({
 container: { 
 	  backgroundColor: 'white',
	  height:'100%',
	  justifyContent:'space-between'
 },
 topContainer:{
	width:'100%',
	top:15
 },
 imageContainer: {
	alignItems:'center',
	width:'100%'
 },

 genderContainer: {
	alignItems:'center',
	width:'100%',
	justifyContent:'center',
	height:550,
 },
 
 bottomContainer: {
	width: '100%',
	alignItems:'center',
 },
  primaryTheme: {
    color: '#5cced8' //cyan
  },
  secondaryTheme: {
    color : '#f0f0f0' //gray'
  }
});

function QuestionScreen({questionIndex, setQuestionIndex, route, navigation}) {

	const [selectedIndex, setSelectedIndex] = useState(-1)
	const [alertShow, setAlertShow] = useState(false);

	const [gender, setGender] = useState(-1);//-1:unselected, 0:female, 1:male

	const data = questions[questionIndex]

	function onSubmitted() {
		if (questionIndex == 0) {
			setAlertShow(true);
		} else {
			goToNextScreen();
		}
	}

	function onAlertClosed() {
		setAlertShow(false);
		goToNextScreen();
	}

	function goToNextScreen() {
		if (questionIndex + 1 < questions.length) {
			setQuestionIndex(questionIndex + 1)
			navigation.push('QuestionScreen')
		}else {
			navigation.push("ResultScreen")
		}		
	}

	const RenderLabel = () => 
		<MyText style={{justifyContent:'center',paddingTop:35, fontWeight:'bold', fontSize:28}}>
				{data.question}
		</MyText>;
	
	const RenderSelections= ({type}) => {
		switch (type) {
			case 'radio_text':
				return <RenderRadioText/>;
			case 'radio_pic':
				return <RenderGenderSelection/>;
			case "scale_age":
				return <MySlider/>;
			case "scale_body":
				return <RenderBodyMetrics/>;
			default:
				return null;
		}
	}

	const RenderBodyMetrics= ()=> {
		return (
			<View style={styles.genderContainer}>
				<Image source={gender==0?images['woman']:images['man']}/>
				<BodyMetricsSlider metrics="Weight"/>
     			<BodyMetricsSlider metrics="Height"/>
			</View>
		);
	}

	const RenderRadioText= () => {
		return (<View style={{ paddingVertical:15}}>
				{data.options.map( (option,index) => (
                <SelectButton
                  key={option.id}
                  title={option.text}
                  selected={selectedIndex == index}
                  onPress={()=>
                   setSelectedIndex(selectedIndex == index ? -1 :index)}
                />
              ))}
			</View>);
	}

	const RenderGender =() => {
		if (gender == 0) {
			return (<Image source={images['female_selected']}/>);
		} else if (gender == 1) {
			return (<Image source={images['male_selected']}/>);
		}
		
		return (<Image source={images[props.isFemale ?'female_unselected':'male_unselected']}/>);
	}

	function RenderFemale() {
		if (gender == 0) {
			return (<Image source={images['female_selected']}/>);
		} 
		return (<Image source={images['female_unselected']}/>);
	}

	function RenderMale() {
		if (gender == 1) {
			return (<Image source={images['male_selected']}/>);
		} 
		return (<Image source={images['male_unselected']}/>);
	}

	function RenderGenderSelection() {
		return (
			<View style={styles.genderContainer}>
				<View style={{flexDirection:'row', alignItems:'space-between'}}>
					<TouchableOpacity onPress={()=>setGender(0)}>
						<RenderFemale/>
					</TouchableOpacity>
					<View style={{width:50}}/>
					<TouchableOpacity onPress={()=>setGender(1)}>
						<RenderMale/>
					</TouchableOpacity>
				</View>
			</View>
			
		);
	}

	return (
		<View style={styles.container}>
			
			<View style={styles.topContainer}>
				<View style={styles.imageContainer}>
					<Image source ={images[data.image]}/>
				</View>
				
				<RenderLabel/>
				<RenderSelections type={data.type}/>
			</View>
						
			<View style={styles.bottomContainer}>
				<CyanButton style={{ }} onPress={()=>
					onSubmitted()
				} title='Continue'/>
			</View>
			
			<Alert 
				title={alerts['start']}
				visible={alertShow} onPress={()=>
				onAlertClosed()
			}/>
		</View>
	);
}

export default QuestionScreen;