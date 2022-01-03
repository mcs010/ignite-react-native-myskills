import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    Platform,
    FlatList,
} from 'react-native';

//Components
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

// Usa-se para criar tipos de dados
interface SkillData{
    id: string;
    name: string;
    //date?: Date; Atributo não obrigatório
}

export default function Home(){

    // const[meuEstado, funçãoQueAtualizaMeuEstado] - meuEstado armazena a nova skill
    // que o usuário digitar. Não modifica-se o estado diretamente, ao invés,
    // modifica-se o estado indiretamente através da funçãoQueAtualizaMeuEstado
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [greeting, setGreeting] = useState('');

    // Quando usar handle no nome da função? Handle é uma convenção usada quando a função é disparada 
    // por uma interação do usuário. Nesse caso a função vai lidar com o clique do usuário no botão Add
    function handleAddNewSkill(){
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }

        // Pega o antigo estado, cria um array, coloca o antigo estado e adiciona o novo estado
        // O spread operator é usado para despejar o conteúdo que estava no array, para que não aconteça
        // de colocar-se um array dentro de outro array, por ex.: [[], newSkill]
        setMySkills(oldState => [...oldState, data]);
    }

    function handleRemoveSkill(id: string){
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id
        ));
    }

    useEffect(() => {
        const currentHour = new Date().getHours();

        if(currentHour<12){
            setGreeting('Good Morning');
        }else if(currentHour>=12 && currentHour<18){
            setGreeting('Good afternoon')
        }else{
            setGreeting('Good evening');
        }
    }, [])

  return(
    <View style={styles.container}>

        <Text style={styles.title}>
            Welcome, Matheus
        </Text>

        <Text style={styles.greeting}>
            { greeting }
        </Text>
        
        <TextInput
            style={styles.input}
            placeholder = "New skill"
            placeholderTextColor = "#555"
            onChangeText={setNewSkill}
        />

        <Button 
            onPress={handleAddNewSkill} 
            title="Add"
        />

        <Text style={[styles.title, {marginVertical : 50}]}>
            My Skills
        </Text>

        <FlatList 
            data={mySkills}
            keyExtractor={item => item.id} //Cada item será a própria chave na listagem
            renderItem={({ item }) => ( //Desestrutura a coleção (item)
                <SkillCard 
                    key={item.id} 
                    skill={item.name}
                    onPress={() => handleRemoveSkill(item.id)}
                />
            )}
        />

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#121015',
        paddingVertical: 70,
        paddingHorizontal: 30,
    },

    title:{
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },

    input:{
        backgroundColor: '#1F1e25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7,
    },

    greeting:{
        color: '#fff'
    }
});