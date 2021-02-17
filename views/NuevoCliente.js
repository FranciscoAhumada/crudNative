import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Platform } from 'react-native';
import {TextInput, Headline, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../style/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {

    const {guardarConsutarApi} = route.params;

    const [nombre, guardarNombre] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [correo, guardarCorreo] = useState('');
    const [empresa, guardarEmpresa] = useState('');
    const [alerta, guardarAlerta] = useState(false);

    useEffect(()=>{
        if(route.params.cliente){
            const {nombre, telefono, correo, empresa} = route.params.cliente;
            guardarNombre(nombre);
            guardarTelefono(telefono);
            guardarCorreo(correo);
            guardarEmpresa(empresa);
        }
    },[]);

    const guardarCliente = async () => {
        if(nombre === '' || telefono === '' || correo === '' || empresa === ''){
            guardarAlerta(true);
            return;
        }

        const cliente = {nombre, telefono, empresa, correo};


        if(route.params.cliente){
            const {id} = route.params.cliente;
            cliente.id = id;
            try {
                if(Platform.OS === 'ios'){
                    await axios.put(`http://localhost:3000/clientes/${id}`, cliente);
                }else{
                    await axios.put(`http://10.0.2.2:3000/clientes/${id}`, cliente);
                }
            } catch (error) {
                console.log(errror);
            }
        }else{
            try {
                if(Platform.OS === 'ios'){
                    await axios.post('http://localhost:3000/clientes', cliente);
                }else{
                    await axios.post('http://10.0.2.2:3000/clientes', cliente);
                }
                
            } catch (error) {
                console.log(errror);
            }
        }

        navigation.navigate('Inicio');
        guardarNombre('');
        guardarTelefono('');
        guardarCorreo('');
        guardarEmpresa('');

        guardarConsutarApi(true);
    }

    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>

            <TextInput
                label = 'Nombre'
                placeholder='Ingrese Nombre'
                onChangeText = {(texto)=>guardarNombre(texto)}
                value = {nombre}
                style = {styles.input}
            />
            <TextInput
                label = 'Telefono'
                placeholder='Ingrese Telefono'
                onChangeText = {(texto)=>guardarTelefono(texto)}
                value = {telefono}
                style = {styles.input}
            />
            <TextInput
                label = 'Correo'
                placeholder='Ingrese Correo'
                onChangeText = {(texto)=>guardarCorreo(texto)}
                value={correo}
                style = {styles.input}
            />
            <TextInput
                label = 'Empresa'
                placeholder='Ingrese Empresa'
                onChangeText = {(texto)=>guardarEmpresa(texto)}
                value={empresa}
                style = {styles.input}
            />

            <Button
                icon='pencil-circle'
                mode = 'contained'
                onPress ={()=>guardarCliente()}
            >
                Guardar Cliente
            </Button>

            <Portal>
                <Dialog
                    visible={alerta}
                    onDismiss ={()=>guardarAlerta(false)}
                >
                    <Dialog.Title>
                        Error
                    </Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            Todos los campos son obligatorios
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>guardarAlerta(false)}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            
        </View>
    )
}

const styles = StyleSheet.create({
    input : {
        marginBottom : 20,
        backgroundColor : 'transparent'
    }
})

export default NuevoCliente;