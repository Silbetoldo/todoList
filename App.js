// Importa as bibliotecas necessárias
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

// Define o componente principal do aplicativo
export default function App() {
  // Estado para armazenar o texto da tarefa atual
  const [task, setTask] = useState('');
  // Estado para armazenar a lista de tarefas
  const [tasks, setTasks] = useState([]);
  // Estado para armazenar o ID da tarefa em edição (se houver)
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Função para adicionar ou editar uma tarefa
  const addTask = () => {
    if (task.trim()) {
      if (editingTaskId) {
        // Se houver uma tarefa em edição, atualiza essa tarefa
        setTasks(tasks.map(item => item.id === editingTaskId ? { ...item, name: task } : item));
        setEditingTaskId(null); // Limpa o ID da tarefa em edição
      } else {
        // Adiciona uma nova tarefa à lista com um ID único
        setTasks([...tasks, { id: Date.now().toString(), name: task }]);
      }
      setTask(''); // Limpa o campo de entrada de tarefa
    }
  };

  // Função para deletar uma tarefa da lista
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Função para iniciar o modo de edição para uma tarefa específica
  const startEditing = (id, taskName) => {
    setEditingTaskId(id); // Define o ID da tarefa que está sendo editada
    setTask(taskName); // Preenche o campo de entrada com o nome da tarefa
  };

  // Renderiza a interface do usuário
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      
      <View style={styles.inputContainer}>
        {/* Campo de entrada para adicionar ou editar tarefa */}
        <TextInput
          style={styles.input}
          placeholder="Adicionar ou editar tarefa"
          value={task}
          onChangeText={setTask}
        />
        {/* Botão para adicionar ou confirmar a edição da tarefa */}
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <MaterialIcons name={editingTaskId ? "check" : "add"} size={30} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Exibe a lista de tarefas */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text style={styles.taskText}>{item.name}</Text>
            <View style={styles.taskActions}>
              {/* Botão para editar a tarefa */}
              <TouchableOpacity onPress={() => startEditing(item.id, item.name)}>
                <MaterialIcons name="edit" size={25} color="blue" />
              </TouchableOpacity>
              {/* Botão para deletar a tarefa */}
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <MaterialIcons name="delete" size={25} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// Define os estilos para o componente
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' }, // Estilo da tela principal
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }, // Estilo do título
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    paddingLeft: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
  },
  taskText: { fontSize: 18, flex: 1 },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
