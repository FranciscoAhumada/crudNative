import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, View, Platform, FlatList } from 'react-native';
import axios from 'axios';
import { List, Headline, Button , FAB} from 'react-native-paper';
import globalStyle from '../style/global';


const Inicio = ({navigation}) => {

    const [clientes, guardarClientes] = useState([]);
    const [consultarApi, guardarConsutarApi] = useState(true);

    useEffect(()=>{
        const obtenerClientesApi = async () => {
            try {
                let resultado = [];
                if(Platform.OS === 'ios'){
                    resultado = await axios.get('http://localhost:3000/clientes');
                }else{
                    resultado = await axios.get('http://10.0.2.2:3000/clientes');
                }
                guardarClientes(resultado.data);
                guardarConsutarApi(false);
            } catch (error) {
                console.log(error);
            }
        }
        if(consultarApi){
            obtenerClientesApi();
        }
    }, [consultarApi]);

    return (
        <View style={globalStyle.contenedor}>

            <Button icon = 'plus-circle' onPress={()=>navigation.navigate('NuevoCliente',{guardarConsutarApi})}>
                Nuevo Cliente
            </Button>

            <Headline style={globalStyle.titulo}>{clientes.length > 0 ? 'Clientes' : 'Aún no hay clientes'}</Headline>
            <FlatList
                data={clientes}
                keyExtractor={cliente => (cliente.id).toString()}
                renderItem={({item})=>(
                    <List.Item
                        title={item.nombre}
                        description={item.empresa}
                        onPress= {()=>navigation.navigate('DetalleCliente', {item, guardarConsutarApi})}
                    />
                )}
            />

            <FAB
                icon='plus'
                style={globalStyle.fab}
                onPress={()=>navigation.navigate('NuevoCliente',{guardarConsutarApi})}
            />
        </View>
    )
}

export default Inicio;