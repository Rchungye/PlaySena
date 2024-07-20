import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import EmailIcon from 'react-native-vector-icons/MaterialIcons';
import PasswordIcon from 'react-native-vector-icons/Feather';
import PersonIcon from 'react-native-vector-icons/Ionicons';

const Registrar = (props) => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{paddingHorizontal:25}}>
        <View style={{alignItems:'center'}}>
            <Image 
                source={require('../imagen/logo.png')}
                style={{ width: 100, height: 100 , transform:[{rotate:'-35deg'}]}}
            />
        </View>
        <Text style={{
            fontSize:28, 
            fontWeight:'500',
            color:"#000",
            marginBottom:30,
            }}>
            Registrar
        </Text>

        <View style={{
            flexDirection:'row',
            borderBottomColor: '#ccc',
            borderBottomWidth:1,
            paddingBottom:8,
            marginBottom:25
            }}>

          <PersonIcon 
            name='person-outline' 
            size={20} color='#666'
            olor="#666"
            style={{marginRight: 5}}
          />
          <TextInput 
            placeholder='Nombre'
            style={{flex:1,paddingVertical:0}}
            />
        </View>

        <View style={{
            flexDirection:'row',
            borderBottomColor: '#ccc',
            borderBottomWidth:1,
            paddingBottom:8,
            marginBottom:25
            }}>

          <PersonIcon 
            name='person-outline' 
            size={20} color='#666'
            olor="#666"
            style={{marginRight: 5}}
          />
          <TextInput 
            placeholder='Apellido'
            style={{flex:1,paddingVertical:0}}
            />
        </View>

        <View style={{
            flexDirection:'row',
            borderBottomColor: '#ccc',
            borderBottomWidth:1,
            paddingBottom:8,
            marginBottom:25
            }}>

          <EmailIcon 
            name='alternate-email' 
            size={20} color='#666'
            olor="#666"
            style={{marginRight: 5}}
          />
          <TextInput 
            placeholder='Email ID'
            style={{flex:1,paddingVertical:0}}
            keyboardType='email-address'
            />
        </View>

        <View style={{
            flexDirection:'row',
            borderBottomColor: '#ccc',
            borderBottomWidth:1,
            paddingBottom:8,
            marginBottom:25
            }}>

          <PasswordIcon 
            name='lock' 
            size={20} color='#666'
            olor="#666"
            style={{marginRight: 5}}
          />
          <TextInput 
            placeholder='Password'
            style={{flex:1,paddingVertical:0}}
            secureTextEntry={true}
            />
        </View>

        <TouchableOpacity 
            onPress={()=>{}} 
            style={{
                backgroundColor:'#8CDE9C', 
                padding:20,
                borderRadius:10,
                marginBottom:30,
            }}>
            <Text style={{
                textAlign:'center',
                fontWeight:'700',
                fontSize:16,
                color:'#fff'
            }}>
            Registrar
            </Text>
        </TouchableOpacity>
        
        <View style={{flexDirection:'row',justifyContent:'center',marginBottom:30}}>
            <Text>Ya se registró?</Text>
            <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                <Text style={{color:'#8CDE9C', fontWeight:'700'}}> Login</Text>
            </TouchableOpacity>
        </View>
      </View>
      
    </SafeAreaView>
  );
}

export default Registrar