import React from 'react';
import {StyleSheet, View, Text, Button, ScrollView} from 'react-native';

export default function ProjectDetails({navigation}){
    const pressHanlder=()=>{
        navigation.goBack();
    }

    return(
        <ScrollView  contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}>
            <View style={styles.detailsbody}>
                <View style={{paddingBottom:15}}>
                    <Text style={styles.projectName}>{navigation.getParam('name')}</Text>
                    <Text  style={styles.descrip}>{navigation.getParam('description')}</Text>
                </View>
                <Text  style={styles.typeofInfo}>Created:   <Text style={styles.theInfo}>{navigation.getParam('createdAt')}</Text></Text>
                <Text  style={styles.typeofInfo}>Updated:   <Text style={styles.theInfo}>{navigation.getParam('updatedAt')}</Text></Text>
                <Text  style={styles.typeofInfo}>Owner:   <Text style={styles.theInfo}>{navigation.getParam('owner').login}</Text></Text>
                <Text  style={styles.typeofInfo}>Name With Owner:   <Text style={styles.theInfo}>{navigation.getParam('nameWithOwner')}</Text></Text>
                <Text  style={styles.typeofInfo}>ID:   <Text style={styles.theInfo}>{navigation.getParam('id')}</Text></Text>
                <Text  style={styles.typeofInfo}>Forks:   <Text style={styles.theInfo}>{navigation.getParam('forkCount')}</Text></Text>
                <Text  style={styles.typeofInfo}>Stars:   <Text style={styles.theInfo}>{navigation.getParam('stargazerCount')}</Text></Text>
                <View style={styles.buttonBox}>
                    <Button color="#414141"  title='back home' onPress={pressHanlder}/>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    detailsbody: {
      backgroundColor: 'white',
      width: '100%',
      height:'100%', 
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonBox:{
        width:100,
        height: 60,
        margin: 30
    },
    projectName:{
        fontSize: 40, 
        fontWeight: "bold",
        textAlign: 'center',
    },
    descrip:{
        fontSize: 25,
        textAlign: 'center',
    },
    typeofInfo:{
        fontSize: 15,
        fontWeight: "bold",
        textAlign: 'center',
    },
    theInfo:{
        fontSize: 15,
        textAlign: 'center',
    }
  });
