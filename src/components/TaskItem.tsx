// Le composant TaskItem servira a afficher une tache de la liste avec : son texte, une cache a cocher pour dire si c'est complété ou pas et plus tard le boutton supprimer

import React from 'react';
import  {View , Text, StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Création des données en props , on définit les donnés de notre composant

type TaskItemProps = {
    id: string;
    text:string;
    completed: boolean;
    toggleComplete: (id: string) => void; // fonction pour changer l'état (complétée ou pas)
    deleteTask: (id: string) => void;
};

// Ici on mettera le composant fonctionnel: reception des props et on les utilise pour afficher par tâche

const TaskItem: React.FC<TaskItemProps> = ({ id, text, completed, toggleComplete, deleteTask }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, completed && styles.checkboxCompleted]}
        onPress={() => toggleComplete(id)}
      >
        {completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <Text style={[styles.text, completed && styles.textCompleted]}>
        {text}
      </Text>

      {/* Bouton supprimer */}
      <TouchableOpacity onPress={() => deleteTask(id)} style={styles.deleteButton}>
        <Icon name="delete" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};


// 👇 Style du composant avec StyleSheet
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // horizontal (checkbox + texte)
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#444',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50', // fond vert si complété
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  textCompleted: {
    textDecorationLine: 'line-through', // texte barré
    color: '#999',
  },
  deleteButton: {
  marginLeft: 'auto', // pousse le bouton à droite
  paddingHorizontal: 10,
},

});

export default TaskItem;
