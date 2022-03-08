import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native';
import ProjectDetails from './projectDetails';
import {gql, useQuery} from '@apollo/client';
import {Picker} from '@react-native-picker/picker';


const REPO_QUERY = gql`
  query MyQuery($Search: String!) {
    search(query: $Search, type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          id
          description
          stargazerCount
          nameWithOwner
          name 
          forkCount
          updatedAt
          createdAt
          owner {
            login
          }
        }
      }
    }
  }
`;

function tryFetchQuery(searchLang) { 
    const {loading,error, data} = useQuery(REPO_QUERY, {
        variables:
        searchLang === 'any'
            ? {Search: 'stars:>1000'}
            : {Search: 'stars:>1000 language:' + searchLang},
            /*
              variables: {
                query: 'language: ${state.searchLang} sort:stars, number_of_repos_:10'
               }*/
      });

    if (loading) return 'loading';
    if (error) {
        console.log(`Error! ${error.message}`); 
        return 'error';
    }  

    const repositories = data.search.nodes;

    return repositories;
  }


export default function Home({navigation}){

    const [search, setSearch] = useState('any');
    const repositories= tryFetchQuery(search);
    const Separator=()=>( <View style={styles.separator}/>)

    if (repositories == 'error'){
        return(
        <View style={styles.homebody}>
            <Text> ERROR!</Text>
        </View>
        )
    }
    else if(repositories== 'loading'){
        return(
        <View style={styles.homebody}>
            <ActivityIndicator size="large" />
            <Text> LOADING...</Text>
        </View>)
    }
    else{
    return(
        <View style={styles.homebody}>
            <View style={styles.upperBox}>
                <View style={styles.halfBox}>
                    <Text style={styles.rubrikText}>Project List</Text>
                </View>
                <Separator/>
                <View style={styles.halfBox}>     
                    <View style={styles.pickerBox}>
                        <Picker
                            selectedValue={search}
                            style={{height: 30, width: 165}}
                            onValueChange={(itemValue, itemIndex) =>setSearch( itemValue) }>
                                <Picker.Item  label="Any Language" value="any"/>
                                <Picker.Item label="C" value="c"/>
                                <Picker.Item label="C#" value="c#"/>
                                <Picker.Item label="C++" value="c++"/>
                                <Picker.Item label="JavaScript" value="javascript"/>
                                <Picker.Item label="React" value="React"/>
                                <Picker.Item label="React Native" value="react native"/>
                                <Picker.Item label="Python" value="python"/>
                                <Picker.Item label="Java" value="java"/>
                                <Picker.Item label="HTML" value="html"/>
                                <Picker.Item label="PHP" value="php"/>
                                <Picker.Item label="CSS" value="css"/>
                                <Picker.Item label="Ruby" value="ruby"/>
                        </Picker>
                    </View>
                </View>  
            </View>

            <FlatList    
                data={repositories}
                renderItem= {({item})=>(
                    <TouchableOpacity onPress={()=> navigation.navigate('ProjectDetails',item)}>
                        <View style={styles.objectbox}>
                            <View style={styles.titleBox}>
                                <Text style={styles.titleFont}>{item.name}</Text>
                            </View>
                            <View style={styles.descriptionBox}>
                                <Text style={styles.descriptFont}>{item.description}</Text>
                            </View>
                            <View style={styles.bottomBox}>
                                <View style={styles.miniBox}>
                                    <Text>Stars: <Text>{item.stargazerCount}</Text></Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )}
}


const styles = StyleSheet.create({
    homebody: {
        backgroundColor: 'white',
        width: '100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    objectbox:{
        width: 350, 
        //height:100,
        borderRadius: 20,
        backgroundColor: '#eee',
        margin: 5
    }, 
    titleBox:{
        height: 40,
        padding: 10,
        width: '100%',
    },
    descriptionBox:{
        paddingLeft: 10,
        minHeight: 50,
        width: '100%', 
    },
    bottomBox:{
        height: 20,
        width: '100%',
    },
    miniBox:{
        position: 'absolute',
        height:20,
        width:100, 
        borderRadius: 5,
        right: 10, 
        borderColor: 'grey',
        borderWidth: 1,
    },
    pickerBox:{
        borderColor:'grey',
        borderWidth: 2,
        borderRadius:10,
        width:165
    }, 
    upperBox:{
        width: '100%',
        height: 50, 
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfBox:{
        height:'100%',
        width:'50%', 
        justifyContent:'center',
        paddingLeft: 20
    },
    titleFont:{
        fontSize: 20,
        fontWeight: "bold"    
    },
    descriptFont:{
        fontSize: 15,
    },
    rubrikText:{
        fontSize: 30,
        fontWeight: "bold"   
    },
    separator:{
        marginHorizontal:1
    },
  });


