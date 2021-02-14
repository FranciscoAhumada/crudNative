import React, {useState} from 'react';
import {StyleSheet, View } from 'react-native';
import {TextInput, Headline, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import globalStyles from '../style/global';
import { color } from 'react-native-reanimated';

const NuevoCliente = () => {

    const [nombre, guardarNombre] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [correo, guardarCorreo] = useState('');
    const [empresa, guardarEmpresa] = useState('');
    const [alerta, guardarAlerta] = useState(false);

    const guardarCliente = () => {
        if(nombre === '' || telefono === '' || correo === '' || empresa === ''){
            guardarAlerta(true);
            return;
        }

        const cliente = {nombre, telefono, empresa, correo};
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