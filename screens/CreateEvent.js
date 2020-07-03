import React, {useState} from 'react';
import {StyleSheet, Modal, View, TextInput, Dimensions, TouchableWithoutFeedback, Platform, ScrollView, Picker} from "react-native";
import {Button, Input, Switch} from "../components";
import {Block, theme, Text} from "galio-framework";
import {argonTheme} from "../constants";
import {Formik} from "formik";
import {AntDesign, Entypo, Feather} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as yup from 'yup';
import FirebaseConfig from "../Firebase/firebaseConfig";
import * as firebase from "firebase";
import "firebase/firestore";
import DropDown from "../components/Select";

//Initialize Firebase
// firebase.initializeApp(FirebaseConfig);
// const db = firebase.firestore();

const { width } = Dimensions.get("screen");

const CreateEvent = ({navigation}) => {

    // Schema for Formik
    const reviewSchema = yup.object({
        titleOfEvent: yup.string().required('This field is required.'),
        descriptionOfEvent: yup.string().required('This field is required.'),
        locationOfEvent: yup.string().required('This field is required.'),
        pointsOfEvent: yup.number().min(0),
    })

    // Variables used for date and time picker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    // State for modal when form submitted
    const [modalOpen, setModalOpen] = useState(false)

    // Variable that stores selection from picker
    const [selectedValue, setSelectedValue] = useState("Java");

    // Date and time vars
    const dateOfEvent = date.toDateString();
    const timeOfEvent = timeConverter();


    // Converts time to something legible
    function timeConverter() {
        let hours = date.getHours();
        let minutes = date.getMinutes();

        // Check whether AM or PM
        let newformat = hours >= 12 ? 'PM' : 'AM';

        // Find current hour in AM-PM Format
        hours = hours % 12;

        // To display "0" as "12"
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return hours + ':' + minutes + ' ' + newformat
    }

    /** Functions for date and time picker **/
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const showTimepicker = () => {
        showMode('time');
    };
    /**************************************/

    function closingDrawer() {
        setModalOpen(false);
        navigation.closeDrawer();
        navigation.navigate('Home');
    }

    return<ScrollView>
        <View>
            {/*** Form Values ***/}
            <Formik initialValues={{
                titleOfEvent: '',
                descriptionOfEvent: '',
                locationOfEvent: '',
                pointsOfEvent: "",
            }}
                validationSchema={reviewSchema}
                onSubmit={ (values, {setSubmitting, resetForm}) => {
                    // db.collection("Orgs").doc("aZfma8Dqr3PmGcSAVdVd").collection("Events").add({
                    //     titleOfEvent: values.titleOfEvent,
                    //     dateOfEvent: dateOfEvent,
                    //     timeOfEvent: timeOfEvent,
                    //     locationOfEvent: values.locationOfEvent,
                    //     pointsOfEvent: values.pointsOfEvent,
                    //     descriptionOfEvent: values.descriptionOfEvent,
                    // });
                    setModalOpen(true);
                    resetForm();
                    setDate(new Date());
                    setSubmitting(false);
            }}
            >
                {(props) => <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    {/*** Select Organization **/}
                    <Text
                        size={20}
                        style={styles.title}
                        color={argonTheme.COLORS.PRIMARY}
                    >
                        Select the Organization
                    </Text>
                    <Block style={{borderColor: argonTheme.COLORS.INFO, borderRadius: 4,
                                    borderWidth: 1, backgroundColor: '#FFF'}}>
                        <Picker>
                            <Picker.Item style={{padding: 10}} label="Java" value="java" />
                            <Picker.Item style={{padding: 10}} label="JavaScript" value="js" />
                        </Picker>
                    </Block>

                    {/*** Title of Event ***/}
                    <Text
                        size={20}
                        style={styles.title}
                        color={argonTheme.COLORS.PRIMARY}
                    >
                        Title of Event
                    </Text>
                    <TextInput
                        placeholder="Title of Event"
                        style={styles.textInput}
                        onChangeText={props.handleChange('titleOfEvent')}
                        value={props.values.titleOfEvent}
                        onBlur={props.handleBlur('titleOfEvent')}
                    />
                    {(props.touched.titleOfEvent && props.values.titleOfEvent == "") ? (<Text style={styles.errorText}>{props.errors.titleOfEvent}</Text>) : null}
                    {/*** Time of Event ***/}
                    <Text
                        size={20}
                        style={styles.title}
                        color={argonTheme.COLORS.PRIMARY}
                    >
                        Time of Event
                    </Text>
                    <TouchableWithoutFeedback onPress={showTimepicker}>
                        <Block
                            right
                            placeholder="Time of Event"
                            style={styles.blockTextInput}
                        >
                            <Text style={{padding: 10}}>{timeOfEvent}</Text>
                            <AntDesign style={{padding: 15, }}name="clockcircle" size={24} color="#11CDEF" />
                        </Block>
                    </TouchableWithoutFeedback>
                    {/*** Date of Event ***/}
                    <Text
                        size={20}
                        style={styles.title}
                        color={argonTheme.COLORS.PRIMARY}
                    >
                        Date of Event
                    </Text>
                    <TouchableWithoutFeedback onPress={showDatepicker}>
                        <Block
                            right
                            placeholder="Date of Event"
                            style={styles.blockTextInput}
                        >
                            <Text style={{padding: 10}}>{dateOfEvent}</Text>
                            <AntDesign style={{padding: 15}}name="calendar" size={24} color="#11CDEF" />
                        </Block>
                    </TouchableWithoutFeedback>
                    {/*** Location of Event ***/}
                    <Text
                        size={20}
                        style={styles.title}
                        color={argonTheme.COLORS.PRIMARY}
                    >
                        Location of Event
                    </Text>
                    <Block style={styles.blockTextInput}>
                        <TextInput
                            placeholder="Location of Event"
                            style={{padding: 10}}
                            onChangeText={props.handleChange('locationOfEvent')}
                            value={props.values.locationOfEvent}
                            onBlur={props.handleBlur('locationOfEvent')}
                        />
                        <Entypo style={{padding: 15}} name="location" size={24} color="#11CDEF" />
                    </Block>
                    {(props.touched.locationOfEvent && props.values.locationOfEvent == "") ? (<Text style={styles.errorText}>{props.errors.locationOfEvent}</Text>) : null}
                    {/*** Points of Event ***/}
                    <Text
                        size={20}
                        style={styles.title}
                        color={argonTheme.COLORS.PRIMARY}
                    >
                        Points of Event (Optional)
                    </Text>
                    <Block style={styles.blockTextInput}>
                        <TextInput
                            placeholder="Points of Event"
                            style={{padding: 10}}
                            keyboardType="numeric"
                            onChangeText={props.handleChange('pointsOfEvent')}
                            value={props.values.pointsOfEvent}
                        />
                        <Feather style={{padding: 15}}name="award" size={24} color="#11CDEF" />
                    </Block>
                    {(props.values.pointsOfEvent < 0) ? (<Text style={styles.errorText}>Points must be zero or greater</Text>) : null}
                    {/*** Description of Event ***/}
                    <Text
                        size={20}
                        style={styles.title}
                        color={argonTheme.COLORS.PRIMARY}
                    >
                        Description of Event
                    </Text>
                    <TextInput
                        multiline minHeight={100}
                        placeholder="Description of Event"
                        style={styles.multilineTextInput}
                        onChangeText={props.handleChange('descriptionOfEvent')}
                        value={props.values.descriptionOfEvent}
                    />
                    {(props.touched.descriptionOfEvent && props.values.descriptionOfEvent == "") ? (<Text style={styles.errorText}>{props.errors.descriptionOfEvent}</Text>) : null}
                    {/*** Submit button ***/}
                    <Button color="primary" style={styles.button} onPress={props.handleSubmit}>
                        Create Event
                    </Button>
                </Block>}
            </Formik>
            {/*** Modal for date and time picker (Only when clicked) ***/}
            <View>
                {show && <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        minimumDate={new Date()}
                        mode={mode}
                        is24Hour={false}
                        display="default"
                        onChange={onChange}
                    />}
            </View>
            {/*** Modal for when form submitted successfully ***/}
            <Modal visible={modalOpen} animationType='slide'>
                <TouchableWithoutFeedback >
                    <View style={styles.modalSuccessStyle}>
                        <Text style={{fontSize: 25}} color={argonTheme.COLORS.PRIMARY}>Event Successfully Created</Text>
                        <AntDesign style={{padding: 15}} name="checkcircle" size={100} color="green"/>
                        <Button color="primary" style={styles.button} onPress={closingDrawer}>
                            Redirect to Home Page
                        </Button>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    </ScrollView>

}

const styles = StyleSheet.create({
    button: {
        marginVertical: 20,
        marginBottom: theme.SIZES.BASE,
        width: width - theme.SIZES.BASE * 2
    },
    title: {
        marginTop: 10,
        marginBottom: 0
    },
    textInput: {
        borderColor: argonTheme.COLORS.INFO,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: "#fff",
        height: 45,
        padding: 10,
    },
    blockTextInput: {
        borderColor: argonTheme.COLORS.INFO,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
    },
    multilineTextInput: {
        borderColor: argonTheme.COLORS.INFO,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: "#fff",
        padding: 10,
        textAlignVertical: 'top',
        lineHeight: 20
    },
    errorText: {
        padding: 5,
        color: "#ff0000",
    },
    modalSuccessStyle: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    }
})


export default CreateEvent;
