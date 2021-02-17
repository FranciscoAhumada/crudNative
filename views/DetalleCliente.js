import React, {useState} from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { Text, Headline, Subheading, Button, FAB } from 'react-native-paper';
import globalStyle from '../style/global';
import axios from 'axios';


const DetalleCliente = ({navigation, route}) => {
    const {nombre, telefono, correo, empresa, id} = route.params.item;
    const {guardarConsutarApi} = route.params;

    const mostrarConfirmacion = () => {
        Alert.alert(
            'Desea eliminar este cliente',
            'Un contacto eliminado no se puede recuperar',
            [
                {text : 'Si eliminar', onPress:()=>eliminarContacto()},
                {text : 'Cancelar', style : 'cancel'}
            ]
        )
    }

    const eliminarContacto = async () => {
        try {
            if(Platform.OS === 'ios'){
                await axios.delete(`http://localhost:3000/clientes/${id}`);
            }else{
                await axios.delete(`http://10.0.2.2:3000/clientes/${id}`);
            }
        } catch (error) {
            console.log(error);
        }
        navigation.navigate('Inicio');
        guardarConsutarApi(true);
    }

    return (
        <View style={globalStyle.contenedor}>
            <Headline style={globalStyle.titulo}>
                {nombre}
            </Headline>
            <Text style={styles.texto}>Empresa : <Subheading>{empresa}</Subheading></Text>
            <Text style={styles.texto}>Correo : <Subheading>{correo}</Subheading></Text>
            <Text style={styles.texto}>Telefono : <Subheading>{telefono}</Subheading></Text>
            <Button 
                style={styles.boton} 
                mode='contained' 
                icon='cancel'
                onPress={()=> mostrarConfirmacion()}
                >Eliminar Cliente</Button>
            <FAB
                icon='pencil'
                style={globalStyle.fab}
                onPress={()=>navigation.navigate('NuevoCliente',{cliente : route.params.item, guardarConsutarApi})}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    texto : {
        marginBottom : 20,
        fontSize : 18,
    },
    boton : {
        marginTop: 100,
        backgroundColor : 'red'
    }
});

export default DetalleCliente;