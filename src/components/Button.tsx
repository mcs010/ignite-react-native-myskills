import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    StyleSheet
} from 'react-native';

//ButtonProps herda as propriedades de TouchableOpacityProps, além de criarmos novas propriedades
interface ButtonProps extends TouchableOpacityProps{
    title: string
}

//Aqui recebe como parâmetro todas as propriedades (...rest) do ButtonProps ( : ButtonProps)
export function Button({ title, ...rest } : ButtonProps) {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={.7}
            {...rest}
        >
            <Text style={styles.buttonText}>
                { title }
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#A370F7',
        padding: 15,
        borderRadius: 7,
        alignItems: 'center',
        marginTop: 20,
    },

    buttonText:{
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
});